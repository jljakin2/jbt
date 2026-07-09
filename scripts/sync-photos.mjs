#!/usr/bin/env node
/**
 * sync-photos.mjs — one-command photo pipeline for the /play gallery.
 * The S3 originals folder is the single source of truth.
 *
 * Add photos:      upload full-res originals to  s3://jbt-images/photography/
 * Remove photos:   delete the original from that prefix — or, to keep it in
 *                  the cloud but off the site, move it to  photography/archive/
 * Then run:        npm run sync-photos
 * Finally:         review photos.ts (order, alt text), commit, deploy.
 *
 * What it does, per new original:
 *   - creates a web-sized copy (max 2560px, q80 JPEG) → photography/web/
 *   - creates a thumbnail    (max 640px,  q75 JPEG) → photography/thumb/
 *   - uploads both with long immutable Cache-Control headers
 *   - reads dimensions + generates a tiny base64 blur placeholder
 *   - appends a ready entry to app/(main)/play/lib/photos.ts
 * And per removed original: prunes the manifest entry and deletes the
 * orphaned web/ and thumb/ derivatives.
 *
 * The site serves these derivatives directly (next/image `unoptimized`) —
 * NO Vercel image optimization, so zero transformation/cache-write quota.
 *
 * Requirements: aws CLI (profile "JeffBuildsTech" or set AWS_PROFILE),
 * macOS `sips`. No npm dependencies.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BUCKET = "jbt-images";
const PREFIX = "photography/";
const WEB_PREFIX = "photography/web/";
const THUMB_PREFIX = "photography/thumb/";
const ARCHIVE_PREFIX = "photography/archive/";
const CDN = "https://djg4kctbfokfu.cloudfront.net";
const MANIFEST = "app/(main)/play/lib/photos.ts";
const PROFILE = process.env.AWS_PROFILE || "JeffBuildsTech";
/** Images are content-addressed by filename; safe to cache "forever". */
const CACHE_CONTROL = "public, max-age=31536000, immutable";

const aws = (args, opts = {}) =>
  execFileSync("aws", [...args, "--profile", PROFILE], {
    encoding: "utf8",
    ...opts,
  });

const stem = (f) => f.replace(/\.[^.]+$/, "");
const slug = (f) =>
  stem(f).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// ── 1. List originals in the bucket (excluding derivatives + archive) ──
let keys;
try {
  const out = aws([
    "s3api", "list-objects-v2",
    "--bucket", BUCKET,
    "--prefix", PREFIX,
    "--query", "Contents[].Key",
    "--output", "json",
  ]);
  keys = (JSON.parse(out || "[]") || []).filter(
    (k) =>
      !k.startsWith(WEB_PREFIX) &&
      !k.startsWith(THUMB_PREFIX) &&
      !k.startsWith(ARCHIVE_PREFIX) &&
      /\.(jpe?g|png)$/i.test(k)
  );
} catch (err) {
  console.error(
    `Could not list s3://${BUCKET}/${PREFIX} — is the AWS profile "${PROFILE}" configured?`
  );
  process.exit(1);
}
const originalStems = new Set(keys.map((k) => stem(path.basename(k))));

