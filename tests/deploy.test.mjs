import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile, copyFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function fixture(context) {
  const root = await mkdtemp(path.join(tmpdir(), "deploy-test-"));
  await mkdir(path.join(root, "scripts"));
  await mkdir(path.join(root, "bin"));
  for (const file of ["deploy.sh", "compose.production.yml"]) {
    await copyFile(path.join(sourceRoot, "scripts", file), path.join(root, "scripts", file));
  }
  await writeFile(path.join(root, "bin/docker"), `#!/usr/bin/env bash
printf 'image=%s command=%s\\n' "\${JPEDROFONTES_IMAGE:-}" "$*" >> "$TEST_LOG"
if [[ "$1" == "inspect" ]]; then printf 'sha256:previous\\n'; fi
if [[ "$1" == "build" && "\${TEST_BUILD_FAIL:-0}" == "1" ]]; then exit 1; fi
if [[ "$1" == "compose" && "\${TEST_DEPLOY_FAIL:-0}" == "1" && "\${JPEDROFONTES_IMAGE:-}" != *:rollback ]]; then exit 1; fi
`, { mode: 0o755 });
  await writeFile(path.join(root, "bin/curl"), "#!/usr/bin/env bash\nexit 0\n", { mode: 0o755 });
  execFileSync("git", ["init", "--quiet"], { cwd: root });
  execFileSync("git", ["add", "scripts"], { cwd: root });
  execFileSync("git", ["-c", "user.name=Release test", "-c", "user.email=test@example.invalid", "commit", "--quiet", "-m", "fixture"], { cwd: root });
  execFileSync("git", ["tag", "v1.0.0"], { cwd: root });
  const log = path.join(root, "commands.log");
  context.after(() => rm(root, { recursive: true, force: true }));
  function run(extra = {}, tag = "v1.0.0") {
    return spawnSync("bash", [path.join(root, "scripts/deploy.sh"), tag], {
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${path.join(root, "bin")}:${process.env.PATH}`,
        JPEDROFONTES_RUNTIME_DIR: path.join(root, "runtime"),
        TEST_LOG: log,
        ...extra,
      },
    });
  }
  return { root, log, run };
}

test("build-only deployment never replaces production or checks out the worktree", async context => {
  const { root, log, run } = await fixture(context);
  await writeFile(path.join(root, "user-work.txt"), "Preserved local edit");
  const result = run({ JPEDROFONTES_BUILD_ONLY: "1" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(await readFile(log, "utf8"), /command=build/);
  assert.doesNotMatch(await readFile(log, "utf8"), /command=compose/);
  assert.equal(await readFile(path.join(root, "user-work.txt"), "utf8"), "Preserved local edit");
});

test("failed build leaves the current production container alone", async context => {
  const { log, run } = await fixture(context);
  assert.equal(run({ TEST_BUILD_FAIL: "1" }).status, 1);
  assert.doesNotMatch(await readFile(log, "utf8"), /command=compose|command=inspect/);
});

test("successful deployment waits for health and retains a rollback image", async context => {
  const { log, run } = await fixture(context);
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  const commands = await readFile(log, "utf8");
  assert.match(commands, /tag sha256:previous jpedrofontes:rollback/);
  assert.match(commands, /--wait --wait-timeout 120/);
  assert.match(commands, /tag jpedrofontes:v1.0.0 jpedrofontes:latest/);
});

test("unhealthy replacement restores the previous image and fails the job", async context => {
  const { log, run } = await fixture(context);
  assert.equal(run({ TEST_DEPLOY_FAIL: "1" }).status, 1);
  const commands = await readFile(log, "utf8");
  assert.match(commands, /image=jpedrofontes:rollback command=compose/);
  assert.doesNotMatch(commands, /tag jpedrofontes:v1.0.0 jpedrofontes:latest/);
});

test("prerelease tags are refused before any Docker commands", async context => {
  const { run } = await fixture(context);
  const result = run({}, "v1.0.0-rc1");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /stable vX.Y.Z/);
});