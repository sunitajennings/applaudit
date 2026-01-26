"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { Avatar } from "@/components/shared/Avatar";

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
  showLogo = true,
  showAvatar = false,
  avatarInitials = "??",
  avatarImageUrl,
  className,
  headerClassName,
  mainClassName,
}: AppShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        variant === "light" ? "bg-background" : "bg-background",
        className
      )}
    >
      <header
        className={cn(
          "flex justify-between items-center p-4",
          headerClassName
        )}
      >
        <div className="flex items-center">
          {showLogo && <Logo variant="icon" size="md" />}
        </div>
        <div className="flex items-center">
          {showAvatar && (
            <Avatar
              initials={avatarInitials}
              imageUrl={avatarImageUrl}
              size="sm"
            />
          )}
        </div>
      </header>
      <main className={cn("flex-1 px-4 pb-8", mainClassName)}>{children}</main>
    </div>
  );
}
