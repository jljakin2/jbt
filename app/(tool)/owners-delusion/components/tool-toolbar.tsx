"use client";

import { Clock, Contrast, Eye, Glasses, Play, Timer } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { TOOLS, BLINK, type ToolId } from "../lib/lenses";

const ICONS: Record<ToolId, React.ReactNode> = {
  none: <Eye className="h-4 w-4" />,
  squint: <Glasses className="h-4 w-4" />,
  grayscale: <Contrast className="h-4 w-4" />,
  blink: <Timer className="h-4 w-4" />,
};

/**
 * Floating toolbar over the image, laid out like a photo app's filter row:
 * pick a tool, and its options (if any) appear in a strip underneath.
 */
export default function ToolToolbar() {
  const { activeTool, setActiveTool } = useOwnersDelusion();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-6 z-10 flex justify-center px-4">
      <div className="pointer-events-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="flex items-center gap-1 p-1.5">
          {TOOLS.map((tool, i) => {
            const active = tool.id === activeTool;
            return (
              <div key={tool.id} className="flex items-center gap-1">
                {i > 0 && <span className="h-4 w-px bg-gray-200" />}
                <button
                  type="button"
                  onClick={() => setActiveTool(tool.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {ICONS[tool.id]}
                  {tool.label}
                </button>
              </div>
            );
          })}
        </div>

        {activeTool === "squint" && <SquintOptions />}
        {activeTool === "blink" && <BlinkOptions />}
      </div>
    </div>
  );
}

function OptionsStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-t border-gray-200 bg-gray-50 px-4 py-2.5">
      {children}
    </div>
  );
}

function OptionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-courier text-xs font-bold text-gray-500">
      {children}
    </span>
  );
}

function SquintOptions() {
  const { squint, setSquint } = useOwnersDelusion();
  return (
    <OptionsStrip>
      <OptionLabel>Strength</OptionLabel>
      <Slider
        value={[squint]}
        min={1}
        max={20}
        step={1}
        onValueChange={([v]) => setSquint(v)}
        aria-label="Squint strength"
        className="flex-1"
      />
      <span className="w-9 text-right font-courier text-xs text-gray-500">
        {squint}px
      </span>
    </OptionsStrip>
  );
}

function BlinkOptions() {
  const { blinkSeconds, setBlinkSeconds, startBlink } = useOwnersDelusion();
  return (
    <OptionsStrip>
      <Clock className="h-4 w-4 text-gray-500" aria-label="Glance length" />
      <div className="flex overflow-hidden rounded-md border border-gray-300">
        {BLINK.durations.map((s) => {
          const active = s === blinkSeconds;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setBlinkSeconds(s)}
              aria-pressed={active}
              className={`px-3 py-1 text-sm transition-colors ${
                active
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {s}s
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={startBlink}
        className="ml-auto flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        Run
      </button>
    </OptionsStrip>
  );
}
