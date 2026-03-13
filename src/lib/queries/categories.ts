import { SupabaseClient } from "@supabase/supabase-js";
import type { Category, Nominee } from "@/lib/ballot/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCategory(row: any): Category {
  return {
    id: row.id,
    awardShowId: row.award_show_id,
    name: row.name,
    order: row.order,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toNominee(row: any): Nominee {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    movie: row.movie,
  };
}

export async function getCategoriesByAwardShow(
  supabase: SupabaseClient,
  awardShowId: string,
): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("award_show_id", awardShowId)
    .order("order");

  if (error) throw error;
  return (data ?? []).map(toCategory);
}

export async function getNomineesByAwardShow(
  supabase: SupabaseClient,
  awardShowId: string,
): Promise<Nominee[]> {
  const { data, error } = await supabase
    .from("nominees")
    .select("*")
    .eq("award_show_id", awardShowId)
    .order("order");

  if (error) throw error;
  return (data ?? []).map(toNominee);
}

export async function getNomineesByCategory(
  supabase: SupabaseClient,
  categoryId: string,
): Promise<Nominee[]> {
  const { data, error } = await supabase
    .from("nominees")
    .select("*")
    .eq("category_id", categoryId)
    .order("order");

  if (error) throw error;
  return (data ?? []).map(toNominee);
}
