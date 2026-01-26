"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAuth } from "@/lib/store/auth";
import { ThemedImage } from "@/components/shared/ThemedImage";

export default function CallbackPage() {
  const router = useRouter();
  const { completeSignIn } = useAuth();

  useEffect(() => {
    // Complete the sign-in process
    completeSignIn();

    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      router.push("/avatar");
    }, 2000);

    return () => clearTimeout(timer);
  }, [completeSignIn, router]);

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
              alt="Popcorn"
              width={240}
              height={240}
              priority
            />
          </div>

          {/* Card */}
          <div className="w-full bg-card text-card-foreground rounded-2xl p-8 text-center">
            <p className="text-lg mb-6">
              Logging you in... get the popcorn ready...
            </p>

            {/* Animated spinner using Framer Motion */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-flex"
            >
              <Loader2 className="h-8 w-8 text-primary" />
            </motion.div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
