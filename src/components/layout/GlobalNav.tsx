"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/store/session";
import { useNavCenter } from "@/lib/store/nav-center";
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
  const pathname = usePathname();
  const { user, profile, isAuthenticated, isLoading, getInitials } =
    useSession();
  const { centerContent } = useNavCenter();

  const isPublicPage = pathname === "/";
  const useConstrainedWidth = !isLoading && isAuthenticated && !isPublicPage;

  const profileInitials = profile?.nickname
    ? getInitials(profile.nickname)
    : null;

  const userEmailInitials = user?.email
    ? getInitialsFromEmail(user.email)
    : null;

  const avatarInitials = profileInitials || userEmailInitials || "??";

  // Hide global nav on live page (live view has its own topbar)
  if (pathname.startsWith("/live")) {
    return null;
  }

  return (
    <nav
      className={cn(
        "max-w-4xl w-full mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div
        className={cn(
          "w-full mx-auto",
          useConstrainedWidth ? "max-w-md px-4" : "px-6",
        )}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo: logomark when logged in (and not on public home), full logo when not */}
          <Link href="/" className="flex items-center shrink-0">
            {useConstrainedWidth ? (
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

          {/* Center: optional content (e.g. ballot back + title), flexes full width between logo and avatar */}
          {centerContent != null ? (
            <div className="flex flex-1 min-w-0 items-center justify-center overflow-hidden">
              {centerContent}
            </div>
          ) : (
            <div className="flex-1 min-w-0" aria-hidden />
          )}

          {/* Right side: avatar when logged in (and not on public home), login link when not */}
          {useConstrainedWidth ? (
            <Link href="/profile/me" className="flex items-center shrink-0" aria-label="Profile">
              <Avatar
                initials={avatarInitials}
                size="sm"
                className="shrink-0 bg-primary text-primary-foreground"
              />
            </Link>
          ) : !isLoading ? (
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <div className="w-16 shrink-0" aria-hidden />
          )}
        </div>
      </div>
    </nav>
  );
}
