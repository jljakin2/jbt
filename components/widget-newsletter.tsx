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

import { useState } from "react";

export default function WidgetNewsletter() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email.toString())) {
      console.error("Invalid email address");
      setLoading(false);
      return;
    }

    fetch(
      "https://pgn6ugg4j6.execute-api.us-east-1.amazonaws.com/default/convertkitSub",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <div className="text-center mb-8">
        <div className="font-aspekta font-[650] mb-1">
          Never miss an update!
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Subscribe and join 100K+ developers.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="sr-only" htmlFor="newsletter">
            Your email…
          </label>
          <Input
            id="newsletter"
            type="email"
            className="form-input py-1 w-full"
            placeholder="Your email…"
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
