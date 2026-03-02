"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import type { UserSummary } from "@/lib/live/types";
import { cn } from "@/lib/utils";

export interface LiveTopbarProps {
  /** Users to show as avatars (e.g. group members). */
  users: UserSummary[];
  /** User ids that are currently in the lead (top correct-guess count). */
  leaderUserIds: string[];
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "??";
}

export function LiveTopbar({ users, leaderUserIds }: LiveTopbarProps) {
  return (
    <header className="flex items-center justify-between gap-3 py-3 border-b border-border">
      <div className="flex items-center min-w-0 flex-1">
        {users.length === 0 ? (
          <span className="text-muted-foreground text-sm">No users</span>
        ) : (
          <div className="flex -space-x-2" aria-label="Leaderboard">
            {[...users]
              .sort((a, b) => {
                const aLeader = leaderUserIds.includes(a.id);
                const bLeader = leaderUserIds.includes(b.id);
                if (aLeader === bLeader) return 0;
                return aLeader ? 1 : -1;
              })
              .map((user) => {
              const isLeader = leaderUserIds.includes(user.id);
              return (
                <div
                  key={user.id}
                  className={cn(
                    "relative shrink-0 rounded-full ring-2 ring-background",
                    isLeader && "ring-amber-400 z-10"
                  )}
                  title={user.name}
                >
                  <Avatar
                    initials={initialsFromName(user.name)}
                    size="sm"
                    selected={false}
                    className="shrink-0"
                  />
                  {isLeader && (
                    <span
                      className="absolute -top-0.5 -right-0.5 rounded-full bg-amber-500 p-0.5 text-white z-[1]"
                      aria-hidden
                    >
                      <Star className="h-3 w-3" fill="currentColor" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Link
        href="/live/leaderboard"
        className="shrink-0 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Go to leaderboard
      </Link>
    </header>
  );
}
