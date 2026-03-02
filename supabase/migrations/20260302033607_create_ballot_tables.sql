
  create table "public"."ballot_choices" (
    "id" uuid not null default gen_random_uuid(),
    "ballot_id" uuid not null,
    "category_id" text not null,
    "nominee_id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."ballot_choices" enable row level security;


  create table "public"."ballots" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "group_id" uuid,
    "award_show_id" text not null,
    "name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."ballots" enable row level security;

CREATE UNIQUE INDEX ballot_choices_ballot_id_category_id_key ON public.ballot_choices USING btree (ballot_id, category_id);

CREATE INDEX ballot_choices_ballot_id_idx ON public.ballot_choices USING btree (ballot_id);

CREATE UNIQUE INDEX ballot_choices_pkey ON public.ballot_choices USING btree (id);

CREATE UNIQUE INDEX ballots_pkey ON public.ballots USING btree (id);

CREATE INDEX ballots_user_id_idx ON public.ballots USING btree (user_id);

alter table "public"."ballot_choices" add constraint "ballot_choices_pkey" PRIMARY KEY using index "ballot_choices_pkey";

alter table "public"."ballots" add constraint "ballots_pkey" PRIMARY KEY using index "ballots_pkey";

alter table "public"."ballot_choices" add constraint "ballot_choices_ballot_id_category_id_key" UNIQUE using index "ballot_choices_ballot_id_category_id_key";

alter table "public"."ballot_choices" add constraint "ballot_choices_ballot_id_fkey" FOREIGN KEY (ballot_id) REFERENCES public.ballots(id) ON DELETE CASCADE not valid;

alter table "public"."ballot_choices" validate constraint "ballot_choices_ballot_id_fkey";

alter table "public"."ballots" add constraint "ballots_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."ballots" validate constraint "ballots_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

grant delete on table "public"."ballot_choices" to "anon";

grant insert on table "public"."ballot_choices" to "anon";

grant references on table "public"."ballot_choices" to "anon";

grant select on table "public"."ballot_choices" to "anon";

grant trigger on table "public"."ballot_choices" to "anon";

grant truncate on table "public"."ballot_choices" to "anon";

grant update on table "public"."ballot_choices" to "anon";

grant delete on table "public"."ballot_choices" to "authenticated";

grant insert on table "public"."ballot_choices" to "authenticated";

grant references on table "public"."ballot_choices" to "authenticated";

grant select on table "public"."ballot_choices" to "authenticated";

grant trigger on table "public"."ballot_choices" to "authenticated";

grant truncate on table "public"."ballot_choices" to "authenticated";

grant update on table "public"."ballot_choices" to "authenticated";

grant delete on table "public"."ballot_choices" to "service_role";

grant insert on table "public"."ballot_choices" to "service_role";

grant references on table "public"."ballot_choices" to "service_role";

grant select on table "public"."ballot_choices" to "service_role";

grant trigger on table "public"."ballot_choices" to "service_role";

grant truncate on table "public"."ballot_choices" to "service_role";

grant update on table "public"."ballot_choices" to "service_role";

grant delete on table "public"."ballots" to "anon";

grant insert on table "public"."ballots" to "anon";

grant references on table "public"."ballots" to "anon";

grant select on table "public"."ballots" to "anon";

grant trigger on table "public"."ballots" to "anon";

grant truncate on table "public"."ballots" to "anon";

grant update on table "public"."ballots" to "anon";

grant delete on table "public"."ballots" to "authenticated";

grant insert on table "public"."ballots" to "authenticated";

grant references on table "public"."ballots" to "authenticated";

grant select on table "public"."ballots" to "authenticated";

grant trigger on table "public"."ballots" to "authenticated";

grant truncate on table "public"."ballots" to "authenticated";

grant update on table "public"."ballots" to "authenticated";

grant delete on table "public"."ballots" to "service_role";

grant insert on table "public"."ballots" to "service_role";

grant references on table "public"."ballots" to "service_role";

grant select on table "public"."ballots" to "service_role";

grant trigger on table "public"."ballots" to "service_role";

grant truncate on table "public"."ballots" to "service_role";

grant update on table "public"."ballots" to "service_role";


  create policy "Authenticated users can read all ballot choices"
  on "public"."ballot_choices"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Users can delete own ballot choices"
  on "public"."ballot_choices"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.ballots
  WHERE ((ballots.id = ballot_choices.ballot_id) AND (ballots.user_id = auth.uid())))));



  create policy "Users can insert own ballot choices"
  on "public"."ballot_choices"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.ballots
  WHERE ((ballots.id = ballot_choices.ballot_id) AND (ballots.user_id = auth.uid())))));



  create policy "Users can update own ballot choices"
  on "public"."ballot_choices"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.ballots
  WHERE ((ballots.id = ballot_choices.ballot_id) AND (ballots.user_id = auth.uid())))));



  create policy "Authenticated users can read all ballots"
  on "public"."ballots"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Users can delete own ballots"
  on "public"."ballots"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own ballots"
  on "public"."ballots"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own ballots"
  on "public"."ballots"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));


CREATE TRIGGER set_ballot_choices_updated_at BEFORE UPDATE ON public.ballot_choices FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_ballots_updated_at BEFORE UPDATE ON public.ballots FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


