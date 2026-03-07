"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, Star, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  id: string;
  name: string;
}

export interface LiveTopbarProps {
  /** Category list for the dropdown. */
  categories: CategoryOption[];
  /** Current category index (0-based). */
  currentCategoryIndex: number;
  /** Called when user selects a category from the dropdown. */
  onSelectCategoryIndex: (index: number) => void;
}

export function LiveTopbar({
  categories,
  currentCategoryIndex,
  onSelectCategoryIndex,
}: LiveTopbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <header className="flex items-center justify-between gap-3 py-3 border-0">
      <Link
        href="/ballot"
        className="flex items-center gap-1 shrink-0 rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Back to ballot"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/live/leaderboard"
          className="flex items-center justify-center shrink-0 rounded-md border border-border bg-transparent p-2 text-foreground hover:bg-muted transition-colors"
          aria-label="Leaderboard"
        >
          <Star className="h-4 w-4" />
        </Link>
        <div className="relative flex items-center" ref={dropdownRef}>
        {categories.length > 0 ? (
          <>
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-1.5 shrink-0 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Categories"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span>Categories</span>
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", dropdownOpen && "rotate-180")}
              />
            </button>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  aria-hidden
                  onClick={() => setDropdownOpen(false)}
                />
                <ul
                  role="listbox"
                  className="absolute top-full right-0 mt-1 z-20 max-h-60 overflow-auto rounded-lg border border-border bg-popover shadow-lg py-1 min-w-[12rem]"
                  onClick={() => setDropdownOpen(false)}
                >
                  {categories.map((cat, idx) => (
                    <li
                      key={cat.id}
                      role="option"
                      aria-selected={idx === currentCategoryIndex}
                      className={cn(
                        "px-3 py-2 cursor-pointer text-sm hover:bg-muted",
                        idx === currentCategoryIndex && "bg-muted font-medium"
                      )}
                      onClick={() => onSelectCategoryIndex(idx)}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        ) : (
          <span className="text-muted-foreground text-sm">No categories</span>
        )}
        </div>
      </div>
    </header>
  );
}
