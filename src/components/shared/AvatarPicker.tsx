"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

interface AvatarPickerProps {
  selectedAvatarId: string;
  onSelect: (avatarId: string) => void;
  className?: string;
}

// Generate 8 placeholder avatars with different colors/initials
const AVATAR_OPTIONS = [
  { id: "1", initials: "AA", color: "bg-primary" },
  { id: "2", initials: "BB", color: "bg-secondary" },
  { id: "3", initials: "CC", color: "bg-accent" },
  { id: "4", initials: "DD", color: "bg-muted" },
  { id: "5", initials: "EE", color: "bg-primary/80" },
  { id: "6", initials: "FF", color: "bg-secondary/80" },
  { id: "7", initials: "GG", color: "bg-accent/80" },
  { id: "8", initials: "HH", color: "bg-muted/80" },
];

export function AvatarPicker({
  selectedAvatarId,
  onSelect,
  className,
}: AvatarPickerProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-4", className)}>
      {AVATAR_OPTIONS.map((avatar) => (
        <button
          key={avatar.id}
          type="button"
          onClick={() => onSelect(avatar.id)}
          className={cn(
            "relative rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            "hover:scale-105 active:scale-95"
          )}
          aria-label={`Select avatar ${avatar.id}`}
        >
          <Avatar
            initials={avatar.initials}
            size="lg"
            selected={selectedAvatarId === avatar.id}
          />
          {selectedAvatarId === avatar.id && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
