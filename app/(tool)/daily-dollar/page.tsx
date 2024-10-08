"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const topics = ["idea generation", "copywriting", "create ads"];

export default function DailyDollarPage() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTopic) {
      setIsLoading(true);
      try {
        const response = await fetch("/daily-dollar/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: selectedTopic }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate content");
        }

        const { content, lesson, lessonUrl, category, readTime } =
          await response.json();

        console.log("Received content:", content);

        const queryParams = new URLSearchParams({
          content,
          topic: selectedTopic,
          lessonTitle: lesson,
          lessonUrl,
          category,
          readTime,
        });

        router.push(`/daily-dollar/download?${queryParams.toString()}`);
      } catch (error) {
        console.error("Error:", error);
        alert(
          "An error occurred while generating the exercise. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Copywork Exercise</h1>
      <form onSubmit={handleSubmit}>
        <p className="mb-2">What would you like to work on today?</p>
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select a topic</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!selectedTopic || isLoading}
        >
          {isLoading ? "Generating..." : "Generate Exercise"}
        </button>
      </form>
    </div>
  );
}
