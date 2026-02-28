import { SupabaseClient } from "@supabase/supabase-js";
import type { Ballot, BallotChoice } from "@/lib/ballot/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toBallot(row: any): Ballot {
  return {
    id: row.id,
    userId: row.user_id,
    groupId: row.group_id,
    awardShowId: row.award_show_id,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toChoice(row: any): BallotChoice {
  return {
    ballotId: row.ballot_id,
    categoryId: row.category_id,
    nomineeId: row.nominee_id,
  };
}

export async function createBallot(
  supabase: SupabaseClient,
  userId: string,
  awardShowId: string,
  name: string,
): Promise<Ballot> {
  const { data, error } = await supabase
    .from("ballots")
    .insert({
      user_id: userId,
      award_show_id: awardShowId,
      name,
    })
    .select()
    .single();

  if (error) throw error;
  return toBallot(data);
}

export async function getBallotsByUser(
  supabase: SupabaseClient,
  userId: string,
): Promise<Ballot[]> {
  const { data, error } = await supabase
    .from("ballots")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toBallot);
}

export async function getBallotById(
  supabase: SupabaseClient,
  id: string,
): Promise<Ballot | null> {
  const { data, error } = await supabase
    .from("ballots")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return toBallot(data);
}

export async function updateBallotName(
  supabase: SupabaseClient,
  id: string,
  name: string,
): Promise<void> {
  const { error } = await supabase
    .from("ballots")
    .update({ name })
    .eq("id", id);
  if (error) throw error;
}

export async function getChoicesForBallot(
  supabase: SupabaseClient,
  ballotId: string,
): Promise<BallotChoice[]> {
  const { data, error } = await supabase
    .from("ballot_choices")
    .select("*")
    .eq("ballot_id", ballotId);

  if (error) throw error;
  return (data ?? []).map(toChoice);
}

export async function upsertBallotChoices(
  supabase: SupabaseClient,
  ballotId: string,
  choices: BallotChoice[],
): Promise<void> {
  if (choices.length === 0) return;

  const rows = choices.map((c) => ({
    ballot_id: ballotId,
    category_id: c.categoryId,
    nominee_id: c.nomineeId,
  }));

  const { error } = await supabase
    .from("ballot_choices")
    .upsert(rows, { onConflict: "ballot_id,category_id" });

  if (error) throw error;
}
