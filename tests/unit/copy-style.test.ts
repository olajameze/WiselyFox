import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MARKETING_DIR = join(process.cwd(), "src/features/marketing");

function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectSourceFiles(full));
    } else if (/\.(tsx?|css)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("marketing copy style", () => {
  it("does not use em dashes in marketing UI files", () => {
    const offenders: string[] = [];
    for (const file of collectSourceFiles(MARKETING_DIR)) {
      const content = readFileSync(file, "utf8");
      if (content.includes("—")) {
        offenders.push(file.replace(process.cwd() + "/", "").replace(/\\/g, "/"));
      }
    }
    expect(offenders).toEqual([]);
  });
});
