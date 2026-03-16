import { SupabaseClient } from "@supabase/supabase-js";

/** Returns a map of ballotId → bonus points for the given award show. */
export async function fetchBonusPoints(
  supabase: SupabaseClient,
  awardShowId: string
): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("ballot_bonus_points")
    .select("ballot_id, points")
    .eq("award_show_id", awardShowId);
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((r) => [r.ballot_id, r.points]));
}
