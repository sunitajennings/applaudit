"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  /** Optional sublabel (e.g. movie title) shown in italics after the label */
  sublabel?: string;
}

interface RadioGroupProps {
  name: string;
  value: string | null;
  options: RadioOption[];
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  options,
  onChange,
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn("flex flex-col flex-1 min-h-0 gap-3", className)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex items-center gap-3 rounded-3xl border px-4 py-3 cursor-pointer transition-colors",
            "border-border bg-background/10 hover:bg-background/20",
            value === option.value && "border-primary bg-primary/10"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              "size-7 border-border bg-background/20",
              value === option.value
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:border-muted-foreground/50"
            )}
            aria-hidden
          >
            {value === option.value && (
              <Check className="size-4 shrink-0" strokeWidth={3} />
            )}
          </span>
          <span className="flex flex-col min-w-0 text-base font-medium">
            <span className="font-bold">{option.label}</span>
            {option.sublabel != null && option.sublabel !== "" && (
              <em className="font-normal text-muted-foreground text-sm truncate">
                {option.sublabel}
              </em>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}
