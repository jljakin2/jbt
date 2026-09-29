"use client";

import { create } from "zustand";
import type { ColorblindType, ToolId } from "../lib/lenses";
import { BLINK } from "../lib/lenses";

interface OwnersDelusionState {
  /** Data URL of the uploaded artifact, or null when empty. */
  image: string | null;
  imageName: string | null;

  /** Active tool + its options. */
  activeTool: ToolId;
  squint: number;
  colorblindType: ColorblindType;

  /** Blink test: glance length, overlay running, glance taken. */
  blinkSeconds: number;
  blinkActive: boolean;
  blinkSeen: boolean;

  /** Sticky-note prompts, manual toggle, default off. */
  showNotes: boolean;

  setImage: (src: string, name: string) => void;
  clearImage: () => void;
  setActiveTool: (tool: ToolId) => void;
  setSquint: (px: number) => void;
  setColorblindType: (t: ColorblindType) => void;
  setBlinkSeconds: (s: number) => void;
  startBlink: () => void;
  stopBlink: () => void;
  markBlinkSeen: () => void;
  toggleNotes: () => void;
}

// Everything that resets when the artifact changes.
const freshExam = {
  activeTool: "none" as ToolId,
  blinkActive: false,
  blinkSeen: false,
  showNotes: false,
};

export const useOwnersDelusion = create<OwnersDelusionState>((set) => ({
  image: null,
  imageName: null,
  squint: 6,
  colorblindType: "deuteranopia",
  blinkSeconds: BLINK.defaultSeconds,
  ...freshExam,

  setImage: (src, name) => set({ image: src, imageName: name, ...freshExam }),
  clearImage: () => set({ image: null, imageName: null, ...freshExam }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setSquint: (px) => set({ squint: px }),
  setColorblindType: (t) => set({ colorblindType: t }),
  setBlinkSeconds: (s) => set({ blinkSeconds: s }),
  startBlink: () => set({ blinkActive: true }),
  stopBlink: () => set({ blinkActive: false }),
  markBlinkSeen: () => set({ blinkSeen: true }),
  toggleNotes: () => set((s) => ({ showNotes: !s.showNotes })),
}));
