"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
};

const iconSizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
};

export function Logo({ variant = "full", size = "md", className }: LogoProps) {
  if (variant === "icon") {
    return (
      <span
        className={cn(iconSizeClasses[size], className)}
        role="img"
        aria-label="Applaudit logo"
      >
        👏
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-display font-bold tracking-tight",
        sizeClasses[size],
        className
      )}
    >
      {/* TODO: Replace with logo image when available */}
      Applaud<span role="img" aria-label="clapping hands">👏</span>it
    </span>
  );
}
