"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams, notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/store/session";
import { useNavCenter } from "@/lib/store/nav-center";
import { getBallotById, getChoicesForBallot } from "@/lib/queries/ballots";
import { getCategoriesByAwardShow, getNomineesByAwardShow } from "@/lib/queries/categories";
import { fetchDeclaredWinners } from "@/lib/queries/winners";
import { createClient } from "@/lib/supabase/client";
import { AWARD_SHOW_ID } from "@/data/oscar-2026";
import type { Ballot, BallotChoice, Category, Nominee } from "@/lib/ballot/types";
import type { DeclaredWinners } from "@/lib/live/types";

export default function BallotViewPage() {
  const router = useRouter();
  const params = useParams();
  const { user, profile, isLoading } = useSession();
  const { setCenterContent } = useNavCenter();
  const id = params.id as string;
  const supabase = createClient();

  const [ballot, setBallot] = useState<Ballot | null>(null);
  const [choices, setChoices] = useState<BallotChoice[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [winners, setWinners] = useState<DeclaredWinners>({});
  const [ballotNotFound, setBallotNotFound] = useState(false);

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
        if (!found) {
          setBallotNotFound(true);
          return;
        }
        const [fetchedChoices, fetchedCategories, fetchedNominees, fetchedWinners] =
          await Promise.all([
            getChoicesForBallot(supabase, found.id),
            getCategoriesByAwardShow(supabase, AWARD_SHOW_ID),
            getNomineesByAwardShow(supabase, AWARD_SHOW_ID),
            fetchDeclaredWinners(supabase, AWARD_SHOW_ID),
          ]);
        setBallot(found);
        setChoices(fetchedChoices);
        setCategories(fetchedCategories);
        setNominees(fetchedNominees);
        setWinners(fetchedWinners);
      })
      .catch(() => setBallotNotFound(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user, isLoading]);

  const ballotId = ballot?.id;
  const ballotName = ballot?.name;

  useEffect(() => {
    if (!ballotId) return;
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
        <span className="text-lg font-display font-bold capitalize min-w-0 truncate">
          {ballotName}
        </span>
      </div>,
    );
    return () => setCenterContent(null);
  }, [ballotId, ballotName, setCenterContent]);

  if (ballotNotFound) {
    notFound();
  }

  if (!profile?.nickname) {
    return null;
  }

  if (!ballot) {
    return null;
  }

  // Build choice lookup: categoryId → nomineeId
  const choiceByCategory: Record<string, string> = {};
  for (const c of choices) {
    choiceByCategory[c.categoryId] = c.nomineeId;
  }

  // Build nominee lookup: nomineeId → Nominee
  const nomineeById: Record<string, Nominee> = {};
  for (const n of nominees) {
    nomineeById[n.id] = n;
  }

  // Calculate scores
  let totalScore = 0;
  let totalDeclared = 0;
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  for (const cat of sortedCategories) {
    const winnerId = winners[cat.id];
    if (winnerId != null) {
      totalDeclared++;
      if (choiceByCategory[cat.id] === winnerId) {
        totalScore++;
      }
    }
  }

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="px-4 py-4">
          <h1 className="font-display font-bold text-xl">Your ballot: {ballot.name}</h1>
          <p className="font-display font-bold text-lg mt-1">
            Total Score: {totalScore}/{totalDeclared}
          </p>
        </div>

        <Card variant="dark" className="mx-4 gap-0 py-0 overflow-hidden">
          {sortedCategories.map((cat, idx) => {
            const winnerId = winners[cat.id];
            const chosenNomineeId = choiceByCategory[cat.id];
            const chosenNominee = chosenNomineeId ? nomineeById[chosenNomineeId] : undefined;

            let score: 1 | 0 | null = null;
            if (winnerId != null) {
              score = chosenNomineeId === winnerId ? 1 : 0;
            }

            return (
              <div key={cat.id}>
                {idx > 0 && <hr className="border-border/50" />}
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="w-10 flex items-center justify-center pt-0.5 shrink-0">
                    {score === 1 && (
                      <span className="font-semibold">1</span>
                    )}
                    {score === 0 && (
                      <span className="font-semibold opacity-40">0</span>
                    )}
                    {score === null && (
                      <span className="italic opacity-40">*</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground leading-snug">{cat.name}</p>
                    {chosenNominee ? (
                      <p className="font-medium mt-0.5">
                        {chosenNominee.name}
                        {chosenNominee.movie && (
                          <em className="font-normal text-muted-foreground"> — {chosenNominee.movie}</em>
                        )}
                      </p>
                    ) : (
                      <p className="font-medium mt-0.5">—</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Card>

        <div className="h-8" />
      </PageTransition>
    </AppShell>
  );
}
