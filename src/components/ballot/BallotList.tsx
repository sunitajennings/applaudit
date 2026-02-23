"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Tickets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBallotsByUser } from "@/lib/ballot/storage";
import { isEventStarted } from "@/data/oscar-2026";

interface BallotListProps {
  userId: string;
  groupId: string | null;
}

export function BallotList({ userId, groupId }: BallotListProps) {
  const router = useRouter();
  const ballots = getBallotsByUser(userId);
  const eventStarted = isEventStarted();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-display font-bold">
        {groupId ? "My Party" : "My Ballots"}
      </h2>

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

      {ballots.length === 0 ? (
        <Button
          type="button"
          size="2xl"
          className="w-full rounded-full font-display font-bold"
          onClick={() => router.push("/ballot/new")}
        >
          <Plus className="size-5 shrink-0" aria-hidden />
          Create new ballot
        </Button>
      ) : (
        <div className="flex justify-center">
          <Button
            type="button"
            size="icon"
            className="rounded-full"
            onClick={() => router.push("/ballot/new")}
            aria-label="Create new ballot"
          >
            <Plus className="size-5" aria-hidden />
          </Button>
        </div>
      )}
    </div>
  );
}
