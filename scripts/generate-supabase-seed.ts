import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const sourceDir = path.resolve(process.cwd(), 'content/insights');
const outputFile = path.resolve(
  process.cwd(),
  'supabase/migrations/20261021_seed_existing_insights.sql'
);

const quote = (value: unknown) => {
  if (value === null || value === undefined) return 'null';
  return `'${String(value).replace(/'/g, "''")}'`;
};

const json = (value: unknown) => `${quote(JSON.stringify(value ?? []))}::jsonb`;
const textArray = (values: unknown) => {
  if (!Array.isArray(values) || values.length === 0) return "'{}'::text[]";
  return `array[${values.map(quote).join(', ')}]::text[]`;
};

const statements = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith('.md'))
  .sort()
  .map((file) => {
    const raw = fs.readFileSync(path.join(sourceDir, file), 'utf8');
    const { data, content } = matter(raw);
    const slug = data.slug || path.basename(file, '.md');
    const summary = Array.isArray(data.summary) ? data.summary.join('\n') : '';
    const columns = [
      'title', 'slug', 'category', 'featured_image', 'featured_image_alt', 'excerpt',
      'og_image', 'noindex', 'quick_summary', 'content', 'seo_title', 'meta_description', 'faqs', 'status',
      'published_at', 'author_name', 'author_id', 'is_featured', 'keywords', 'updated_at',
    ];
    const values = [
      quote(data.title),
      quote(slug),
      quote(data.category),
      quote(data.featuredImage),
      quote(data.featuredImageAlt),
      quote(data.excerpt),
      quote(data.ogImage || data.featuredImage),
      data.noindex ? 'true' : 'false',
      quote(summary),
      quote(content.trim()),
      quote(data.seoTitle || data.title),
      quote(data.metaDescription || data.excerpt),
      json(data.faqs),
      quote(data.draft ? 'draft' : 'published'),
      data.publishedDate ? `${quote(data.publishedDate)}::timestamptz` : 'now()',
      quote(data.author || 'Ajith B R'),
      "(select id from public.cms_authors where slug = 'ajith-b-r' limit 1)",
      data.featured ? 'true' : 'false',
      textArray(data.keywords),
      data.updatedDate ? `${quote(data.updatedDate)}::timestamptz` : 'now()',
    ];
    return `insert into public.articles (\n  ${columns.join(', ')}\n)\nselect\n  ${values.join(',\n  ')}\nwhere not exists (select 1 from public.articles where lower(slug) = lower(${quote(slug)}));`;
  });

const sql = `-- Import the six approved existing Insights articles into the dynamic CMS.
-- Run after 20261021_cms_dynamic_blog_v21.sql.
-- Existing matching slugs are preserved and not overwritten.

begin;

${statements.join('\n\n')}

commit;
`;

fs.writeFileSync(outputFile, sql, 'utf8');
console.log(`Generated ${statements.length} CMS seed statements at ${outputFile}`);
