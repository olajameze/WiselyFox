import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Vitest on Windows breaks when the process cwd uses a lowercase drive letter. */
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cwd = projectRoot.replace(/^([a-zA-Z]):/, (_, d) => `${d.toUpperCase()}:`);

const args = process.argv.slice(2);
const result = spawnSync("npx", ["vitest", "run", ...args], {
  stdio: "inherit",
  shell: true,
  cwd,
  env: process.env,
});

process.exit(result.status ?? 1);
