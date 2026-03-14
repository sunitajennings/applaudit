import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/lib/store/session";
import { getBallotSummariesByAwardShow, getChoicesForBallots } from "@/lib/queries/ballots";
import { getCategoriesByAwardShow, getNomineesByAwardShow } from "@/lib/queries/categories";
import { fetchDeclaredWinners, upsertDeclaredWinner, deleteDeclaredWinner } from "@/lib/queries/winners";
import type { BallotSummary, DeclaredWinners, UserSummary } from "@/lib/live/types";
import type { BallotChoice, Category, Nominee } from "@/lib/ballot/types";

export function useLiveData(awardShowId: string) {
  const { user, profile, isLoading } = useSession();
  const [supabase] = useState(() => createClient());
  const [allBallots, setAllBallots] = useState<BallotSummary[]>([]);
  const [allChoices, setAllChoices] = useState<BallotChoice[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [declaredWinners, setDeclaredWinners] = useState<DeclaredWinners>({});

  useEffect(() => {
    Promise.all([
      getCategoriesByAwardShow(supabase, awardShowId),
      getNomineesByAwardShow(supabase, awardShowId),
    ])
      .then(([cats, noms]) => {
        setCategories(cats);
        setNominees(noms);
      })
      .catch(console.error)
      .finally(() => setIsCategoriesLoading(false));
  }, [supabase, awardShowId]);

  useEffect(() => {
    if (!user || isLoading) return;
    getBallotSummariesByAwardShow(supabase, awardShowId)
      .then(setAllBallots)
      .catch(console.error);
  }, [user?.id, isLoading, supabase, awardShowId]);

  useEffect(() => {
    if (allBallots.length === 0) return;
    getChoicesForBallots(supabase, allBallots.map((b) => b.id))
      .then(setAllChoices)
      .catch(console.error)
      .finally(() => setIsDataLoading(false));
  }, [allBallots, supabase]);

  // Fetch declared winners and subscribe to realtime updates
  useEffect(() => {
    if (!user || isLoading) return;

    fetchDeclaredWinners(supabase, awardShowId)
      .then(setDeclaredWinners)
      .catch(console.error);

    const channel = supabase
      .channel(`declared_winners:${awardShowId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "declared_winners",
          filter: `award_show_id=eq.${awardShowId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            const row = payload.new as { category_id: string; nominee_id: string };
            setDeclaredWinners((prev) => ({ ...prev, [row.category_id]: row.nominee_id }));
          } else if (payload.eventType === "DELETE") {
            const row = payload.old as { category_id: string };
            setDeclaredWinners((prev) => {
              const next = { ...prev };
              delete next[row.category_id];
              return next;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, isLoading, supabase, awardShowId]);

  const setWinner = useCallback(
    (categoryId: string, nomineeId: string) => {
      setDeclaredWinners((prev) => ({ ...prev, [categoryId]: nomineeId }));
      upsertDeclaredWinner(supabase, awardShowId, categoryId, nomineeId).catch(console.error);
    },
    [supabase, awardShowId]
  );

  const clearWinner = useCallback(
    (categoryId: string) => {
      setDeclaredWinners((prev) => {
        const next = { ...prev };
        delete next[categoryId];
        return next;
      });
      deleteDeclaredWinner(supabase, awardShowId, categoryId).catch(console.error);
    },
    [supabase, awardShowId]
  );

  const allBallotPatched = useMemo(() => {
    const nickname = profile?.nickname;
    if (!user || !nickname) return allBallots;
    return allBallots.map((b) =>
      b.userId === user.id ? { ...b, userNickname: nickname } : b
    );
  }, [allBallots, user, profile?.nickname]);

  const allUsers: UserSummary[] = useMemo(() => {
    const seen = new Set<string>();
    return allBallotPatched
      .filter((b) => { if (seen.has(b.userId)) return false; seen.add(b.userId); return true; })
      .map((b) => ({ id: b.userId, name: b.userNickname }));
  }, [allBallotPatched]);

  const myBallots = useMemo(
    () => allBallotPatched.filter((b) => b.userId === user?.id),
    [allBallotPatched, user?.id]
  );

  const getNomineesForCategory = useCallback(
    (categoryId: string) => nominees.filter((n) => n.categoryId === categoryId),
    [nominees]
  );

  return {
    allBallots: allBallotPatched,
    allChoices,
    allUsers,
    myBallots,
    categories,
    nominees,
    getNomineesForCategory,
    isDataLoading: isDataLoading || isCategoriesLoading,
    isSessionLoading: isLoading,
    user,
    declaredWinners,
    setWinner,
    clearWinner,
  };
}
