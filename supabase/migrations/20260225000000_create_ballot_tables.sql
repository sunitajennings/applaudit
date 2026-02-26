create table public.ballots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  group_id uuid null,                    -- nullable until parties table exists
  award_show_id text not null,           -- e.g. "oscars-2026"
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index ballots_user_id_idx on public.ballots(user_id);

create table public.ballot_choices (
  id uuid primary key default gen_random_uuid(),
  ballot_id uuid not null references public.ballots(id) on delete cascade,
  category_id text not null,             -- e.g. "cat-oscars-2026-0" (hardcoded TS data)
  nominee_id text not null,              -- e.g. "nom-cat-oscars-2026-0-2"
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (ballot_id, category_id)        -- one pick per category per ballot
);

create index ballot_choices_ballot_id_idx on public.ballot_choices(ballot_id);

-- Reusable updated_at trigger function
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_ballots_updated_at
  before update on public.ballots
  for each row execute function public.set_updated_at();

create trigger set_ballot_choices_updated_at
  before update on public.ballot_choices
  for each row execute function public.set_updated_at();

-- RLS: ballots
alter table public.ballots enable row level security;

create policy "Authenticated users can read all ballots"
  on public.ballots for select
  using (auth.role() = 'authenticated');

create policy "Users can insert own ballots"
  on public.ballots for insert
  with check (auth.uid() = user_id);

create policy "Users can update own ballots"
  on public.ballots for update
  using (auth.uid() = user_id);

create policy "Users can delete own ballots"
  on public.ballots for delete
  using (auth.uid() = user_id);

-- RLS: ballot_choices
alter table public.ballot_choices enable row level security;

create policy "Authenticated users can read all ballot choices"
  on public.ballot_choices for select
  using (auth.role() = 'authenticated');

create policy "Users can insert own ballot choices"
  on public.ballot_choices for insert
  with check (
    exists (
      select 1 from public.ballots
      where ballots.id = ballot_choices.ballot_id
        and ballots.user_id = auth.uid()
    )
  );

create policy "Users can update own ballot choices"
  on public.ballot_choices for update
  using (
    exists (
      select 1 from public.ballots
      where ballots.id = ballot_choices.ballot_id
        and ballots.user_id = auth.uid()
    )
  );

create policy "Users can delete own ballot choices"
  on public.ballot_choices for delete
  using (
    exists (
      select 1 from public.ballots
      where ballots.id = ballot_choices.ballot_id
        and ballots.user_id = auth.uid()
    )
  );
