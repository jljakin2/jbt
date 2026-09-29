"use client";

/* eslint-disable @next/next/no-img-element */
import { useOwnersDelusion } from "../hooks/use-owners-delusion";

export default function LensViewport() {
  const { image, imageName, activeTool, squint } = useOwnersDelusion();

  if (!image) return null;

  const filter =
    activeTool === "squint"
      ? `blur(${squint}px)`
      : activeTool === "grayscale"
        ? "grayscale(1)"
        : "none";

  return (
    // Height-capped so the image and its notes read as one grouped unit.
    <img
      src={image}
      alt={imageName ?? "Your uploaded design"}
      className="max-h-[58vh] w-auto max-w-full rounded-md object-contain shadow-[0_2px_40px_rgba(0,0,0,0.12)] transition-[filter] duration-200"
      style={{ filter }}
      draggable={false}
    />
  );
}
