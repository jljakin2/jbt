"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function DownloadPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonUrl, setLessonUrl] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");

  useEffect(() => {
    const rawContent = searchParams.get("content");
    const rawTopic = searchParams.get("topic");
    const rawLessonTitle = searchParams.get("lessonTitle");
    const rawLessonUrl = searchParams.get("lessonUrl");
    const rawCategory = searchParams.get("category");
    const rawReadTime = searchParams.get("readTime");

    console.log("Raw content:", rawContent);
    console.log("Raw topic:", rawTopic);
    console.log("Raw lesson title:", rawLessonTitle);
    console.log("Raw lesson URL:", rawLessonUrl);
    console.log("Raw category:", rawCategory);
    console.log("Raw read time:", rawReadTime);

    if (rawContent) {
      const decodedContent = decodeURIComponent(rawContent);
      setContent(decodedContent);
    }
    if (rawTopic) setTopic(decodeURIComponent(rawTopic));
    if (rawLessonTitle) setLessonTitle(decodeURIComponent(rawLessonTitle));
    if (rawLessonUrl) setLessonUrl(decodeURIComponent(rawLessonUrl));
    if (rawCategory) setCategory(decodeURIComponent(rawCategory));
    if (rawReadTime) setReadTime(decodeURIComponent(rawReadTime));
  }, [searchParams]);

  const formatContent = (rawContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawContent, "text/html");

    const title = doc.querySelector("h1")?.textContent || "";
    const lessonParagraphs = Array.from(doc.querySelectorAll("p")).map(
      (p) => p.textContent
    );
    const lesson = lessonParagraphs.join("\n\n");
    const exerciseItems = Array.from(doc.querySelectorAll("li")).map(
      (li) => li.textContent
    );
    const exercise = exerciseItems.join("\n");

    return { title, lesson, exercise };
  };

  const generatePDF = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "JPEG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("daily_dollar_exercise.pdf");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-primary">
        Your Daily Dollar Exercise
      </h1>
      <div
        ref={contentRef}
        className="bg-background p-8 rounded-lg shadow-md"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          color: "var(--foreground)",
          lineHeight: "1.6",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 bg-muted flex items-center justify-center rounded">
            <span className="text-muted-foreground">Logo</span>
          </div>
          <div>
            <Badge variant="outline" className="mb-2">
              {topic}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Inspired by:{" "}
              <a
                href={lessonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {lessonTitle}
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              Category: {category} | Read time: {readTime}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Exercise Content */}
        <div dangerouslySetInnerHTML={{ __html: content }} />

        <Separator className="my-4" />

        {/* Work Area */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Your Work</h3>
          <Textarea
            placeholder="Complete your exercise here..."
            className="w-full h-32"
          />
        </div>
      </div>
      <button
        onClick={generatePDF}
        className="bg-primary text-primary-foreground px-6 py-2 rounded mt-6 hover:bg-primary/90 transition-colors"
      >
        Download PDF
      </button>
    </div>
  );
}
