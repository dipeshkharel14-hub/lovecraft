
-- LoveCraft: Complete database upgrade
-- Run in Supabase Dashboard -> SQL Editor -> New query

begin;

-- 1. Ensure page fields required by the app exist
alter table public.pages
  add column if not exists card_style text not null default 'glass',
  add column if not exists quiz jsonb,
  add column if not exists secret text,
  add column if not exists countdown_at timestamptz,
  add column if not exists theme text,
  add column if not exists effects jsonb not null default '[]'::jsonb,
  add column if not exists extras jsonb not null default '{}'::jsonb;

-- 2. Ensure reply fields exist
alter table public.replies
  add column if not exists voice_url text,
  add column if not exists reaction text,
  add column if not exists text text,
  add column if not exists created_at timestamptz not null default now();

-- 3. Enable row-level security
alter table public.pages enable row level security;
alter table public.replies enable row level security;

-- 4. Ensure page owners can manage their own pages
drop policy if exists "owner all pages" on public.pages;

create policy "owner all pages"
on public.pages
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 5. Allow page owners to read replies to their pages
drop policy if exists "owner read replies" on public.replies;

create policy "owner read replies"
on public.replies
for select
to authenticated
using (
  exists (
    select 1
    from public.pages p
    where p.id = replies.page_id
      and p.user_id = (select auth.uid())
  )
);

-- 6. Allow page owners to delete replies
drop policy if exists "owner delete replies" on public.replies;

create policy "owner delete replies"
on public.replies
for delete
to authenticated
using (
  exists (
    select 1
    from public.pages p
    where p.id = replies.page_id
      and p.user_id = (select auth.uid())
  )
);

-- 7. Enable realtime notifications for new replies
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'replies'
  ) then
    alter publication supabase_realtime add table public.replies;
  end if;
end
$$;

-- 8. Refresh Supabase API schema cache
notify pgrst, 'reload schema';

commit;
