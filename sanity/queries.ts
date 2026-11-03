import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { getClient } from "./client";
import { isSanityConfigured } from "./env";

/** Cache tag the revalidate webhook clears. */
export const POSTS_TAG = "posts";

export interface SanityImage {
  asset: { _ref: string };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
}

/** A published post. `body` is Portable Text; see components/post-body.tsx. */
export interface Post {
  _id: string;
  title: string;
  slug: string;
  tag?: string;
  publishedAt: string;
  summary?: string;
  body: PortableTextBlock[];
  cover?: SanityImage | null;
  ogImageUrl?: string;
}

// Figures get their asset expanded so the renderer knows the pixel size (no layout shift).
const FIELDS = groq`{
  _id, title, "slug": slug.current, tag, publishedAt, summary, ogImageUrl,
  cover{ asset, hotspot, crop, alt },
  body[]{ ..., _type == "figure" => { ..., asset->{ _id, metadata{ dimensions{ width, height } } } } }
}`;

// Without a token the client only sees published documents, so drafts never leak.
const LIST = groq`*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) ${FIELDS}`;
const ONE = groq`*[_type == "post" && slug.current == $slug][0] ${FIELDS}`;

// Production: cached until the webhook clears the tag, so pages stay static between posts.
// Development: no cache, since nothing local ever clears it and edits in the studio should show on reload.
const cache =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { tags: [POSTS_TAG], revalidate: false as const } };

export async function getPosts(): Promise<Post[]> {
  if (!isSanityConfigured) return [];
  return getClient().fetch<Post[]>(LIST, {}, cache);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) return null;
  return getClient().fetch<Post | null>(ONE, { slug }, cache);
}
