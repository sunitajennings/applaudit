"use client";

import { AuthProvider as AuthProviderBase } from "@/lib/store/auth";
import { ReactNode } from "react";

interface AuthProviderWrapperProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderWrapperProps) {
  return <AuthProviderBase>{children}</AuthProviderBase>;
}
