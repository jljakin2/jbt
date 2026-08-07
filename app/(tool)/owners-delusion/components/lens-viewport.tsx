"use client";

/* eslint-disable @next/next/no-img-element */
import { useOwnersDelusion } from "../hooks/use-owners-delusion";

export default function LensViewport() {
  const { image, imageName, mode, activeLens, squint } = useOwnersDelusion();

  if (!image) return null;

  // Lenses only apply in Clarity mode — other modes examine the raw artifact.
  const filter =
    mode !== "clarity"
      ? "none"
      : activeLens === "squint"
        ? `blur(${squint}px)`
        : activeLens === "grayscale"
          ? "grayscale(1)"
          : "none";

  return (
    // The artifact under examination — capped so it and its notes read as one
    // grouped unit rather than the image floating alone in empty space.
    <img
      src={image}
      alt={imageName ?? "Your uploaded design"}
      className="max-h-[58vh] w-auto max-w-full rounded-md object-contain shadow-[0_2px_40px_rgba(0,0,0,0.12)] transition-[filter] duration-200"
      style={{ filter }}
      draggable={false}
    />
  );
}
