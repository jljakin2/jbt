"use client";

import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import Dropzone from "./dropzone";
import ModeToolbar from "./mode-toolbar";
import LensViewport from "./lens-viewport";
import PromptNotes from "./prompt-notes";
import NotesToggle from "./notes-toggle";
import ModePanel from "./mode-panel";
import BlinkTest from "./blink-test";

export default function OwnersDelusionContainer() {
  const image = useOwnersDelusion((s) => s.image);

  if (!image) {
    return (
      <div className="flex h-[calc(100svh-64px)] w-full items-center justify-center bg-[#f4f4ef]">
        <Dropzone />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100svh-64px)] w-full flex-col md:flex-row">
      {/* Exam surface: the artifact centered, with workshop notes pinned to its
          edges, and a floating command bar over the top. */}
      <div className="relative flex min-h-0 flex-1 flex-col bg-[#f4f4ef]">
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-10 pb-10 pt-28">
          {/* Relative wrapper hugs the image so notes anchor to its edges. */}
          <div className="relative">
            <LensViewport />
            <PromptNotes />
          </div>
        </div>
        <NotesToggle />
        <ModeToolbar />
      </div>

      {/* Right side: pure detail for the active mode. */}
      <ModePanel />

      <BlinkTest />
    </div>
  );
}
