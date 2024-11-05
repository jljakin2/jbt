"use client";

import { useState } from "react";
import MarkdownEditor from "./markdown-editor";
import PreviewPane from "./preview-pane";

export default function AtomicEssayContainer() {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="h-[100svh] md:h-full flex flex-col md:grid md:grid-cols-2 gap-4 overflow-x-hidden">
      <div
        className={`h-[100svh] md:h-auto ${
          !showPreview ? "md:col-span-2" : "md:col-span-1"
        }`}
      >
        <MarkdownEditor
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        />
      </div>
      {showPreview && (
        <div className="h-auto md:h-full">
          <PreviewPane />
        </div>
      )}
    </div>
  );
}
