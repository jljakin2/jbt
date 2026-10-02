import { getBlogPosts } from "@/components/mdx/utils";
import { CATEGORY_TAGS } from "./lib/categories";
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

export default function BlogPage() {
  // Posts outside the three categories stay reachable by URL but are not listed.
  const essays = getBlogPosts()
    .filter((post) => CATEGORY_TAGS.includes(post.metadata.tag ?? ""))
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .map((post) => ({ slug: post.slug, metadata: post.metadata }));

  return (
    <div className="grow pt-6 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-[700px] mx-auto">
        <BlogIndex essays={essays} />
      </div>
    </div>
  );
}
