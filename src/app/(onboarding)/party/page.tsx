"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { PartyCodeInput } from "@/components/party/PartyCodeInput";
import { InviteModal } from "@/components/party/InviteModal";
import { useParty } from "@/lib/store/party";
import { useAuth } from "@/lib/store/auth";
import { useUser } from "@/lib/store/user";
import { IllustrationPlaceholder } from "@/components/shared/IllustrationPlaceholder";
import { Users, Plus } from "lucide-react";

export default function PartyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile } = useUser();
  const { party, createParty, joinParty, addMember } = useParty();
  const [partyCode, setPartyCode] = useState("");
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Redirect if not authenticated or profile incomplete
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!profile?.nickname || !profile?.avatarId) {
      router.push("/avatar");
      return;
    }
  }, [user, profile, router]);

  // Don't auto-redirect - let user click "All Set" button instead

  const handleCreateParty = () => {
    if (!user) return;

    const newParty = createParty(user.id);
    addMember(user);
    // Small delay to ensure party state is updated
    setTimeout(() => {
      setShowInviteModal(true);
    }, 100);
  };

  const handleJoinParty = () => {
    if (partyCode.length !== 4) {
      setError("Please enter a 4-character code");
      return;
    }

    setIsJoining(true);
    setError("");

    // Simulate a small delay for UX
    setTimeout(() => {
      const success = joinParty(partyCode);
      if (success && user) {
        addMember(user);
        setIsJoining(false);
        // Don't auto-navigate - let user click "All Set" button
      } else {
        setError("Invalid party code. Please try again.");
        setIsJoining(false);
      }
    }, 500);
  };

  const handleCodeComplete = (code: string) => {
    setPartyCode(code);
    // Don't auto-join - let user click the button
  };

  const handleAllSet = () => {
    if (party) {
      router.push("/dashboard");
    }
  };

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">
              {party ? "You're All Set!" : "Join or Create a Party"}
            </h1>
            <p className="text-muted-foreground">
              {party
                ? "You've joined a party. Ready to start making predictions?"
                : "Create your own party or join one with a code"}
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <IllustrationPlaceholder
              width={200}
              height={200}
              label="Party Selection"
            />
          </div>

          {/* Join Party Section */}
          {!party && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter Party Code</label>
                <PartyCodeInput
                  value={partyCode}
                  onChange={(code) => {
                    setPartyCode(code);
                    setError("");
                  }}
                  onComplete={handleCodeComplete}
                  error={!!error}
                />
                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
              </div>

              <Button
                onClick={handleJoinParty}
                className="w-full"
                size="lg"
                disabled={partyCode.length !== 4 || isJoining}
              >
                {isJoining ? "Joining..." : "Join Party"}
              </Button>
            </div>
          )}

          {/* Divider - Only show if not in a party */}
          {!party && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              {/* Create Party Section */}
              <div className="space-y-4">
                <Button
                  onClick={handleCreateParty}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Party
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Create a party and invite friends to join
                </p>
              </div>
            </>
          )}

          {/* All Set Button - Show when user is in a party */}
          {party && !showInviteModal && (
            <div className="pt-4">
              <Button
                onClick={handleAllSet}
                className="w-full"
                size="lg"
              >
                All Set
              </Button>
            </div>
          )}
        </div>

        {/* Invite Modal */}
        {party && (
          <InviteModal
            open={showInviteModal}
            onOpenChange={(open) => {
              setShowInviteModal(open);
              // Don't auto-navigate - let user click "All Set" button
            }}
            partyCode={party.code}
          />
        )}
      </PageTransition>
    </AppShell>
  );
}
