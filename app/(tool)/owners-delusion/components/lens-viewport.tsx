"use client";

/* eslint-disable @next/next/no-img-element */
import { useOwnersDelusion } from "../hooks/use-owners-delusion";
import { COLORBLIND } from "../lib/lenses";

export default function LensViewport() {
  const { image, imageName, activeTool, squint, colorblindType } =
    useOwnersDelusion();

  if (!image) return null;

  const filter =
    activeTool === "squint"
      ? `blur(${squint}px)`
      : activeTool === "grayscale"
        ? "grayscale(1)"
        : activeTool === "colorblind"
          ? `url(#cb-${colorblindType})`
          : "none";

  return (
    <>
      {/* Height-capped so the image and its notes read as one grouped unit. */}
      <img
        src={image}
        alt={imageName ?? "Your uploaded design"}
        className="max-h-[58vh] w-auto max-w-full rounded-md object-contain shadow-[0_2px_40px_rgba(0,0,0,0.12)] transition-[filter] duration-200"
        style={{ filter }}
        draggable={false}
      />

      {/* Color-vision filters referenced by url(#cb-…) above. */}
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          {COLORBLIND.map((cb) => (
            <filter
              key={cb.id}
              id={`cb-${cb.id}`}
              colorInterpolationFilters="sRGB"
            >
              <feColorMatrix type="matrix" values={cb.matrix} />
            </filter>
          ))}
        </defs>
      </svg>
    </>
  );
}
