import type { Article } from '../types';
import type { CMSArticle } from '../types/cms';
import { createHeadingSlugger } from '../utils/slugify';
import {
  getAllArticles as getStaticArticles,
  getArticleBySlug as getStaticArticleBySlug,
} from '../generated/insights';
import { isSupabaseConfigured, supabase } from './supabase';

const DEFAULT_IMAGE = '/images/og-default.jpg';
const PAGE_SIZE = 12;

function calculateReadingTime(content = ''): string {
  const words = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`\[\]()|-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function buildTableOfContents(content = '') {
  const slugHeading = createHeadingSlugger();
  return content
    .split('\n')
    .map((line) => {
      const match = line.trim().match(/^(##|###)\s+(.+)$/);
      if (!match) return null;
      const title = match[2]
        .replace(/\*\*|__/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();
      return { id: slugHeading(title), title, level: match[1].length };
    })
    .filter(Boolean) as Article['tableOfContents'];
}

function summaryLines(value?: string): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => line.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean);
}

function dateOnly(value?: string | null): string {
  return value ? value.split('T')[0] : '';
}

export function mapCMSArticle(record: CMSArticle): Article {
  const body = record.content || '';
  const publishedDate = dateOnly(record.published_at || record.scheduled_at);
  const updatedDate = dateOnly(record.updated_at) || publishedDate;
  return {
    title: record.title,
    slug: record.slug,
    category: record.category,
    excerpt: record.excerpt || record.meta_description || '',
    featuredImage: record.featured_image || DEFAULT_IMAGE,
    featuredImageAlt: record.featured_image_alt || record.title,
    ogImage: record.og_image || record.featured_image || DEFAULT_IMAGE,
    noindex: Boolean(record.noindex),
    author: record.author_name || 'Ajith B R',
    publishedDate,
    updatedDate,
    featured: Boolean(record.is_featured),
    draft: false,
    keywords: record.keywords || [],
    seoTitle: record.seo_title || `${record.title} | Ajith Growth`,
    metaDescription: record.meta_description || record.excerpt || '',
    summary: summaryLines(record.quick_summary),
    faqs: Array.isArray(record.faqs) ? record.faqs : [],
    body,
    readingTime: calculateReadingTime(body),
    tableOfContents: buildTableOfContents(body),
    canonicalUrl:
      record.canonical_override || `https://ajithgrowth.com/insights/${record.slug}`,
    publishDate: publishedDate,
    modifiedDate: updatedDate,
    readTime: calculateReadingTime(body),
    imageAlt: record.featured_image_alt || record.title,
    keyTakeaways: summaryLines(record.quick_summary),
  };
}

function staticMatches(article: Article, category?: string, search?: string) {
  if (category && category !== 'all' && article.category !== category) return false;
  if (!search?.trim()) return true;
  const query = search.trim().toLowerCase();
  return `${article.title} ${article.excerpt}`.toLowerCase().includes(query);
}

export interface ArticleQuery {
  category?: string;
  search?: string;
  offset?: number;
  limit?: number;
}

