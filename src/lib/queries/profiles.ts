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
 * Fetch all profiles ordered by nickname.
 */
export async function getAllProfiles(supabase: SupabaseClient): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("nickname", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Profile[];
}

/**
 * Fetch a single profile by id.
 */
export async function getProfileById(
  supabase: SupabaseClient,
  id: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Profile;
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
