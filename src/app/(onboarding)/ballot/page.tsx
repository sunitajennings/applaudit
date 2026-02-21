"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";
import { useUser } from "@/lib/store/user";
import { Countdown } from "@/components/stage/Countdown";
import { IllustrationPlaceholder } from "@/components/shared/IllustrationPlaceholder";
import { BallotList } from "@/components/ballot/BallotList";

export default function BallotPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile } = useUser();

  useEffect(() => {
    if (!profile?.nickname) {
      router.push("/avatar");
    }
  }, [profile, router]);

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-6">
          <Countdown />

          <Link
            href="/ballot/red-carpet"
            className="relative flex items-stretch gap-0 rounded-2xl overflow-hidden border border-primary shadow-md hover:shadow-lg transition-shadow focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 88%, white) 50%, var(--primary) 100%)",
            }}
          >
            {/* Animated shine overlay */}
            <span
              className="pointer-events-none absolute inset-0 z-0"
              aria-hidden
            >
              <span
                className="absolute inset-0 animate-[shine_3s_ease-in-out_infinite]"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%, transparent 100%)",
                  width: "60%",
                }}
              />
            </span>
            <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center gap-3 p-5">
              <div>
                <p className="font-display font-bold text-primary-foreground text-lg leading-tight">
                  Red Carpet
                </p>
                <p className="font-display font-bold text-primary-foreground/90 text-lg leading-tight">
                  Bingo!
                </p>
              </div>
              <Button
                size="sm"
                className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-fit font-semibold shadow-sm"
                asChild
              >
                <span>Play</span>
              </Button>
            </div>
            <div className="relative z-10 flex-shrink-0 w-28 self-stretch flex items-center justify-center bg-primary-foreground/10 border-l border-primary-foreground/10 p-2">
              <IllustrationPlaceholder
                width="100%"
                height="100%"
                label="Image"
                className="min-h-20 rounded-xl border-2 border-dashed border-primary-foreground/25 bg-primary-foreground/5 text-primary-foreground/80"
              />
            </div>
          </Link>

          {user && (
            <BallotList userId={user.id} groupId={profile?.groupId ?? null} />
          )}
        </div>
      </PageTransition>
    </AppShell>
  );
}
