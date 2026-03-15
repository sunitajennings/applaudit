"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavCenter } from "@/lib/store/nav-center";
import { getAllProfiles } from "@/lib/queries/profiles";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/queries/profiles";

export default function ProfilesPage() {
  const { setCenterContent } = useNavCenter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    setCenterContent(
      <div className="flex items-center justify-center gap-3 w-full min-w-0 px-2">
        <Button asChild variant="outline" size="icon" className="rounded-full shrink-0" aria-label="Back to Ballots">
          <Link href="/ballot">
            <ChevronLeft className="size-5" />
          </Link>
        </Button>
        <span className="text-lg font-display font-bold min-w-0 truncate">Profiles</span>
      </div>,
    );
    return () => setCenterContent(null);
  }, [setCenterContent]);

  useEffect(() => {
    getAllProfiles(supabase).then(setProfiles).catch(console.error);
  }, [supabase]);

  return (
    <AppShell variant="dark">
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-3">
          <Card variant="dark" className="p-0 overflow-hidden">
            {profiles.length === 0 ? (
              <p className="p-6 text-sm font-medium text-muted-foreground">No profiles yet.</p>
            ) : (
              <ul>
                {profiles.map((p) => (
                  <li key={p.id} className="border-b border-border/50 last:border-0">
                    <Link
                      href={`/profile/${p.id}`}
                      className="flex items-center justify-between gap-3 px-6 py-4 hover:opacity-90 active:opacity-80 transition-opacity"
                    >
                      <span className="font-medium">{p.nickname || p.email}</span>
                      <ChevronRight className="shrink-0 text-muted-foreground" size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </PageTransition>
    </AppShell>
  );
}
