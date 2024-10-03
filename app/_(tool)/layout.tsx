import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Layout",
  description: "Pages with a clean slate",
};

export default function ResetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
