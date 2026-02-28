"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { useSession } from "@/lib/store/session";
import { useNavCenter } from "@/lib/store/nav-center";
import { getBallotById, getChoicesForBallot } from "@/lib/queries/ballots";
import { createClient } from "@/lib/supabase/client";
import { BallotVoting } from "@/components/ballot/BallotVoting";
import { isEventStarted } from "@/data/oscar-2026";
import type { Ballot, BallotChoice } from "@/lib/ballot/types";

export default function EditBallotPage() {
  const router = useRouter();
  const params = useParams();
  const { user, profile, isLoading } = useSession();
  const { setCenterContent } = useNavCenter();
  const id = params.id as string;
  const supabase = createClient();

  const [ballot, setBallot] = useState<Ballot | null>(null);
  const [choices, setChoices] = useState<BallotChoice[]>([]);

  useEffect(() => {
    if (isLoading) return;
    if (!profile?.nickname) {
      router.push("/avatar");
    }
  }, [isLoading, profile, router]);

  useEffect(() => {
    if (!user || isLoading) return;
    getBallotById(supabase, id)
      .then(async (found) => {
        if (!found || found.userId !== user.id) {
          router.push("/ballot");
          return;
        }
        if (isEventStarted()) {
          router.push("/ballot");
          return;
        }
        const fetchedChoices = await getChoicesForBallot(supabase, found.id);
        setBallot(found);
        setChoices(fetchedChoices);
      })
      .catch(() => router.push("/ballot"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user, isLoading]);

  // Show back button + ballot title in nav center (between logo and avatar).
  // Depend on id and ballot name (primitives) to avoid infinite loop: ballot object is recreated each render.
  const ballotId = ballot?.id;
  const ballotName = ballot?.name;
  useEffect(() => {
    if (!ballotId || ballotName == null) return;
    setCenterContent(
      <div className="flex items-center justify-center gap-3 w-full min-w-0 px-2">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="rounded-full shrink-0"
          aria-label="Back to My Ballots"
        >
          <Link href="/ballot">
            <ChevronLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-lg font-display font-bold capitalize min-w-0 truncate text-center">
          {ballotName}
        </h1>
      </div>,
    );
    return () => setCenterContent(null);
  }, [ballotId, ballotName, setCenterContent]);

  const handleSave = () => {
    router.push("/ballot");
  };

  if (!profile?.nickname) {
    return null;
  }
  if (!user || !ballot || ballot.userId !== user.id || isEventStarted()) {
    return null;
  }

  return (
    <AppShell
      variant="dark"
      showLogo={true}
      showAvatar={false}
      mainClassName="flex flex-col min-h-0"
    >
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
