-- Seed categories and nominees for Oscars 2026 (98th Academy Awards)
-- Slug IDs are stable and human-readable; safe to reorder nominees without corrupting ballot_choices.

insert into categories (id, award_show_id, name, "order") values
  ('best-picture',                  'oscars-2026', 'Best Picture',                     0),
  ('best-director',                 'oscars-2026', 'Best Director',                    1),
  ('best-actress',                  'oscars-2026', 'Best Actress',                     2),
  ('best-actor',                    'oscars-2026', 'Best Actor',                       3),
  ('best-supporting-actor',         'oscars-2026', 'Best Supporting Actor',            4),
  ('best-supporting-actress',       'oscars-2026', 'Best Supporting Actress',          5),
  ('best-adapted-screenplay',       'oscars-2026', 'Best Adapted Screenplay',          6),
  ('best-original-screenplay',      'oscars-2026', 'Best Original Screenplay',         7),
  ('best-international-feature',    'oscars-2026', 'Best International Feature',       8),
  ('best-documentary-feature',      'oscars-2026', 'Best Documentary Feature',         9),
  ('best-animated-feature',         'oscars-2026', 'Best Animated Feature',           10),
  ('best-cinematography',           'oscars-2026', 'Best Cinematography',             11),
  ('best-editing',                  'oscars-2026', 'Best Editing',                    12),
  ('best-original-song',            'oscars-2026', 'Best Original Song',              13),
  ('best-costume-design',           'oscars-2026', 'Best Costume Design',             14),
  ('best-casting',                  'oscars-2026', 'Best Casting',                    15),
  ('best-original-score',           'oscars-2026', 'Best Original Score',             16),
  ('best-makeup-and-hairstyling',   'oscars-2026', 'Best Makeup and Hairstyling',     17),
  ('best-production-design',        'oscars-2026', 'Best Production Design',          18),
  ('best-visual-effects',           'oscars-2026', 'Best Visual Effects',             19),
  ('best-sound',                    'oscars-2026', 'Best Sound',                      20),
  ('best-live-action-short',        'oscars-2026', 'Best Live Action Short',          21),
  ('best-animated-short',           'oscars-2026', 'Best Animated Short',             22),
  ('best-documentary-short',        'oscars-2026', 'Best Documentary Short',          23);

