"use client";

import {
  ChevronDown,
  Clock,
  Contrast,
  Eye,
  Glasses,
  Palette,
  Play,
  Timer,
} from "lucide-react";
import { useRef } from "react";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { TOOLS, BLINK, COLORBLIND, type ToolId } from "../lib/lenses";

const ICONS: Record<ToolId, React.ReactNode> = {
  none: <Eye className="h-4 w-4" />,
  squint: <Glasses className="h-4 w-4" />,
  grayscale: <Contrast className="h-4 w-4" />,
  colorblind: <Palette className="h-4 w-4" />,
  blink: <Timer className="h-4 w-4" />,
};

// Outer card is rounded-xl (12px) with p-1.5 (6px), so inner controls are
// rounded-md (6px) to keep the corners concentric.
const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_1px_2px_rgb(0_0_0/0.06),0_4px_8px_rgb(0_0_0/0.04),0_12px_24px_-8px_rgb(0_0_0/0.12)]";

/**
 * Floating toolbar over the image, laid out like a photo app's filter row:
 * pick a tool, and its options (if any) appear in a strip underneath.
 * Below `sm` the row collapses into a single dropdown so it fits the screen.
 */
export default function ToolToolbar() {
  const { activeTool, setActiveTool } = useOwnersDelusion();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center px-4 sm:top-6">
      <div
        className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl bg-white sm:w-auto sm:max-w-none ${CARD_SHADOW}`}
      >
        {/* Desktop: full row of tools */}
        <div className="hidden items-center gap-1 p-1.5 sm:flex">
          {TOOLS.map((tool, i) => {
            const active = tool.id === activeTool;
            return (
              <div key={tool.id} className="flex items-center gap-1">
                {i > 0 && <span className="h-4 w-px bg-gray-200" />}
                <button
                  type="button"
                  onClick={() => setActiveTool(tool.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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

        {/* Mobile: one trigger showing the active tool, menu lists the rest */}
        <div className="p-1.5 sm:hidden">
          <ToolDropdown activeTool={activeTool} onChange={setActiveTool} />
        </div>

        {activeTool === "squint" && <SquintOptions />}
        {activeTool === "colorblind" && <ColorblindOptions />}
        {activeTool === "blink" && <BlinkOptions />}
      </div>
    </div>
  );
}

function ToolDropdown({
  activeTool,
  onChange,
}: {
  activeTool: ToolId;
  onChange: (tool: ToolId) => void;
}) {
  const active = TOOLS.find((t) => t.id === activeTool) ?? TOOLS[0];
  // Radix hands focus back to the trigger on close, which paints a focus ring
  // after every tap. Only let it do that for keyboard-driven picks.
  const pickedByPointer = useRef(false);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Lens: ${active.label}. Change lens`}
          className="group flex h-11 w-full items-center justify-between gap-2 rounded-md px-3 text-sm font-medium text-gray-900 outline-none transition-[background-color,box-shadow] hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white data-[state=open]:bg-gray-100"
        >
          {/* Re-keyed on change so the icon + label fade/scale in instead of hard-swapping. */}
          <span
            key={activeTool}
            className="flex items-center gap-2 animate-in fade-in zoom-in-90 duration-200 motion-reduce:animate-none"
          >
            {ICONS[activeTool]}
            {active.label}
          </span>
          <ChevronDown
            aria-hidden
            className="h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className={`w-[var(--radix-dropdown-menu-trigger-width)] rounded-xl border-0 bg-white p-1.5 motion-reduce:animate-none ${CARD_SHADOW}`}
        onCloseAutoFocus={(e) => {
          if (pickedByPointer.current) e.preventDefault();
          pickedByPointer.current = false;
        }}
      >
        <DropdownMenuRadioGroup
          value={activeTool}
          onValueChange={(v) => onChange(v as ToolId)}
        >
          {TOOLS.map((tool) => (
            <DropdownMenuRadioItem
              key={tool.id}
              value={tool.id}
              onSelect={(e) => {
                // Radix dispatches a CustomEvent carrying the originating event.
                const original = (e as CustomEvent<{ originalEvent: Event }>)
                  .detail?.originalEvent;
                pickedByPointer.current = !(original instanceof KeyboardEvent);
              }}
              className="h-11 rounded-md pl-9 text-sm font-medium text-gray-700 focus:bg-gray-100 focus:text-gray-900 data-[state=checked]:text-gray-900"
            >
              <span className="flex items-center gap-2.5">
                {ICONS[tool.id]}
                {tool.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function OptionsStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-gray-200 bg-gray-50 px-4 py-2.5">
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
        className="min-w-0 flex-1"
      />
      <span className="w-9 text-right font-courier text-xs tabular-nums text-gray-500">
        {squint}px
      </span>
    </OptionsStrip>
  );
}

function ColorblindOptions() {
  const { colorblindType, setColorblindType } = useOwnersDelusion();
  return (
    <OptionsStrip>
      <div className="flex overflow-hidden rounded-md border border-gray-300">
        {COLORBLIND.map((cb) => {
          const active = cb.id === colorblindType;
          return (
            <button
              key={cb.id}
              type="button"
              onClick={() => setColorblindType(cb.id)}
              aria-pressed={active}
              title={cb.hint}
              className={`px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cb.label}
            </button>
          );
        })}
      </div>
      {/* Drops to its own line on narrow screens instead of overflowing. */}
      <span className="basis-full font-courier text-xs text-gray-500 sm:ml-auto sm:basis-auto">
        {COLORBLIND.find((cb) => cb.id === colorblindType)?.hint}
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
              className={`px-3 py-1.5 text-sm tabular-nums transition-colors ${
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
