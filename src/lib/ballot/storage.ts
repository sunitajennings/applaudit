import type { Ballot, BallotChoice } from "./types";

const STORAGE_KEY = "applaudit_ballots";

interface StoredBallots {
  ballots: Ballot[];
  choices: BallotChoice[];
}

function loadAll(): StoredBallots {
  if (typeof window === "undefined") {
    return { ballots: [], choices: [] };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load ballots:", e);
  }
  return { ballots: [], choices: [] };
}

function saveAll(data: StoredBallots): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save ballots:", e);
  }
}

export function getBallotsByUser(userId: string): Ballot[] {
  const { ballots } = loadAll();
  return ballots.filter((b) => b.userId === userId).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getBallotsByUserAndGroup(userId: string, groupId: string): Ballot[] {
  return getBallotsByUser(userId).filter((b) => b.groupId === groupId);
}

export function getBallotById(id: string): Ballot | undefined {
  const { ballots } = loadAll();
  return ballots.find((b) => b.id === id);
}

export function getChoicesForBallot(ballotId: string): BallotChoice[] {
  const { choices } = loadAll();
  return choices.filter((c) => c.ballotId === ballotId);
}

export function saveBallot(ballot: Ballot, choices: BallotChoice[]): void {
  const data = loadAll();
  const ballotIndex = data.ballots.findIndex((b) => b.id === ballot.id);
  if (ballotIndex >= 0) {
    data.ballots[ballotIndex] = ballot;
  } else {
    data.ballots.push(ballot);
  }
  data.choices = data.choices.filter((c) => c.ballotId !== ballot.id);
  data.choices.push(...choices);
  saveAll(data);
}

export function createBallot(
  userId: string,
  groupId: string,
  awardShowId: string,
  name: string
): Ballot {
  const now = new Date().toISOString();
  const ballot: Ballot = {
    id: `ballot_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
    userId,
    groupId,
    awardShowId,
    name,
    createdAt: now,
    updatedAt: now,
  };
  const data = loadAll();
  data.ballots.push(ballot);
  saveAll(data);
  return ballot;
}

export function updateBallot(ballot: Ballot): void {
  const data = loadAll();
  const i = data.ballots.findIndex((b) => b.id === ballot.id);
  if (i >= 0) {
    data.ballots[i] = { ...ballot, updatedAt: new Date().toISOString() };
    saveAll(data);
  }
}

export function setBallotChoices(ballotId: string, newChoices: BallotChoice[]): void {
  const data = loadAll();
  data.choices = data.choices.filter((c) => c.ballotId !== ballotId);
  data.choices.push(...newChoices);
  saveAll(data);
}
