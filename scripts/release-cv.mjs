import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDF_NAME } from "../lib/cv-release.mjs";

export { PDF_NAME };
export const MANIFEST_NAME = "CV_JoaoPedroFontes.json";
export const COMPILER_VERSION = "0.17.0";

export function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

export async function fingerprint(root) {
  const files = execFileSync("git", ["ls-files", "-z", "--", "cv"], { cwd: root })
    .toString().split("\0").filter(Boolean).sort();
  if (!files.includes("cv/CV_JoaoPedroFontes.tex")) {
    throw new Error("The CV source must be tracked in Git");
  }
  const inputs = [];
  for (const file of files) {
    inputs.push([file, digest(await readFile(path.join(root, file)))]);
  }
  return digest(JSON.stringify({ compiler: COMPILER_VERSION, inputs }));
}

export function validPdf(bytes) {
  return bytes.subarray(0, 5).toString() === "%PDF-";
}

export async function publishCv({ tag, root, repository, token, apiUrl = "https://api.github.com", compile }) {
  if (!/^v\d+\.\d+\.\d+$/.test(tag)) throw new Error("A stable vX.Y.Z tag is required");
  if (!token) throw new Error("GITHUB_TOKEN is required");
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error("Invalid repository");

  async function request(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(60000),
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...options.headers,
      },
    });
    if (!response.ok) throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`);
    return response;
  }

  const endpoint = `${apiUrl}/repos/${repository}`;
  const release = await (await request(`${endpoint}/releases/tags/${encodeURIComponent(tag)}`)).json();
  if (release.draft || release.prerelease) throw new Error("Only published stable releases may deploy");
  const sourceHash = await fingerprint(root);

  async function previousPdf(candidate) {
    const manifestAsset = candidate.assets.find(asset => asset.name === MANIFEST_NAME);
    const pdfAsset = candidate.assets.find(asset => asset.name === PDF_NAME);
    if (!manifestAsset || !pdfAsset) return null;
    const manifest = await (await request(manifestAsset.url, {
      headers: { Accept: "application/octet-stream" },
    })).json();
    if (manifest.schema !== 1 || manifest.sourceHash !== sourceHash || manifest.compiler !== COMPILER_VERSION) return null;
    const bytes = Buffer.from(await (await request(pdfAsset.url, {
      headers: { Accept: "application/octet-stream" },
    })).arrayBuffer());
    if (!validPdf(bytes) || digest(bytes) !== manifest.pdfHash) {
      throw new Error(`Invalid CV asset on release ${candidate.tag_name}`);
    }
    return bytes;
  }

  if (await previousPdf(release)) return { action: "unchanged", sourceHash };

  let pdf;
  let reusedFrom = null;
  for (let page = 1; ; page += 1) {
    const releases = await (await request(`${endpoint}/releases?per_page=100&page=${page}`)).json();
    for (const candidate of releases) {
      if (candidate.id === release.id || candidate.draft || candidate.prerelease) continue;
      pdf = await previousPdf(candidate);
      if (pdf) {
        reusedFrom = candidate.tag_name;
        break;
      }
    }
    if (pdf || releases.length < 100) break;
  }

  if (!pdf) pdf = await compile();
  if (!validPdf(pdf)) throw new Error("The compiler did not produce a PDF");
  const manifest = {
    schema: 1,
    compiler: COMPILER_VERSION,
    sourceHash,
    pdfHash: digest(pdf),
    tag,
    reusedFrom,
  };
  const uploads = [
    [PDF_NAME, pdf, "application/pdf"],
    [MANIFEST_NAME, Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`), "application/json"],
  ];
  for (const [name, bytes, contentType] of uploads) {
    const existing = release.assets.find(asset => asset.name === name);
    if (existing) await request(existing.url, { method: "DELETE" });
    const url = new URL(release.upload_url.split("{")[0]);
    url.searchParams.set("name", name);
    await request(url, { method: "POST", headers: { "Content-Type": contentType }, body: bytes });
  }
  return { action: reusedFrom ? "reused" : "compiled", sourceHash, reusedFrom };
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const compiler = process.env.TECTONIC_BIN || "tectonic";
  const compilerVersion = execFileSync(compiler, ["--version"], { encoding: "utf8" }).trim();
  if (!compilerVersion.endsWith(` ${COMPILER_VERSION}`)) {
    throw new Error(`Tectonic ${COMPILER_VERSION} is required, found ${compilerVersion}`);
  }
  const result = await publishCv({
    tag: process.argv[2],
    root,
    repository: process.env.GITHUB_REPOSITORY || "jpedrofontes/jpedrofontes",
    token: process.env.GITHUB_TOKEN,
    compile: async () => {
      const output = await mkdtemp(path.join(tmpdir(), "jpedrofontes-cv-"));
      try {
        execFileSync(compiler, ["--untrusted", "--outdir", output, path.join(root, "cv/CV_JoaoPedroFontes.tex")], {
          cwd: root,
          stdio: "inherit",
        });
        return await readFile(path.join(output, PDF_NAME));
      } finally {
        await rm(output, { recursive: true, force: true });
      }
    },
  });
  console.log(`CV release asset ${result.action}${result.reusedFrom ? ` from ${result.reusedFrom}` : ""}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await writeFile(process.env.GITHUB_STEP_SUMMARY, `CV PDF: **${result.action}**${result.reusedFrom ? ` from ${result.reusedFrom}` : ""}.\n`, { flag: "a" });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}