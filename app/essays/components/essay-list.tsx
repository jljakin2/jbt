"use client";

import PostItem from "@/app/post-item";
import { useState, useEffect } from "react";

const filters = [
  { label: "Dev", tag: "dev" },
  { label: "Product", tag: "product" },
  { label: "Marketing", tag: "marketing" },
  { label: "Writing", tag: "writing" },
  { label: "Learning", tag: "learning" },
  { label: "Career", tag: "career" },
];

export default function EssayList({ essays }: { essays: any }) {
  const [selectedTag, setSelectedTag] = useState("dev");
  const [filteredBlogs, setFilteredBlogs] = useState(essays);

  useEffect(() => {
    // Sort posts by date
    const sortedBlogs = essays.sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt) - new Date(a.metadata.publishedAt)
      );
    });
    // Filter posts based on selected tag
    const filtered =
      selectedTag === "all"
        ? sortedBlogs
        : sortedBlogs.filter((blog) => blog.metadata.tag === selectedTag);

    setFilteredBlogs(filtered);
  }, [selectedTag, essays]);

  return (
    <section>
      <h2 className="font-aspekta text-xl font-[650] mb-3">Latest Essays</h2>

      {/* Filters */}
      <ul className="flex flex-wrap text-sm border-b border-border">
        {filters.map((filter) => (
          <li key={filter.tag} className="px-3 -mb-px">
            <button
              className={`block py-3 font-medium ${
                selectedTag === filter.tag
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary transition-colors"
              }`}
              onClick={() => setSelectedTag(filter.tag)}
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Articles list */}
      <div>
        {filteredBlogs.map((post, postIndex) => (
          <PostItem key={postIndex} {...post} />
        ))}
      </div>
    </section>
  );
}
