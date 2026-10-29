create extension if not exists pgcrypto;
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text unique not null,
  template text not null,
  title text not null,
  message text not null,
  recipient text,
  sender_name text,
  media jsonb not null default '[]',
  music_url text,
  password_hash text,
  expires_at timestamptz,
  card_style text not null default 'glass',
  quiz jsonb,
  secret text,
  countdown_at timestamptz,
  views int not null default 0,
  created_at timestamptz not null default now()
);
create table public.replies (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  reaction text,
  text text,
  voice_url text,
  created_at timestamptz not null default now()
);
alter table public.pages enable row level security;
alter table public.replies enable row level security;
-- Owners manage their pages. Public viewing goes through /api/page/[slug] (service role), so password hashes are never exposed.
create policy "owner all pages" on public.pages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner read replies" on public.replies for select using (exists (select 1 from public.pages p where p.id = page_id and p.user_id = auth.uid()));
create policy "owner delete replies" on public.replies for delete using (exists (select 1 from public.pages p where p.id = page_id and p.user_id = auth.uid()));
alter publication supabase_realtime add table public.replies;
