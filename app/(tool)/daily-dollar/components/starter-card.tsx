"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { HandCoins } from "lucide-react";
import PulsatingButton from "@/components/ui/pulsating-button";

const loadingMessages = [
  "Calling my worksheet guy...",
  "He's on it...",
  "Working his magic...",
  "Getting those final touches...",
  "Almost there, hang tight!",
  "What is this guy doing?",
];

export default function StarterCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prevIndex) => {
          if (prevIndex < loadingMessages.length - 1) {
            return prevIndex + 1;
          }
          // If we've reached the last message, clear the interval
          clearInterval(interval);
          return prevIndex;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("about to call api");
    try {
      const response = await fetch(
        "https://7i7k56eh0b.execute-api.us-east-1.amazonaws.com/dev/daily-dollar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      console.log("response", response);
      const data = await response.json();
      console.log("data after json", data);

      // Generate a unique ID on the client side
      const contentId = uuidv4();

      // Store the content in sessionStorage
      sessionStorage.setItem(
        contentId,
        JSON.stringify({
          ...data.data, // the api returns an object with a data property and a message property
        })
      );

      // Navigate to the download page with the contentId
      router.push(`/daily-dollar/download?id=${encodeURIComponent(contentId)}`);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while generating the exercise. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl relative z-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2 text-primary">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <HandCoins className="w-5 h-5 text-white" />
          </div>
          <span>Daily Dollar</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg text-gray-700">
          💡 To get good at anything, you need to do it every day.
        </p>
        <p className="text-lg text-gray-700">
          📝 Use the button to create a simple worksheet with a quick exercise
          designed to help you get better at marketing in just 15 minutes per
          day.
        </p>
        <p className="text-lg text-gray-700">
          🚀 The worksheets are based on the brilliant examples from{" "}
          <a
            href="https://marketingexamples.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            marketingexamples.com
          </a>
        </p>
        <p className="text-lg text-gray-700">
          🎯 This is completely free and you are free to download, print, or do
          the exercises in a journal. Whatever floats your boat!
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <PulsatingButton
          className={`w-full ${isLoading ? "opacity-70 cursor-default" : ""}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading
            ? loadingMessages[loadingMessageIndex]
            : "Create Your Worksheet"}
        </PulsatingButton>
      </CardFooter>
    </Card>
  );
}
