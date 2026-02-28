import type { AwardShow, Category, Nominee } from "@/lib/ballot/types";

const DEFAULT_EVENT_ISO = "2026-03-15T01:00:00.000Z";

function getEventStartIso(): string {
  return process.env.NEXT_PUBLIC_EVENT_START_ISO ?? DEFAULT_EVENT_ISO;
}

export const AWARD_SHOW_ID = "oscars-2026";

export const oscars2026: AwardShow = {
  id: AWARD_SHOW_ID,
  name: "Oscars 2026",
  eventStartAt: getEventStartIso(),
  status: "upcoming",
};

export function getEventStartDate(): Date | null {
  const date = new Date(getEventStartIso());
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isEventStarted(): boolean {
  const start = getEventStartDate();
  return start ? Date.now() >= start.getTime() : false;
}

// Categories and nominees for 98th Academy Awards (2026)
// Each nominee: { name, movie } — movie shown in italics after name.
const categoriesData: {
  name: string;
  nominees: { name: string; movie: string }[];
}[] = [
  {
    name: "Best Picture",
    nominees: [
      { name: "Bugonia", movie: "" },
      { name: "F1", movie: "" },
      { name: "Frankenstein", movie: "" },
      { name: "Hamnet", movie: "" },
      { name: "Marty Supreme", movie: "" },
      { name: "One Battle After Another", movie: "" },
      { name: "The Secret Agent", movie: "" },
      { name: "Sentimental Value", movie: "" },
      { name: "Sinners", movie: "" },
      { name: "Train Dreams", movie: "" },
    ],
  },
  {
    name: "Directing",
    nominees: [
      { name: "Chloé Zhao", movie: "Hamnet" },
      { name: "Josh Safdie", movie: "Marty Supreme" },
      { name: "Paul Thomas Anderson", movie: "One Battle After Another" },
      { name: "Joachim Trier", movie: "Sentimental Value" },
      { name: "Ryan Coogler", movie: "Sinners" },
    ],
  },
  {
    name: "Actress in a Leading Role",
    nominees: [
      { name: "Jessie Buckley", movie: "Hamnet" },
      { name: "Rose Byrne", movie: "If I Had Legs I'd Kick You" },
      { name: "Kate Hudson", movie: "Song Sung Blue" },
      { name: "Renate Reinsve", movie: "Sentimental Value" },
      { name: "Emma Stone", movie: "Bugonia" },
    ],
  },
  {
    name: "Actor in a Leading Role",
    nominees: [
      { name: "Timothée Chalamet", movie: "Marty Supreme" },
      { name: "Leonardo DiCaprio", movie: "One Battle After Another" },
      { name: "Ethan Hawke", movie: "Blue Moon" },
      { name: "Michael B. Jordan", movie: "Sinners" },
      { name: "Wagner Moura", movie: "The Secret Agent" },
    ],
  },
  {
    name: "Actress in a Supporting Role",
    nominees: [
      { name: "Elle Fanning", movie: "Sentimental Value" },
      { name: "Inga Ibsdotter Lilleaas", movie: "Sentimental Value" },
      { name: "Amy Madigan", movie: "Weapons" },
      { name: "Wunmi Mosaku", movie: "Sinners" },
      { name: "Teyana Taylor", movie: "One Battle After Another" },
    ],
  },
  {
    name: "Actor in a Supporting Role",
    nominees: [
      { name: "Benicio Del Toro", movie: "One Battle After Another" },
      { name: "Jacob Elordi", movie: "Frankenstein" },
      { name: "Delroy Lindo", movie: "Sinners" },
      { name: "Sean Penn", movie: "One Battle After Another" },
      { name: "Stellan Skarsgård", movie: "Sentimental Value" },
    ],
  },
  {
    name: "Best Casting",
    nominees: [
      { name: "Hamnet", movie: "" },
      { name: "Marty Supreme", movie: "" },
      { name: "One Battle After Another", movie: "" },
      { name: "The Secret Agent", movie: "" },
      { name: "Sinners", movie: "" },
    ],
  },
  {
    name: "Writing (Original Screenplay)",
    nominees: [
      { name: "Robert Kaplow", movie: "Blue Moon" },
      { name: "Jafar Panahi", movie: "It Was Just an Accident" },
      { name: "Ronald Bronstein & Josh Safdie", movie: "Marty Supreme" },
      { name: "Joachim Trier & Eskil Vogt", movie: "Sentimental Value" },
      { name: "Ryan Coogler", movie: "Sinners" },
    ],
  },
  {
    name: "Writing (Adapted Screenplay)",
    nominees: [
      { name: "Will Tracy", movie: "Bugonia" },
      { name: "Guillermo del Toro", movie: "Frankenstein" },
      { name: "Chloé Zhao & Maggie O'Farrell", movie: "Hamnet" },
      { name: "Paul Thomas Anderson", movie: "One Battle After Another" },
      { name: "Clint Bentley & Greg Kwedar", movie: "Train Dreams" },
    ],
  },
  {
    name: "Animated Feature",
    nominees: [
      { name: "Arco", movie: "" },
      { name: "Elio", movie: "" },
      { name: "KPop Demon Hunters", movie: "" },
      { name: "Little Amélie or the Character of Rain", movie: "" },
      { name: "Zootopia 2", movie: "" },
    ],
  },
  {
    name: "Documentary Feature",
    nominees: [
      { name: "The Alabama Solution", movie: "" },
      { name: "Come See Me in the Good Light", movie: "" },
      { name: "Cutting Through Rocks", movie: "" },
      { name: "Mr. Nobody Against Putin", movie: "" },
      { name: "The Perfect Neighbor", movie: "" },
    ],
  },
  {
    name: "International Feature Film",
    nominees: [
      { name: "The Secret Agent", movie: "" },
      { name: "It Was Just an Accident", movie: "" },
      { name: "Sentimental Value", movie: "" },
      { name: "Sirât", movie: "" },
      { name: "The Voice of Hind Rajab", movie: "" },
    ],
  },
  {
    name: "Music (Original Score)",
    nominees: [
      { name: "Bugonia", movie: "" },
      { name: "Frankenstein", movie: "" },
      { name: "Hamnet", movie: "" },
      { name: "One Battle After Another", movie: "" },
      { name: "Sinners", movie: "" },
    ],
  },
  {
    name: "Music (Original Song)",
    nominees: [
      { name: "\u201cDear Me,\u201d", movie: "Diane Warren: Relentless" },
      { name: "\u201cGolden,\u201d", movie: "KPop Demon Hunters" },
      { name: "\u201cHighest 2 Lowest,\u201d", movie: "Highest 2 Lowest" },
      { name: "\u201cI Lied To You,\u201d", movie: "Sinners" },
      { name: "\u201cSweet Dreams of Joy,\u201d", movie: "Viva Verd\u00ed!" },
      { name: "\u201cTrain Dreams,\u201d", movie: "Train Dreams" },
    ],
  },
  {
    name: "Sound",
    nominees: [
      { name: "F1", movie: "" },
      { name: "Frankenstein", movie: "" },
      { name: "One Battle After Another", movie: "" },
      { name: "Sinners", movie: "" },
      { name: "Sirât", movie: "" },
    ],
  },
  {
    name: "Makeup and Hairstyling",
    nominees: [
      { name: "Frankenstein", movie: "" },
      { name: "Kokuho", movie: "" },
      { name: "Sinners", movie: "" },
      { name: "The Smashing Machine", movie: "" },
      { name: "The Ugly Stepsister", movie: "" },
    ],
  },
  {
    name: "Costume Design",
    nominees: [
      { name: "Avatar: Fire and Ash", movie: "" },
      { name: "Frankenstein", movie: "" },
      { name: "Hamnet", movie: "" },
      { name: "Marty Supreme", movie: "" },
      { name: "Sinners", movie: "" },
    ],
  },
  {
    name: "Cinematography",
    nominees: [
      { name: "Frankenstein", movie: "" },
      { name: "Marty Supreme", movie: "" },
      { name: "One Battle After Another", movie: "" },
      { name: "Sentimental Value", movie: "" },
      { name: "Sinners", movie: "" },
    ],
  },
];

export const categories: Category[] = categoriesData.map((cat, index) => ({
  id: `cat-${AWARD_SHOW_ID}-${index}`,
  awardShowId: AWARD_SHOW_ID,
  name: cat.name,
  order: index,
}));

const nomineeId = (categoryId: string, index: number) =>
  `nom-${categoryId}-${index}`;

export const nominees: Nominee[] = categories.flatMap((cat) =>
  categoriesData[cat.order]!.nominees.map((nom, i) => ({
    id: nomineeId(cat.id, i),
    categoryId: cat.id,
    name: nom.name,
    movie: nom.movie,
  })),
);

export function getNomineesForCategory(categoryId: string): Nominee[] {
  return nominees.filter((n) => n.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getNomineeById(id: string): Nominee | undefined {
  return nominees.find((n) => n.id === id);
}
