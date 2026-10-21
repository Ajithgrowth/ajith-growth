const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://iiquspioabbsclltqjme.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_vbHgxPgYNGSS62ksvD9VnQ_yDYbrgb8';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export async function getPublishedArticleRecord(slug: string): Promise<any | null> {
  const query = new URL('/rest/v1/published_articles', SUPABASE_URL);
  query.searchParams.set('select', '*');
  query.searchParams.set('slug', `eq.${slug}`);
  query.searchParams.set('limit', '1');
  const response = await fetch(query, { headers });
  if (!response.ok) return null;
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] || null : null;
}

export async function getArticleRedirect(slug: string): Promise<string | null> {
  const query = new URL('/rest/v1/article_redirects', SUPABASE_URL);
  query.searchParams.set('select', 'new_slug');
  query.searchParams.set('old_slug', `eq.${slug}`);
  query.searchParams.set('limit', '1');
  const response = await fetch(query, { headers });
  if (!response.ok) return null;
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0]?.new_slug || null : null;
}

export async function getPublishedArticleEntries(): Promise<Array<{ slug: string; updated_at?: string }>> {
  const query = new URL('/rest/v1/published_articles', SUPABASE_URL);
  query.searchParams.set('select', 'slug,updated_at');
  query.searchParams.set('order', 'published_at.desc');
  const response = await fetch(query, { headers });
  if (!response.ok) return [];
  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function injectArticleSeo(html: string, article: any, origin: string): string {
  const canonical = article.canonical_override || `${origin}/insights/${article.slug}`;
  const title = article.seo_title || `${article.title} | Ajith Growth`;
  const description = article.meta_description || article.excerpt || '';
  const selectedImage = article.og_image || article.featured_image || '/images/og-default.jpg';
  const image = selectedImage.startsWith('http') ? selectedImage : `${origin}${selectedImage}`;
  const category = article.category || 'Business Strategy';
  const faqs = Array.isArray(article.faqs) ? article.faqs : [];
  const graph: any[] = [
    {
      '@type': 'Article',
      '@id': `${canonical}#article`,
      headline: article.title,
      description,
      image: [image],
      datePublished: article.published_at,
      dateModified: article.updated_at || article.published_at,
      articleSection: category,
      author: { '@type': 'Person', name: article.author_name || 'Ajith B R', url: `${origin}/about` },
      publisher: { '@type': 'Organization', name: 'Ajith Growth', url: origin },
      mainEntityOfPage: canonical,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: `${origin}/insights` },
        { '@type': 'ListItem', position: 3, name: article.title, item: canonical },
      ],
    },
  ];
  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  let clean = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<meta\s+(?:property|name)=["'](?:og|twitter):[^"']+["'][^>]*>/gi, '');

  const tags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    ${article.noindex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
    <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>
  `;
  clean = clean.replace('</head>', `${tags}</head>`);
  return clean;
}

export function mergeDynamicSitemap(staticXml: string, entries: Array<{ slug: string; updated_at?: string }>, origin: string): string {
  const closing = '</urlset>';
  if (!staticXml.includes(closing)) {
    staticXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>';
  }
  const existing = new Set(
    Array.from(staticXml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1].replace(/\/$/, ''))
  );
  const additions = entries
    .filter((entry) => !existing.has(`${origin}/insights/${entry.slug}`))
    .map((entry) => `  <url>\n    <loc>${escapeHtml(`${origin}/insights/${entry.slug}`)}</loc>\n    ${entry.updated_at ? `<lastmod>${escapeHtml(entry.updated_at.split('T')[0])}</lastmod>\n    ` : ''}<changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
    .join('\n');
  return staticXml.replace(closing, `${additions ? `${additions}\n` : ''}${closing}`);
}
