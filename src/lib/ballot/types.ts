export type AwardShowStatus = "upcoming" | "inprogress" | "completed";

export interface AwardShow {
  id: string;
  name: string;
  eventStartAt: string; // ISO
  status: AwardShowStatus;
}

export interface Category {
  id: string;
  awardShowId: string;
  name: string;
  order: number;
}

export interface Nominee {
  id: string;
  categoryId: string;
  name: string;
  movie?: string; // film title, shown in italics after name
}

export interface Ballot {
  id: string;
  userId: string;
  groupId: string;
  awardShowId: string;
  name: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface BallotChoice {
  ballotId: string;
  categoryId: string;
  nomineeId: string;
}