export async function fetchPublishedArticles({
  category = 'all',
  search = '',
  offset = 0,
  limit = PAGE_SIZE,
}: ArticleQuery = {}): Promise<{ articles: Article[]; hasMore: boolean }> {
  if (!isSupabaseConfigured) {
    const filtered = getStaticArticles()
      .filter((article) => !article.draft)
      .filter((article) => staticMatches(article, category, search));
    return { articles: filtered.slice(offset, offset + limit), hasMore: filtered.length > offset + limit };
  }

  let query = supabase
    .from('published_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .range(0, offset + limit);

  if (category !== 'all') query = query.eq('category', category);
  if (search.trim()) {
    const safe = search.trim().replace(/[,%()]/g, ' ');
    query = query.or(`title.ilike.%${safe}%,excerpt.ilike.%${safe}%`);
  }

  const { data, error } = await query;
  if (!error && data) {
    const merged = new Map<string, Article>();
    getStaticArticles()
      .filter((article) => !article.draft)
      .filter((article) => staticMatches(article, category, search))
      .forEach((article) => merged.set(article.slug, article));
    (data as CMSArticle[]).map(mapCMSArticle).forEach((article) => merged.set(article.slug, article));
    const combined = Array.from(merged.values()).sort((a, b) =>
      (b.publishedDate || '').localeCompare(a.publishedDate || '')
    );
    return {
      articles: combined.slice(offset, offset + limit),
      hasMore: combined.length > offset + limit || data.length > offset + limit,
    };
  }

  // Build-time content remains a safe fallback while the SQL migration is being applied.
  const filtered = getStaticArticles()
    .filter((article) => !article.draft)
    .filter((article) => staticMatches(article, category, search));
  return {
    articles: filtered.slice(offset, offset + limit),
    hasMore: filtered.length > offset + limit,
  };
}

export async function fetchFeaturedArticles(category = 'all', search = ''): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    const fallback = await fetchPublishedArticles({ category, search, limit: 3 });
    return fallback.articles;
  }

  let query = supabase
    .from('published_articles')
    .select('*')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(3);
  if (category !== 'all') query = query.eq('category', category);
  if (search.trim()) {
    const safe = search.trim().replace(/[,%()]/g, ' ');
    query = query.or(`title.ilike.%${safe}%,excerpt.ilike.%${safe}%`);
  }
  const { data, error } = await query;
  if (!error && data) {
    const merged = new Map<string, Article>();
    getStaticArticles()
      .filter((article) => !article.draft && article.featured)
      .filter((article) => staticMatches(article, category, search))
      .forEach((article) => merged.set(article.slug, article));
    (data as CMSArticle[]).map(mapCMSArticle).forEach((article) => merged.set(article.slug, article));
    const featured = Array.from(merged.values())
      .sort((a, b) => (b.publishedDate || '').localeCompare(a.publishedDate || ''))
      .slice(0, 3);
    if (featured.length) return featured;
  }

  const fallback = await fetchPublishedArticles({ category, search, limit: 3 });
  return fallback.articles;
}

export async function fetchPublishedArticle(
  slug: string
): Promise<{ article?: Article; redirectTo?: string }> {
  if (!isSupabaseConfigured) {
    const staticArticle = getStaticArticleBySlug(slug);
    return staticArticle && !staticArticle.draft ? { article: staticArticle } : {};
  }

  const { data, error } = await supabase
    .from('published_articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (!error && data) return { article: mapCMSArticle(data as CMSArticle) };

  const staticArticle = getStaticArticleBySlug(slug);
  if (staticArticle && !staticArticle.draft) return { article: staticArticle };

  const { data: redirect } = await supabase
    .from('article_redirects')
    .select('new_slug')
    .eq('old_slug', slug)
    .maybeSingle();
  return redirect?.new_slug ? { redirectTo: redirect.new_slug } : {};
}

export async function fetchRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    return getStaticArticles()
      .filter((candidate) => candidate.slug !== article.slug && !candidate.draft)
      .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from('published_articles')
    .select('*')
    .neq('slug', article.slug)
    .order('published_at', { ascending: false })
    .limit(20);
  if (!error && data) {
    const merged = new Map<string, Article>();
    getStaticArticles()
      .filter((candidate) => candidate.slug !== article.slug && !candidate.draft)
      .forEach((candidate) => merged.set(candidate.slug, candidate));
    (data as CMSArticle[])
      .map(mapCMSArticle)
      .filter((candidate) => candidate.slug !== article.slug)
      .forEach((candidate) => merged.set(candidate.slug, candidate));
    const candidates = Array.from(merged.values());
    return [
      ...candidates.filter((candidate) => candidate.category === article.category),
      ...candidates.filter((candidate) => candidate.category !== article.category),
    ].slice(0, limit);
  }
  return getStaticArticles()
    .filter((candidate) => candidate.slug !== article.slug && !candidate.draft)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, limit);
}
