import { MetadataRoute } from "next";
import { getBlogPosts } from "@/components/mdx/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: any = await getBlogPosts();

  const postUrls = posts.map((post: any) => {
    let lastModified;
    try {
      lastModified = new Date(post.publishedAt).toISOString().split("T")[0];
    } catch (error) {
      console.error(`Invalid date for post: ${post.slug}`, error);
      lastModified = new Date().toISOString().split("T")[0]; // Use current date as fallback
    }

    return {
      url: `https://www.jeffbuildstech.com/blog/${post.slug}`,
      lastModified,
    };
  });

  return [
    {
      url: `https://www.jeffbuildstech.com/`,
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.jeffbuildstech.com/tools",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.jeffbuildstech.com/blog",
      lastModified: new Date().toISOString().split("T")[0],
    },
    ...postUrls,
  ];
}
