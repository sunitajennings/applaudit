"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";
import { useUser } from "@/lib/store/user";
import { ThemedImage } from "@/components/shared/ThemedImage";

const DEFAULT_GROUP_ID = "default";

function handleJoinHostBeta() {
  // Prototype: no DB. Later: call API to store "interested in host beta" (e.g. user id + timestamp).
  console.log("[Join host beta] Interested — would store in DB later.");
}

export default function JoinPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile, updateProfile } = useUser();

  const handlePretendAdded = () => {
    updateProfile({ groupId: DEFAULT_GROUP_ID });
    router.push("/ballot");
  };

  // Check both localStorage profile (UserProvider) and DB-sourced auth user as fallback
  const hasCompleteProfile = profile?.nickname || user?.nickname;

  useEffect(() => {
    if (!hasCompleteProfile) {
      router.push("/avatar");
    }
  }, [hasCompleteProfile, router]);

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-2">
          {/* Illustration */}
          <div className="flex justify-center">
            <ThemedImage
              lightSrc="/images/illustrations/join.svg"
              darkSrc="/images/illustrations/join_dark.svg"
              alt="Check your email"
              width={400}
              height={200}
            />
          </div>
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-display font-bold max-w-xs mx-auto">
              Check your email for your Applaudit invite!
            </h1>
            <p className="text-muted-foreground max-w-xs mx-auto mb-8">
              We&apos;ll send you a link when a host adds you to their Applaudit
              party.
            </p>
          </div>

          {/* Pretend you were added — prototype advance */}
          <Button onClick={handlePretendAdded} className="w-full" size="2xl">
            Pretend you were added
          </Button>

          {/* Host beta CTA */}
          <div className="pt-8 text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              Interested in being a party host? Join our beta!
            </p>
            <Button
              variant="link"
              size="sm"
              onClick={handleJoinHostBeta}
              className="text-primary"
            >
              Become an Applaudit Host
            </Button>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}
