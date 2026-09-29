"use client";

import { RotateCcw } from "lucide-react";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import Dropzone from "./dropzone";
import ToolToolbar from "./tool-toolbar";
import LensViewport from "./lens-viewport";
import PromptNotes from "./prompt-notes";
import NotesToggle from "./notes-toggle";
import BlinkTest from "./blink-test";

export default function OwnersDelusionContainer() {
  const image = useOwnersDelusion((s) => s.image);
  const clearImage = useOwnersDelusion((s) => s.clearImage);

  if (!image) {
    return (
      <div className="flex h-[calc(100svh-64px)] w-full items-center justify-center">
        <Dropzone />
      </div>
    );
  }

  return (
    <div className="relative flex h-[calc(100svh-64px)] w-full flex-col">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-10 pb-10 pt-28">
        <div className="relative">
          <LensViewport />
          <PromptNotes />
        </div>
      </div>

      <ToolToolbar />

      <button
        type="button"
        onClick={clearImage}
        title="Start over"
        aria-label="Start over with a new image"
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-colors hover:text-gray-900"
      >
        <RotateCcw className="h-4 w-4" />
      </button>

      <NotesToggle />
      <BlinkTest />
    </div>
  );
}
