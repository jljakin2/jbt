import { getPosts } from "@/sanity/queries";
import Link from "next/link";

export default async function WidgetPosts() {
  const allBlogs = await getPosts();

  return (
    <div className="rounded-lg border border-border p-5">
      <div className="font-aspekta font-[650] mb-3">Popular Posts</div>
      <ul className="space-y-3">
        {allBlogs.slice(0, 5).map((post) => (
          <li key={post.slug} className="inline-flex">
            <span className="text-sky-500 mr-2">—</span>{" "}
            <Link
              className="font-aspekta font-[650] text-sm inline-flex relative hover:text-primary transition-colors"
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
