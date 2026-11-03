// One-time: copy every content/blog/*.mdx into Sanity as a `post` document with a Portable Text body.
// Images (cover + inline) are uploaded as Sanity assets, cached in scripts/.sanity-asset-cache.json so reruns don't re-upload.
// Idempotent: documents are keyed on slug (createOrReplace).
//
//   node --env-file=.env.local scripts/migrate-posts-to-sanity.mjs            # dry run: parses everything, uploads nothing
//   node --env-file=.env.local scripts/migrate-posts-to-sanity.mjs --write    # uploads images, writes documents
//
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN (Editor token).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { createClient } from "@sanity/client";

const write = process.argv.includes("--write");
const dir = path.join(process.cwd(), "content/blog");
const cachePath = path.join(process.cwd(), "scripts/.sanity-asset-cache.json");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
if (write && !token) throw new Error("SANITY_API_WRITE_TOKEN is not set");

// Posts tagged outside the three categories were unlisted on the old site; keep them that way.
const CATEGORY_TAGS = ["teardown", "build-log", "thoughts"];
const tagOf = (t) => (CATEGORY_TAGS.includes(t) ? t : "unlisted");
// Fence names → the ids the studio's language picker uses.
const LANG = { yml: "yaml", javascript: "js", typescript: "ts", sh: "bash", shell: "bash", py: "python" };
const langOf = (l) => LANG[l] ?? l ?? "text";

const client = write ? createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false }) : null;
const key = () => crypto.randomBytes(6).toString("hex");

/* ---------- frontmatter ---------- */

function parse(file) {
  const raw = fs.readFileSync(path.join(dir, file), "utf-8");
  const match = /^---\s*([\s\S]*?)\s*---/.exec(raw);
  if (!match) throw new Error(`${file}: no frontmatter`);
  const meta = {};
  for (const line of match[1].trim().split("\n")) {
    const [k, ...rest] = line.split(": ");
    meta[k.trim()] = rest.join(": ").trim().replace(/^['"](.*)['"]$/, "$1");
  }
  return { meta, body: raw.slice(match[0].length).trim() };
}

/* ---------- image assets ---------- */

const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, "utf-8")) : {};
const wanted = new Set();

