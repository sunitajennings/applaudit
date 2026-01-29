"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/lib/store/auth";
import { useUser } from "@/lib/store/user";

export default function BallotPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile } = useUser();

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

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-8">
          {/* Back to join */}
          <p className="text-sm">
            <Link
              href="/party?stay=1"
              className="text-muted-foreground hover:text-foreground underline"
            >
              Back to join
            </Link>
          </p>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">
              Create your ballot
            </h1>
            <p className="text-muted-foreground">
              Your predictions will go here.
            </p>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}
