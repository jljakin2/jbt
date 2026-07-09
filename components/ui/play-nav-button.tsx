"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

/** The hobbies that live (or will live) in /play. */
const EMOJIS = ["🎨", "📸", "🎬", "✏️"];

/**
 * The nav entry for /play. At rest it matches the other ghost icon buttons
 * exactly; on hover it breaks character — the icon becomes a wiggling emoji
 * flipbook of the hobbies the section holds.
 */
export function PlayNavButton() {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/play");

  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!hovered) return;
    const id = setInterval(
      () => setIndex((n) => (n + 1) % EMOJIS.length),
      220
    );
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <Link
      href="/play"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Play — photography and other experiments"
      className={`group inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent ${
        isActive ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {/* At rest: a quiet icon like the neighbors */}
      <Palette className="h-5 w-5 group-hover:hidden" />
      {/* On hover: the flipbook */}
      <span
        className="hidden text-lg group-hover:inline-block group-hover:animate-wiggle"
        aria-hidden="true"
      >
        {EMOJIS[index]}
      </span>
    </Link>
  );
}
