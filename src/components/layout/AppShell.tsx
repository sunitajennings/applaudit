"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  variant?: "light" | "dark";
  showLogo?: boolean;
  showAvatar?: boolean;
  avatarInitials?: string;
  avatarImageUrl?: string;
  className?: string;
  headerClassName?: string;
  mainClassName?: string;
}

export function AppShell({
  children,
  variant = "dark",
  className,
  mainClassName,
}: AppShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        variant === "light" ? "bg-background" : "bg-background",
        className,
      )}
    >
      <main className={cn("flex-1 px-4 pb-8", mainClassName)}>{children}</main>
    </div>
  );
}
