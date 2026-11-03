import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

// Created on first use, not at import: createClient throws without a projectId, and the site
// must still build and render (with empty notes) before Sanity is configured.
let instance: SanityClient | null = null;
export function getClient(): SanityClient {
  if (!instance) {
    // The CDN serves published content fast; on-demand revalidation (api/revalidate) keeps it fresh.
    instance = createClient({ projectId, dataset, apiVersion, useCdn: true });
  }
  return instance;
}

type ImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];
export const urlFor = (source: ImageSource) => imageUrlBuilder({ projectId, dataset }).image(source).auto("format");
