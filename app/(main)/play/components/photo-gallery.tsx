"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { Photo } from "../lib/photos";
import GalleryLightbox from "./gallery-lightbox";

interface PhotoGalleryProps {
  photos: Photo[];
}

/** Roughly the first visible row(s) — eagerly loaded for a fast first paint. */
const PRIORITY_COUNT = 6;

/** How long the cursor must rest on a thumbnail before we prefetch the
    lightbox-size image. Filters out drive-by hovers while sweeping the grid. */
const HOVER_INTENT_MS = 120;

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Indices whose full-size (lightbox) variant we've started prefetching.
  const [warmed, setWarmed] = useState<Set<number>>(new Set());
  const hoverTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  // Clear any pending hover timers on unmount.
  useEffect(() => {
    const timers = hoverTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const warmUp = (i: number) => {
    setWarmed((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  const onHoverStart = (i: number) => {
    if (warmed.has(i) || hoverTimers.current.has(i)) return;
    hoverTimers.current.set(
      i,
      setTimeout(() => {
        hoverTimers.current.delete(i);
        warmUp(i);
      }, HOVER_INTENT_MS)
    );
  };

  const onHoverEnd = (i: number) => {
    const timer = hoverTimers.current.get(i);
    if (timer) {
      clearTimeout(timer);
      hoverTimers.current.delete(i);
    }
  };

  if (photos.length === 0) {
    return (
      <p className="text-muted-foreground">
        Photos coming soon — check back shortly.
      </p>
    );
  }

  return (
    <>
      {/* CSS multi-column masonry — no layout library needed. */}
      <div className="columns-2 gap-4 md:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            onMouseEnter={() => onHoverStart(i)}
            onMouseLeave={() => onHoverEnd(i)}
            onFocus={() => warmUp(i)}
            aria-label={`Open photo: ${photo.alt}`}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-md bg-neutral-100 transition duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-neutral-900"
          >
            {/* Skeleton sits behind the image via bg-muted until pixels arrive;
                the blur-up placeholder paints instantly on top of it. */}
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 33vw, 50vw"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              priority={i < PRIORITY_COUNT}
              className="h-auto w-full"
            />
          </button>
        ))}
      </div>

      {/* Hover-intent prefetch: hidden copies at the lightbox's exact `sizes`
          so the click is a browser-cache hit. Mirrors Next.js Link's
          hover-prefetch pattern, applied to images. */}
      {warmed.size > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0"
        >
          {Array.from(warmed).map((i) => (
            <Image
              key={photos[i].id}
              src={photos[i].src}
              alt=""
              fill
              sizes="90vw"
            />
          ))}
        </div>
      )}

      <GalleryLightbox
        photos={photos}
        index={openIndex ?? 0}
        open={openIndex !== null}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
