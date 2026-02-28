"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, ExternalLink, RefreshCw, Loader2, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/store/session";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { Card } from "@/components/ui/card";

export default function VerifyPage() {
  const router = useRouter();
  const { pendingEmail, resendOtp, verifyCode } = useSession();
  const [resendState, setResendState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeState, setCodeState] = useState<"idle" | "verifying" | "error">("idle");

  const handleSimulateMagicLink = () => {
    router.push("/callback");
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6 || codeState === "verifying") return;
    setCodeState("verifying");
    setCodeError(null);
    const { error } = await verifyCode(code);
    if (error) {
      setCodeError(error);
      setCodeState("error");
    } else {
      router.push("/callback");
    }
  };

  const handleResend = async () => {
    if (!pendingEmail || resendState === "sending") return;
    setResendState("sending");
    const { error } = await resendOtp(pendingEmail);
    if (error) {
      setResendState("error");
    } else {
      setResendState("sent");
    }
    // Reset after a few seconds so the user can resend again
    setTimeout(() => setResendState("idle"), 4000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <PageTransition className="flex-1 flex flex-col mx-auto mt-8 px-6 pb-12">
        <main className="max-w-md w-full flex flex-col items-center">
          {/* Illustration */}
          <div className="w-full flex">
            <ThemedImage
              lightSrc="/images/illustrations/waiting_popcorn.svg"
              darkSrc="/images/illustrations/waiting_popcorn_dark.svg"
              alt="Waiting with popcorn"
              width={240}
              height={240}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Dark Card */}
          <Card
            variant="dark"
            className="w-full rounded-2xl p-8 border-0 gap-0"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Check your email</h1>
            </div>

            <p className="text-muted-foreground mb-6">
              We sent a magic link to{" "}
              <span className="font-medium">
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

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">or enter code</span>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, ""));
                    setCodeError(null);
                    setCodeState("idle");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                  placeholder="123456"
                  className="flex-1 h-12 rounded-md border border-border/50 bg-background/10 px-3 text-center text-xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  className="h-12 px-4"
                  onClick={handleVerifyCode}
                  disabled={code.length !== 6 || codeState === "verifying"}
                >
                  {codeState === "verifying" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {codeError && (
                <p className="text-sm text-destructive text-center">{codeError}</p>
              )}
            </div>

            <button
              onClick={handleResend}
              disabled={resendState === "sending"}
              className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center gap-1 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${resendState === "sending" ? "animate-spin" : ""}`}
              />
              {resendState === "sending" && "Sending…"}
              {resendState === "sent" && "Link resent!"}
              {resendState === "error" && "Failed to resend — try again"}
              {resendState === "idle" && "Didn\u0027t get it? Resend"}
            </button>
          </Card>
        </main>
      </PageTransition>
    </div>
  );
}
