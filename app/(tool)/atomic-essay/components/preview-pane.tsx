"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toPng } from "html-to-image";
import { useAtomicEssay } from "../hooks/use-atomic-essay";

export default function PreviewPane() {
  const { markdown, wordCount } = useAtomicEssay();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await toPng(previewRef.current, { quality: 0.95 });
        const link = document.createElement("a");
        link.download = "my-atomic-essay.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to generate image:", err);
      }
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow min-h-0 overflow-auto">
        <div
          className="border rounded-md bg-white p-4 prose max-w-none
            [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-0 [&>h1]:mb-3
            [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-4 [&>h2]:mb-2
            [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mt-3 [&>h3]:mb-2
            [&>p]:my-2 [&>p]:leading-relaxed
            [&>ul]:my-2 [&>ul>li]:my-1 [&>ul]:ml-4
            [&>ol]:my-2 [&>ol>li]:my-1 [&>ol]:ml-4
            [&>blockquote]:pl-4 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-200 [&>blockquote]:italic [&>blockquote]:my-2
            mark:bg-yellow-200 mark:px-1 mark:rounded-sm"
          ref={previewRef}
          data-color-mode="light"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => {
                const text = String(children);
                const parts = text.split(/(==.*?==)/g);

                return (
                  <p>
                    {parts.map((part, i) => {
                      if (part.startsWith("==") && part.endsWith("==")) {
                        return <mark key={i}>{part.slice(2, -2)}</mark>;
                      }
                      return part;
                    })}
                  </p>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="flex-none">
        <Button onClick={handleDownload} disabled={wordCount > 300}>
          Download as Image
        </Button>
        {wordCount > 300 && (
          <p className="text-sm text-red-500 ml-4">
            Essay exceeds 300 word limit
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
