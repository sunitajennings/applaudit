"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { ThemedImage } from "@/components/shared/ThemedImage";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageTransition className="flex-1 flex flex-col px-6 pb-12">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
          {/* Header */}
          <header className="py-6">
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
          <main className="flex-1 flex flex-col md:flex-row md:items-center md:justify-center md:gap-12">
            {/* Hero Illustration - Mobile */}
            <div className="w-full lg:hidden mb-8 order-1 md:order-2">
              <ThemedImage
                lightSrc="/images/illustrations/herowinner.svg"
                darkSrc="/images/illustrations/herowinner_dark.svg"
                alt="Woman holding Oscar trophy"
                width={280}
                height={280}
                priority
                className="w-full h-auto"
              />
            </div>

            {/* Text Content */}
            <div className="flex-[0.45] flex flex-col items-left text-left mb-8 md:mb-0 order-2 md:order-1">
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
              <p className="text-lg text-muted-foreground mb-2">
                Fantasy sports vibes — Hollywood edition.
              </p>

              {/* CTA Button */}
              <Button asChild size="lg" className="w-full mt-8 max-w-xs h-14 text-lg font-semibold rounded-full">
                <Link href="/login">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Hero Illustration - Large screens (full image) */}
            <div className="hidden lg:flex flex-[0.55] h-full items-center justify-center order-2">
              <ThemedImage
                lightSrc="/images/illustrations/herowinner_full.svg"
                darkSrc="/images/illustrations/herowinner_full_dark.svg"
                alt="Woman holding Oscar trophy"
                width={600}
                height={600}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
          </main>

          {/* Footer */}
          <footer className="py-6 text-left">
            <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
              created with <Heart className="h-3.5 w-3.5 fill-current" /> by sunita & colleen
            </p>
          </footer>
        </div>
      </PageTransition>
    </div>
  );
}
