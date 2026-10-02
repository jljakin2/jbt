// The three post formats. Plain module (no "use client") so both server and client code can import it.
// Each has an icon; render them through <CategoryTag> so they look the same everywhere.
export const CATEGORIES = [
  {
    tag: "teardown",
    label: "Teardowns",
    promise: "Someone else's product, taken apart. What's off, and what I'd do instead.",
    icon: "scissors",
  },
  {
    tag: "build-log",
    label: "Build Logs",
    promise: "My own tools. What shipped, what broke, what I cut.",
    icon: "hammer",
  },
  {
    tag: "thoughts",
    label: "Thoughts",
    promise: "Everything I haven't finished arguing with myself about.",
    icon: "lightbulb",
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export const CATEGORY_TAGS: string[] = CATEGORIES.map((c) => c.tag);

export function categoryOf(tag?: string): Category | undefined {
  return CATEGORIES.find((c) => c.tag === tag);
}

export function categoryLabel(tag?: string) {
  return categoryOf(tag)?.label;
}
