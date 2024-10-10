"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import PulsatingButton from "@/components/ui/pulsating-button";
import ReactMarkdown from "react-markdown";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Link as PDFLink,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 32,
  },
  leftSection: {
    width: "55%",
    paddingRight: 16,
  },
  rightSection: {
    width: "45%",
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#2563EB",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10,
    color: "#64748B",
    marginBottom: 8,
  },
  link: {
    color: "#2563EB",
    textDecoration: "underline",
  },
  heading1: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 6,
    marginBottom: 4,
  },
  heading2: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 6,
    marginBottom: 4,
  },
  heading3: {
    fontSize: 11,
    fontWeight: 700,
    marginTop: 4,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 8,
    color: "#374151",
  },
  bold: {
    fontWeight: "ultrabold",
    color: "#374151",
  },
  italic: {
    fontStyle: "italic",
  },
  listItem: {
    fontSize: 10,
    marginLeft: 8,
    marginBottom: 6,
  },
  workspaceTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#2563EB",
    marginBottom: 6,
  },
  workspaceArea: {
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    borderRadius: 6,
    padding: 16,
    flex: 1,
  },
  workspaceText: {
    fontSize: 10,
    color: "#94A3B8",
  },
});

// PDF Document component
const decodeAndFormatContent = (encodedContent: string) => {
  const decodedContent = decodeURIComponent(encodedContent);
  return decodedContent.replace(/&&/g, "**").replace(/#/g, "");
};

const renderContent = (content: string) => {
  const lines = content.split("\n");
  return lines.map((line: string, index: number) => {
    if (line.startsWith("# ")) {
      return (
        <Text key={index} style={styles.heading1}>
          {line.slice(2)}
        </Text>
      );
    } else if (line.startsWith("## ")) {
      return (
        <Text key={index} style={styles.heading2}>
          {line.slice(3)}
        </Text>
      );
    } else if (line.startsWith("### ")) {
      return (
        <Text key={index} style={styles.heading3}>
          {line.slice(4)}
        </Text>
      );
    } else if (line.startsWith("- ")) {
      return (
        <Text key={index} style={styles.listItem}>
          • {line.slice(2)}
        </Text>
      );
    } else {
      return (
        <Text key={index} style={styles.paragraph}>
          {line
            .split(/(\*\*.*?\*\*|\*.*?\*)/)
            .map((part: string, i: number) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <Text key={i} style={styles.bold}>
                    {part.slice(2, -2)}
                  </Text>
                );
              } else if (part.startsWith("*") && part.endsWith("*")) {
                return (
                  <Text key={i} style={styles.italic}>
                    {part.slice(1, -1)}
                  </Text>
                );
              }
              return part;
            })}
        </Text>
      );
    }
  });
};

const MyDocument = ({
  content,
  lessonTitle,
  lessonUrl,
}: {
  content: string;
  lessonTitle: string;
  lessonUrl: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.leftSection}>
        <Text style={styles.title}>Your Daily Dollar Exercise</Text>
        <Text style={styles.subtitle}>
          Please read this article first: {lessonTitle}
        </Text>
        <Text style={styles.subtitle}>
          The article can be found @ {lessonUrl}
        </Text>
        {renderContent(content)}
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.workspaceTitle}>Workspace</Text>
        <View style={styles.workspaceArea}>
          <Text style={styles.workspaceText}>
            Use this space to complete your exercise...
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonUrl, setLessonUrl] = useState("");

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const storedData = sessionStorage.getItem(id);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setContent(decodeURIComponent(parsedData.content));
        setLessonTitle(parsedData.lesson);
        setLessonUrl(parsedData.lessonUrl);
      } else {
        console.error("No data found for id:", id);
      }
    } else {
      console.error("No id found in URL");
    }
  }, [searchParams]);

  const MarkdownComponents: any = {
    p: ({ children }: { children: any }) => (
      <p className="mb-4 text-sm">{children}</p>
    ),
    h1: ({ children }: { children: any }) => (
      <h1 className="text-xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: any }) => (
      <h2 className="text-lg font-semibold mb-3">{children}</h2>
    ),
    h3: ({ children }: { children: any }) => (
      <h3 className="text-base font-semibold mb-2">{children}</h3>
    ),
    ul: ({ children }: { children: any }) => (
      <ul className="list-disc pl-5 mb-4">{children}</ul>
    ),
    ol: ({ children }: { children: any }) => (
      <ol className="list-decimal pl-5 mb-4">{children}</ol>
    ),
    li: ({ children }: { children: any }) => (
      <li className="mb-2 text-sm">{children}</li>
    ),
  };

  return (
    <main className="bg-gray-100 w-full min-h-screen flex flex-col gap-12 pb-12 relative overflow-hidden">
      {/* Dotted background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.1,
        }}
      />
      <section className="bg-white flex justify-between items-center py-3 px-2 md:px-8 shadow-md relative z-10">
        <Link href="/daily-dollar">
          <Button
            variant="ghost"
            className="flex gap-2 items-center text-muted-foreground"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Make another
          </Button>
        </Link>
        <PDFDownloadLink
          document={
            <MyDocument
              content={content}
              lessonTitle={lessonTitle}
              lessonUrl={lessonUrl}
            />
          }
          fileName="daily_dollar_exercise.pdf"
        >
          <PulsatingButton>Download PDF</PulsatingButton>
        </PDFDownloadLink>
      </section>
      <section className="flex flex-col md:flex-row bg-white xl:mx-auto md:max-w-7xl rounded-lg shadow-lg relative z-10 mx-4">
        <div className="w-full md:w-3/5 h-full p-8">
          <h2 className="text-xl font-bold text-primary">
            Your Daily Dollar Exercise
          </h2>
          <div className="mb-4">
            <div className="text-sm text-muted-foreground">
              Please read this article first:{" "}
              <a
                href={lessonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {lessonTitle}
              </a>
            </div>
          </div>
          <div className="prose max-w-none">
            <ReactMarkdown components={MarkdownComponents}>
              {content.replace(/---/g, "")}
            </ReactMarkdown>
          </div>
        </div>
        <div className="w-full md:w-2/5 p-8">
          <h2 className="text-xl font-bold text-primary mb-2">Workspace</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-md h-[calc(100%-3rem)] p-4">
            <p className="text-gray-400">
              Use this space to complete your exercise...
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
