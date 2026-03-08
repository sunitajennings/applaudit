import { SupabaseClient } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  email: string;
  nickname: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
};

/**
 * Fetch an existing profile or create a stub row for a new user.
 */
export async function fetchOrCreateProfile(
  supabase: SupabaseClient,
  userId: string,
  email: string,
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (data) return data as Profile;

  // Profile doesn't exist (PGRST116 = no rows) — create a stub
  if (error && error.code === "PGRST116") {
    const { data: inserted, error: insertError } = await supabase
      .from("profiles")
      .upsert({ id: userId, email }, { onConflict: "id" })
      .select()
      .single();

    if (insertError) throw insertError;
    return inserted as Profile;
  }

  // Some other error
  if (error) throw error;

  // Should not reach here, but satisfy TS
  throw new Error("Unexpected state in fetchOrCreateProfile");
}

/**
 * Fetch all profiles belonging to a group, identified via the ballots table.
 * If groupId is null, returns profiles for users who have ballots with no group_id.
 */
export async function getProfilesByGroup(
  supabase: SupabaseClient,
  groupId: string | null,
): Promise<Profile[]> {
  const ballotQuery = supabase.from("ballots").select("user_id");
  const { data: ballotRows, error: ballotError } = groupId
    ? await ballotQuery.eq("group_id", groupId)
    : await ballotQuery.is("group_id", null);

  if (ballotError) throw ballotError;

  const userIds = [...new Set((ballotRows ?? []).map((r) => r.user_id as string))];
  if (userIds.length === 0) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .in("id", userIds);

  if (error) throw error;
  return (data ?? []) as Profile[];
}

/**
 * Update profile fields (nickname, avatar_url) in the database.
 */
export async function updateProfileInDb(
  supabase: SupabaseClient,
  userId: string,
  updates: { nickname?: string; avatar_url?: string },
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}
