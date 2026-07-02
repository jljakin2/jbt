import PlayHero from "@/components/play-hero";

import PhotoGallery from "./components/photo-gallery";
import { PHOTOS } from "./lib/photos";

export const metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "Play",
  alternates: {
    canonical: "/play",
  },
  description:
    "Photography by Jeff Jakinovich — a running collection of favorite frames from a former photographer who still loves the craft.",
  openGraph: {
    title: "Play",
    description:
      "Photography by Jeff Jakinovich — a running collection of favorite frames from a former photographer who still loves the craft.",
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/play",
    siteName: "Jeff Builds Tech",
  },
  twitter: {
    title: "Play",
    description:
      "Photography by Jeff Jakinovich — a running collection of favorite frames.",
    card: "summary_large_image",
  },
};

export default function PlayPage() {
  return (
    <div className="grow pt-6 md:pt-16 pb-16 md:pb-20">
      <PlayHero />
      <PhotoGallery photos={PHOTOS} />
    </div>
  );
}
