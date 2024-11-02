"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toPng } from "html-to-image";
import { Bold, Italic, List, Heading1, Heading2, Heading3 } from "lucide-react";

// Import the markdown editor without SSR
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
    ),
  }
);

// Import Markdown preview component separately
const MDPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] w-full animate-pulse rounded-md bg-muted" />
    ),
  }
);

// export const metadata = {
//   metadataBase: new URL("https://www.jeffbuildstech.com/"),
//   title: "Atomic Essay",
//   alternates: {
//     canonical: "/atomic-essay",
//   },
//   description:
//     "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
//   openGraph: {
//     title: "Atomic Essay",
//     description:
//       "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
//     type: "website",
//     locale: "en_US",
//     url: "https://www.jeffbuildstech.com/",
//     siteName: "Jeff Builds Tech",
//     images: [`https://djg4kctbfokfu.cloudfront.net/og/OG-atomic-essay.jpg`],
//   },
//   twitter: {
//     title: "Atomic Essay",
//     description:
//       "A simple worksheet to help you get better at marketing in just 15 minutes per day.",
//     card: "summary_large_image",
//     images: [`https://djg4kctbfokfu.cloudfront.net/og/OG-atomic-essay.jpg`],
//   },
// };

const toolbar = [
  {
    icon: <Bold className="h-4 w-4" />,
    action: "**",
    label: "Bold",
  },
  {
    icon: <Italic className="h-4 w-4" />,
    action: "*",
    label: "Italic",
  },
  {
    icon: <List className="h-4 w-4" />,
    action: "- ",
    label: "List",
  },
  {
    icon: <Heading1 className="h-4 w-4" />,
    action: "# ",
    label: "Heading 1",
  },
  {
    icon: <Heading2 className="h-4 w-4" />,
    action: "## ",
    label: "Heading 2",
  },
  {
    icon: <Heading3 className="h-4 w-4" />,
    action: "### ",
    label: "Heading 3",
  },
];

export default function AtomicEssayWriter() {
  const [markdown, setMarkdown] = useState(
    "# My Atomic Essay\n\nStart writing your essay here..."
  );
  const [wordCount, setWordCount] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = markdown.trim().split(/\s+/).length;
    setWordCount(words);
  }, [markdown]);

  const handleToolbarClick = (action: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    if (action === "- ") {
      // For lists, add to start of line
      setMarkdown(before + "\n" + action + selected + after);
    } else {
      // For other formatting, wrap selection
      setMarkdown(before + action + selected + action + after);
    }
  };

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
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Atomic Essay Writer</CardTitle>
          <div className="flex items-center gap-2">
            {toolbar.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                onClick={() => handleToolbarClick(item.action)}
                title={item.label}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div data-color-mode="light">
            <Textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[200px] font-mono"
              placeholder="Start writing your atomic essay..."
            />
            <div className="text-sm text-muted-foreground mt-2">
              {wordCount}/300 words
            </div>
          </div>
          <div
            className="border rounded-md bg-white p-4 prose max-w-none"
            ref={previewRef}
            data-color-mode="light"
          >
            {MDPreview && <MDPreview source={markdown} />}
          </div>
        </CardContent>
        <CardFooter>
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
    </div>
  );
}
