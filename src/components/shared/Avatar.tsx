"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  initials: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
};

const sizePx = {
  sm: 32,
  md: 48,
  lg: 64,
};

export function Avatar({
  initials,
  imageUrl,
  size = "md",
  selected = false,
  className,
}: AvatarProps) {
  const displayInitials = initials.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center font-medium transition-all",
        sizeClasses[size],
        selected
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
          : "",
        imageUrl ? "" : "bg-card text-card-foreground",
        className
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Avatar for ${initials}`}
          width={sizePx[size]}
          height={sizePx[size]}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <span>{displayInitials}</span>
      )}
    </div>
  );
}
