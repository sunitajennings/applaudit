import { SupabaseClient } from "@supabase/supabase-js";
import type { DeclaredWinners } from "@/lib/live/types";

export async function fetchDeclaredWinners(
  supabase: SupabaseClient,
  awardShowId: string
): Promise<DeclaredWinners> {
  const { data, error } = await supabase
    .from("declared_winners")
    .select("category_id, nominee_id")
    .eq("award_show_id", awardShowId);
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((r) => [r.category_id, r.nominee_id]));
}

export async function upsertDeclaredWinner(
  supabase: SupabaseClient,
  awardShowId: string,
  categoryId: string,
  nomineeId: string
): Promise<void> {
  const { error } = await supabase
    .from("declared_winners")
    .upsert(
      { award_show_id: awardShowId, category_id: categoryId, nominee_id: nomineeId, updated_at: new Date().toISOString() },
      { onConflict: "award_show_id,category_id" }
    );
  if (error) throw error;
}

export async function deleteDeclaredWinner(
  supabase: SupabaseClient,
  awardShowId: string,
  categoryId: string
): Promise<void> {
  const { error } = await supabase
    .from("declared_winners")
    .delete()
    .eq("award_show_id", awardShowId)
    .eq("category_id", categoryId);
  if (error) throw error;
}
