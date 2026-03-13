create table declared_winners (
  id uuid primary key default gen_random_uuid(),
  award_show_id text not null,
  category_id text not null,
  nominee_id text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (award_show_id, category_id)
);

alter table declared_winners enable row level security;

-- Any authenticated user can read
create policy "Authenticated users can read declared winners"
  on declared_winners for select
  to authenticated
  using (true);

-- Any authenticated user can insert/update/delete
create policy "Authenticated users can manage declared winners"
  on declared_winners for all
  to authenticated
  using (true)
  with check (true);

alter publication supabase_realtime add table declared_winners;
