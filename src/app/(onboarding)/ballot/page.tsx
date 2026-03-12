"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/store/session";
import { Countdown } from "@/components/stage/Countdown";
import { BallotList } from "@/components/ballot/BallotList";

export default function BallotPage() {
  const router = useRouter();
  const { user, profile, isLoading } = useSession();

  // because hasCompleteProfile won't change once it's set up,
  // this won't trigger except when isLoading changes.
  useEffect(() => {
    if (isLoading) return;
    if (!profile?.nickname) {
      router.push("/avatar");
    }
  }, [isLoading, profile, router]);

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-6">
          <Countdown />
          {user && (
            <BallotList userId={user.id} groupId={profile?.groupId ?? null} />
          )}

          <Link
            href="/ballot/red-carpet"
            className="relative flex items-stretch gap-0 rounded-2xl overflow-visible border border-primary shadow-md hover:shadow-lg transition-shadow focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* Shine overlay across whole card */}
            <span
              className="pointer-events-none absolute inset-0 z-0 rounded-2xl overflow-hidden"
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
            <div
              className="relative z-10 flex-1 min-w-0 flex flex-col justify-center gap-3 p-5 rounded-l-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 88%, white) 50%, var(--primary) 100%)",
              }}
            >
              <div className="relative flex flex-col justify-center gap-3">
                <div>
                  <p className="font-display font-bold text-primary-foreground text-lg leading-tight">
                    Red Carpet
                  </p>
                  <p className="font-display font-bold text-primary-foreground/90 text-2xl leading-tight">
                    Bingo!
                  </p>
                </div>
                <Button
                  size="lg"
                  className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-fit font-semibold shadow-sm"
                  asChild
                >
                  <span>Play</span>
                </Button>
              </div>
            </div>
            <div
              className="relative bg-primary z-10 flex-shrink-0 w-28 self-stretch overflow-visible rounded-r-2xl"
                  
            >
              <div className="absolute top-[-28px] right-0 bottom-0 left-0">
                <div className="absolute right-0 top-0 h-full w-auto aspect-square min-w-full relative">
                  <img
                    src="/images/illustrations/bingochips.svg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-top object-right"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </PageTransition>
    </AppShell>
  );
}
