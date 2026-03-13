/**
 * Minimal types for live mode prototype.
 * Full domain types when wiring real DB.
 */

/** categoryId → nomineeId. Single source of truth for declared winner per category. */
export type DeclaredWinners = Record<string, string>;

/** Minimal user shape for leaderboard. A user can have one or more ballots. */
export interface UserSummary {
  id: string;
  name: string;
}

/** Minimal ballot shape for UI (e.g. topbar, leaderboard). Belongs to a user. Full Ballot type in ballot/types.ts. */
export interface BallotSummary {
  id: string;
  userId: string;
  name: string;
  userNickname: string;  // for displaying initials; empty string if not set
}

/** Row for leaderboard: user + their best correct-guess count (max across their ballots). */
export interface LeaderboardUserRow {
  user: UserSummary;
  correctCount: number;
}
