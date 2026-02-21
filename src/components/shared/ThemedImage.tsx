"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

interface ThemedImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export function ThemedImage({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  priority = false,
  className,
}: ThemedImageProps) {
  const { resolvedTheme } = useTheme();

  // resolvedTheme is undefined until theme resolves on the client — use light as default
  const src = resolvedTheme === "dark" ? darkSrc : lightSrc;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
