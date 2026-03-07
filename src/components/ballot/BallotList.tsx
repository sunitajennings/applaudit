"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Tickets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBallotsByUser } from "@/lib/queries/ballots";
import { createClient } from "@/lib/supabase/client";
import { isEventStarted } from "@/data/oscar-2026";
import type { Ballot } from "@/lib/ballot/types";

interface BallotListProps {
  userId: string;
  groupId: string | null;
}

export function BallotList({ userId, groupId }: BallotListProps) {
  const router = useRouter();
  const supabase = createClient();
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const eventStarted = isEventStarted();

  useEffect(() => {
    getBallotsByUser(supabase, userId).then(setBallots).catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-display font-bold">
          {groupId ? "My Party" : "My Ballots"}
        </h2>
        <Button
          type="button"
          size="sm"
          className="rounded-full shrink-0"
          onClick={() => router.push("/ballot/new")}
          aria-label="Create new ballot"
        >
          <Plus className="size-4 shrink-0" aria-hidden />
          New
        </Button>
      </div>

      {ballots.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">
          No ballots yet. Create one to start picking your winners.
        </p>
      )}

      {ballots.length > 0 && (
        <ul className="space-y-3">
          {ballots.map((ballot) => {
            const editHref = `/ballot/${ballot.id}/edit`;
            const cardBody = (
              <>
                <Tickets
                  className="size-8 shrink-0 text-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="font-bold font-display text-lg text-foreground truncate">
                    {ballot.name}
                  </span>
                </div>
              </>
            );
            return (
              <li key={ballot.id}>
                {eventStarted ? (
                  <div
                    className="flex items-center gap-4 rounded-2xl border border-[var(--foreground)] p-4 cursor-default"
                    aria-disabled="true"
                    title="Voting has closed"
                  >
                    {cardBody}
                  </div>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl border border-[var(--foreground)] p-4">
                    <Link
                      href={editHref}
                      className="flex items-center gap-4 min-w-0 flex-1 transition-opacity hover:opacity-95 active:opacity-90"
                    >
                      {cardBody}
                    </Link>
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="shrink-0 rounded-full"
                    >
                      <Link href={editHref}>Edit</Link>
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
