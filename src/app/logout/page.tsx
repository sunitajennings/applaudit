"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/store/session";

export default function LogoutPage() {
  const { signOut } = useSession();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => router.replace("/login"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
