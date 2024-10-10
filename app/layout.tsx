import "@/app/css/globals.css";

import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./theme-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Metadata } from "next/types";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// const aspekta = localFont({
//   src: [
//     {
//       path: "../public/fonts/Aspekta-500.woff2",
//       weight: "500",
//     },
//     {
//       path: "../public/fonts/Aspekta-650.woff2",
//       weight: "650",
//     },
//   ],
//   variable: "--font-aspekta",
//   display: "swap",
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: {
    default: "Jeff Builds Tech - Dev and Marketer",
    template: "%s | Jeff Builds Tech",
  },
  alternates: {
    canonical: "./",
  },
  description:
    "Thoughts and tools for developers and entrepreneurs to accomplish more with less stress.",
  openGraph: {
    title: "Jeff Builds Tech - Dev and Marketer",
    description:
      "Thoughts and tools for developers and entrepreneurs to accomplish more with less stress.",
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/",
    siteName: "Jeff Builds Tech",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body
        className={`${inter.variable} font-inter antialiased bg-background text-foreground tracking-tight`}
      >
        {children}
      </body>
      {process.env.GTAG && <GoogleAnalytics gaId={process.env.GTAG} />}
    </html>
  );
}
