"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAuth } from "@/lib/store/auth";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { Card } from "@/components/ui/card";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeSignIn } = useAuth();

  // Skip redirect when ?stay or ?noRedirect is in the URL (for working on this page)
  const skipRedirect = searchParams.has("stay") || searchParams.has("noRedirect");

  useEffect(() => {
    // Complete the sign-in process
    completeSignIn();

    if (skipRedirect) return;

    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      router.push("/avatar");
    }, 2000);

    return () => clearTimeout(timer);
  }, [completeSignIn, router, skipRedirect]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <PageTransition className="flex-1 flex flex-col mx-auto mt-24 px-6">
        <main className="max-w-md w-full flex flex-col items-center">
          {/* Illustration */}
          <div className="w-full">
            <ThemedImage
              lightSrc="/images/illustrations/waiting_popcorn.svg"
              darkSrc="/images/illustrations/waiting_popcorn_dark.svg"
              alt="Popcorn"
              width={240}
              height={240}
              priority
              className="w-full"
            />
          </div>

          {/* Dark Card */}
          <Card variant="dark" className="w-full rounded-2xl p-8 border-0 gap-0 text-center">
            <p className="text-xl mb-6 font-display">
              Logging you in...
              <br />
              Get the popcorn ready...
            </p>

            {/* Simple loader */}
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
          </Card>
        </main>
      </PageTransition>
    </div>
  );
}
