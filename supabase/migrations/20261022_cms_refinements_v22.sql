-- Ajith Growth CMS refinement v2.2
-- Apply once after the v2.1 CMS and seed migrations.

begin;

-- Archived articles remain recoverable but are excluded from the public view.
create index if not exists articles_archived_idx
  on public.articles (deleted_at, updated_at desc);

-- Preserve existing internal article links when an editor changes a slug.
-- Only Ajith Growth article paths are rewritten; external links are untouched.
create or replace function public.update_internal_article_links_after_slug_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.slug is not distinct from new.slug then
    return new;
  end if;

  update public.articles
  set
    content = replace(coalesce(content, ''), '/insights/' || old.slug, '/insights/' || new.slug),
    quick_summary = replace(coalesce(quick_summary, ''), '/insights/' || old.slug, '/insights/' || new.slug),
    updated_at = now()
  where id <> new.id
    and deleted_at is null
    and (
      coalesce(content, '') like '%/insights/' || old.slug || '%'
      or coalesce(quick_summary, '') like '%/insights/' || old.slug || '%'
    );
  return new;
end;
$$;

revoke all on function public.update_internal_article_links_after_slug_change() from public, anon, authenticated;

drop trigger if exists articles_update_internal_links_after_slug_change on public.articles;
create trigger articles_update_internal_links_after_slug_change
after update of slug on public.articles
for each row execute function public.update_internal_article_links_after_slug_change();

commit;
