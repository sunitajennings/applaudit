import { ReactNode } from "react";
import { UserProvider } from "@/lib/store/user";
import { PartyProvider } from "@/lib/store/party";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <UserProvider>
      <PartyProvider>{children}</PartyProvider>
    </UserProvider>
  );
}
