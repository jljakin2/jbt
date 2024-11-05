"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Quote,
  Minus,
  Highlighter,
  Download,
} from "lucide-react";
import { useAtomicEssay } from "../hooks/use-atomic-essay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { essayTemplates } from "../lib/templates";
import { Separator } from "@/components/ui/separator";
import { toPng } from "html-to-image";
import { PreviewContent } from "./preview-content";
const toolbarGroups = [
  // Group 1: Text formatting
  [
    { icon: <Bold className="h-4 w-4" />, action: "**", tooltip: "Bold" },
    { icon: <Italic className="h-4 w-4" />, action: "*", tooltip: "Italic" },
    {
      icon: <Highlighter className="h-4 w-4" />,
      action: "==",
      tooltip: "Highlight",
    },
  ],
  // Group 2: Headers
  [
    {
      icon: <Heading1 className="h-4 w-4" />,
      action: "# ",
      tooltip: "Heading 1",
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      action: "## ",
      tooltip: "Heading 2",
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      action: "### ",
      tooltip: "Heading 3",
    },
  ],
  // Group 3: Lists
  [
    {
      icon: <List className="h-4 w-4" />,
      action: "- ",
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      action: "1. ",
      tooltip: "Numbered List",
    },
    { icon: <Quote className="h-4 w-4" />, action: "> ", tooltip: "Quote" },
    {
      icon: <Minus className="h-4 w-4" />,
      action: "---\n",
      tooltip: "Divider",
    },
  ],
];

interface UndoState {
  text: string;
  cursorPosition: number;
}

interface MarkdownEditorProps {
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
}

