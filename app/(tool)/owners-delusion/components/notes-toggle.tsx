"use client";

import { StickyNote } from "lucide-react";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { activePrompts } from "../lib/lenses";

// Hidden until an examination has been run; pulses until the notes are opened.
export default function NotesToggle() {
  const { activeTool, blinkSeen, showNotes, toggleNotes } = useOwnersDelusion();

  if (activePrompts(activeTool, blinkSeen).length === 0) return null;

  return (
    <button
      type="button"
      onClick={toggleNotes}
      aria-pressed={showNotes}
      title={
        showNotes
          ? "Hide helper notes"
          : "A few questions worth asking. Show notes"
      }
      className={`absolute bottom-4 right-4 z-30 flex h-11 w-11 animate-fade-in items-center justify-center rounded-full border shadow-md transition-colors ${
        showNotes
          ? "border-[#e8d98a] bg-[#fdf0a6] text-gray-800"
          : "border-gray-200 bg-white text-gray-500 hover:text-gray-900"
      }`}
    >
      <StickyNote className="h-5 w-5" />

      {!showNotes && (
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
      )}
    </button>
  );
}
