import fs from "fs";
import path from "path";

// --------------------------------------------------------------------------
// ----------------------------- Blog post stuff ----------------------------
// --------------------------------------------------------------------------
type PostMetadata = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  summary?: string;
  author?: string;
  authorImg?: string;
  tag?: string;
};

function parsePostFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<PostMetadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof PostMetadata] = value;
  });

  return { metadata: metadata as PostMetadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readPostMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parsePostFrontmatter(rawContent);
}

function getPostMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readPostMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getPostMDXData(path.join(process.cwd(), "content/blog"));
}
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// ----------------------------- Doc tutorial stuff -------------------------
// --------------------------------------------------------------------------

type DocMetadata = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  summary?: string;
  topicTitle?: string;
  topicSlug?: string;
  prevTitle?: string;
  prevSlug?: string;
  nextTitle?: string;
  nextSlug?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<DocMetadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof DocMetadata] = value;
  });

  return { metadata: metadata as DocMetadata, content };
}

function getDocMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getDocMDXData(dir: string) {
  const mdxFiles = getDocMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getDocPages() {
  return getDocMDXData(path.join(process.cwd(), "content/docs"));
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
