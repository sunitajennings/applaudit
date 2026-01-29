"use client";

import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface PartyCodeInputProps {
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  className?: string;
  error?: boolean;
}

export function PartyCodeInput({
  value,
  onChange,
  onComplete,
  className,
  error = false,
}: PartyCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (index: number, char: string) => {
    const newCode = value.split("");
    newCode[index] = char.toUpperCase();
    const updatedCode = newCode.join("").slice(0, 4);
    onChange(updatedCode);

    // Auto-advance to next input
    if (char && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all 4 characters are entered
    if (updatedCode.length === 4 && onComplete) {
      onComplete(updatedCode);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").toUpperCase().slice(0, 4);
    if (/^[A-Z0-9]+$/.test(pasted)) {
      onChange(pasted);
      const nextIndex = Math.min(pasted.length, 3);
      inputRefs.current[nextIndex]?.focus();
      if (pasted.length === 4 && onComplete) {
        onComplete(pasted);
      }
    }
  };

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {[0, 1, 2, 3].map((index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const char = e.target.value.replace(/[^A-Z0-9]/gi, "");
            if (char.length <= 1) {
              handleChange(index, char);
            }
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          className={cn(
            "w-16 h-16 text-center text-2xl font-bold rounded-xl",
            "border-2 transition-all",
            error
              ? "border-destructive focus-visible:border-destructive"
              : focusedIndex === index
              ? "border-primary focus-visible:border-primary"
              : "border-input",
            "focus-visible:ring-2 focus-visible:ring-primary/20"
          )}
          aria-label={`Party code character ${index + 1}`}
        />
      ))}
    </div>
  );
}
