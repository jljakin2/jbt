import { Hammer, Lightbulb, Scissors } from "lucide-react";
import { categoryOf, type Category } from "../lib/categories";

const ICONS = { scissors: Scissors, hammer: Hammer, lightbulb: Lightbulb } as const;

/**
 * A category, always icon + label, always in the primary blue.
 * - "tag":    small uppercase eyebrow, used in post lists and post headers.
 * - "header": the group heading in the blog index, with the icon on a tinted square.
 */
export default function CategoryTag({ tag, variant = "tag", className = "" }: { tag?: string; variant?: "tag" | "header"; className?: string }) {
  const c = categoryOf(tag);
  if (!c) return null;
  const Icon = ICONS[c.icon];
  if (variant === "header") {
    return (
      // Label shares the post titles' line height (leading-snug) so the two columns line up text-to-text.
      // The 28px icon box is 6px taller than that line, so it's pulled up 3px to sit optically centered on it.
      <span className={`flex items-start gap-2.5 font-aspekta text-base font-[650] leading-snug text-foreground ${className}`}>
        <span className="-mt-[3px] flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
        {c.label}
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs uppercase text-primary ${className}`}>
      <Icon className="h-3 w-3" aria-hidden />
      {c.label}
    </span>
  );
}

export type { Category };
