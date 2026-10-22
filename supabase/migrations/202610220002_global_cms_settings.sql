-- Apply after the existing CMS migration. This creates one editable global CMS record.
begin;

create table if not exists public.cms_site_settings (
  id text primary key check (id = 'global'),
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.cms_site_settings enable row level security;

drop policy if exists cms_site_settings_public_read on public.cms_site_settings;
create policy cms_site_settings_public_read on public.cms_site_settings
for select to anon, authenticated using (true);

drop policy if exists cms_site_settings_admin_manage on public.cms_site_settings;
create policy cms_site_settings_admin_manage on public.cms_site_settings
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

insert into public.cms_site_settings (id, settings)
values ('global', '{}'::jsonb)
on conflict (id) do nothing;

grant select on public.cms_site_settings to anon, authenticated;
grant insert, update, delete on public.cms_site_settings to authenticated;

commit;
