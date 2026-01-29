"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlobalNavProps {
  className?: string;
}

export function GlobalNav({ className }: GlobalNavProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Determine where the login link should go
  const loginHref = isAuthenticated ? "/dashboard" : "/login";
  const loginLabel = isAuthenticated ? "Dashboard" : "Login";

  return (
    <nav
      className={cn(
        "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="max-w-4xl w-full mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <ThemedImage
              lightSrc="/images/logos/logo.svg"
              darkSrc="/images/logos/logo_dark.svg"
              alt="Applaudit"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* Login Link / Home Icon */}
          {!isLoading && (
            <Button asChild variant="ghost" size="sm">
              <Link href={loginHref}>
                {isAuthenticated ? (
                  <Home className="h-5 w-5" />
                ) : (
                  loginLabel
                )}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
