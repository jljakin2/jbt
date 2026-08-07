"use client";

import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { LENSES, BLINK, hasRelevantExam } from "../lib/lenses";

// Notes are stuck onto the edges/corners of the artifact — half on the image,
// half hanging into the surrounding space, like someone slapping sticky notes
// onto a printout in a workshop. Deterministic per-index placement/color keeps
// SSR hydration stable (no Math.random). Translate + rotate live in the class so
// Tailwind composes them into a single transform.
const PLACEMENTS = [
  "top-3 left-0 -translate-x-1/3 -rotate-6",
  "top-6 right-0 translate-x-1/3 rotate-6",
  "bottom-0 right-6 translate-y-1/3 -rotate-3",
  "bottom-2 left-2 -translate-x-1/4 translate-y-1/4 rotate-3",
];
const COLORS = ["#fdf0a6", "#d4edb9", "#ffd4dd", "#cbe4fb"];

/**
 * The workshop notes. Visibility is a manual toggle (showNotes); the content is
 * specific to whatever you're currently examining — the squint questions differ
 * from the grayscale questions differ from the blink-test questions.
 */
export default function PromptNotes() {
  const { mode, activeLens, blinkSeen, showNotes } = useOwnersDelusion();

  // Pick the prompts for the current examination.
  const prompts =
    mode === "impression"
      ? BLINK.prompts
      : mode === "clarity"
        ? (LENSES.find((l) => l.id === activeLens)?.prompts ?? [])
        : [];

  if (
    !showNotes ||
    prompts.length === 0 ||
    !hasRelevantExam(mode, activeLens, blinkSeen)
  ) {
    return null;
  }

  return (
    <>
      {prompts.map((prompt, i) => (
        <div
          key={prompt}
          className={`note-paper absolute z-20 flex h-40 w-40 items-center justify-center rounded-[3px] p-4 text-center shadow-[0_10px_20px_-8px_rgba(0,0,0,0.45)] ${
            PLACEMENTS[i % PLACEMENTS.length]
          }`}
          style={{ backgroundColor: COLORS[i % COLORS.length] }}
        >
          {/* A strip of "tape" holding the note to the artifact. */}
          <span className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 -rotate-2 bg-white/40 shadow-sm" />
          <p className="font-hand text-base leading-tight text-[#2a2a22]">
            {prompt}
          </p>
        </div>
      ))}
    </>
  );
}
