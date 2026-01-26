"use client";

import { useState, FormEvent } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EmailFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function EmailForm({
  onSubmit,
  isLoading = false,
  className,
}: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            className="pl-10 h-12 bg-background/10 border-border/50 text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
            autoComplete="email"
            autoFocus
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}
