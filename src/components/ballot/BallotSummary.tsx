"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories, getNomineeById } from "@/data/oscar-2026";
import { cn } from "@/lib/utils";
import type { Ballot } from "@/lib/ballot/types";

interface BallotSummaryProps {
  ballot: Ballot;
  choices: Record<string, string>;
  onEdit: () => void;
  onEditCategory?: (categoryId: string) => void;
  onSave: () => void;
}

export function BallotSummary({ ballot, choices, onEdit, onEditCategory, onSave }: BallotSummaryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-bold">Your ballot: {ballot.name}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Review your choices below. You can edit until the event starts.
        </p>
      </div>

      <Card variant="dark" className="p-6">
        <ul className="space-y-4">
          {categories.map((category) => {
            const nomineeId = choices[category.id];
            const nominee = nomineeId ? getNomineeById(nomineeId) : null;
            const handleClick = onEditCategory
              ? () => onEditCategory(category.id)
              : undefined;
            return (
              <li
                key={category.id}
                className={cn(
                  "flex flex-col gap-1 border-b border-border/50 pb-4 last:border-0 last:pb-0",
                  handleClick && "cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity"
                )}
                role={handleClick ? "button" : undefined}
                onClick={handleClick}
                onKeyDown={handleClick ? (e) => e.key === "Enter" && handleClick() : undefined}
                tabIndex={handleClick ? 0 : undefined}
              >
                <p className="text-sm font-medium text-muted-foreground">{category.name}</p>
                <p className="font-medium">
                  {nominee ? (
                    <>
                      {nominee.name}
                      {nominee.movie != null && nominee.movie !== "" && (
                        <em className="font-normal text-muted-foreground"> — {nominee.movie}</em>
                      )}
                    </>
                  ) : (
                    "—"
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={onEdit} variant="outline" className="flex-1" size="2xl">
          Edit choices
        </Button>
        <Button onClick={onSave} className="flex-1" size="2xl">
          Looks great!
        </Button>
      </div>
    </div>
  );
}
