"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Tickets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  const creamBg = "#F0E8D9";

  return (
    /* Full-width dark bar; scallops full width, content aligned with page (max-w-md) */
    <div className="relative left-1/2 -translate-x-1/2 w-screen bg-[#2B1927]">
      {/* Top scallop: full width of dark container */}
      <div
        className="w-full flex-shrink-0 bg-background"
        style={{
          height: 24,
          backgroundImage: "url(/images/ballotsborder.png)",
          backgroundRepeat: "repeat-x",
          backgroundSize: "421px 6px",
          backgroundPosition: "bottom",
        }}
        aria-hidden
      />
      <div className="max-w-md mx-auto px-4">
        <Card
          variant="dark"
          className="w-full rounded-none border-0 pt-0 pb-0 gap-0 shadow-none"
        >
        <div className="py-8 space-y-4">
        <h2 className="text-lg font-display font-bold">
          {groupId ? "My Party" : "Ballots"}
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
              return (
                <li key={ballot.id}>
                  {eventStarted ? (
                    <div
                      className="flex items-center gap-4 rounded-2xl border border-[#2B1927] p-4"
                      style={{ backgroundColor: creamBg }}
                      title="Voting has closed"
                    >
                      <Tickets
                        className="size-8 shrink-0 text-[#2B1927]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className="font-bold font-display text-lg text-[#2B1927] truncate">
                          {ballot.name}
                        </span>
                      </div>
                      <Button
                        asChild
                        variant="secondary"
                        size="lg"
                        className="shrink-0 rounded-full"
                      >
                        <Link href={editHref}>Edit</Link>
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-4 rounded-2xl border border-[#2B1927] p-4"
                      style={{ backgroundColor: creamBg }}
                    >
                      <Link
                        href={editHref}
                        className="flex items-center gap-4 min-w-0 flex-1 transition-opacity hover:opacity-95 active:opacity-90"
                      >
                        <Tickets
                          className="size-8 shrink-0 text-[#2B1927]"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="font-bold font-display text-lg text-[#2B1927] truncate">
                            {ballot.name}
                          </span>
                        </div>
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

        <Button
          type="button"                    
          className="w-full font-display font-semibold mt-4 p-7"
          onClick={() => router.push("/ballot/new")}
          aria-label="Add a ballot"
        >
          <Plus className="size-5 shrink-0" aria-hidden />
          Add a ballot
        </Button>
      </div>
      </Card>
      </div>
      {/* Bottom scallop: full width of dark container */}
      <div
        className="w-full flex-shrink-0 bg-background"
        style={{
          height: 24,
          backgroundImage: "url(/images/ballotsborderbtm.png)",
          backgroundRepeat: "repeat-x",
          backgroundSize: "421px 6px",
          backgroundPosition: "top",
        }}
        aria-hidden
      />
    </div>
  );
}
