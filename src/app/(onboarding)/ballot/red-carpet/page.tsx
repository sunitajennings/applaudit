"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { useUser } from "@/lib/store/user";
import { BingoGame } from "@/components/bingo/BingoGame";

export default function RedCarpetPage() {
  const router = useRouter();
  const { profile } = useUser();

  useEffect(() => {
    if (!profile?.nickname || !profile?.avatarId) {
      router.push("/avatar");
    }
  }, [profile, router]);

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/ballot" aria-label="Back to ballots">
                <ChevronLeft className="size-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-display font-bold flex-1 text-center pr-9">
              Red carpet
            </h1>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <ThemedImage
              lightSrc="/images/illustrations/bingo.svg"
              darkSrc="/images/illustrations/bingo_dark.svg"
              alt="Red carpet bingo"
              width={400}
              height={200}
            />
          </div>

          <BingoGame />
        </div>
      </PageTransition>
    </AppShell>
  );
}
