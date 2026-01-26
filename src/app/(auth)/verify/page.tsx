"use client";

import { useRouter } from "next/navigation";
import { Mail, ExternalLink, RefreshCw } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";
import { ThemedImage } from "@/components/shared/ThemedImage";

export default function VerifyPage() {
  const router = useRouter();
  const { pendingEmail } = useAuth();

  const handleSimulateMagicLink = () => {
    router.push("/callback");
  };

  const handleResend = () => {
    // In a real app, this would resend the magic link
    // For prototype, just show a toast/alert
    alert("Magic link resent! (simulated)");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6">
        <ThemedImage
          lightSrc="/images/logos/logo.svg"
          darkSrc="/images/logos/logo_dark.svg"
          alt="Applaudit"
          width={140}
          height={40}
          priority
        />
      </header>

      {/* Main Content */}
      <PageTransition className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <main className="max-w-md w-full flex flex-col items-center">
          {/* Illustration */}
          <div className="mb-8">
            <ThemedImage
              lightSrc="/images/illustrations/waiting_popcorn.svg"
              darkSrc="/images/illustrations/waiting_popcorn_dark.svg"
              alt="Waiting with popcorn"
              width={240}
              height={240}
              priority
            />
          </div>

          {/* Card */}
          <div className="w-full bg-card text-card-foreground rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Check your email</h1>
            </div>

            <p className="text-muted-foreground mb-6">
              We sent a magic link to{" "}
              <span className="text-card-foreground font-medium">
                {pendingEmail || "your email"}
              </span>
              . Click it to sign in.
            </p>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => window.open("mailto:", "_blank")}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Open email app
              </Button>

              {/* Prototype: Simulate magic link click */}
              <Button
                className="w-full h-12"
                onClick={handleSimulateMagicLink}
              >
                Simulate magic link click
              </Button>
            </div>

            <button
              onClick={handleResend}
              className="mt-4 w-full text-sm text-muted-foreground hover:text-card-foreground transition-colors inline-flex items-center justify-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Didn&apos;t get it? Resend
            </button>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
