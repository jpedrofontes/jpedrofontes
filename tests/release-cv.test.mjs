import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { COMPILER_VERSION, MANIFEST_NAME, PDF_NAME, digest, fingerprint, publishCv } from "../scripts/release-cv.mjs";

async function fixture(context) {
  const root = await mkdtemp(path.join(tmpdir(), "cv-release-test-"));
  await mkdir(path.join(root, "cv"));
  await writeFile(path.join(root, "cv/CV_JoaoPedroFontes.tex"), "CV source");
  execFileSync("git", ["init", "--quiet"], { cwd: root });
  execFileSync("git", ["add", "cv"], { cwd: root });
  const assets = new Map();
  const uploads = new Map();
  const current = { id: 2, tag_name: "v1.1.0", draft: false, prerelease: false, assets: [] };
  const prior = { id: 1, tag_name: "v1.0.0", draft: false, prerelease: false, assets: [] };
  const server = createServer(async (request, response) => {
    const url = new URL(request.url, baseUrl);
    response.setHeader("Content-Type", "application/json");
    if (url.pathname.endsWith("/releases/tags/v1.1.0")) return response.end(JSON.stringify(current));
    if (url.pathname.endsWith("/releases")) return response.end(JSON.stringify([current, prior]));
    if (request.method === "POST") {
      const chunks = [];
      for await (const chunk of request) chunks.push(chunk);
      uploads.set(url.searchParams.get("name"), Buffer.concat(chunks));
      response.statusCode = 201;
      return response.end("{}");
    }
    if (assets.has(url.pathname)) return response.end(assets.get(url.pathname));
    response.statusCode = 404;
    response.end("{}");
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  current.upload_url = `${baseUrl}/upload{?name,label}`;
  context.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  });
  function addAssets(release, sourceHash, pdf = Buffer.from("%PDF-1.7\nverified PDF")) {
    const manifest = { schema: 1, compiler: COMPILER_VERSION, sourceHash, pdfHash: digest(pdf) };
    release.assets = [PDF_NAME, MANIFEST_NAME].map((name, index) => {
      const url = `${baseUrl}/assets/${release.id}-${index}`;
      assets.set(new URL(url).pathname, index === 0 ? pdf : JSON.stringify(manifest));
      return { name, url };
    });
  }
  const options = { tag: "v1.1.0", root, repository: "owner/repo", token: "test-token", apiUrl: baseUrl };
  return { root, current, prior, uploads, assets, addAssets, options };
}

test("first release compiles and publishes a PDF and provenance manifest", async context => {
  const { options, uploads } = await fixture(context);
  let builds = 0;
  const result = await publishCv({ ...options, compile: async () => { builds += 1; return Buffer.from("%PDF-1.7\nnew PDF"); } });
  assert.equal(result.action, "compiled");
  assert.equal(builds, 1);
  assert.equal(uploads.size, 2);
  const manifest = JSON.parse(uploads.get(MANIFEST_NAME));
  assert.equal(manifest.pdfHash, digest(uploads.get(PDF_NAME)));
});

test("unchanged CV reuses a prior stable PDF on the new release", async context => {
  const { options, uploads, prior, addAssets, root } = await fixture(context);
  addAssets(prior, await fingerprint(root));
  const result = await publishCv({ ...options, compile: async () => { throw new Error("Must not compile"); } });
  assert.equal(result.action, "reused");
  assert.equal(result.reusedFrom, "v1.0.0");
  assert.equal(uploads.size, 2);
});

test("rerunning a completed release does not compile or upload again", async context => {
  const { options, uploads, current, addAssets, root } = await fixture(context);
  addAssets(current, await fingerprint(root));
  const result = await publishCv({ ...options, compile: async () => { throw new Error("Must not compile"); } });
  assert.equal(result.action, "unchanged");
  assert.equal(uploads.size, 0);
});

test("changed CV inputs cause a fresh compilation", async context => {
  const { options, prior, addAssets, root } = await fixture(context);
  addAssets(prior, await fingerprint(root));
  await writeFile(path.join(root, "cv/CV_JoaoPedroFontes.tex"), "Updated source");
  const result = await publishCv({ ...options, compile: async () => Buffer.from("%PDF-1.7\nupdated PDF") });
  assert.equal(result.action, "compiled");
});

test("corrupt prior assets are rejected rather than republished", async context => {
  const { options, prior, assets, addAssets, root } = await fixture(context);
  addAssets(prior, await fingerprint(root));
  assets.set(new URL(prior.assets[0].url).pathname, Buffer.from("%PDF-1.7\ncorrupted PDF"));
  await assert.rejects(publishCv({ ...options, compile: async () => Buffer.from("%PDF-") }), /Invalid CV asset/);
});

test("prereleases and draft releases cannot publish production CV assets", async context => {
  const { options, current } = await fixture(context);
  current.prerelease = true;
  await assert.rejects(publishCv(options), /published stable/);
  current.prerelease = false;
  current.draft = true;
  await assert.rejects(publishCv(options), /published stable/);
  await assert.rejects(publishCv({ ...options, tag: "v1.1.0-rc1" }), /stable vX.Y.Z/);
});