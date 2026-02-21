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

// Categories and nominees for 98th Academy Awards (2026) - placeholder nominees until official list
// Each nominee: { name, movie } — movie shown in italics after name. Varying counts (3–8) per category for prototype.
const categoriesData: {
  name: string;
  nominees: { name: string; movie: string }[];
}[] = [
  {
    name: "Best Picture",
    nominees: [
      { name: "Sinners", movie: "Sinners" },
      { name: "One Battle After Another", movie: "One Battle After Another" },
      { name: "Film C", movie: "Film C" },
      { name: "Film D", movie: "Film D" },
      { name: "Film E", movie: "Film E" },
      { name: "Film F", movie: "Film F" },
      { name: "Film G", movie: "Film G" },
      { name: "Film H", movie: "Film H" },
    ],
  },
  {
    name: "Directing",
    nominees: [
      { name: "Director A", movie: "Film A" },
      { name: "Director B", movie: "Film B" },
      { name: "Director C", movie: "Film C" },
    ],
  },
  {
    name: "Actor in a Leading Role",
    nominees: [
      { name: "Actor A", movie: "Film A" },
      { name: "Actor B", movie: "Film B" },
      { name: "Actor C", movie: "Film C" },
      { name: "Actor D", movie: "Film D" },
      { name: "Actor E", movie: "Film E" },
      { name: "Actor F", movie: "Film F" },
    ],
  },
  {
    name: "Actress in a Leading Role",
    nominees: [
      { name: "Actress A", movie: "Film A" },
      { name: "Actress B", movie: "Film B" },
      { name: "Actress C", movie: "Film C" },
      { name: "Actress D", movie: "Film D" },
    ],
  },
  {
    name: "Actor in a Supporting Role",
    nominees: [
      { name: "Supporting A", movie: "Film A" },
      { name: "Supporting B", movie: "Film B" },
      { name: "Supporting C", movie: "Film C" },
      { name: "Supporting D", movie: "Film D" },
      { name: "Supporting E", movie: "Film E" },
      { name: "Supporting F", movie: "Film F" },
      { name: "Supporting G", movie: "Film G" },
    ],
  },
  {
    name: "Actress in a Supporting Role",
    nominees: [
      { name: "Supporting A", movie: "Film A" },
      { name: "Supporting B", movie: "Film B" },
      { name: "Supporting C", movie: "Film C" },
    ],
  },
  {
    name: "Animated Feature Film",
    nominees: [
      { name: "Animated A", movie: "Animated A" },
      { name: "Animated B", movie: "Animated B" },
      { name: "Animated C", movie: "Animated C" },
      { name: "Animated D", movie: "Animated D" },
      { name: "Animated E", movie: "Animated E" },
      { name: "Animated F", movie: "Animated F" },
      { name: "Animated G", movie: "Animated G" },
      { name: "Animated H", movie: "Animated H" },
    ],
  },
  {
    name: "Cinematography",
    nominees: [
      { name: "Cinematographer A", movie: "Film A" },
      { name: "Cinematographer B", movie: "Film B" },
      { name: "Cinematographer C", movie: "Film C" },
      { name: "Cinematographer D", movie: "Film D" },
      { name: "Cinematographer E", movie: "Film E" },
    ],
  },
  {
    name: "Costume Design",
    nominees: [
      { name: "Designer A", movie: "Film A" },
      { name: "Designer B", movie: "Film B" },
      { name: "Designer C", movie: "Film C" },
      { name: "Designer D", movie: "Film D" },
      { name: "Designer E", movie: "Film E" },
      { name: "Designer F", movie: "Film F" },
      { name: "Designer G", movie: "Film G" },
    ],
  },
  {
    name: "Achievement in Casting",
    nominees: [
      { name: "Casting A", movie: "Film A" },
      { name: "Casting B", movie: "Film B" },
      { name: "Casting C", movie: "Film C" },
      { name: "Casting D", movie: "Film D" },
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
