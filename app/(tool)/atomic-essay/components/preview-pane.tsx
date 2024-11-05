"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toPng } from "html-to-image";
import { useAtomicEssay } from "../hooks/use-atomic-essay";
import { PreviewContent } from "./preview-content";

export default function PreviewPane() {
  const { markdown, wordCount } = useAtomicEssay();

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow min-h-0 overflow-auto">
        <PreviewContent markdown={markdown} />
      </CardContent>
      {wordCount > 300 && (
        <CardFooter className="flex-none">
          <p className="text-sm text-red-500">Essay exceeds 300 word limit</p>
        </CardFooter>
      )}
    </Card>
  );
}
