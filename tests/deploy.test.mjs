import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
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
  await copyFile(path.join(sourceRoot, "scripts", "deploy.sh"), path.join(root, "scripts", "deploy.sh"));
  await writeFile(path.join(root, "bin/sudo"), `#!/usr/bin/env bash
printf '%s\\n' "$*" >> "$TEST_LOG"
exit "\${TEST_SUDO_EXIT:-0}"
`, { mode: 0o755 });
  const log = path.join(root, "commands.log");
  context.after(() => rm(root, { recursive: true, force: true }));
  function run(extra = {}, ...args) {
    return spawnSync("bash", [path.join(root, "scripts/deploy.sh"), ...args], {
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${path.join(root, "bin")}:${process.env.PATH}`,
        TEST_LOG: log,
        ...extra,
      },
    });
  }
  return { log, run };
}

test("stable tag is handed to the root-owned deploy wrapper", async context => {
  const { log, run } = await fixture(context);
  const result = run({}, "v1.0.0");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(await readFile(log, "utf8"), "-n /usr/local/sbin/deploy-jpedrofontes v1.0.0\n");
});

test("wrapper failure fails the job", async context => {
  const { run } = await fixture(context);
  assert.equal(run({ TEST_SUDO_EXIT: "1" }, "v1.0.0").status, 1);
});

test("prerelease tags are refused before the wrapper is called", async context => {
  const { log, run } = await fixture(context);
  const result = run({}, "v1.0.0-rc1");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /stable vX.Y.Z/);
  await assert.rejects(readFile(log, "utf8"));
});

test("a missing tag is refused before the wrapper is called", async context => {
  const { log, run } = await fixture(context);
  assert.notEqual(run({}).status, 0);
  await assert.rejects(readFile(log, "utf8"));
});
