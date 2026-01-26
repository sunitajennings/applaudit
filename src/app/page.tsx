"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { ThemedImage } from "@/components/shared/ThemedImage";

export default function LandingPage() {
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
        <main className="max-w-md w-full flex flex-col items-center text-center">
          {/* Hero Illustration */}
          <div className="mb-8">
            <ThemedImage
              lightSrc="/images/illustrations/herowinner.svg"
              darkSrc="/images/illustrations/herowinner_dark.svg"
              alt="Woman holding Oscar trophy"
              width={280}
              height={280}
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground mb-4">
            Predict the winners. Bring home the Oscar.
          </h1>

          {/* Subtext */}
          <p className="text-lg text-muted-foreground mb-2">
            Vote on every category, track your picks, and see who actually knows
            their movies.
          </p>

          {/* Secondary text */}
          <p className="text-base text-muted-foreground/80 mb-8">
            Fantasy sports vibes — Hollywood edition.
          </p>

          {/* CTA Button */}
          <Button asChild size="lg" className="w-full max-w-xs h-14 text-lg font-semibold rounded-full">
            <Link href="/login">
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </main>
      </PageTransition>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
          created with love <Heart className="h-3.5 w-3.5 fill-current" />
        </p>
      </footer>
    </div>
  );
}
