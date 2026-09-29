// The Owner's Delusion — the tools you apply to your screenshot.

export const BUTTERFIELD_URL = "https://www.youtube.com/watch?v=kLe-zy5r0Mk";

// One tool is active at a time, like a filter row in a photo app. "none" is Normal.
export type ToolId = "none" | "squint" | "grayscale" | "colorblind" | "blink";

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
    id: "colorblind",
    label: "Colorblind",
    prompts: [
      "Can you still find the button?",
      "Did two different states just become the same color?",
      "Is anything here explained by color alone?",
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

// Color-vision deficiency simulation. Standard approximation matrices used by
// most colorblind checkers (sRGB, 4x5 feColorMatrix). Good enough to show what
// disappears; not a clinical model.
export type ColorblindType = "deuteranopia" | "protanopia" | "tritanopia";

export const COLORBLIND: {
  id: ColorblindType;
  label: string;
  hint: string;
  matrix: string;
}[] = [
  {
    id: "deuteranopia",
    label: "Deuteranopia",
    hint: "Green-blind. The most common type.",
    matrix: "0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0",
  },
  {
    id: "protanopia",
    label: "Protanopia",
    hint: "Red-blind.",
    matrix:
      "0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0",
  },
  {
    id: "tritanopia",
    label: "Tritanopia",
    hint: "Blue-blind. Rare.",
    matrix: "0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0",
  },
];

export const BLINK = {
  /** Selectable glance durations, in seconds. */
  durations: [2, 3, 5],
  defaultSeconds: 3,
};

/** Sticky notes for the active tool. Blink's only make sense once it's been run. */
export function activePrompts(
  activeTool: ToolId,
  blinkSeen: boolean,
): string[] {
  if (activeTool === "blink" && !blinkSeen) return [];
  return TOOLS.find((t) => t.id === activeTool)?.prompts ?? [];
}
