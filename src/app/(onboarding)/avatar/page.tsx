"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarPicker } from "@/components/shared/AvatarPicker";
import { useUser } from "@/lib/store/user";
import { useAuth } from "@/lib/store/auth";
import { IllustrationPlaceholder } from "@/components/shared/IllustrationPlaceholder";

export default function AvatarPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { profile, updateProfile } = useUser();
  const [nickname, setNickname] = useState(profile?.nickname || "");
  const [selectedAvatarId, setSelectedAvatarId] = useState(
    profile?.avatarId || ""
  );
  const [error, setError] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleContinue = () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }
    if (!selectedAvatarId) {
      setError("Please select an avatar");
      return;
    }

    // Update user profile
    updateProfile({
      nickname: nickname.trim(),
      avatarId: selectedAvatarId,
    });

    // Update auth user with nickname
    updateUser({
      nickname: nickname.trim(),
    });

    // Navigate to party page
    router.push("/party");
  };

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">
              Choose Your Avatar
            </h1>
            <p className="text-muted-foreground">
              Pick an avatar and choose a nickname to get started
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <IllustrationPlaceholder
              width={200}
              height={200}
              label="Avatar Selection"
            />
          </div>

          {/* Avatar Picker */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Select Avatar</label>
            <AvatarPicker
              selectedAvatarId={selectedAvatarId}
              onSelect={setSelectedAvatarId}
            />
          </div>

          {/* Nickname Input */}
          <div className="space-y-2">
            <label htmlFor="nickname" className="text-sm font-medium">
              Nickname
            </label>
            <Input
              id="nickname"
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError("");
              }}
              maxLength={20}
              className={error ? "border-destructive" : ""}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full"
            size="lg"
            disabled={!nickname.trim() || !selectedAvatarId}
          >
            Continue
          </Button>
        </div>
      </PageTransition>
    </AppShell>
  );
}