async function assetRef(url) {
  wanted.add(url);
  if (!write) return { _type: "reference", _ref: "image-dry-run" };
  if (!cache[url]) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`image ${url}: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buf, {
      filename: decodeURIComponent(path.basename(new URL(url).pathname)),
      contentType: res.headers.get("content-type") ?? undefined,
    });
    cache[url] = asset._id;
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
    console.log(`  uploaded ${url}`);
  }
  return { _type: "reference", _ref: cache[url] };
}

/* ---------- mdast → Portable Text ---------- */

const attr = (node, name) => node.attributes?.find((a) => a.type === "mdxJsxAttribute" && a.name === name)?.value;

function span(text, marks) {
  return { _type: "span", _key: key(), text, marks: [...marks] };
}

/** Inline nodes → spans. Links become markDefs; everything else is a decorator. */
function inline(nodes, marks, out, defs, file) {
  for (const n of nodes) {
    switch (n.type) {
      case "text":
        out.push(span(n.value.replace(/\s*\n\s*/g, " "), marks));
        break;
      case "strong":
        inline(n.children, [...marks, "strong"], out, defs, file);
        break;
      case "emphasis":
        inline(n.children, [...marks, "em"], out, defs, file);
        break;
      case "inlineCode":
        out.push(span(n.value, [...marks, "code"]));
        break;
      case "link": {
        const k = key();
        defs.push({ _type: "link", _key: k, href: n.url });
        inline(n.children, [...marks, k], out, defs, file);
        break;
      }
      case "break":
        out.push(span("\n", marks));
        break;
      case "mdxJsxTextElement":
        if (n.name === "Code") inline(n.children, [...marks, "code"], out, defs, file);
        else throw new Error(`${file}: unhandled inline <${n.name}>`);
        break;
      default:
        throw new Error(`${file}: unhandled inline node ${n.type}`);
    }
  }
}

function block(style, children, file, list) {
  const spans = [];
  const markDefs = [];
  inline(children, [], spans, markDefs, file);
  // Merge neighbours with identical marks so the editor shows one run, not a run per word.
  const merged = [];
  for (const s of spans) {
    const last = merged[merged.length - 1];
    if (last && last.marks.join() === s.marks.join()) last.text += s.text;
    else merged.push(s);
  }
  if (merged.length === 0) merged.push(span("", []));
  return { _type: "block", _key: key(), style, markDefs, children: merged, ...(list ? { listItem: list.type, level: list.level } : {}) };
}

async function image(src, alt) {
  if (!src) throw new Error("image without src");
  return { _type: "figure", _key: key(), asset: await assetRef(src), alt: alt || "" };
}

async function flow(node, file, list) {
  switch (node.type) {
    case "paragraph":
      if (node.children.length === 1 && node.children[0].type === "image") return [await image(node.children[0].url, node.children[0].alt)];
      return [block("normal", node.children, file, list)];
    case "heading":
      return [block(`h${Math.min(Math.max(node.depth, 2), 4)}`, node.children, file)];
    case "blockquote": {
      const out = [];
      for (const c of node.children) out.push(...(c.type === "paragraph" ? [block("blockquote", c.children, file)] : await flow(c, file)));
      return out;
    }
    case "list": {
      const type = node.ordered ? "number" : "bullet";
      const level = (list?.level ?? 0) + 1;
      const out = [];
      for (const li of node.children) {
        for (const c of li.children) out.push(...(await flow(c, file, { type, level })));
      }
      return out;
    }
    case "code":
      return [{ _type: "code", _key: key(), language: langOf(node.lang || "text"), code: node.value }];
    case "thematicBreak":
      return [{ _type: "divider", _key: key(), style: "rule" }];
    case "mdxJsxFlowElement": {
      if (node.name === "Image") return [await image(attr(node, "src"), attr(node, "alt"))];
      if (node.name === "Blockquote") {
        const out = [];
        for (const c of node.children) out.push(...(c.type === "paragraph" ? [block("blockquote", c.children, file)] : await flow(c, file)));
        return out;
      }
      throw new Error(`${file}: unhandled <${node.name}>`);
    }
    default:
      throw new Error(`${file}: unhandled block node ${node.type}`);
  }
}

const parser = unified().use(remarkParse).use(remarkMdx);

async function toPortableText(markdown, file) {
  const tree = parser.parse(markdown);
  const blocks = [];
  for (const node of tree.children) blocks.push(...(await flow(node, file)));
  return blocks;
}

/* ---------- run ---------- */

const docs = [];
const stats = {};
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).sort()) {
  const slug = path.basename(file, ".mdx");
  const { meta, body } = parse(file);
  for (const k of ["title", "publishedAt"]) if (!meta[k]) throw new Error(`${file}: missing ${k}`);
  const blocks = await toPortableText(body, file);
  for (const b of blocks) stats[b.listItem ? `list:${b.listItem}` : b._type === "block" ? b.style : b._type] = (stats[b.listItem ? `list:${b.listItem}` : b._type === "block" ? b.style : b._type] ?? 0) + 1;
  docs.push({
    _id: `post-${slug}`,
    _type: "post",
    title: meta.title,
    slug: { _type: "slug", current: slug },
    tag: tagOf(meta.tag),
    publishedAt: meta.publishedAt,
    summary: meta.summary || undefined,
    cover: meta.image ? { _type: "image", asset: await assetRef(meta.image), alt: "" } : undefined,
    // The site has always pointed link previews at this CloudFront path; keep it so nothing changes for old posts.
    ogImageUrl: `https://djg4kctbfokfu.cloudfront.net/og/OG-${slug}.jpg`,
    body: blocks,
  });
  console.log(`${meta.publishedAt}  ${(meta.tag ?? "-").padEnd(9)} /blog/${slug}  (${blocks.length} blocks)`);
}

// DUMP_DIR=/some/dir writes each document as JSON, to inspect or to render in a lab page.
if (process.env.DUMP_DIR) {
  fs.mkdirSync(process.env.DUMP_DIR, { recursive: true });
  for (const d of docs) fs.writeFileSync(path.join(process.env.DUMP_DIR, `${d.slug.current}.json`), JSON.stringify(d, null, 2));
}

console.log(`\n${docs.length} posts, ${wanted.size} distinct images`);
console.log(Object.entries(stats).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(", "));

if (write) {
  const tx = docs.reduce((t, d) => t.createOrReplace(d), client.transaction());
  const result = await tx.commit();
  console.log(`\ncommitted ${result.results.length} documents`);
} else {
  console.log("\ndry run; add --write to migrate");
}
