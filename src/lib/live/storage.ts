import type { BallotChoice } from "@/lib/ballot/types";
import type { DeclaredWinners } from "./types";

const STORAGE_KEY = "applaudit_declared_winners";

/** Stored shape: awardShowId → DeclaredWinners */
interface Stored {
  [awardShowId: string]: DeclaredWinners;
}

function loadAll(): Stored {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load declared winners:", e);
  }
  return {};
}

function saveAll(data: Stored): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save declared winners:", e);
  }
}

/**
 * Get declared winners for an award show (optional persistence for prototype).
 * Use in React state initializer, e.g. useState(() => getDeclaredWinners(awardShowId)).
 */
export function getDeclaredWinners(awardShowId: string): DeclaredWinners {
  const stored = loadAll();
  return stored[awardShowId] ?? {};
}

/**
 * Set the declared winner for a category. Persists to localStorage.
 * After calling, update React state with getDeclaredWinners(awardShowId) or merge locally.
 */
export function setDeclaredWinner(
  awardShowId: string,
  categoryId: string,
  nomineeId: string
): void {
  const stored = loadAll();
  const current = stored[awardShowId] ?? {};
  stored[awardShowId] = { ...current, [categoryId]: nomineeId };
  saveAll(stored);
}

/**
 * Clear the declared winner for a category (e.g. when moving AwardStatue to another category).
 */
export function clearDeclaredWinner(awardShowId: string, categoryId: string): void {
  const stored = loadAll();
  const current = stored[awardShowId] ?? {};
  const next = { ...current };
  delete next[categoryId];
  stored[awardShowId] = next;
  saveAll(stored);
}

/**
 * Pure function: count how many categories the ballot guessed correctly.
 * Works with mock or real data. Choices are the ballot's choices (e.g. from getChoicesForBallot).
 */
export function getCorrectGuessCount(
  ballotId: string,
  choices: BallotChoice[],
  declaredWinners: DeclaredWinners
): number {
  const byCategory = new Map<string, string>();
  for (const c of choices) {
    if (c.ballotId === ballotId) {
      byCategory.set(c.categoryId, c.nomineeId);
    }
  }
  let count = 0;
  for (const [categoryId, declaredNomineeId] of Object.entries(declaredWinners)) {
    if (byCategory.get(categoryId) === declaredNomineeId) {
      count += 1;
    }
  }
  return count;
}
