import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

// The editor, embedded in the site so it works from a phone's home screen. Not linked anywhere; noindex via next-sanity's metadata.
export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-md p-8 text-sm text-muted-foreground">
        <p>Sanity isn&apos;t configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
