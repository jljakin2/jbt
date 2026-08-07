"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { BLINK } from "../lib/lenses";

type Phase = "countdown" | "reveal";

export default function BlinkTest() {
  const { image, blinkSeconds, blinkActive, stopBlink, markBlinkSeen } =
    useOwnersDelusion();
  const [phase, setPhase] = useState<Phase>("countdown");
  const [count, setCount] = useState(3);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // 3..2..1 → flash the artifact for a few seconds → gone. No writing screen;
  // the helper notes carry the reflection questions.
  useEffect(() => {
    if (!blinkActive) return;
    clearTimers();
    setPhase("countdown");
    setCount(3);
    timers.current.push(setTimeout(() => setCount(2), 700));
    timers.current.push(setTimeout(() => setCount(1), 1400));
    timers.current.push(
      setTimeout(() => {
        setPhase("reveal");
        markBlinkSeen(); // the glance has happened; the helper is now relevant
      }, 2100),
    );
    timers.current.push(
      setTimeout(() => stopBlink(), 2100 + blinkSeconds * 1000),
    );
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blinkActive]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && stopBlink();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stopBlink]);

  if (!blinkActive || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <button
        onClick={stopBlink}
        aria-label="Close blink test"
        className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>

      {phase === "countdown" && (
        <div className="flex flex-col items-center gap-6">
          <div className="font-mono text-[9rem] font-bold leading-none tabular-nums">
            {count}
          </div>
          <p className="max-w-sm text-center text-sm text-white/60">
            You get one glance. Notice what jumps out — and what it&apos;s asking
            you to do.
          </p>
        </div>
      )}

      {phase === "reveal" && (
        <div className="flex w-full flex-col items-center gap-6">
          <img
            src={image}
            alt="Blink test"
            className="max-h-[75vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
            draggable={false}
          />
          <div className="h-1 w-56 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full bg-white"
              style={{ animation: `blinkbar ${blinkSeconds}s linear forwards` }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blinkbar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
