import { getBlogEntries } from "./lib/posts";
import BlogIndex from "./components/blog-index";

const description =
  "Teardowns of other people's products, build logs of my own tools, and thoughts in between. I make complicated things click.";

export const metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "Blog",
  alternates: {
    canonical: "/blog",
  },
  description,
  openGraph: {
    title: "Blog",
    description,
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/blog",
    siteName: "Jeff Builds Tech",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function BlogPage() {
  // Static. The Sanity fetch is tagged, so the webhook at /api/revalidate refreshes it when a post changes.
  const essays = await getBlogEntries();

  return (
    <div className="grow pt-6 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-[700px] mx-auto">
        <BlogIndex essays={essays} />
      </div>
    </div>
  );
}
