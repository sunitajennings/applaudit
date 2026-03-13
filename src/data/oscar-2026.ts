import type { AwardShow } from "@/lib/ballot/types";

const DEFAULT_EVENT_ISO = "2026-03-16T00:00:00.000Z"; // show starts Sun, Mar 15, 2026, 5:00 PM MST

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
