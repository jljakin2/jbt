import type { Viewport } from "next";
import Link from "next/link";
import { Courier_Prime, Permanent_Marker } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/logo";
import OwnersDelusionContainer from "./components/owners-delusion-container";
import { BUTTERFIELD_URL } from "./lib/lenses";

// Typewriter face for the chart, labels, and header: patient-chart energy.
const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
});

// Marker face for the sticky notes.
const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

const description =
  "You've gone blind to your own work. Paste a screenshot and see it the way a stranger does: squint it, gray it, blink-test it.";

export const metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "The Owner's Delusion",
  alternates: {
    canonical: "/owners-delusion",
  },
  description,
  openGraph: {
    title: "The Owner's Delusion",
    description,
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/owners-delusion",
    siteName: "Jeff Builds Tech",
  },
  twitter: {
    title: "The Owner's Delusion",
    description,
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function OwnersDelusionPage() {
  return (
    <div
      className={`${courier.variable} ${marker.variable} min-h-[100svh] bg-gray-50 text-gray-900`}
    >
      <header className="flex h-16 w-full items-center border-b border-gray-200 bg-white px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="sr-only">Home</span>
            <Logo className="h-12 w-12" />
          </Link>

          <div className="flex flex-col items-end leading-tight">
            <h1 className="font-courier text-base font-bold text-gray-900">
              The Owner&apos;s Delusion
            </h1>
            <a
              href={BUTTERFIELD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs text-gray-400 transition-colors hover:text-gray-700"
            >
              a nod to Stewart Butterfield
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      <OwnersDelusionContainer />
    </div>
  );
}
