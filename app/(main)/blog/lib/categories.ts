// The three post formats. Plain module (no "use client") so both server and client code can import it.
export const CATEGORIES = [
  {
    tag: "teardown",
    label: "Teardowns",
    promise: "Someone else's product, taken apart. What's off, and what I'd do instead.",
  },
  {
    tag: "build-log",
    label: "Build Logs",
    promise: "My own tools. What shipped, what broke, what I cut.",
  },
  {
    tag: "thoughts",
    label: "Thoughts",
    promise: "Everything I haven't finished arguing with myself about.",
  },
] as const;

export const CATEGORY_TAGS: string[] = CATEGORIES.map((c) => c.tag);

export function categoryLabel(tag?: string) {
  return CATEGORIES.find((c) => c.tag === tag)?.label;
}
