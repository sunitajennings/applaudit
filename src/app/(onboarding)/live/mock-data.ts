import {
  categories,
  getNomineesForCategory,
} from "@/data/oscar-2026";
import type { BallotSummary } from "@/lib/live/types";
import type { BallotChoice } from "@/lib/ballot/types";

/**
 * Prototype: mock ballots. Each ballot belongs to a user and has a name.
 * Later: getBallotsByUser / getBallotsByUserAndGroup.
 */
export const MOCK_BALLOTS: BallotSummary[] = [
  { id: "mock-ballot-1", userId: "user-1", name: "Head" },
  { id: "mock-ballot-2", userId: "user-1", name: "Heart" },
  // { id: "mock-ballot-3", userId: "user-1", name: "Oscar Night" },
  // { id: "mock-ballot-4", userId: "user-1", name: "Dark Horse" },
];

function getMockChoices(): BallotChoice[] {
  const choices: BallotChoice[] = [];
  const catIds = categories.slice(0, 4).map((c) => c.id);
  const ballotIds = MOCK_BALLOTS.map((b) => b.id);
  catIds.forEach((categoryId, catIndex) => {
    const nominees = getNomineesForCategory(categoryId);
    ballotIds.forEach((ballotId, ballotIndex) => {
      const nomineeIndex = (catIndex + ballotIndex) % Math.max(1, nominees.length);
      const nominee = nominees[nomineeIndex];
      if (nominee) {
        choices.push({ ballotId, categoryId, nomineeId: nominee.id });
      }
    });
  });
  return choices;
}

/** Prototype: mock choices. Later: getChoicesForBallot. */
export const MOCK_CHOICES = getMockChoices();
