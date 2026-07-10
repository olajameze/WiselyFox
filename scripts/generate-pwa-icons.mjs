/**
 * Rasterize SVG brand icons to PNG for PWA install criteria (192/512 + Apple touch).
 * Run: npm run pwa:icons
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const iconsDir = join(publicDir, "icons");

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("Install sharp first: npm install --save-dev sharp");
    process.exit(1);
  }

  const iconSvg = readFileSync(join(iconsDir, "icon.svg"));
  const maskableSvg = readFileSync(join(iconsDir, "icon-maskable.svg"));

  const outputs = [
    { file: join(iconsDir, "icon-192.png"), size: 192, input: iconSvg },
    { file: join(iconsDir, "icon-512.png"), size: 512, input: iconSvg },
    { file: join(iconsDir, "icon-maskable-512.png"), size: 512, input: maskableSvg },
    { file: join(publicDir, "apple-touch-icon.png"), size: 180, input: iconSvg },
    { file: join(publicDir, "favicon-32.png"), size: 32, input: iconSvg },
  ];

  for (const { file, size, input } of outputs) {
    await sharp(input).resize(size, size).png().toFile(file);
    console.log(`Wrote ${file}`);
  }

  const favicon32 = await sharp(iconSvg).resize(32, 32).png().toBuffer();
  writeFileSync(join(publicDir, "favicon.ico"), favicon32);
  console.log(`Wrote ${join(publicDir, "favicon.ico")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
