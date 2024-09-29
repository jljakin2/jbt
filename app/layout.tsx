import "@/app/css/globals.css";

import { Inter } from "next/font/google";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto">
            <div className="min-h-screen flex">
              {/* <SideNavigation /> */}

              {/* Main content */}
              <main className="grow overflow-hidden px-6">
                <div className="w-full h-full max-w-[1072px] mx-auto flex flex-col">
                  <Header />

                  {children}
                  <Footer />
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
