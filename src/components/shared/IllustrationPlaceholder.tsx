"use client";

import { cn } from "@/lib/utils";

interface IllustrationPlaceholderProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  className?: string;
}

export function IllustrationPlaceholder({
  width = 200,
  height = 200,
  label = "Illustration",
  className,
}: IllustrationPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30",
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <span className="text-xs text-muted-foreground text-center px-2">
        {label}
      </span>
    </div>
  );
}
