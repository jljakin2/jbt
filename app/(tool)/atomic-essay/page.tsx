import AtomicEssayContainer from "./components/atomic-essay-container";

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
    "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
  openGraph: {
    title: "Atomic Essay",
    description:
      "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/",
    siteName: "Jeff Builds Tech",
    images: [`https://djg4kctbfokfu.cloudfront.net/og/OG-atomic-essay.jpg`],
  },
  twitter: {
    title: "Atomic Essay",
    description:
      "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
    card: "summary_large_image",
    images: [`https://djg4kctbfokfu.cloudfront.net/og/OG-atomic-essay.jpg`],
  },
};

export default function AtomicEssayPage() {
  return (
    <div className="container h-[calc(100vh-2rem)] mx-auto p-4">
      <AtomicEssayContainer />
    </div>
  );
}
