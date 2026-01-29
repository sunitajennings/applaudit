"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { EmailForm } from "@/components/auth/EmailForm";
import { useAuth } from "@/lib/store/auth";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email: string) => {
    setIsLoading(true);
    signInWithEmail(email);
    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/verify");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <PageTransition className="flex-1 flex flex-col mx-auto mt-8 px-6 pb-12">
        <main className="max-w-md w-full flex flex-col items-center">
          {/* Illustration */}
          <div className="w-full">
            <ThemedImage
              lightSrc="/images/illustrations/signup_womanpopcorn.svg"
              darkSrc="/images/illustrations/signup_womanpopcorn_dark.svg"
              alt="Person with popcorn"
              width={240}
              height={240}
              priority
              className="w-full"
            />
          </div>

          {/* Dark Card */}
          <Card variant="dark" className="w-full rounded-2xl p-8 border-0 gap-0">
            <h1 className="text-2xl font-bold mb-2">Get your sign-in link</h1>
            <p className="text-muted-foreground mb-6">
              Enter your email and we&apos;ll send you a secure login link. No
              password needed.
            </p>

            <EmailForm onSubmit={handleSubmit} isLoading={isLoading} />
          </Card>
        </main>
      </PageTransition>
    </div>
  );
}
