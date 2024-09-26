"use client";

import { useState, useRef, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ModalImageProps {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ModalImage({
  src,
  alt,
  width,
  height,
  className,
}: ModalImageProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="w-full">
      {/* Image thumbnail */}
      <div className="relative inline-flex justify-center items-center">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className={`cursor-pointer w-full h-auto shadow-md border border-border my-2 ${className}`}
          onClick={() => setModalOpen(true)}
        />
      </div>
      {/* End: Image thumbnail */}

      <Transition show={modalOpen} as={Fragment}>
        <Dialog initialFocus={imageRef} onClose={() => setModalOpen(false)}>
          {/* Modal backdrop */}
          <TransitionChild
            as="div"
            className="fixed inset-0 z-[99999] bg-slate-900 bg-opacity-80 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* End: Modal backdrop */}

          {/* Modal dialog */}
          <TransitionChild
            as="div"
            className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center px-4 sm:px-6"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="max-w-4xl mx-auto h-full flex items-center">
              <DialogPanel className="w-full max-h-full bg-black overflow-hidden shadow-lg">
                <Image
                  ref={imageRef}
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-full h-auto"
                />
              </DialogPanel>
            </div>
          </TransitionChild>
          {/* End: Modal dialog */}
        </Dialog>
      </Transition>
    </div>
  );
}
