create table ballot_bonus_points (
  ballot_id uuid not null references ballots(id) on delete cascade,
  award_show_id text not null,
  points integer not null default 0,
  note text,
  primary key (ballot_id, award_show_id)
);

alter table ballot_bonus_points enable row level security;

create policy "Authenticated users can read bonus points"
  on ballot_bonus_points for select
  to authenticated
  using (true);