// ── 2. Parse manifest entries ──
let manifest = readFileSync(MANIFEST, "utf8");
const entryBlocks = manifest.match(/^ {2}\{[\s\S]*?^ {2}\},$/gm) ?? [];
const webFileOf = (block) => {
  const m = block.match(/\/photography\/web\/([^"]+)"/);
  return m ? decodeURIComponent(m[1]) : null;
};

// ── 3. PRUNE: manifest entries whose original is gone ──
const orphans = entryBlocks.filter((b) => {
  const webFile = webFileOf(b);
  return webFile && !originalStems.has(stem(webFile));
});
for (const block of orphans) {
  const webFile = webFileOf(block);
  console.log(`pruning ${webFile} (original removed from bucket)`);
  manifest = manifest.replace(block + "\n", "");
  for (const prefix of [WEB_PREFIX, THUMB_PREFIX]) {
    try {
      aws(["s3", "rm", `s3://${BUCKET}/${prefix}${webFile}`, "--quiet"]);
    } catch {
      /* derivative may not exist; ignore */
    }
  }
}

// ── 4. ADD: originals not yet in the manifest ──
const manifestStems = new Set(
  entryBlocks
    .filter((b) => !orphans.includes(b))
    .map((b) => {
      const f = webFileOf(b);
      return f ? stem(f) : null;
    })
    .filter(Boolean)
);
const newKeys = keys.filter((k) => !manifestStems.has(stem(path.basename(k))));

if (newKeys.length === 0 && orphans.length === 0) {
  console.log("No changes — manifest is already in sync with the bucket.");
  process.exit(0);
}

const entries = [];
if (newKeys.length > 0) {
  console.log(`Found ${newKeys.length} new photo(s):`);
  newKeys.forEach((k) => console.log(`  ${path.basename(k)}`));

  const work = mkdtempSync(path.join(tmpdir(), "sync-photos-"));
  for (const key of newKeys) {
    const file = path.basename(key);
    const webName = `${stem(file)}.jpg`; // derivatives are always jpeg
    process.stdout.write(`processing ${file} ... `);

    const orig = path.join(work, `orig${path.extname(file)}`);
    const web = path.join(work, "web.jpg");
    const thumb = path.join(work, "thumb.jpg");
    const tiny = path.join(work, "tiny.jpg");

    aws(["s3", "cp", `s3://${BUCKET}/${key}`, orig, "--quiet"]);
    execFileSync(
      "sips",
      ["-Z", "2560", "-s", "format", "jpeg", "-s", "formatOptions", "80", orig, "--out", web],
      { stdio: "ignore" }
    );
    execFileSync(
      "sips",
      ["-Z", "640", "-s", "format", "jpeg", "-s", "formatOptions", "75", orig, "--out", thumb],
      { stdio: "ignore" }
    );
    for (const [local, prefix] of [
      [web, WEB_PREFIX],
      [thumb, THUMB_PREFIX],
    ]) {
      aws([
        "s3", "cp", local, `s3://${BUCKET}/${prefix}${webName}`,
        "--content-type", "image/jpeg",
        "--cache-control", CACHE_CONTROL,
        "--quiet",
      ]);
    }

    const dims = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", web], {
      encoding: "utf8",
    });
    const width = Number(dims.match(/pixelWidth:\s*(\d+)/)[1]);
    const height = Number(dims.match(/pixelHeight:\s*(\d+)/)[1]);

    execFileSync(
      "sips",
      ["--resampleWidth", "20", "-s", "formatOptions", "low", web, "--out", tiny],
      { stdio: "ignore" }
    );
    const b64 = readFileSync(tiny).toString("base64");

    const enc = encodeURIComponent(webName);
    entries.push(
      [
        "  {",
        `    id: ${JSON.stringify(slug(file))},`,
        `    src: ${JSON.stringify(`${CDN}/photography/web/${enc}`)},`,
        `    thumbSrc: ${JSON.stringify(`${CDN}/photography/thumb/${enc}`)},`,
        `    width: ${width},`,
        `    height: ${height},`,
        `    alt: "Photograph by Jeff Jakinovich", // TODO: personalize`,
        `    blurDataURL: ${JSON.stringify(`data:image/jpeg;base64,${b64}`)},`,
        "  },",
      ].join("\n")
    );
    console.log(`ok (${width}×${height})`);
  }
  rmSync(work, { recursive: true, force: true });
}

// ── 5. Write the updated manifest ──
if (entries.length > 0) {
  const withAdds = manifest.replace(/\n\];\s*$/, `\n${entries.join("\n")}\n];\n`);
  if (withAdds === manifest) {
    console.error("Could not find the closing `];` in photos.ts — no changes written.");
    process.exit(1);
  }
  manifest = withAdds;
}
writeFileSync(MANIFEST, manifest);

console.log(
  `\nDone: ${entries.length} added, ${orphans.length} pruned.` +
    (entries.length
      ? `\nNew photos are appended at the end — reorder to curate, personalize alt text.`
      : "") +
    `\nReview ${MANIFEST}, then commit + deploy.`
);
