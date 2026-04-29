"use client";

import { useState } from "react";
import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CustomImage({ src, alt, className }: CustomImageProps) {
  const [loaded, setLoaded] = useState(false);

  const isSvg = src.endsWith(".svg");

  return (
    <div className="relative inline-block w-full max-w-full">
      {!loaded && (
        <div
          className="w-full h-[600px] rounded-lg animate-[shimmer_1.5s_infinite] absolute top-0 left-0 z-[1]
          max-[767px]:min-w-[300px] max-[767px]:max-w-[350px]"
          style={{
            background:
              "linear-gradient(90deg, #eeeeee 25%, #dddddd 50%, #eeeeee 75%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}
      {isSvg ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-[600px] object-contain animate-[float_3s_ease_infinite] z-[2] relative
            max-[767px]:min-w-[300px] max-[767px]:max-w-[350px]
            transition-opacity duration-500 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"} ${className || ""}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1280}
          height={720}
          onLoad={() => setLoaded(true)}
          className={`w-full h-[600px] object-contain animate-[float_3s_ease_infinite] z-[2] relative
            max-[767px]:min-w-[300px] max-[767px]:max-w-[350px]
            transition-opacity duration-500 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"} ${className || ""}`}
        />
      )}
    </div>
  );
}
