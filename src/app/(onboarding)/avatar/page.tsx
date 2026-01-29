"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, WandSparkles } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarPicker } from "@/components/shared/AvatarPicker";
import { useUser } from "@/lib/store/user";
import { useAuth } from "@/lib/store/auth";
import { cn } from "@/lib/utils";
import { IllustrationPlaceholder } from "@/components/shared/IllustrationPlaceholder";

export default function AvatarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") !== null;
  const { user, updateUser } = useAuth();
  const { profile, updateProfile } = useUser();
  const [nickname, setNickname] = useState(profile?.nickname || "");
  const [selectedAvatarId, setSelectedAvatarId] = useState(
    profile?.avatarId || ""
  );
  const [error, setError] = useState("");
  const [showNameLoader, setShowNameLoader] = useState(false);
  const [showNameCheck, setShowNameCheck] = useState(false);

  // Redirect if not authenticated (skip when ?preview is used to view the page directly)
  useEffect(() => {
    if (!isPreview && !user) {
      router.push("/login");
    }
  }, [user, router, isPreview]);

  const handleContinue = () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }
    if (!selectedAvatarId) {
      setError("Please select an avatar");
      return;
    }

    if (isPreview) {
      // In preview mode, just go to party (or stay); don't persist
      router.push("/party");
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
        <div className="space-y-8 mt-16">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">
              Glow Up Time!
            </h1>
          </div>

          {/* Nickname Input */}
          <div className="space-y-2">
            <label htmlFor="nickname" className="text-md font-display font-medium">
              What do you want to be called?
            </label>
            <p className="text-muted-foreground">This will be what people see when you join a party.</p>
            <div className="relative">
              <WandSparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="nickname"
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={async (e) => {
                  setNickname(e.target.value);
                  setError("");
                  setShowNameLoader(true);
                  setShowNameCheck(false);
                  if (e.target.value.trim().length > 0) {
                    // Fake a loading to 'confirm' the nickname
                    await new Promise((resolve) => setTimeout(resolve, 750));
                    setShowNameLoader(false);
                    setShowNameCheck(true);
                  } else {
                    setShowNameLoader(false);
                    setShowNameCheck(false);
                  }
                }}
                maxLength={20}
                className={cn(
                  "pl-10 h-12 bg-background/10 border-border/50 pr-12",
                  error && "border-destructive"
                )}
              />
              {(showNameLoader || showNameCheck) && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  {showNameLoader && (
                    <Loader2 className="animate-spin text-muted-foreground h-5 w-5" />
                  )}
                  {showNameCheck && !showNameLoader && (
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                  )}
                </span>
              )}
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          {/* Avatar Picker */}
          <div className="space-y-4">
            <label className="text-md font-display font-medium">Select An Avatar</label>
            <p className="text-muted-foreground">This is what people see when you join a party.</p>
            <AvatarPicker
              selectedAvatarId={selectedAvatarId}
              onSelect={setSelectedAvatarId}
            />
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full"
            size="2xl"
            disabled={!nickname.trim() || !selectedAvatarId}
          >
            Continue
          </Button>
        </div>
      </PageTransition>
    </AppShell>
  );
}
