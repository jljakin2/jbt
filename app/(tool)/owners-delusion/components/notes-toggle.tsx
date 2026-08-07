"use client";

import { StickyNote } from "lucide-react";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { hasRelevantExam } from "../lib/lenses";

/**
 * The one visible trace of the helper feature. It stays hidden until the user
 * has actually run an examination, then fades in at the bottom-right of the exam
 * surface with a soft pulse — a slight "there's something here" signal — but only
 * while the notes are off. Turn it on and the pulse calms.
 */
export default function NotesToggle() {
  const { mode, activeLens, blinkSeen, showNotes, toggleNotes } =
    useOwnersDelusion();

  if (!hasRelevantExam(mode, activeLens, blinkSeen)) return null;

  return (
    <button
      onClick={toggleNotes}
      aria-pressed={showNotes}
      title={
        showNotes
          ? "Hide helper notes"
          : "A few questions worth asking — show notes"
      }
      className={`absolute bottom-4 right-4 z-30 flex h-11 w-11 animate-fade-in items-center justify-center rounded-full border shadow-md transition-colors ${
        showNotes
          ? "border-[#e8d98a] bg-[#fdf0a6] text-[#2a2a22]"
          : "border-[#e4e4de] bg-white/90 text-[#57534e] backdrop-blur hover:text-[#18181b]"
      }`}
    >
      <StickyNote className="h-5 w-5" />

      {/* Slight signal that something's here — only while notes are hidden. */}
      {!showNotes && (
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f59e0b] opacity-70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#f59e0b]" />
        </span>
      )}
    </button>
  );
}
