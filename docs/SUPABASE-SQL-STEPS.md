# Ajith Growth CMS — Required Supabase and SQL Steps

Use these steps in order. The website code is already prepared for this schema. Do not paste a service-role key or an administrator password into the website, migration, or source repository.

## Step 1 — Confirm the target Supabase project and take a backup

Open the Supabase project used by the website, then use **SQL Editor → New query** to record the current state:

```sql
select count(*) as current_articles from public.articles;

select status, count(*)
from public.articles
group by status
order by status;
```

Before applying the migration, create a database backup from the Supabase dashboard. If Point-in-Time Recovery is not enabled on the current plan, export the `articles` table and download the current `blog-images` storage objects.

## Step 2 — Run the complete v2.1 migration

Open this file and copy its complete contents into Supabase SQL Editor:

`supabase/migrations/20261021_cms_dynamic_blog_v21.sql`

Click **Run** once. The script is transactional and idempotent. It creates or updates:

- The eight controlled categories, keeping **Boutique Growth** and `boutique-growth` unchanged.
- The central Ajith B R author profile.
- Article scheduling, featured selection, keywords, canonical overrides, media references and timestamps.
- Unique slug enforcement and automatic 301 redirect records when a slug changes.
- Article revision history for update/delete recovery.
- The public `published_articles` view used by the website.
- Row-level security for public published content and the single authorized CMS administrator.
- The `blog-images` bucket, file restrictions and media-library table.

Expected result: **Success. No rows returned.**

Next, run the complete contents of:

`supabase/migrations/20261021_seed_existing_insights.sql`

This imports the six approved existing Insights articles into Supabase without overwriting any matching slug already present. It makes the existing articles editable through `/admin` immediately. Expected result: **Success. No rows returned.**

## Step 3 — Check and validate legacy category values

Run:

```sql
select id, title, category
from public.articles
where category not in (
  'google-ads',
  'seo-local-search',
  'google-business-profile',
  'conversion-landing-pages',
  'construction-growth',
  'geo-ai-search',
  'boutique-growth',
  'business-strategy'
);
```

If this returns no rows, validate the foreign key:

```sql
alter table public.articles
validate constraint articles_category_fkey;
```

If rows are returned, decide the correct approved category for each article and update those records first. Do not invent a ninth category. Example:

```sql
update public.articles
set category = 'business-strategy'
where id = 'REPLACE_WITH_THE_REAL_ARTICLE_UUID';
```

Then run the validation statement again.

## Step 4 — Verify the schema, public view, policies and storage

Run:

```sql
select slug, name, sort_order
from public.insight_categories
order by sort_order;

select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'articles'
order by ordinal_position;

select schemaname, tablename, policyname, roles, cmd
from pg_policies
where schemaname in ('public', 'storage')
  and tablename in (
    'articles',
    'insight_categories',
    'cms_authors',
    'media_assets',
    'article_redirects',
    'article_revisions',
    'objects'
  )
order by schemaname, tablename, policyname;

select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'blog-images';
```

You should see exactly eight categories, the new article fields, CMS policies and one public `blog-images` bucket limited to JPEG, PNG and WebP files of 5 MB or less.

## Step 5 — Create or verify the authorized administrator

This is an Auth action, not a SQL insert.

1. In Supabase, open **Authentication → Users**.
2. Create or verify the user `ajithgrowth.consulting@gmail.com`.
3. Set a strong password and ensure the email is confirmed.
4. Disable public sign-up in **Authentication → Providers → Email** if it is not already disabled.

The row-level policies permit CMS writes only when the signed-in JWT email is exactly `ajithgrowth.consulting@gmail.com`.

## Step 6 — Configure deployment variables

Add these variables to the selected Vercel or Netlify project. Use the project values shown in Supabase **Settings → API**:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_URL
SUPABASE_ANON_KEY
```

The anon/publishable key is intended for browser use and is constrained by row-level security. Never add the Supabase service-role key to the browser build.

## Step 7 — Deploy and run an end-to-end publishing test

After deployment:

1. Sign in at `/admin`.
2. Create a sample draft with all required fields.
3. Preview it and confirm it is not visible on `/insights`.
4. Publish it and confirm it appears automatically without another deployment.
5. Test category filtering, title/summary search and Load More.
6. Edit the published slug once and confirm the old URL redirects permanently to the new URL.
7. Schedule a second test article a few minutes ahead and confirm it stays private until its scheduled time.
8. Unpublish or delete the test content when finished.

Useful SQL checks:

```sql
select title, slug, category, status, published_at, scheduled_at, is_featured
from public.articles
order by updated_at desc;

select title, slug, published_at
from public.published_articles
order by published_at desc;

select old_slug, new_slug, status_code, created_at
from public.article_redirects
order by created_at desc;

select article_id, operation, created_at
from public.article_revisions
order by created_at desc
limit 20;
```

## Step 8 — Configure ongoing backup and recovery

- Keep automated Supabase database backups enabled; enable Point-in-Time Recovery when the project plan supports it.
- Include `blog-images` storage in the operating backup checklist.
- Test recovery using `article_revisions.snapshot` before relying on it.
- Review old media before deletion; the CMS intentionally does not silently delete uploaded files when an article is removed.

To inspect the latest revision before restoring:

```sql
select snapshot
from public.article_revisions
where article_id = 'REPLACE_WITH_THE_REAL_ARTICLE_UUID'
order by created_at desc
limit 1;
```

Restore only after reviewing the JSON snapshot and mapping it to the current `articles` columns.
