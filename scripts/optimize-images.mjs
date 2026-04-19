import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";

const SRC = "src/assets";
const OUT = "src/assets/optimized";
const QUALITY = 78;

// Different size buckets per asset type
const PRESETS = [
  { match: /^gallery-\d+\.jpg$/i, widths: [400, 800, 1200], blur: true },
  { match: /^hero-\d+\.jpg$/i, widths: [800, 1400, 2000], blur: true },
  { match: /^hero-couple\.jpg$/i, widths: [800, 1400, 2000], blur: true },
  { match: /^(bride|groom)\.jpg$/i, widths: [400, 800], blur: false },
];

await mkdir(OUT, { recursive: true });
const files = await readdir(SRC);

let totalIn = 0;
let totalOut = 0;
let processed = 0;

for (const file of files) {
  const preset = PRESETS.find((p) => p.match.test(file));
  if (!preset) continue;

  const inPath = join(SRC, file);
  const { name } = parse(file);
  totalIn += (await stat(inPath)).size;

  for (const w of preset.widths) {
    const outPath = join(OUT, `${name}-${w}.webp`);
    if (!existsSync(outPath)) {
      await sharp(inPath)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(outPath);
    }
    totalOut += (await stat(outPath)).size;
  }

  if (preset.blur) {
    const blurPath = join(OUT, `${name}-blur.webp`);
    if (!existsSync(blurPath)) {
      await sharp(inPath)
        .rotate()
        .resize({ width: 24 })
        .webp({ quality: 40 })
        .toFile(blurPath);
    }
  }

  processed++;
  process.stdout.write(`✓ ${file}\n`);
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
if (processed === 0) {
  console.log(
    "No source JPGs found in src/assets/. Drop new images there to optimize."
  );
} else {
  console.log(
    `\nDone. ${processed} images. ${mb(totalIn)}MB → ${mb(totalOut)}MB ` +
      `(${((1 - totalOut / totalIn) * 100).toFixed(0)}% smaller)`
  );
}
