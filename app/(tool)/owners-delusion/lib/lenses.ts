// The Owner's Delusion — modes, lenses, and attribution.
//
// The tool is organized by JOB-TO-BE-DONE. Each *mode* is a different delusion
// an owner holds about their own work; the tools inside a mode are how you break
// it. The right-hand panel only ever shows the active mode's controls, so
// switching modes and tuning a mode stay cleanly separated.
//
// Crediting the source is a first-class part of this tool, not a footnote —
// every lens/test links out to the person whose idea it is.
//
// TODO(jeff): confirm/replace the exact source URLs below where noted. These
// point at the authors' stable home pages; swap in the specific article/talk.
export const SOURCES = {
  erikKennedy: { name: "Erik Kennedy", url: "https://www.learnui.design/" },
  harryDry: { name: "Harry Dry", url: "https://marketingexamples.com/" },
  nngroup: { name: "Nielsen Norman Group", url: "https://www.nngroup.com/" },
  butterfield: {
    name: "Stewart Butterfield",
    url: "https://www.youtube.com/watch?v=kLe-zy5r0Mk",
  },
} as const;

// ---------------------------------------------------------------------------
// Modes — the top-level axis. Pick the delusion you want to break.
// ---------------------------------------------------------------------------
export type ModeId = "clarity" | "impression" | "context";

export interface Mode {
  id: ModeId;
  label: string;
  available: boolean;
}

export const MODES: Mode[] = [
  { id: "clarity", label: "Clarity", available: true },
  { id: "impression", label: "First impression", available: true },
  { id: "context", label: "In context", available: false },
];

// Whether the user has actually run an examination that the helper notes speak
// to — applied a lens in Clarity, or taken the glance in First impression. Until
// this is true, the whole helper feature stays invisible.
export function hasRelevantExam(
  mode: ModeId,
  activeLens: LensId,
  blinkSeen: boolean,
): boolean {
  if (mode === "clarity") return activeLens !== "none";
  if (mode === "impression") return blinkSeen;
  return false;
}

// ---------------------------------------------------------------------------
// Clarity-mode lenses — static filters over the artifact's visual hierarchy.
// ---------------------------------------------------------------------------
export type LensId = "none" | "squint" | "grayscale";

export interface Lens {
  id: LensId;
  /** Short label shown on the lens dial. */
  label: string;
  /** Faux visual-acuity reading — pure flavor, reinforces the eye-exam vibe. */
  measure: string;
  /** The question this lens forces you to answer. */
  blurb: string;
  /** Helper sticky-note prompts, specific to what THIS lens reveals. */
  prompts: string[];
  source: { name: string; url: string } | null;
}

export const LENSES: Lens[] = [
  {
    id: "none",
    label: "Raw",
    measure: "20/20",
    blurb: "Exactly what you made — your context still intact. Now start stripping it away.",
    prompts: [],
    source: null,
  },
  {
    id: "squint",
    label: "Squint",
    measure: "20/200",
    blurb:
      "Blur the detail away. If you can't instantly tell what the ONE most important thing is, neither can someone seeing it for the first time.",
    prompts: [
      "What's the first thing your eye lands on?",
      "Can you tell what this is — or just blurry blobs?",
      "Is the most important thing actually the loudest?",
    ],
    source: SOURCES.erikKennedy,
  },
  {
    id: "grayscale",
    label: "Grayscale",
    measure: "Mono",
    blurb:
      "Kill the color. If your hierarchy collapses in gray, it was leaning on color to do a job that structure and contrast should be doing.",
    prompts: [
      "Does the hierarchy still hold without color?",
      "Is contrast doing the work — or was color faking it?",
      "Which element still pops? Is it the right one?",
    ],
    source: SOURCES.erikKennedy,
  },
];

// ---------------------------------------------------------------------------
// First-impression mode — a timed action rather than a static filter.
// ---------------------------------------------------------------------------
export const BLINK = {
  label: "Blink test",
  /** Selectable glance durations, in seconds. */
  durations: [2, 3, 5],
  defaultSeconds: 3,
  blurb:
    "You've stared at this for hours. Your customer gets a glance. See it for a few seconds — then it's gone.",
  /** Helper sticky-note prompts, specific to the first-impression glance. */
  prompts: [
    "What's the ONE thing you remember?",
    "What was it asking you to do?",
    "Would you have stopped scrolling?",
  ],
  source: SOURCES.nngroup,
};

// ---------------------------------------------------------------------------
// In-context mode (ships next): drop the artifact into believable real-world
// scenes (feed, search results, billboard, print) to check whether it survives
// the competition or dissolves into noise. Data-driven so new environments are
// a one-line add once Jeff supplies the scene images.
// ---------------------------------------------------------------------------
export interface Environment {
  id: string;
  label: string;
  /** Path under /public for the backdrop scene the artifact is composited into. */
  scene: string;
  source: { name: string; url: string };
}

export const ENVIRONMENTS: Environment[] = [
  // e.g. { id: "fb-feed", label: "Facebook feed", scene: "/images/owners-delusion/environments/fb-feed.jpg", source: SOURCES.harryDry },
];
