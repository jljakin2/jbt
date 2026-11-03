// Sanity connection. All three are set in .env.local and in Vercel's project env.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-10-01";

/** True once a project id is present. Pages render an empty state without it instead of failing the build. */
export const isSanityConfigured = projectId.length > 0;
