#!/usr/bin/env node
/**
 * build-photo-manifest.mjs
 *
 * Scans a local folder of exported (web-sized) photos and prints ready-to-paste
 * `Photo` entries for app/(main)/play/lib/photos.ts — with pixel dimensions and
 * a tiny base64 blur-up placeholder (LQIP) filled in.
 *
 * Uses macOS's built-in `sips` — no npm dependency required.
 *
 * Usage:
 *   node scripts/build-photo-manifest.mjs ./path/to/web-sized-photos
 *   node scripts/build-photo-manifest.mjs ./photos --base https://djg4kctbfokfu.cloudfront.net/photography/web
 *
 * Then: upload the same files to that location on S3/CloudFront, paste the
 * printed entries into PHOTOS, and fill in each `alt` (and optional `caption`).
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith("--")) ?? ".";
const baseIdx = args.indexOf("--base");
const baseUrl =
  baseIdx !== -1 && args[baseIdx + 1]
    ? args[baseIdx + 1].replace(/\/$/, "")
    : "https://djg4kctbfokfu.cloudfront.net/photography/web";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function dimensions(file) {
  const out = execFileSync(
    "sips",
    ["-g", "pixelWidth", "-g", "pixelHeight", file],
    { encoding: "utf8" }
  );
  const width = Number(out.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(out.match(/pixelHeight:\s*(\d+)/)?.[1]);
  return { width, height };
}

function blurDataURL(file, workDir) {
  const tiny = path.join(workDir, "tiny.jpg");
  execFileSync("sips", [
    "--resampleWidth", "20",
    "-s", "formatOptions", "low",
    file,
    "--out", tiny,
  ]);
  const b64 = readFileSync(tiny).toString("base64");
  return `data:image/jpeg;base64,${b64}`;
}

const slug = (f) =>
  f.replace(/\.[^.]+$/, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const files = readdirSync(dir)
  .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
  .sort();

if (files.length === 0) {
  console.error(`No images found in "${dir}".`);
  process.exit(1);
}

const workDir = mkdtempSync(path.join(tmpdir(), "photo-manifest-"));

const entries = files.map((file) => {
  const full = path.join(dir, file);
  const { width, height } = dimensions(full);
  const url = `${baseUrl}/${encodeURIComponent(file)}`;
  return [
    "  {",
    `    id: ${JSON.stringify(slug(file))},`,
    `    src: ${JSON.stringify(url)},`,
    `    width: ${width},`,
    `    height: ${height},`,
    `    alt: "", // TODO: describe the photo`,
    `    blurDataURL: ${JSON.stringify(blurDataURL(full, workDir))},`,
    "  },",
  ].join("\n");
});

rmSync(workDir, { recursive: true, force: true });

console.log(`// ${files.length} photo(s) — paste into PHOTOS in app/(main)/play/lib/photos.ts\n`);
console.log(entries.join("\n"));
