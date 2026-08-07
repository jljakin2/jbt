"use client";

import { Layers } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { LENSES, BLINK } from "../lib/lenses";
import AttributionChip from "./attribution-chip";

/**
 * The detail panel — controls only, plus a simple nod to whoever the idea came
 * from. No mode title (the toolbar shows it) and no explanatory blurbs.
 */
export default function ModePanel() {
  const mode = useOwnersDelusion((s) => s.mode);

  return (
    <aside className="flex h-full w-full flex-col gap-5 overflow-y-auto border-t border-[#e4e4de] bg-[#fafaf8] p-5 md:w-[320px] md:border-l md:border-t-0">
      {mode === "clarity" && <ClarityControls />}
      {mode === "impression" && <ImpressionControls />}
      {mode === "context" && <ContextControls />}
    </aside>
  );
}

/** Clarity mode — swap the lens you look through, then tune it. */
function ClarityControls() {
  const { activeLens, squint, setActiveLens, setSquint } = useOwnersDelusion();
  const current = LENSES.find((l) => l.id === activeLens)!;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#a3a29c]">
          Lens
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LENSES.map((lens) => {
            const active = lens.id === activeLens;
            return (
              <button
                key={lens.id}
                onClick={() => setActiveLens(lens.id)}
                className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-3 transition-colors ${
                  active
                    ? "border-[#18181b] bg-[#18181b] text-white"
                    : "border-[#d8d8d2] bg-white text-[#18181b] hover:border-[#18181b]/50"
                }`}
              >
                <span className="text-sm font-semibold">{lens.label}</span>
                <span
                  className={`font-mono text-[10px] ${active ? "text-white/60" : "text-[#a3a29c]"}`}
                >
                  {lens.measure}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Refinement — only when the squint lens is in. */}
      {activeLens === "squint" && (
        <div>
          <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#a3a29c]">
            <span>Squint strength</span>
            <span className="text-[#18181b]">{squint}px</span>
          </div>
          <Slider
            value={[squint]}
            min={1}
            max={20}
            step={1}
            onValueChange={([v]) => setSquint(v)}
          />
        </div>
      )}

      {/* A simple nod to the source. */}
      {current.source && <AttributionChip source={current.source} />}
    </div>
  );
}

/** First-impression mode — the timed blink test and its glance length. */
function ImpressionControls() {
  const { blinkSeconds, setBlinkSeconds, startBlink } = useOwnersDelusion();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#a3a29c]">
          Glance length
        </div>
        <div className="flex gap-2">
          {BLINK.durations.map((s) => {
            const active = s === blinkSeconds;
            return (
              <button
                key={s}
                onClick={() => setBlinkSeconds(s)}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-[#18181b] bg-[#18181b] text-white"
                    : "border-[#d8d8d2] bg-white text-[#18181b] hover:border-[#18181b]/50"
                }`}
              >
                {s}s
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={startBlink}
        className="w-full rounded-full bg-[#18181b] py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
      >
        Run the {blinkSeconds}-second blink test
      </button>

      {/* A simple nod to the source. */}
      <AttributionChip source={BLINK.source} kind="Test" />
    </div>
  );
}

/** In-context mode — roadmap placeholder until scene images land. */
function ContextControls() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-dashed border-[#d8d8d2] bg-white/60 p-4">
      <div className="flex items-center gap-2 text-[#57534e]">
        <Layers className="h-4 w-4" />
        <span className="font-mono text-[11px] uppercase tracking-widest">
          Coming next
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[#78716c]">
        Drop your ad into a real feed, a search page, or a billboard and cycle
        through environments to see whether it survives the competition — or
        quietly dissolves into noise.
      </p>
    </div>
  );
}
