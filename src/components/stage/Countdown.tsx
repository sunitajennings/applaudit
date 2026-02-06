"use client";

import { useEffect, useState } from "react";

const DEFAULT_EVENT_ISO = "2026-03-02T01:00:00.000Z"; // Oscars 2026 example

function getEventDate(): Date | null {
  if (typeof window === "undefined") return null;
  const iso = process.env.NEXT_PUBLIC_EVENT_START_ISO ?? DEFAULT_EVENT_ISO;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatPart(n: number, label: string): string {
  return `${n} ${label}${n !== 1 ? "s" : ""}`;
}

export function Countdown() {
  const eventDate = getEventDate();
  const [now, setNow] = useState(() => (typeof window !== "undefined" ? Date.now() : 0));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted || !eventDate) {
    return (
      <div className="text-center text-muted-foreground text-sm">
        Event time not set
      </div>
    );
  }

  const diff = Math.max(0, eventDate.getTime() - now);
  const hasStarted = diff === 0;

  if (hasStarted) {
    return (
      <div className="text-center">
        <p className="text-xl font-display font-bold text-primary">Show time!</p>
        <p className="text-muted-foreground text-sm">The red carpet is on.</p>
      </div>
    );
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 60000) % 60);
  const hours = Math.floor((diff / 3600000) % 24);
  const days = Math.floor(diff / 86400000);

  const parts: string[] = [];
  if (days > 0) parts.push(formatPart(days, "day"));
  if (hours > 0) parts.push(formatPart(hours, "hr"));
  parts.push(formatPart(minutes, "min"));
  parts.push(formatPart(seconds, "sec"));

  return (
    <div className="text-center space-y-1">
      <p className="text-muted-foreground text-sm">Time until the show</p>
      <p className="text-xl font-display font-bold tabular-nums">
        {parts.join(" ")}
      </p>
    </div>
  );
}
