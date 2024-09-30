"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Home, Wifi, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");
  const fullText = "404: Page not found";

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-[calc(100vh-56px-167px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-300">Terminal</span>
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-gray-400" />
            <Battery className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-green-400 mb-4">
            <Terminal className="w-5 h-5 mr-2" />
            <span className="font-mono">{text}</span>
            <motion.span
              className="inline-block w-2 h-5 bg-green-400 ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
          <p className="text-gray-300">
            The requested page could not be found.
          </p>
          <p className="text-gray-300 mt-2">
            Please check the URL or navigate back to the home page.
          </p>
        </div>
      </div>
      <Button asChild>
        <Link href="/">
          <Home className="w-4 h-4 mr-2" />
          Return to Home
        </Link>
      </Button>
    </div>
  );
}
