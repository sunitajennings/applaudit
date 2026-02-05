"use client";

import Link from "next/link";
import { useAuth } from "@/lib/store/auth";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getInitialsFromEmail(email: string): string {
  const local = email.split("@")[0] || "";
  if (local.length >= 2) return local.slice(0, 2).toUpperCase();
  return local.length === 1 ? (local + "?").toUpperCase() : "??";
}

interface GlobalNavProps {
  className?: string;
}

export function GlobalNav({ className }: GlobalNavProps) {
  const { user, isAuthenticated, isLoading, getInitials } = useAuth();

  const avatarInitials = user
    ? user.nickname
      ? getInitials(user.nickname)
      : getInitialsFromEmail(user.email)
    : "??";

  return (
    <nav
      className={cn(
        "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="max-w-4xl w-full mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo: logomark when logged in, full logo when not */}
          <Link href="/" className="flex items-center shrink-0">
            {!isLoading && isAuthenticated ? (
              <ThemedImage
                lightSrc="/images/logos/logobug.svg"
                darkSrc="/images/logos/logobug_dark.svg"
                alt="Applaudit"
                width={40}
                height={40}
                priority
              />
            ) : (
              <ThemedImage
                lightSrc="/images/logos/logo.svg"
                darkSrc="/images/logos/logo_dark.svg"
                alt="Applaudit"
                width={140}
                height={40}
                priority
              />
            )}
          </Link>

          {/* Right side: avatar when logged in, login link when not */}
          {!isLoading && isAuthenticated ? (
            <div className="flex items-center">
              <Avatar
                initials={avatarInitials}
                imageUrl={user?.avatarUrl}
                size="sm"
                className="shrink-0"
              />
            </div>
          ) : !isLoading ? (
            <Button asChild variant="link" size="icon-lg">
              <Link href="/login">Login</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
