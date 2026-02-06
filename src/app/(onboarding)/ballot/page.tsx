"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/lib/store/auth";
import { useUser } from "@/lib/store/user";
import { Countdown } from "@/components/stage/Countdown";
import { BingoGame } from "@/components/bingo/BingoGame";
import { cn } from "@/lib/utils";

type StageTab = "ballot" | "bingo";

export default function BallotPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile } = useUser();
  const [tab, setTab] = useState<StageTab>("bingo");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!profile?.nickname || !profile?.avatarId) {
      router.push("/avatar");
      return;
    }
  }, [user, profile, router]);

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-6">
          <p className="text-sm">
            <Link
              href="/party?stay=1"
              className="text-muted-foreground hover:text-foreground underline"
            >
              Back to join
            </Link>
          </p>

          <Countdown />

          <div className="flex rounded-lg border border-border bg-muted/30 p-1">
            <button
              type="button"
              onClick={() => setTab("ballot")}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                tab === "ballot"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              My Ballots
            </button>
            <button
              type="button"
              onClick={() => setTab("bingo")}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                tab === "bingo"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Red carpet bingo
            </button>
          </div>

          {tab === "ballot" && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-display font-bold">
                  Create your ballot
                </h2>
                <p className="text-muted-foreground text-sm">
                  Your predictions will go here.
                </p>
              </div>
            </div>
          )}

          {tab === "bingo" && (
            <div>
              <h2 className="text-xl font-display font-bold text-center mb-4">
                Red carpet bingo
              </h2>
              <BingoGame />
            </div>
          )}
        </div>
      </PageTransition>
    </AppShell>
  );
}
