// import Image, { StaticImageData } from "next/image";

// interface PostImageProps {
//   alt: string;
//   caption?: string;
//   size?: string;
//   src: StaticImageData;
// }

// export default function PostImage({
//   alt,
//   caption,
//   size,
//   ...props
// }: PostImageProps) {
//   const classes = size === "lg" ? "lg:-ml-32 lg:-mr-32" : "";

//   return (
//     <figure className={classes}>
//       <Image className="w-full" {...props} alt={alt} />
//       {caption && (
//         <figcaption className="text-sm text-center text-muted-foreground mt-3">
//           {caption}
//         </figcaption>
//       )}
//     </figure>
//   );
// }

import ModalImage from "./modal-image";
import type { StaticImageData } from "next/image";

interface PostImageProps {
  src: StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PostImage({
  src,
  alt,
  width,
  height,
  className,
}: PostImageProps) {
  return (
    <ModalImage
      src={src}
      alt={alt}
      width={width || 8000} // Default width if not provided
      height={height || 600} // Default height if not provided
      className={`${className} w-full rounded-md`}
    />
  );
}
