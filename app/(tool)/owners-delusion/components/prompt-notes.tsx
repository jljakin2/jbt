"use client";

import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { activePrompts } from "../lib/lenses";

// Notes hang half-off the artifact's edges like sticky notes on a printout.
// Placement/color are deterministic per index so SSR hydration stays stable.
const PLACEMENTS = [
  "top-3 left-0 -translate-x-1/3 -rotate-6",
  "top-6 right-0 translate-x-1/3 rotate-6",
  "bottom-0 right-6 translate-y-1/3 -rotate-3",
  "bottom-2 left-2 -translate-x-1/4 translate-y-1/4 rotate-3",
];
const COLORS = ["#fdf0a6", "#d4edb9", "#ffd4dd", "#cbe4fb"];

export default function PromptNotes() {
  const { activeTool, blinkSeen, showNotes } = useOwnersDelusion();
  const prompts = activePrompts(activeTool, blinkSeen);

  if (!showNotes || prompts.length === 0) return null;

  return (
    <>
      {prompts.map((prompt, i) => (
        <div
          key={prompt}
          className={`absolute z-20 flex h-40 w-40 items-center justify-center rounded-[3px] p-4 text-center shadow-[0_10px_20px_-8px_rgba(0,0,0,0.45)] ${
            PLACEMENTS[i % PLACEMENTS.length]
          }`}
          style={{ backgroundColor: COLORS[i % COLORS.length] }}
        >
          {/* tape */}
          <span className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 -rotate-2 bg-white/40 shadow-sm" />
          <p className="font-hand text-base leading-tight text-gray-800">
            {prompt}
          </p>
        </div>
      ))}
    </>
  );
}
