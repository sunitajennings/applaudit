"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { useSession } from "@/lib/store/session";
import { useNavCenter } from "@/lib/store/nav-center";
import { getBallotById, getChoicesForBallot, updateBallot } from "@/lib/ballot/storage";
import { BallotVoting } from "@/components/ballot/BallotVoting";
import { isEventStarted } from "@/data/oscar-2026";

export default function EditBallotPage() {
  const router = useRouter();
  const params = useParams();
  const { user, profile, isLoading } = useSession();
  const { setCenterContent } = useNavCenter();
  const id = params.id as string;

  const ballot = getBallotById(id);
  const choices = ballot ? getChoicesForBallot(ballot.id) : [];

  useEffect(() => {
    if (isLoading) return;
    if (!profile?.nickname || !profile?.avatarId) {
      router.push("/avatar");
    }
  }, [isLoading, profile, router]);

  useEffect(() => {
    if (!user) return;
    if (!ballot || ballot.userId !== user.id) {
      router.push("/ballot");
      return;
    }
    if (isEventStarted()) {
      router.push("/ballot");
      return;
    }
  }, [user, id, ballot?.userId, router]);

  // Show back button + ballot title in nav center (between logo and avatar).
  // Depend on id and ballot name (primitives) to avoid infinite loop: ballot object is recreated each render.
  const ballotId = ballot?.id;
  const ballotName = ballot?.name;
  useEffect(() => {
    if (!ballotId || ballotName == null) return;
    setCenterContent(
      <div className="flex items-center justify-center gap-3 w-full min-w-0 px-2">
        <Button asChild variant="outline" size="icon" className="rounded-full shrink-0" aria-label="Back to My Ballots">
          <Link href="/ballot">
            <ChevronLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-lg font-display font-bold capitalize min-w-0 truncate text-center">
          {ballotName}
        </h1>
      </div>
    );
    return () => setCenterContent(null);
  }, [ballotId, ballotName, setCenterContent]);

  const handleSave = () => {
    if (ballot) {
      updateBallot(ballot);
      router.push("/ballot");
    }
  };

  if (!profile?.nickname || !profile?.avatarId) {
    return null;
  }
  if (!ballot || ballot.userId !== user.id || isEventStarted()) {
    return null;
  }

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false} mainClassName="flex flex-col min-h-0">
      <PageTransition className="max-w-md mx-auto w-full flex flex-col flex-1 min-h-0">
        <BallotVoting
          ballot={ballot}
          initialChoices={choices}
          onSave={handleSave}
        />
      </PageTransition>
    </AppShell>
  );
}
