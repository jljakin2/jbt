import Logo from "@/components/logo";
import AtomicEssayContainer from "./components/atomic-essay-container";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "Atomic Essay",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  alternates: {
    canonical: "/atomic-essay",
  },
  description:
    "Create an atomic essay and download it as an image to share on social media.",
  openGraph: {
    title: "Atomic Essay",
    description:
      "Create an atomic essay and download it as an image to share on social media.",
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/",
    siteName: "Jeff Builds Tech",
    images: [
      `https://djg4kctbfokfu.cloudfront.net/tools/atomic-essay/OG-atomic-essay.jpg`,
    ],
  },
  twitter: {
    title: "Atomic Essay",
    description:
      "Create an atomic essay and download it as an image to share on social media.",
    card: "summary_large_image",
    images: [
      `https://djg4kctbfokfu.cloudfront.net/tools/atomic-essay/OG-atomic-essay.jpg`,
    ],
  },
};

export default function AtomicEssayPage() {
  return (
    <div className="container h-[calc(100svh-2rem)] mx-auto p-4">
      <header className="w-full pb-2">
        <div className="container mx-auto">
          <Link href="/">
            <span className="sr-only">Home</span>
            <Logo className="w-14 h-14" />
          </Link>
        </div>
      </header>
      <AtomicEssayContainer />
    </div>
  );
}
