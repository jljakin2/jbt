"use client";

import { create } from "zustand";
import type { LensId, ModeId } from "../lib/lenses";
import { BLINK } from "../lib/lenses";

interface OwnersDelusionState {
  /** Data URL of the uploaded artifact, or null when empty. */
  image: string | null;
  imageName: string | null;

  /** Top-level axis: which delusion (job) are we breaking right now. */
  mode: ModeId;

  /** Clarity mode: which lens the phoropter is set to + squint blur radius. */
  activeLens: LensId;
  squint: number;

  /** First-impression mode: glance length, whether the overlay is running, and
   *  whether the glance has been taken at least once for this artifact (which is
   *  what makes the helper affordance relevant in this mode). */
  blinkSeconds: number;
  blinkActive: boolean;
  blinkSeen: boolean;

  /** Whether the helper sticky notes are shown (a manual toggle, default off). */
  showNotes: boolean;

  setImage: (src: string, name: string) => void;
  clearImage: () => void;
  setMode: (mode: ModeId) => void;
  setActiveLens: (lens: LensId) => void;
  setSquint: (px: number) => void;
  setBlinkSeconds: (s: number) => void;
  startBlink: () => void;
  stopBlink: () => void;
  markBlinkSeen: () => void;
  toggleNotes: () => void;
}

export const useOwnersDelusion = create<OwnersDelusionState>((set) => ({
  image: null,
  imageName: null,
  mode: "clarity",
  activeLens: "none",
  squint: 6,
  blinkSeconds: BLINK.defaultSeconds,
  blinkActive: false,
  blinkSeen: false,
  showNotes: false,

  setImage: (src, name) =>
    set({
      image: src,
      imageName: name,
      mode: "clarity",
      activeLens: "none",
      blinkActive: false,
      blinkSeen: false,
      showNotes: false,
    }),
  clearImage: () =>
    set({
      image: null,
      imageName: null,
      mode: "clarity",
      activeLens: "none",
      blinkActive: false,
      blinkSeen: false,
      showNotes: false,
    }),
  setMode: (mode) => set({ mode }),
  setActiveLens: (lens) => set({ activeLens: lens }),
  setSquint: (px) => set({ squint: px }),
  setBlinkSeconds: (s) => set({ blinkSeconds: s }),
  startBlink: () => set({ blinkActive: true }),
  stopBlink: () => set({ blinkActive: false }),
  markBlinkSeen: () => set({ blinkSeen: true }),
  toggleNotes: () => set((s) => ({ showNotes: !s.showNotes })),
}));
