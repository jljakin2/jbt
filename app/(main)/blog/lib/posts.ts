import { urlFor } from "@/sanity/client";
import { getPosts, type Post } from "@/sanity/queries";
import { CATEGORY_TAGS } from "./categories";

/** What the blog index needs to list a post. */
export type BlogEntry = {
  slug: string;
  metadata: { title: string; publishedAt: string; summary?: string; image?: string; tag?: string };
};

const SITE = "https://www.jeffbuildstech.com";

/** The cover, sized on Sanity's CDN. */
export function coverImage(p: Post, width: number, height: number): string | undefined {
  return p.cover?.asset ? urlFor(p.cover).width(width).height(height).fit("crop").url() : undefined;
}

/** Social image: the explicit one, else the cover, else the site's. */
export function ogImage(p: Post): string {
  return p.ogImageUrl || coverImage(p, 1200, 630) || `${SITE}/opengraph-image.jpg`;
}

/** Published posts in the three categories, newest first. Others stay reachable by URL but are not listed. */
export async function getBlogEntries(): Promise<BlogEntry[]> {
  const posts = await getPosts();
  return posts
    .filter((p) => CATEGORY_TAGS.includes(p.tag ?? ""))
    .map((p) => ({
      slug: p.slug,
      metadata: { title: p.title, publishedAt: p.publishedAt, summary: p.summary, image: coverImage(p, 800, 500), tag: p.tag },
    }));
}
