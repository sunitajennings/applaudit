"use client";

import type React from "react";

/**
 * Placeholder for the My Ballots list. Predictions will go here.
 */
export function BallotList(): React.ReactElement {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2 py-4">
        <p className="text-muted-foreground text-sm">
          Your predictions will go here.
        </p>
      </div>
    </div>
  );
}
