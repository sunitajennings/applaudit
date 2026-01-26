"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing light version until mounted
  if (!mounted) {
    return (
      <Image
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
    );
  }

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
