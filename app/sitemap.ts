import { MetadataRoute } from "next";
import { getPosts } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];
  const posts = await getPosts();

  return [
    { url: "https://www.jeffbuildstech.com/", lastModified: today },
    { url: "https://www.jeffbuildstech.com/tools", lastModified: today },
    { url: "https://www.jeffbuildstech.com/blog", lastModified: today },
    ...["owners-delusion", "atomic-essay", "daily-dollar", "v60"].map((tool) => ({
      url: `https://www.jeffbuildstech.com/${tool}`,
      lastModified: today,
    })),
    ...posts.map((post) => ({
      url: `https://www.jeffbuildstech.com/blog/${post.slug}`,
      lastModified: post.publishedAt,
    })),
  ];
}
