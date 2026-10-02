import ModalImage from "./modal-image";
import type { StaticImageData } from "next/image";

/**
 * An image with a one-line caption that says why it's here.
 * Usage in MDX:  <Figure src="https://…/mom-test.png" alt="The Mom Test cover" caption="The book that fixed my customer calls." />
 */
export default function Figure({ src, alt, caption, width, height }: { src: StaticImageData | string; alt: string; caption?: string; width?: number; height?: number }) {
  return (
    <figure className="not-prose my-10">
      <ModalImage src={src as StaticImageData} alt={alt} width={width || 8000} height={height || 600} className="w-full rounded-lg" />
      {caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground [text-wrap:pretty]">{caption}</figcaption>}
    </figure>
  );
}
