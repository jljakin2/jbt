"use client";

import { create } from "zustand";

interface AtomicEssayStore {
  markdown: string;
  wordCount: number;
  setMarkdown: (text: string) => void;
}

export const useAtomicEssay = create<AtomicEssayStore>((set) => ({
  markdown: "# My Atomic Essay\n\nStart writing your essay here...",
  wordCount: 0,
  setMarkdown: (text) => {
    const words = text.trim().split(/\s+/).length;
    set({ markdown: text, wordCount: words });
  },
}));
