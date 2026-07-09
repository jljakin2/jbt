"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

import type { Photo } from "../lib/photos";

interface GalleryLightboxProps {
  photos: Photo[];
  index: number;
  open: boolean;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Museum pace — long enough to actually look at a photograph. */
const SLIDESHOW_INTERVAL = 7000;

export default function GalleryLightbox({
  photos,
  index,
  open,
  onIndexChange,
  onClose,
}: GalleryLightboxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const count = photos.length;

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + count) % count);
  }, [index, count, onIndexChange]);

  // Stop the slideshow whenever the lightbox closes.
  useEffect(() => {
    if (!open) setIsPlaying(false);
  }, [open]);

  // Auto-advance while playing.
  useEffect(() => {
    if (!open || !isPlaying || count <= 1) return;
    const id = setInterval(goNext, SLIDESHOW_INTERVAL);
    return () => clearInterval(id);
  }, [open, isPlaying, count, goNext]);

  // Keyboard controls.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
      // Esc is handled by Dialog's onClose.
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goNext, goPrev]);

  const photo = photos[index];
  if (!photo) return null;

  // While the slideshow plays, the chrome retires — pure viewing. A nudge of
  // the mouse over the room brings it back.
  const chrome = `transition-opacity duration-500 ${
    isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
  }`;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        initialFocus={closeButtonRef}
        onClose={onClose}
        className="relative z-[99999]"
      >
        {/* The wall — frosted glass, not paint: translucent pure white over a
            heavy blur. The saturate cut is what keeps it from going creamy —
            the warm photos behind bleed through as luminous gray shapes
            instead of color. */}
        <TransitionChild
          as="div"
          className="fixed inset-0 bg-white/90 backdrop-blur-3xl backdrop-saturate-[0.3]"
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />

        {/* The room — everything lives INSIDE DialogPanel (Headless UI treats
            outside clicks as "close", which corrupts state if controls sit
            outside the panel). No entrance pop: you walk in, you don't zoom. */}
        <TransitionChild
          as="div"
          className="fixed inset-0"
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel
            className="group flex h-full w-full flex-col items-center justify-center px-4 py-16 sm:px-6"
            onClick={(e) => {
              // Clicking empty wall closes; the print and controls are
              // children and are ignored here.
              if (e.target === e.currentTarget) onClose();
            }}
          >
            {/* Top-right controls — quiet marks, not a toolbar */}
            <div
              className={`absolute right-4 top-4 flex items-center gap-1 text-neutral-400 ${chrome}`}
            >
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  className="rounded-full p-2 transition-colors hover:text-neutral-900"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
              )}
              <button
                type="button"
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 transition-colors hover:text-neutral-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* The print — deliberately small on the wall. Negative space is
                the point: a photograph in a museum never fills the room.
                Wide white mat, hairline frame, tight shadow. The mat stays
                hung while each print dissolves in. */}
            {/* Physical depth, outside → in: the frame stands off the wall
                (outer drop shadow), its lip grazes the mat (faint inset at
                the mat's top edge), and the print sits recessed beneath the
                mat's window — whose cut edge drops a soft shadow onto it. */}
            <div className="bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_36px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(0,0,0,0.07)] ring-1 ring-neutral-950/10 sm:p-14 lg:p-20">
              <div className="relative">
                <Image
                  key={photo.id}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  priority
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  unoptimized
                  className="block h-auto max-h-[52vh] w-auto max-w-[80vw] animate-[fadeIn_700ms_ease-out] object-contain sm:max-w-[55vw] lg:max-w-[48vw]"
                />
                {/* The recess, under a single light from above: the window's
                    top edge casts shadow down onto the print, the sides get
                    only a whisper of corner occlusion, and the bottom bevel
                    CATCHES the light — a faint bright line, never a shadow. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 shadow-[inset_0_4px_8px_rgba(0,0,0,0.22),inset_2px_0_3px_rgba(0,0,0,0.04),inset_-2px_0_3px_rgba(0,0,0,0.04),inset_0_-1px_1px_rgba(255,255,255,0.35)]"
                />
              </div>
            </div>

            {/* The placard — title (when there is one) over a quiet
                collection line. This replaces any corner counter. */}
            <div className="mt-8 text-center">
              {photo.caption && (
                <p className="text-sm text-neutral-800">{photo.caption}</p>
              )}
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                No. {index + 1} of {count}
              </p>
            </div>

            {/* Prev / Next — ghosts at the edges of the room */}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className={`absolute left-3 top-1/2 -translate-y-1/2 p-3 text-neutral-400 transition-colors hover:text-neutral-900 sm:left-6 ${chrome}`}
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 text-neutral-400 transition-colors hover:text-neutral-900 sm:right-6 ${chrome}`}
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </>
            )}

            {/* Invisible preloads of the neighboring photos so prev/next and
                the slideshow advance instantly. Same `sizes` as the viewer so
                the browser fetches the exact optimized variants. */}
            {count > 1 && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
              >
                {[(index + 1) % count, (index - 1 + count) % count]
                  .filter((n) => n !== index)
                  .map((n) => (
                    <Image
                      key={photos[n].id}
                      src={photos[n].src}
                      alt=""
                      fill
                      unoptimized
                    />
                  ))}
              </div>
            )}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
