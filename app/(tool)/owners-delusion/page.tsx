import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/logo";
import OwnersDelusionContainer from "./components/owners-delusion-container";
import { SOURCES } from "./lib/lenses";

export const metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "The Owner's Delusion",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  alternates: {
    canonical: "/owners-delusion",
  },
  description:
    "You've gone blind to your own work. Paste a screenshot and see it like a first-time viewer will — squint it, gray it, and blink-test it.",
  openGraph: {
    title: "The Owner's Delusion",
    description:
      "You've gone blind to your own work. Paste a screenshot and see it like a first-time viewer will.",
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/owners-delusion",
    siteName: "Jeff Builds Tech",
  },
  twitter: {
    title: "The Owner's Delusion",
    description:
      "You've gone blind to your own work. Paste a screenshot and see it like a first-time viewer will.",
    card: "summary_large_image",
  },
};

export default function OwnersDelusionPage() {
  return (
    <div className="min-h-[100svh] bg-[#f4f4ef] text-[#18181b]">
      <header className="flex h-16 w-full items-center border-b border-[#e4e4de] bg-[#fafaf8] px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="sr-only">Home</span>
            <Logo className="h-12 w-12" />
          </Link>

          <div className="flex flex-col items-end leading-tight">
            <h1 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#18181b]">
              The Owner&apos;s Delusion
            </h1>
            <a
              href={SOURCES.butterfield.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[10px] text-[#a3a29c] transition-colors hover:text-[#57534e]"
            >
              a nod to Stewart Butterfield
              <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      </header>

      <OwnersDelusionContainer />
    </div>
  );
}
