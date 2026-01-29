import { ReactNode } from "react";
import { UserProvider } from "@/lib/store/user";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return <UserProvider>{children}</UserProvider>;
}
