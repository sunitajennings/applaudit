"use client";

import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

export interface CategoryOption {
  id: string;
  name: string;
}

export interface LiveCategoryPickerProps {
  categoryName: string;
  currentIndex: number;
  totalCategories: number;
  categories: CategoryOption[];
  onPrevious?: () => void;
  onNext?: () => void;
  onSelectIndex?: (index: number) => void;
}

/** Category picker: currentCategoryIndex state, left/right arrows, category name, dropdown to jump. */
export function LiveCategoryPicker({
  categoryName,
  currentIndex,
  totalCategories,
  categories,
  onPrevious,
  onNext,
  onSelectIndex,
}: LiveCategoryPickerProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="py-3 flex items-center justify-between gap-2"
      aria-label="Category"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentIndex <= 0}
        className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:pointer-events-none"
        aria-label="Previous category"
      >
        ←
      </button>
      <span className="flex-1 text-center font-medium truncate min-w-0">
        {categoryName}
      </span>
      <div className="relative flex items-center gap-1" ref={dropdownRef}>
        {onSelectIndex && categories.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="p-2 rounded-md border border-border hover:bg-muted flex items-center gap-0.5"
              aria-label="Jump to category"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
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
                      aria-selected={idx === currentIndex}
                      className={`px-3 py-2 cursor-pointer text-sm hover:bg-muted ${idx === currentIndex ? "bg-muted font-medium" : ""}`}
                      onClick={() => onSelectIndex(idx)}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex >= totalCategories - 1}
          className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Next category"
        >
          →
        </button>
      </div>
    </section>
  );
}