export default function MarkdownEditor({
  showPreview,
  setShowPreview,
}: MarkdownEditorProps) {
  const { markdown, setMarkdown, wordCount } = useAtomicEssay();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [undoStack, setUndoStack] = useState<UndoState[]>([]);
  const [currentValue, setCurrentValue] = useState(markdown);

  const handleTemplateChange = (templateName: string) => {
    const template = essayTemplates.find((t) => t.name === templateName);
    if (
      template &&
      markdown.trim() ===
        "# My Atomic Essay\n\nStart writing your essay here..."
    ) {
      setMarkdown(template.content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "z") {
      e.preventDefault();
      if (undoStack.length > 0) {
        const previousState = undoStack[undoStack.length - 1];
        const newStack = undoStack.slice(0, -1);
        setUndoStack(newStack);
        setMarkdown(previousState.text);
        setCurrentValue(previousState.text);

        // Restore cursor position after state update
        setTimeout(() => {
          const textarea = textareaRef.current;
          if (textarea) {
            textarea.focus();
            textarea.setSelectionRange(
              previousState.cursorPosition,
              previousState.cursorPosition
            );
          }
        }, 0);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const text = textarea.value;
      const cursorPosition = textarea.selectionStart;

      // Save current state to undo stack before making changes
      setUndoStack([
        ...undoStack,
        {
          text,
          cursorPosition: textarea.selectionStart,
        },
      ]);

      // Get the current line by finding the last newline before cursor
      const lastNewLine = text.lastIndexOf("\n", cursorPosition - 1);
      const currentLineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
      const currentLine = text.slice(currentLineStart, cursorPosition);

      // Check for list patterns
      const unorderedListMatch = currentLine.match(/^(\s*)-\s+/);
      const orderedListMatch = currentLine.match(/^(\s*)\d+\.\s+/);

      if (unorderedListMatch || orderedListMatch) {
        e.preventDefault();

        // If the current line is empty except for the list marker, remove the marker
        if (
          currentLine === (unorderedListMatch?.[0] || orderedListMatch?.[0])
        ) {
          const newText =
            text.slice(0, currentLineStart) + text.slice(cursorPosition);
          setMarkdown(newText);
          textarea.setSelectionRange(currentLineStart, currentLineStart);
          return;
        }

        const indent = unorderedListMatch?.[1] || orderedListMatch?.[1] || "";
        const nextMarker = unorderedListMatch
          ? `${indent}- `
          : `${indent}${parseInt(orderedListMatch![0]) + 1}. `;

        const before = text.slice(0, cursorPosition);
        const after = text.slice(cursorPosition);
        const newText = before + "\n" + nextMarker + after;

        setMarkdown(newText);

        const newCursorPos = cursorPosition + 1 + nextMarker.length;
        setTimeout(() => {
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      } else {
        // For non-list lines, add two newlines
        e.preventDefault();
        const before = text.slice(0, cursorPosition);
        const after = text.slice(cursorPosition);
        const newText = before + "\n\n" + after;

        setMarkdown(newText);

        const newCursorPos = cursorPosition + 2;
        setTimeout(() => {
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue !== currentValue) {
      setUndoStack([
        ...undoStack,
        {
          text: currentValue,
          cursorPosition: e.target.selectionStart,
        },
      ]);
      setCurrentValue(newValue);
      setMarkdown(newValue);
    }
  };

  const handleToolbarClick = (action: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // For text formatting (bold, italic, highlight)
    if (action === "**" || action === "*" || action === "==") {
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);

      const newText = before + action + selected + action + after;
      setMarkdown(newText);

      // Position cursor after the formatted text
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = selected
          ? end + action.length * 2
          : start + action.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
      return;
    }

    // For line-based formatting (headers, lists, quotes)
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = text.indexOf("\n", start);
    const actualLineEnd = lineEnd === -1 ? text.length : lineEnd;

    const before = text.substring(0, lineStart);
    const currentLine = text.substring(lineStart, actualLineEnd);
    const after = text.substring(actualLineEnd);

    // Remove any existing heading markers or list markers from the line
    const cleanLine = currentLine.replace(/^(#{1,3}|-|\d+\.)\s+/, "");

    const newText = before + action + cleanLine + after;
    setMarkdown(newText);
    const newCursorPos = lineStart + action.length + cleanLine.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const getSlugifiedTitle = (markdown: string): string => {
    // Find the first H1 heading using regex
    const h1Match = markdown.match(/^#\s+(.+)$/m);
    if (!h1Match) return "untitled";

    // Get the heading text and slugify it
    const title = h1Match[1];
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      // Temporarily make the preview visible
      const previewElement = previewRef.current;
      previewElement.style.display = "block";
      console.log("previewElement", previewElement);

      // Get the actual height after making it visible
      const height = previewElement.offsetHeight;

      const dataUrl = await toPng(previewElement, {
        quality: 1.0,
        pixelRatio: 3,
        width: 600,
        height, // Use the actual content height
        skipAutoScale: true,
        style: {
          transform: "scale(1)",
        },
        backgroundColor: "#ffffff",
      });

      // Hide it again
      previewElement.style.display = "none";

      const fileName = `${getSlugifiedTitle(markdown)}.png`;

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-none">
        <div className="flex items-center justify-between">
          <CardTitle>Atomic Essay Writer</CardTitle>
          <div className="flex items-center gap-2">
            <Select onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-[180px] text-left">
                <SelectValue placeholder="Choose template..." />
              </SelectTrigger>
              <SelectContent>
                {essayTemplates.map((template) => (
                  <SelectItem key={template.name} value={template.name}>
                    <>
                      <div>{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {template.description}
                      </div>
                    </>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showPreview ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    disabled={wordCount > 300}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {toolbarGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex items-center gap-1">
                {group.map((item) => (
                  <Tooltip key={item.tooltip}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleToolbarClick(item.action);
                        }}
                      >
                        {item.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
                {groupIndex < toolbarGroups.length - 1 && (
                  <Separator orientation="vertical" className="h-4" />
                )}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex-grow min-h-0">
        <div className="h-full flex flex-col data-color-mode-light">
          <Textarea
            ref={textareaRef}
            value={markdown}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="flex-grow min-h-0 resize-none font-mono"
          />
          <div className="text-sm text-muted-foreground mt-2">
            {wordCount}/300 words
          </div>
        </div>
      </CardContent>
      <div
        ref={previewRef}
        style={{
          width: "600px",
          padding: "32px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "none", // Start hidden, we'll toggle this in handleDownload
        }}
      >
        <PreviewContent markdown={markdown} />
      </div>
    </Card>
  );
}
