create table categories (
  id text primary key,               -- slug, e.g. "best-picture"
  award_show_id text not null,
  name text not null,
  "order" integer not null,
  created_at timestamptz not null default now()
);

create table nominees (
  id text primary key,               -- slug, e.g. "best-picture--sinners"
  category_id text not null references categories(id),
  award_show_id text not null,
  name text not null,
  movie text not null default '',
  "order" integer not null,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table nominees enable row level security;

create policy "Authenticated users can read categories"
  on categories for select to authenticated using (true);

create policy "Authenticated users can read nominees"
  on nominees for select to authenticated using (true);
