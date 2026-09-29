// The Owner's Delusion — the tools you apply to your screenshot.

export const BUTTERFIELD_URL = "https://www.youtube.com/watch?v=kLe-zy5r0Mk";

// One tool is active at a time, like a filter row in a photo app. "none" is Normal.
export type ToolId = "none" | "squint" | "grayscale" | "blink";

export interface Tool {
  id: ToolId;
  label: string;
  /** Sticky-note prompts for what this tool reveals. */
  prompts: string[];
}

export const TOOLS: Tool[] = [
  { id: "none", label: "Normal", prompts: [] },
  {
    id: "squint",
    label: "Squint",
    prompts: [
      "What's the first thing your eye lands on?",
      "Can you tell what this is, or is it just blurry blobs?",
      "Is the most important thing actually the loudest?",
    ],
  },
  {
    id: "grayscale",
    label: "Grayscale",
    prompts: [
      "Does the hierarchy still hold without color?",
      "Is contrast doing the work, or was color faking it?",
      "Which element still pops? Is it the right one?",
    ],
  },
  {
    id: "blink",
    label: "Blink",
    prompts: [
      "What's the ONE thing you remember?",
      "What was it asking you to do?",
      "Would you have stopped scrolling?",
    ],
  },
];

export const BLINK = {
  /** Selectable glance durations, in seconds. */
  durations: [2, 3, 5],
  defaultSeconds: 3,
};

/** Sticky notes for the active tool. Blink's only make sense once it's been run. */
export function activePrompts(activeTool: ToolId, blinkSeen: boolean): string[] {
  if (activeTool === "blink" && !blinkSeen) return [];
  return TOOLS.find((t) => t.id === activeTool)?.prompts ?? [];
}
