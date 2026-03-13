import type { AwardShow, Category, Nominee } from "@/lib/ballot/types";

const DEFAULT_EVENT_ISO = "2026-03-16T00:00:00.000Z"; // show starts Sun, Mar 15, 2026, 5:00 PM MST

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
      { name: "Nina Gold", movie: "Hamnet" },
      { name: "Jennifer Venditti", movie: "Marty Supreme" },
      { name: "Cassandra Kulukundis", movie: "One Battle After Another" },
      { name: "Gabriel Domingues", movie: "The Secret Agent" },
      { name: "Francine Maisler", movie: "Sinners" },
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
      { name: "Jerskin Fendrix", movie: "Bugonia" },
      { name: "Alexandre Desplat", movie: "Frankenstein" },
      { name: "Max Richter", movie: "Hamnet" },
      { name: "Jonny Greenwood", movie: "One Battle After Another" },
      { name: "Ludwig Göransson", movie: "Sinners" },
    ],
  },
  {
    name: "Music (Original Song)",
    nominees: [
      { name: '"Dear Me"', movie: "Diane Warren: Relentless" },
      { name: '"Golden"', movie: "KPop Demon Hunters" },
      { name: '"I Lied to You"', movie: "Sinners" },
      { name: '"Sweet Dreams of Joy"', movie: "Viva Verdi!" },
      { name: '"Train Dreams"', movie: "Train Dreams" },
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
      { name: "Deborah L. Scott", movie: "Avatar: Fire and Ash" },
      { name: "Kate Hawley", movie: "Frankenstein" },
      { name: "Malgosia Turzanska", movie: "Hamnet" },
      { name: "Miyako Bellizzi", movie: "Marty Supreme" },
      { name: "Ruth E. Carter", movie: "Sinners" },
    ],
  },
  {
    name: "Cinematography",
    nominees: [
      { name: "Dan Laustsen", movie: "Frankenstein" },
      { name: "Darius Khondji", movie: "Marty Supreme" },
      { name: "Michael Bauman", movie: "One Battle After Another" },
      { name: "Autumn Durald Arkapaw", movie: "Sinners" },
      { name: "Adolpho Veloso", movie: "Train Dreams" },
    ],
  },
  {
    name: "Film Editing",
    nominees: [
      { name: "Stephen Mirrione", movie: "F1" },
      { name: "Ronald Bronstein & Josh Safdie", movie: "Marty Supreme" },
      { name: "Andy Jurgensen", movie: "One Battle After Another" },
      { name: "Olivier Bugge Coutté", movie: "Sentimental Value" },
      { name: "Michael P. Shawver", movie: "Sinners" },
    ],
  },
  {
    name: "Production Design",
    nominees: [
      { name: "Frankenstein", movie: "" },
      { name: "Hamnet", movie: "" },
      { name: "Marty Supreme", movie: "" },
      { name: "One Battle After Another", movie: "" },
      { name: "Sinners", movie: "" },
    ],
  },
  {
    name: "Visual Effects",
    nominees: [
      { name: "Avatar: Fire and Ash", movie: "" },
      { name: "F1", movie: "" },
      { name: "Jurassic World Rebirth", movie: "" },
      { name: "The Lost Bus", movie: "" },
      { name: "Sinners", movie: "" },
    ],
  },
  {
    name: "Live Action Short Film",
    nominees: [
      { name: "Butcher's Stain", movie: "" },
      { name: "A Friend of Dorothy", movie: "" },
      { name: "Jane Austen's Period Drama", movie: "" },
      { name: "The Singers", movie: "" },
      { name: "Two People Exchanging Saliva", movie: "" },
    ],
  },
  {
    name: "Animated Short Film",
    nominees: [
      { name: "Butterfly", movie: "" },
      { name: "Forevergreen", movie: "" },
      { name: "The Girl Who Cried Pearls", movie: "" },
      { name: "Retirement Plan", movie: "" },
      { name: "The Three Sisters", movie: "" },
    ],
  },
  {
    name: "Documentary Short Film",
    nominees: [
      { name: "All the Empty Rooms", movie: "" },
      {
        name: "Armed Only With a Camera: The Life and Death of Brent Renaud",
        movie: "",
      },
      { name: 'Children No More: "Were and Are Gone"', movie: "" },
      { name: "The Devil Is Busy", movie: "" },
      { name: "Perfectly a Strangeness", movie: "" },
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
