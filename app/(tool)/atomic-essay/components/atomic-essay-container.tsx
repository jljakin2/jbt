"use client";

import { useState } from "react";
import MarkdownEditor from "./markdown-editor";
import PreviewPane from "./preview-pane";

export default function AtomicEssayContainer() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
      <div className={`${!showPreview ? "col-span-2" : "col-span-1"}`}>
        <MarkdownEditor
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        />
      </div>
      <div className={`${!showPreview ? "hidden" : "block"}`}>
        <PreviewPane />
      </div>
    </div>
  );
}
