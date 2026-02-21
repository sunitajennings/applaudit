"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { useSession } from "@/lib/store/session";
import { createBallot } from "@/lib/ballot/storage";
import { AWARD_SHOW_ID } from "@/data/oscar-2026";

export default function NewBallotPage() {
  const router = useRouter();
  const { user, profile, isLoading } = useSession();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoading) return;
    if (!profile?.nickname || !profile?.avatarId) {
      router.push("/avatar");
      return;
    }
    if (profile.groupId == null) {
      router.push("/party");
    }
  }, [isLoading, profile, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a ballot name.");
      return;
    }
    if (!user || !profile?.groupId) return;
    const ballot = createBallot(user.id, profile.groupId, AWARD_SHOW_ID, trimmed);
    router.push(`/ballot/${ballot.id}/edit`);
  };

  if (!profile?.nickname || !profile?.avatarId || profile.groupId == null) {
    return null;
  }

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="flex-1 flex flex-col mx-auto mt-8 px-6 pb-12 max-w-md w-full">
        <main className="w-full flex flex-col items-center">
          {/* Illustration */}
          <div className="w-full">
            <ThemedImage
              lightSrc="/images/illustrations/ballotname.svg"
              darkSrc="/images/illustrations/ballotname_dark.svg"
              alt="Get ready to vote"
              width={240}
              height={240}
              priority
              className="w-full"
            />
          </div>

          {/* Dark Card */}
          <Card variant="dark" className="w-full rounded-2xl p-8 border-0 gap-0">
            <h1 className="text-2xl font-display font-bold mb-2">Name your ballot</h1>
            <p className="text-muted-foreground mb-6">
              Give your predictions a name so you can tell them apart.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="ballot-name" className="text-sm font-medium">
                  Ballot name
                </label>
                <Input
                  id="ballot-name"
                  type="text"
                  placeholder="e.g. My Oscar Picks 2026"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  maxLength={80}
                  className="w-full"
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full h-12" size="lg" disabled={!name.trim()}>
                Continue
              </Button>
            </form>

            <p className="text-sm mt-4">
              <Link
                href="/ballot"
                className="text-muted-foreground hover:text-foreground underline"
              >
                Back to My Ballots
              </Link>
            </p>
          </Card>
        </main>
      </PageTransition>
    </AppShell>
  );
}
