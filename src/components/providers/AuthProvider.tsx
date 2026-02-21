"use client";

import { SessionProvider } from "@/lib/store/session";
import { ReactNode } from "react";

interface AuthProviderWrapperProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
