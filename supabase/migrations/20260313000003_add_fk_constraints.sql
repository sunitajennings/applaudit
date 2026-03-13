-- Truncate old index-based IDs before adding FK constraints
truncate ballot_choices;
truncate declared_winners;

alter table ballot_choices
  add constraint ballot_choices_category_id_fkey
    foreign key (category_id) references categories(id),
  add constraint ballot_choices_nominee_id_fkey
    foreign key (nominee_id) references nominees(id);

alter table declared_winners
  add constraint declared_winners_category_id_fkey
    foreign key (category_id) references categories(id),
  add constraint declared_winners_nominee_id_fkey
    foreign key (nominee_id) references nominees(id);