insert into nominees (id, category_id, award_show_id, name, movie, "order") values
  -- Best Picture
  ('best-picture--bugonia',                   'best-picture', 'oscars-2026', 'Bugonia',               '',  0),
  ('best-picture--f1',                        'best-picture', 'oscars-2026', 'F1',                    '',  1),
  ('best-picture--frankenstein',              'best-picture', 'oscars-2026', 'Frankenstein',          '',  2),
  ('best-picture--hamnet',                    'best-picture', 'oscars-2026', 'Hamnet',                '',  3),
  ('best-picture--marty-supreme',             'best-picture', 'oscars-2026', 'Marty Supreme',         '',  4),
  ('best-picture--one-battle-after-another',  'best-picture', 'oscars-2026', 'One Battle After Another', '', 5),
  ('best-picture--the-secret-agent',          'best-picture', 'oscars-2026', 'The Secret Agent',      '',  6),
  ('best-picture--sentimental-value',         'best-picture', 'oscars-2026', 'Sentimental Value',     '',  7),
  ('best-picture--sinners',                   'best-picture', 'oscars-2026', 'Sinners',               '',  8),
  ('best-picture--train-dreams',              'best-picture', 'oscars-2026', 'Train Dreams',          '',  9),

  -- Directing
  ('best-director--chloe-zhao',            'best-director', 'oscars-2026', 'Chloé Zhao',            'Hamnet',                   0),
  ('best-director--josh-safdie',           'best-director', 'oscars-2026', 'Josh Safdie',           'Marty Supreme',            1),
  ('best-director--paul-thomas-anderson',  'best-director', 'oscars-2026', 'Paul Thomas Anderson',  'One Battle After Another', 2),
  ('best-director--joachim-trier',         'best-director', 'oscars-2026', 'Joachim Trier',         'Sentimental Value',        3),
  ('best-director--ryan-coogler',          'best-director', 'oscars-2026', 'Ryan Coogler',          'Sinners',                  4),

  -- Actress in a Leading Role
  ('best-actress--jessie-buckley',   'best-actress', 'oscars-2026', 'Jessie Buckley',  'Hamnet',                      0),
  ('best-actress--rose-byrne',       'best-actress', 'oscars-2026', 'Rose Byrne',     'If I Had Legs I''d Kick You',  1),
  ('best-actress--kate-hudson',      'best-actress', 'oscars-2026', 'Kate Hudson',    'Song Sung Blue',               2),
  ('best-actress--renate-reinsve',   'best-actress', 'oscars-2026', 'Renate Reinsve', 'Sentimental Value',            3),
  ('best-actress--emma-stone',       'best-actress', 'oscars-2026', 'Emma Stone',     'Bugonia',                      4),

  -- Actor in a Leading Role
  ('best-actor--timothee-chalamet',  'best-actor', 'oscars-2026', 'Timothée Chalamet',  'Marty Supreme',             0),
  ('best-actor--leonardo-dicaprio',  'best-actor', 'oscars-2026', 'Leonardo DiCaprio',  'One Battle After Another',  1),
  ('best-actor--ethan-hawke',        'best-actor', 'oscars-2026', 'Ethan Hawke',        'Blue Moon',                 2),
  ('best-actor--michael-b-jordan',   'best-actor', 'oscars-2026', 'Michael B. Jordan',  'Sinners',                   3),
  ('best-actor--wagner-moura',       'best-actor', 'oscars-2026', 'Wagner Moura',       'The Secret Agent',          4),

  -- Actress in a Supporting Role
  ('best-supporting-actress--elle-fanning',          'best-supporting-actress', 'oscars-2026', 'Elle Fanning',           'Sentimental Value',        0),
  ('best-supporting-actress--inga-ibsdotter-lilleaas','best-supporting-actress', 'oscars-2026', 'Inga Ibsdotter Lilleaas','Sentimental Value',        1),
  ('best-supporting-actress--amy-madigan',           'best-supporting-actress', 'oscars-2026', 'Amy Madigan',            'Weapons',                  2),
  ('best-supporting-actress--wunmi-mosaku',          'best-supporting-actress', 'oscars-2026', 'Wunmi Mosaku',           'Sinners',                  3),
  ('best-supporting-actress--teyana-taylor',         'best-supporting-actress', 'oscars-2026', 'Teyana Taylor',          'One Battle After Another', 4),

  -- Actor in a Supporting Role
  ('best-supporting-actor--benicio-del-toro',   'best-supporting-actor', 'oscars-2026', 'Benicio Del Toro',    'One Battle After Another', 0),
  ('best-supporting-actor--jacob-elordi',       'best-supporting-actor', 'oscars-2026', 'Jacob Elordi',        'Frankenstein',             1),
  ('best-supporting-actor--delroy-lindo',       'best-supporting-actor', 'oscars-2026', 'Delroy Lindo',        'Sinners',                  2),
  ('best-supporting-actor--sean-penn',          'best-supporting-actor', 'oscars-2026', 'Sean Penn',           'One Battle After Another', 3),
  ('best-supporting-actor--stellan-skarsgard',  'best-supporting-actor', 'oscars-2026', 'Stellan Skarsgård',   'Sentimental Value',        4),

  -- Best Casting
  ('best-casting--nina-gold',             'best-casting', 'oscars-2026', 'Nina Gold',             'Hamnet',                   0),
  ('best-casting--jennifer-venditti',     'best-casting', 'oscars-2026', 'Jennifer Venditti',     'Marty Supreme',            1),
  ('best-casting--cassandra-kulukundis',  'best-casting', 'oscars-2026', 'Cassandra Kulukundis',  'One Battle After Another', 2),
  ('best-casting--gabriel-domingues',     'best-casting', 'oscars-2026', 'Gabriel Domingues',     'The Secret Agent',         3),
  ('best-casting--francine-maisler',      'best-casting', 'oscars-2026', 'Francine Maisler',      'Sinners',                  4),

  -- Writing (Original Screenplay)
  ('best-original-screenplay--robert-kaplow',                    'best-original-screenplay', 'oscars-2026', 'Robert Kaplow',                   'Blue Moon',            0),
  ('best-original-screenplay--jafar-panahi',                     'best-original-screenplay', 'oscars-2026', 'Jafar Panahi',                    'It Was Just an Accident', 1),
  ('best-original-screenplay--ronald-bronstein-and-josh-safdie', 'best-original-screenplay', 'oscars-2026', 'Ronald Bronstein & Josh Safdie',  'Marty Supreme',        2),
  ('best-original-screenplay--joachim-trier-and-eskil-vogt',     'best-original-screenplay', 'oscars-2026', 'Joachim Trier & Eskil Vogt',      'Sentimental Value',    3),
  ('best-original-screenplay--ryan-coogler',                     'best-original-screenplay', 'oscars-2026', 'Ryan Coogler',                    'Sinners',              4),

  -- Writing (Adapted Screenplay)
  ('best-adapted-screenplay--will-tracy',                       'best-adapted-screenplay', 'oscars-2026', 'Will Tracy',                     'Bugonia',                  0),
  ('best-adapted-screenplay--guillermo-del-toro',               'best-adapted-screenplay', 'oscars-2026', 'Guillermo del Toro',             'Frankenstein',             1),
  ('best-adapted-screenplay--chloe-zhao-and-maggie-ofarrell',   'best-adapted-screenplay', 'oscars-2026', 'Chloé Zhao & Maggie O''Farrell', 'Hamnet',                   2),
  ('best-adapted-screenplay--paul-thomas-anderson',             'best-adapted-screenplay', 'oscars-2026', 'Paul Thomas Anderson',           'One Battle After Another', 3),
  ('best-adapted-screenplay--clint-bentley-and-greg-kwedar',    'best-adapted-screenplay', 'oscars-2026', 'Clint Bentley & Greg Kwedar',    'Train Dreams',             4),

  -- Animated Feature
  ('best-animated-feature--arco',                                  'best-animated-feature', 'oscars-2026', 'Arco',                                    '', 0),
  ('best-animated-feature--elio',                                  'best-animated-feature', 'oscars-2026', 'Elio',                                    '', 1),
  ('best-animated-feature--kpop-demon-hunters',                    'best-animated-feature', 'oscars-2026', 'KPop Demon Hunters',                      '', 2),
  ('best-animated-feature--little-amelie-or-the-character-of-rain','best-animated-feature', 'oscars-2026', 'Little Amélie or the Character of Rain',  '', 3),
  ('best-animated-feature--zootopia-2',                            'best-animated-feature', 'oscars-2026', 'Zootopia 2',                              '', 4),

  -- Documentary Feature
  ('best-documentary-feature--the-alabama-solution',           'best-documentary-feature', 'oscars-2026', 'The Alabama Solution',           '', 0),
  ('best-documentary-feature--come-see-me-in-the-good-light',  'best-documentary-feature', 'oscars-2026', 'Come See Me in the Good Light',  '', 1),
  ('best-documentary-feature--cutting-through-rocks',          'best-documentary-feature', 'oscars-2026', 'Cutting Through Rocks',          '', 2),
  ('best-documentary-feature--mr-nobody-against-putin',        'best-documentary-feature', 'oscars-2026', 'Mr. Nobody Against Putin',       '', 3),
  ('best-documentary-feature--the-perfect-neighbor',           'best-documentary-feature', 'oscars-2026', 'The Perfect Neighbor',           '', 4),

  -- International Feature Film
  ('best-international-feature--the-secret-agent',        'best-international-feature', 'oscars-2026', 'The Secret Agent',           '', 0),
  ('best-international-feature--it-was-just-an-accident', 'best-international-feature', 'oscars-2026', 'It Was Just an Accident',    '', 1),
  ('best-international-feature--sentimental-value',       'best-international-feature', 'oscars-2026', 'Sentimental Value',          '', 2),
  ('best-international-feature--sirat',                   'best-international-feature', 'oscars-2026', 'Sirât',                      '', 3),
  ('best-international-feature--the-voice-of-hind-rajab', 'best-international-feature', 'oscars-2026', 'The Voice of Hind Rajab',    '', 4),

  -- Music (Original Score)
  ('best-original-score--jerskin-fendrix',    'best-original-score', 'oscars-2026', 'Jerskin Fendrix',   'Bugonia',                  0),
  ('best-original-score--alexandre-desplat',  'best-original-score', 'oscars-2026', 'Alexandre Desplat', 'Frankenstein',             1),
  ('best-original-score--max-richter',        'best-original-score', 'oscars-2026', 'Max Richter',       'Hamnet',                   2),
  ('best-original-score--jonny-greenwood',    'best-original-score', 'oscars-2026', 'Jonny Greenwood',   'One Battle After Another', 3),
  ('best-original-score--ludwig-goransson',   'best-original-score', 'oscars-2026', 'Ludwig Göransson',  'Sinners',                  4),

  -- Music (Original Song)
  ('best-original-song--dear-me',            'best-original-song', 'oscars-2026', '"Dear Me"',           'Diane Warren: Relentless', 0),
  ('best-original-song--golden',             'best-original-song', 'oscars-2026', '"Golden"',            'KPop Demon Hunters',       1),
  ('best-original-song--i-lied-to-you',      'best-original-song', 'oscars-2026', '"I Lied to You"',     'Sinners',                  2),
  ('best-original-song--sweet-dreams-of-joy','best-original-song', 'oscars-2026', '"Sweet Dreams of Joy"','Viva Verdi!',             3),
  ('best-original-song--train-dreams',       'best-original-song', 'oscars-2026', '"Train Dreams"',      'Train Dreams',             4),

  -- Sound
  ('best-sound--f1',                        'best-sound', 'oscars-2026', 'F1',                      '', 0),
  ('best-sound--frankenstein',              'best-sound', 'oscars-2026', 'Frankenstein',             '', 1),
  ('best-sound--one-battle-after-another',  'best-sound', 'oscars-2026', 'One Battle After Another', '', 2),
  ('best-sound--sinners',                   'best-sound', 'oscars-2026', 'Sinners',                  '', 3),
  ('best-sound--sirat',                     'best-sound', 'oscars-2026', 'Sirât',                    '', 4),

  -- Makeup and Hairstyling
  ('best-makeup-and-hairstyling--frankenstein',        'best-makeup-and-hairstyling', 'oscars-2026', 'Frankenstein',        '', 0),
  ('best-makeup-and-hairstyling--kokuho',              'best-makeup-and-hairstyling', 'oscars-2026', 'Kokuho',              '', 1),
  ('best-makeup-and-hairstyling--sinners',             'best-makeup-and-hairstyling', 'oscars-2026', 'Sinners',             '', 2),
  ('best-makeup-and-hairstyling--the-smashing-machine','best-makeup-and-hairstyling', 'oscars-2026', 'The Smashing Machine', '', 3),
  ('best-makeup-and-hairstyling--the-ugly-stepsister', 'best-makeup-and-hairstyling', 'oscars-2026', 'The Ugly Stepsister', '', 4),

  -- Costume Design
  ('best-costume-design--deborah-l-scott',    'best-costume-design', 'oscars-2026', 'Deborah L. Scott',  'Avatar: Fire and Ash', 0),
  ('best-costume-design--kate-hawley',        'best-costume-design', 'oscars-2026', 'Kate Hawley',        'Frankenstein',         1),
  ('best-costume-design--malgosia-turzanska', 'best-costume-design', 'oscars-2026', 'Malgosia Turzanska', 'Hamnet',               2),
  ('best-costume-design--miyako-bellizzi',    'best-costume-design', 'oscars-2026', 'Miyako Bellizzi',    'Marty Supreme',        3),
  ('best-costume-design--ruth-e-carter',      'best-costume-design', 'oscars-2026', 'Ruth E. Carter',     'Sinners',              4),

  -- Cinematography
  ('best-cinematography--dan-laustsen',           'best-cinematography', 'oscars-2026', 'Dan Laustsen',          'Frankenstein',             0),
  ('best-cinematography--darius-khondji',         'best-cinematography', 'oscars-2026', 'Darius Khondji',        'Marty Supreme',            1),
  ('best-cinematography--michael-bauman',         'best-cinematography', 'oscars-2026', 'Michael Bauman',        'One Battle After Another', 2),
  ('best-cinematography--autumn-durald-arkapaw',  'best-cinematography', 'oscars-2026', 'Autumn Durald Arkapaw', 'Sinners',                  3),
  ('best-cinematography--adolpho-veloso',         'best-cinematography', 'oscars-2026', 'Adolpho Veloso',        'Train Dreams',             4),

  -- Film Editing
  ('best-editing--stephen-mirrione',                  'best-editing', 'oscars-2026', 'Stephen Mirrione',               'F1',                       0),
  ('best-editing--ronald-bronstein-and-josh-safdie',  'best-editing', 'oscars-2026', 'Ronald Bronstein & Josh Safdie', 'Marty Supreme',            1),
  ('best-editing--andy-jurgensen',                    'best-editing', 'oscars-2026', 'Andy Jurgensen',                 'One Battle After Another', 2),
  ('best-editing--olivier-bugge-coutte',              'best-editing', 'oscars-2026', 'Olivier Bugge Coutté',           'Sentimental Value',        3),
  ('best-editing--michael-p-shawver',                 'best-editing', 'oscars-2026', 'Michael P. Shawver',             'Sinners',                  4),

  -- Production Design
  ('best-production-design--frankenstein',          'best-production-design', 'oscars-2026', 'Frankenstein',          '', 0),
  ('best-production-design--hamnet',                'best-production-design', 'oscars-2026', 'Hamnet',                '', 1),
  ('best-production-design--marty-supreme',         'best-production-design', 'oscars-2026', 'Marty Supreme',         '', 2),
  ('best-production-design--one-battle-after-another','best-production-design','oscars-2026', 'One Battle After Another','',3),
  ('best-production-design--sinners',               'best-production-design', 'oscars-2026', 'Sinners',               '', 4),

  -- Visual Effects
  ('best-visual-effects--avatar-fire-and-ash',    'best-visual-effects', 'oscars-2026', 'Avatar: Fire and Ash',  '', 0),
  ('best-visual-effects--f1',                     'best-visual-effects', 'oscars-2026', 'F1',                    '', 1),
  ('best-visual-effects--jurassic-world-rebirth', 'best-visual-effects', 'oscars-2026', 'Jurassic World Rebirth','', 2),
  ('best-visual-effects--the-lost-bus',           'best-visual-effects', 'oscars-2026', 'The Lost Bus',          '', 3),
  ('best-visual-effects--sinners',                'best-visual-effects', 'oscars-2026', 'Sinners',               '', 4),

  -- Live Action Short Film
  ('best-live-action-short--butchers-stain',              'best-live-action-short', 'oscars-2026', 'Butcher''s Stain',              '', 0),
  ('best-live-action-short--a-friend-of-dorothy',         'best-live-action-short', 'oscars-2026', 'A Friend of Dorothy',           '', 1),
  ('best-live-action-short--jane-austens-period-drama',   'best-live-action-short', 'oscars-2026', 'Jane Austen''s Period Drama',   '', 2),
  ('best-live-action-short--the-singers',                 'best-live-action-short', 'oscars-2026', 'The Singers',                   '', 3),
  ('best-live-action-short--two-people-exchanging-saliva','best-live-action-short', 'oscars-2026', 'Two People Exchanging Saliva',  '', 4),

  -- Animated Short Film
  ('best-animated-short--butterfly',                'best-animated-short', 'oscars-2026', 'Butterfly',                '', 0),
  ('best-animated-short--forevergreen',             'best-animated-short', 'oscars-2026', 'Forevergreen',             '', 1),
  ('best-animated-short--the-girl-who-cried-pearls','best-animated-short', 'oscars-2026', 'The Girl Who Cried Pearls','', 2),
  ('best-animated-short--retirement-plan',          'best-animated-short', 'oscars-2026', 'Retirement Plan',          '', 3),
  ('best-animated-short--the-three-sisters',        'best-animated-short', 'oscars-2026', 'The Three Sisters',        '', 4),

  -- Documentary Short Film
  ('best-documentary-short--all-the-empty-rooms',                                    'best-documentary-short', 'oscars-2026', 'All the Empty Rooms',                                       '', 0),
  ('best-documentary-short--armed-only-with-a-camera-the-life-and-death-of-brent-renaud', 'best-documentary-short', 'oscars-2026', 'Armed Only With a Camera: The Life and Death of Brent Renaud', '', 1),
  ('best-documentary-short--children-no-more-were-and-are-gone',                    'best-documentary-short', 'oscars-2026', 'Children No More: "Were and Are Gone"',                     '', 2),
  ('best-documentary-short--the-devil-is-busy',                                     'best-documentary-short', 'oscars-2026', 'The Devil Is Busy',                                         '', 3),
  ('best-documentary-short--perfectly-a-strangeness',                               'best-documentary-short', 'oscars-2026', 'Perfectly a Strangeness',                                  '', 4);
