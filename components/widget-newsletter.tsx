"use client";

import Image from "next/image";
import Avatar01 from "@/public/images/avatar-01.jpg";
import Avatar02 from "@/public/images/avatar-02.jpg";
import Avatar03 from "@/public/images/avatar-03.jpg";
import Avatar04 from "@/public/images/avatar-04.jpg";
import Avatar05 from "@/public/images/avatar-05.jpg";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useState, useEffect } from "react";

export default function WidgetNewsletter() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    if (message.content) {
      const timer = setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", content: "" });

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setMessage({
        type: "error",
        content: "Please enter a valid email address",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setMessage({ type: "success", content: "Thank you for subscribing!" });
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border p-5">
      <div className="text-center mb-1">
        <div className="inline-flex -space-x-3 -ml-0.5">
          <Image
            className="rounded-full border-2 border-background box-content"
            src={Avatar01}
            width={24}
            height={24}
            alt="Avatar 01"
          />
          <Image
            className="rounded-full border-2 border-background box-content"
            src={Avatar02}
            width={24}
            height={24}
            alt="Avatar 02"
          />
          <Image
            className="rounded-full border-2 border-background box-content"
            src={Avatar03}
            width={24}
            height={24}
            alt="Avatar 03"
          />
          <Image
            className="rounded-full border-2 border-background box-content"
            src={Avatar04}
            width={24}
            height={24}
            alt="Avatar 04"
          />
          <Image
            className="rounded-full border-2 border-background box-content"
            src={Avatar05}
            width={24}
            height={24}
            alt="Avatar 05"
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <div className="font-aspekta font-[650] mb-1">
          Helpful tools for busy builders.
        </div>
        <p className="text-sm text-muted-foreground">
          Tools and resources to make your work life easier.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {message.content && (
          <div
            className={`mb-4 p-2 text-sm rounded ${
              message.type === "error"
                ? "bg-red-100 text-destructive"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.content}
          </div>
        )}
        <div className="mb-2">
          <label className="sr-only" htmlFor="newsletter">
            Your email…
          </label>
          <Input
            id="newsletter"
            type="email"
            className="form-input py-1 w-full"
            placeholder="Your email…"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button className="w-full text-white" type="submit" disabled={loading}>
          Subscribe
          {loading && <LoaderCircle className="h-4 w-4 ml-1 animate-spin" />}
        </Button>
      </form>
    </div>
  );
}
