-- Ajith Growth CMS Dynamic Blog v2.1
-- Run once in Supabase SQL Editor as the project owner.
-- Safe to re-run: objects, seed rows, policies and triggers are created idempotently.

begin;

create extension if not exists pgcrypto;

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'ajithgrowth.consulting@gmail.com';
$$;

revoke all on function public.is_cms_admin() from public;
grant execute on function public.is_cms_admin() to anon, authenticated;

create table if not exists public.insight_categories (
  slug text primary key,
  name text not null unique,
  description text not null default '',
  sort_order integer not null,
  created_at timestamptz not null default now(),
  constraint insight_categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

insert into public.insight_categories (slug, name, description, sort_order) values
  ('google-ads', 'Google Ads', 'Search campaigns, keyword strategy, lead quality and campaign optimization.', 1),
  ('seo-local-search', 'SEO & Local Search', 'Organic visibility, local search strategy and website SEO.', 2),
  ('google-business-profile', 'Google Business Profile', 'Profile optimization, local presence, reviews and business information.', 3),
  ('conversion-landing-pages', 'Conversion & Landing Pages', 'Website experience, enquiry journeys and conversion improvement.', 4),
  ('construction-growth', 'Construction Growth', 'Homeowner enquiries, project opportunities and residential construction marketing.', 5),
  ('geo-ai-search', 'GEO & AI Search', 'Search evolution, structured data and AI-search readiness.', 6),
  ('boutique-growth', 'Boutique Growth', 'Google marketing, customer acquisition and growth strategies for premium bridal and designer boutiques.', 7),
  ('business-strategy', 'Business Strategy', 'Business development, customer experience, decision-making and sustainable growth.', 8)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order;

create table if not exists public.cms_authors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  designation text not null,
  expertise text not null,
  experience text not null,
  bio text not null,
  profile_image text,
  profile_url text not null default '/about',
  contact_url text not null default '/contact',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.cms_authors (
  slug, name, designation, expertise, experience, bio, profile_url, contact_url, is_default
) values (
  'ajith-b-r',
  'Ajith B R',
  'Founder — Ajith Growth',
  'Google Ads, SEO, Google Business Profile and AI Search',
  '16+ years in technology leadership',
  'Ajith is a technology and business professional focused on helping residential construction companies build measurable growth systems through Google. He also shares selected insights for premium bridal and designer boutiques.',
  '/about',
  '/contact',
  true
)
on conflict (slug) do update set
  name = excluded.name,
  designation = excluded.designation,
  expertise = excluded.expertise,
  experience = excluded.experience,
  profile_url = excluded.profile_url,
  contact_url = excluded.contact_url,
  is_default = excluded.is_default,
  updated_at = now();

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null unique,
  public_url text not null,
  mime_type text not null,
  file_size bigint not null,
  width integer,
  height integer,
  alt_text text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  constraint media_assets_supported_type check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  constraint media_assets_size_limit check (file_size > 0 and file_size <= 5242880)
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  category text not null references public.insight_categories(slug),
  featured_image text,
  featured_image_alt text,
  excerpt text,
  quick_summary text,
  content text,
  seo_title text,
  meta_description text,
  faqs jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  published_at timestamptz,
  author_name text not null default 'Ajith B R',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles add column if not exists scheduled_at timestamptz;
alter table public.articles add column if not exists is_featured boolean not null default false;
alter table public.articles add column if not exists keywords text[] not null default '{}'::text[];
alter table public.articles add column if not exists canonical_override text;
alter table public.articles add column if not exists author_id uuid references public.cms_authors(id) on delete set null;
alter table public.articles add column if not exists featured_media_id uuid references public.media_assets(id) on delete set null;
alter table public.articles add column if not exists deleted_at timestamptz;
alter table public.articles add column if not exists og_image text;
alter table public.articles add column if not exists noindex boolean not null default false;
alter table public.articles alter column author_name set default 'Ajith B R';

-- Replace the legacy six-value category check before translating existing records.
alter table public.articles drop constraint if exists articles_category_check;

update public.articles
set category = case category
  when 'seo' then 'seo-local-search'
  when 'ai-search' then 'geo-ai-search'
  when 'construction-marketing' then 'construction-growth'
  when 'business-insights' then 'business-strategy'
  else category
end
where category in ('seo', 'ai-search', 'construction-marketing', 'business-insights');

update public.articles
set author_name = 'Ajith B R'
where author_name is null or btrim(author_name) in ('', 'Ajith');

update public.articles
set author_id = (select id from public.cms_authors where slug = 'ajith-b-r' limit 1)
where author_id is null;

alter table public.articles drop constraint if exists articles_status_check;
alter table public.articles add constraint articles_status_check
  check (status in ('draft', 'scheduled', 'published'));

create unique index if not exists articles_slug_unique_lower
  on public.articles (lower(slug))
  where deleted_at is null;
create index if not exists articles_public_listing_idx
  on public.articles (status, published_at desc, scheduled_at desc)
  where deleted_at is null;
create index if not exists articles_category_idx on public.articles (category);
create index if not exists articles_featured_idx on public.articles (is_featured)
  where is_featured = true and deleted_at is null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'articles_category_fkey' and conrelid = 'public.articles'::regclass
  ) then
    alter table public.articles
      add constraint articles_category_fkey
      foreign key (category) references public.insight_categories(slug) not valid;
  end if;
