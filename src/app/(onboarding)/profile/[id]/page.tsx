"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Check, ChevronRight, Pencil, X } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/store/session";
import { getProfileById, updateProfileInDb } from "@/lib/queries/profiles";
import { getBallotsByUser } from "@/lib/queries/ballots";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/queries/profiles";
import type { Ballot } from "@/lib/ballot/types";

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user, updateProfile } = useSession();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const [supabase] = useState(() => createClient());

  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameValue, setNicknameValue] = useState("");
  const [isSavingNickname, setIsSavingNickname] = useState(false);

  const isOwner = !!user && profile !== undefined && profile !== null && user.id === profile.id;

  useEffect(() => {
    getProfileById(supabase, id)
      .then(setProfile)
      .catch(console.error);
  }, [supabase, id]);

  useEffect(() => {
    if (!profile) return;
    getBallotsByUser(supabase, profile.id).then(setBallots).catch(console.error);
  }, [supabase, profile]);

  if (profile === null) {
    notFound();
  }

  function startEditingNickname() {
    setNicknameValue(profile?.nickname || "");
    setEditingNickname(true);
  }

  async function saveNickname() {
    if (!profile || !nicknameValue.trim()) return;
    setIsSavingNickname(true);
    try {
      const updated = await updateProfileInDb(supabase, profile.id, { nickname: nicknameValue.trim() });
      setProfile(updated);
      if (isOwner) updateProfile({ nickname: nicknameValue.trim() });
      setEditingNickname(false);
    } catch (err) {
      console.error("Failed to save nickname:", err);
    } finally {
      setIsSavingNickname(false);
    }
  }

  return (
    <AppShell variant="dark">
      <PageTransition className="max-w-md mx-auto w-full">
        <div className="space-y-6">
          <Card variant="dark" className="p-6">
            <ul className="space-y-4">
              <li className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Nickname</p>
                {editingNickname ? (
                  <div className="flex items-center gap-2">
                    <Input
                      autoFocus
                      value={nicknameValue}
                      onChange={(e) => setNicknameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveNickname();
                        if (e.key === "Escape") setEditingNickname(false);
                      }}
                      maxLength={20}
                      className="h-8 bg-background/10 border-border/50"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 shrink-0 rounded-full"
                      onClick={saveNickname}
                      disabled={isSavingNickname || !nicknameValue.trim()}
                      aria-label="Save nickname"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 shrink-0 rounded-full"
                      onClick={() => setEditingNickname(false)}
                      aria-label="Cancel"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{profile?.nickname || "—"}</p>
                    {isOwner && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group size-7 shrink-0 rounded-full bg-black/30 hover:bg-black/30"
                        onClick={startEditingNickname}
                        aria-label="Edit nickname"
                      >
                        <Pencil className="size-3.5 stroke-white group-hover:stroke-pink-400" />
                      </Button>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </Card>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Ballots</h2>
            <Card variant="dark" className="p-0 overflow-hidden">
              {profile === undefined ? (
                <p className="p-6 text-sm font-medium text-muted-foreground">Loading…</p>
              ) : ballots.length === 0 ? (
                <p className="p-6 text-sm font-medium text-muted-foreground">No ballots yet.</p>
              ) : (
                <ul>
                  {ballots.map((ballot) => (
                    <li key={ballot.id} className="border-b border-border/50 last:border-0">
                      <Link
                        href={`/ballot/${ballot.id}`}
                        className="flex items-center justify-between gap-3 px-6 py-4 hover:opacity-90 active:opacity-80 transition-opacity"
                      >
                        <span className="font-medium">{ballot.name}</span>
                        <ChevronRight className="shrink-0 text-muted-foreground" size={18} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}
