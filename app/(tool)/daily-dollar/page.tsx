import StarterCard from "./components/starter-card";

export const metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "Daily Dollar",
  alternates: {
    canonical: "/daily-dollar",
  },
  description:
    "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
  openGraph: {
    title: "Daily Dollar",
    description:
      "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/",
    siteName: "Jeff Builds Tech",
    images: [`https://djg4kctbfokfu.cloudfront.net/og/OG-daily-dollar.jpg`],
  },
  twitter: {
    title: "Daily Dollar",
    description:
      "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
    card: "summary_large_image",
    images: [`https://djg4kctbfokfu.cloudfront.net/og/OG-daily-dollar.jpg`],
  },
};

export default function DailyDollarPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 relative">
      {/* Dotted background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.1,
        }}
      />
      <StarterCard />
    </div>
  );
}