end $$;

create table if not exists public.article_redirects (
  old_slug text primary key,
  new_slug text not null,
  status_code smallint not null default 301,
  article_id uuid references public.articles(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint article_redirects_status check (status_code = 301),
  constraint article_redirects_no_loop check (old_slug <> new_slug)
);

create table if not exists public.article_revisions (
  id bigint generated always as identity primary key,
  article_id uuid,
  operation text not null,
  snapshot jsonb not null,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  constraint article_revisions_operation check (operation in ('UPDATE', 'DELETE'))
);
create index if not exists article_revisions_article_idx
  on public.article_revisions (article_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.validate_article()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  featured_count integer;
begin
  new.slug := lower(btrim(new.slug));

  if new.slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then
    raise exception 'Article slug must contain lowercase letters, numbers and single hyphens only.';
  end if;

  if new.status in ('published', 'scheduled') then
    if nullif(btrim(new.title), '') is null
      or nullif(btrim(new.excerpt), '') is null
      or nullif(btrim(new.content), '') is null
      or nullif(btrim(new.featured_image), '') is null
      or nullif(btrim(new.featured_image_alt), '') is null then
      raise exception 'Published and scheduled articles require title, description, content, featured image and alt text.';
    end if;
  end if;

  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;

  if new.status = 'scheduled' then
    if new.scheduled_at is null then
      raise exception 'Scheduled articles require a scheduled_at value.';
    end if;
    if new.scheduled_at <= now()
      and (tg_op = 'INSERT' or old.status is distinct from 'scheduled' or old.scheduled_at is distinct from new.scheduled_at) then
      raise exception 'New scheduled publication times must be in the future.';
    end if;
  else
    new.scheduled_at := null;
  end if;

  if new.is_featured and new.status in ('published', 'scheduled') then
    select count(*) into featured_count
    from public.articles
    where is_featured = true
      and status in ('published', 'scheduled')
      and deleted_at is null
      and id is distinct from new.id;
    if featured_count >= 3 then
      raise exception 'Only three published or scheduled articles may be featured at one time.';
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.capture_article_revision()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.article_revisions (article_id, operation, snapshot, created_by)
  values (old.id, tg_op, to_jsonb(old), auth.uid());

  if tg_op = 'UPDATE' and old.slug is distinct from new.slug then
    insert into public.article_redirects (old_slug, new_slug, article_id)
    values (old.slug, new.slug, new.id)
    on conflict (old_slug) do update set
      new_slug = excluded.new_slug,
      article_id = excluded.article_id,
      created_at = now();
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

-- This function is invoked only by the articles trigger. It is not an RPC API.
revoke all on function public.capture_article_revision() from public, anon, authenticated;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists articles_validate on public.articles;
create trigger articles_validate
before insert or update on public.articles
for each row execute function public.validate_article();

drop trigger if exists articles_capture_revision on public.articles;
create trigger articles_capture_revision
before update or delete on public.articles
for each row execute function public.capture_article_revision();

create or replace view public.published_articles
with (security_invoker = true)
as
select
  a.id,
  a.title,
  a.slug,
  a.category,
  a.featured_image,
  a.featured_image_alt,
  a.og_image,
  a.noindex,
  a.excerpt,
  a.quick_summary,
  a.content,
  a.seo_title,
  a.meta_description,
  a.faqs,
  a.status,
  case when a.status = 'scheduled' then a.scheduled_at else a.published_at end as published_at,
  a.scheduled_at,
  a.is_featured,
  a.keywords,
  a.canonical_override,
  a.author_id,
  a.featured_media_id,
  coalesce(au.name, a.author_name, 'Ajith B R') as author_name,
  a.created_at,
  a.updated_at
from public.articles a
left join public.cms_authors au on au.id = a.author_id
where a.deleted_at is null
  and (
    (a.status = 'published' and coalesce(a.published_at, a.created_at) <= now())
    or
    (a.status = 'scheduled' and a.scheduled_at <= now())
  );

alter table public.insight_categories enable row level security;
alter table public.cms_authors enable row level security;
alter table public.media_assets enable row level security;
alter table public.articles enable row level security;
alter table public.article_redirects enable row level security;
alter table public.article_revisions enable row level security;

drop policy if exists insight_categories_public_read on public.insight_categories;
create policy insight_categories_public_read on public.insight_categories
for select to anon, authenticated using (true);
drop policy if exists insight_categories_admin_manage on public.insight_categories;
create policy insight_categories_admin_manage on public.insight_categories
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists cms_authors_public_read on public.cms_authors;
create policy cms_authors_public_read on public.cms_authors
for select to anon, authenticated using (true);
drop policy if exists cms_authors_admin_manage on public.cms_authors;
create policy cms_authors_admin_manage on public.cms_authors
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists articles_public_read_published on public.articles;
create policy articles_public_read_published on public.articles
for select to anon using (
  deleted_at is null and (
    (status = 'published' and coalesce(published_at, created_at) <= now())
    or (status = 'scheduled' and scheduled_at <= now())
  )
);
drop policy if exists articles_admin_manage on public.articles;
create policy articles_admin_manage on public.articles
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists media_assets_public_read on public.media_assets;
create policy media_assets_public_read on public.media_assets
for select to anon, authenticated using (true);
drop policy if exists media_assets_admin_manage on public.media_assets;
create policy media_assets_admin_manage on public.media_assets
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists article_redirects_public_read on public.article_redirects;
create policy article_redirects_public_read on public.article_redirects
for select to anon, authenticated using (true);
drop policy if exists article_redirects_admin_manage on public.article_redirects;
create policy article_redirects_admin_manage on public.article_redirects
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists article_revisions_admin_read on public.article_revisions;
create policy article_revisions_admin_read on public.article_revisions
for select to authenticated using (public.is_cms_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- The bucket is public, so direct object URLs remain readable without granting
-- clients the ability to enumerate every image through storage.objects.
drop policy if exists blog_images_public_read on storage.objects;

drop policy if exists blog_images_admin_insert on storage.objects;
create policy blog_images_admin_insert on storage.objects
for insert to authenticated
with check (bucket_id = 'blog-images' and public.is_cms_admin());

drop policy if exists blog_images_admin_update on storage.objects;
create policy blog_images_admin_update on storage.objects
for update to authenticated
using (bucket_id = 'blog-images' and public.is_cms_admin())
with check (bucket_id = 'blog-images' and public.is_cms_admin());

drop policy if exists blog_images_admin_delete on storage.objects;
create policy blog_images_admin_delete on storage.objects
for delete to authenticated
using (bucket_id = 'blog-images' and public.is_cms_admin());

grant select on public.insight_categories, public.cms_authors, public.media_assets,
  public.published_articles, public.article_redirects to anon, authenticated;
grant select on public.articles to anon;
grant select, insert, update, delete on public.articles, public.media_assets,
  public.article_redirects to authenticated;
grant select on public.article_revisions to authenticated;
grant usage, select on sequence public.article_revisions_id_seq to authenticated;

commit;

-- Optional final validation after any legacy category values are corrected:
-- alter table public.articles validate constraint articles_category_fkey;
