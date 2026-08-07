"use client";

import { RotateCcw } from "lucide-react";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { MODES } from "../lib/lenses";

/**
 * Floating command bar. The top-level axis (mode switching) plus a prominent
 * "start over" action, floated over the exam surface so the artifact owns the
 * space. The right panel stays pure detail.
 */
export default function ModeToolbar() {
  const { mode, setMode, clearImage } = useOwnersDelusion();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-6 z-10 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-1.5 rounded-2xl border border-[#e4e4de] bg-white/90 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)] backdrop-blur">
        {/* Mode switcher */}
        <div className="flex items-center gap-1">
          {MODES.map((m) => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                disabled={!m.available}
                onClick={() => m.available && setMode(m.id)}
                className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#18181b] text-white"
                    : m.available
                      ? "text-[#57534e] hover:bg-[#f0f0ea]"
                      : "cursor-not-allowed text-[#c4c4bd]"
                }`}
              >
                {m.label}
                {!m.available && (
                  <span className="ml-1 align-top font-mono text-[8px] uppercase tracking-wide text-[#c4c4bd]">
                    soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mx-0.5 h-6 w-px bg-[#e4e4de]" />

        {/* Start over — clearly a distinct, obvious action. */}
        <button
          onClick={clearImage}
          className="flex items-center gap-1.5 rounded-xl border border-[#d8d8d2] px-3.5 py-2 text-sm font-medium text-[#18181b] transition-colors hover:border-[#18181b] hover:bg-[#f0f0ea]"
        >
          <RotateCcw className="h-4 w-4" />
          New image
        </button>
      </div>
    </div>
  );
}
