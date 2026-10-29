-- Run this only if you already ran the first schema.sql
alter table public.pages add column if not exists card_style text not null default 'glass';
alter table public.pages add column if not exists quiz jsonb;
alter table public.pages add column if not exists secret text;
alter table public.pages add column if not exists countdown_at timestamptz;
alter table public.replies add column if not exists voice_url text;
