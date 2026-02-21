"use client";

import { useEffect, useState } from "react";
import { getEventStartDate } from "@/data/oscar-2026";

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 py-3">
      <span className="text-lg sm:text-xl font-display font-bold tabular-nums text-foreground">
        {value}
      </span>
      <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-foreground">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div className="shrink-0 w-px h-8 bg-gold/40 rounded-full" aria-hidden />
  );
}

export function Countdown() {
  const eventDate = getEventStartDate();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const next = Math.ceil(Date.now() / 1000) * 1000;
      setNow(next);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (now === null || !eventDate) {
    return (
      <div className="space-y-2">
        <p className="text-center text-gold text-sm font-medium">
          Showtime begins in
        </p>
        <div className="text-center text-gold text-sm">Event time not set</div>
      </div>
    );
  }

  const diff = Math.max(0, eventDate.getTime() - now);
  const hasStarted = diff === 0;

  if (hasStarted) {
    return (
      <div className="text-center">
        <p className="text-xl font-display font-bold text-primary">
          Show time!
        </p>
        <p className="text-gold text-sm">The red carpet is on.</p>
      </div>
    );
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 60000) % 60);
  const hours = Math.floor((diff / 3600000) % 24);
  const days = Math.floor(diff / 86400000);

  return (
    <div className="space-y-2">
      <p className="text-center text-gold text-sm uppercase tracking-wider font-medium">
        Showtime begins in
      </p>
      <div
        className="countdown-gradient flex items-stretch rounded-full border border-gold/50 shadow-sm overflow-hidden"
        role="timer"
        aria-live="polite"
        aria-label={`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds until the show`}
      >
        <Segment value={days} label="Days" />
        <Divider />
        <Segment value={hours} label="Hours" />
        <Divider />
        <Segment value={minutes} label="Minutes" />
        <Divider />
        <Segment value={seconds} label="Seconds" />
      </div>
    </div>
  );
}
