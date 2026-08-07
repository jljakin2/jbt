"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClipboardPaste, ImageUp, Upload } from "lucide-react";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import EyeChart from "./eye-chart";

function readImageFile(file: File, onLoad: (src: string, name: string) => void) {
  if (!file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = () => onLoad(reader.result as string, file.name);
  reader.readAsDataURL(file);
}

export default function Dropzone() {
  const setImage = useOwnersDelusion((s) => s.setImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | null | undefined) => {
      if (file) readImageFile(file, setImage);
    },
    [setImage],
  );

  // Clipboard-first: most screenshots live on the clipboard, never on disk.
  // Listen globally so Cmd/Ctrl+V works the moment you land on an empty canvas.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) =>
        i.type.startsWith("image/"),
      );
      if (item) handleFile(item.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFile]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-6 py-12">
      <EyeChart />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`group flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-8 py-10 text-center transition-colors ${
          dragging
            ? "border-[#2f9e6b] bg-[#2f9e6b]/5"
            : "border-[#cfcfc8] bg-white/50 hover:border-[#18181b]/40 hover:bg-white"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18181b] text-white transition-transform group-hover:scale-105">
          <ImageUp className="h-6 w-6" />
        </div>
        <div className="text-lg font-semibold text-[#18181b]">
          Drop in what you made
        </div>
        <p className="max-w-xs text-sm text-[#6b7280]">
          A landing page, an ad, a screen — anything you&apos;ve gone blind to.
          We&apos;ll help you see it like a stranger will.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-[#a3a29c]">
          <span className="inline-flex items-center gap-1">
            <ClipboardPaste className="h-3.5 w-3.5" /> Paste
          </span>
          <span className="inline-flex items-center gap-1">
            <Upload className="h-3.5 w-3.5" /> Drop
          </span>
          <span className="inline-flex items-center gap-1">
            <ImageUp className="h-3.5 w-3.5" /> Click to browse
          </span>
        </div>
      </button>

      <p className="max-w-sm text-center text-xs text-[#a3a29c]">
        Everything stays in your browser. Nothing is uploaded — private by
        default.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
