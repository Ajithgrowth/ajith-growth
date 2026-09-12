import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { CMSArticle } from '../types/cms';
import { Article, ArticleFAQ } from '../types';
import { getAllArticles } from '../generated/insights';
import { calculateReadingTime, extractTableOfContents, parseQuickSummary } from '../utils/articleContent';

/**
 * Transforms a Supabase CMS article record into the public Article format.
 * STRICT DRAFT SECURITY: Returns null if status !== 'published'.
 */
export function cmsArticleToPublicArticle(row: CMSArticle): Article | null {
  if (!row || row.status !== 'published') {
    return null;
  }
  if (!row.slug || !row.title) {
    return null;
  }

  const slug = row.slug.trim();
  const category = (row.category || 'google-ads').trim();
  const content = row.content || '';

  // Publication and update dates (YYYY-MM-DD)
  let publishedDate = '';
  if (row.published_at) {
    publishedDate = new Date(row.published_at).toISOString().split('T')[0];
  } else if (row.created_at) {
    publishedDate = new Date(row.created_at).toISOString().split('T')[0];
  }

  let updatedDate = publishedDate;
  if (row.updated_at) {
    updatedDate = new Date(row.updated_at).toISOString().split('T')[0];
  }

  const readingTime = calculateReadingTime(content);
  const tableOfContents = extractTableOfContents(content);
  const quickSummaryPoints = parseQuickSummary(row.quick_summary);

  // Validate FAQs from JSONB
  const faqs: ArticleFAQ[] = Array.isArray(row.faqs)
    ? row.faqs
        .filter((f) => f && typeof f.question === 'string' && typeof f.answer === 'string' && f.question.trim().length > 0)
        .map((f) => ({
          question: f.question.trim(),
          answer: f.answer.trim(),
        }))
    : [];

  const canonicalUrl = `https://ajithgrowth.com/insights/${slug}`;
  const authorName = row.author_name?.trim() || 'Ajith B R';

  return {
    title: row.title.trim(),
    slug,
    category,
    excerpt: row.excerpt?.trim() || '',
    featuredImage: row.featured_image?.trim() || '/images/og-default.jpg',
    featuredImageAlt: row.featured_image_alt?.trim() || row.title.trim(),
    author: authorName,
    author_name: authorName,
    publishedDate,
    updatedDate,
    featured: false,
    draft: false,
    keywords: [],
    seoTitle: row.seo_title?.trim() || `${row.title.trim()} | Ajith Growth`,
    metaDescription: row.meta_description?.trim() || row.excerpt?.trim() || '',
    summary: quickSummaryPoints,
    quick_summary: row.quick_summary?.trim() || '',
    faqs,
    body: content,
    readingTime,
    tableOfContents,
    canonicalUrl,
    source: 'cms',

    // Compatibility fields
    publishDate: publishedDate,
    modifiedDate: updatedDate,
    readTime: readingTime,
    imageAlt: row.featured_image_alt?.trim() || row.title.trim(),
    keyTakeaways: quickSummaryPoints,
    relatedSlugs: [],
  };
}

/**
 * Fetch all published articles from Supabase.
 * Enforces status = 'published'.
 * Returns empty array on error or permission failure so the site never crashes.
 */
export async function fetchPublishedCMSArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      // Non-fatal error; logs note and gracefully falls back to existing articles
      console.warn('[CMS Articles] Note fetching published articles from Supabase:', error.message);
      return [];
    }

    if (!Array.isArray(data)) {
      return [];
    }

    const articles: Article[] = [];
    for (const row of data) {
      const art = cmsArticleToPublicArticle(row as CMSArticle);
      if (art) {
        articles.push(art);
      }
    }

    return articles;
  } catch (err) {
    console.warn('[CMS Articles] Connection error fetching articles:', err);
    return [];
  }
}

/**
 * Fetch a single published article from Supabase by slug.
 * STRICT DRAFT PROTECTION: Always filters by status = 'published'.
 */
export async function fetchPublishedCMSArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      console.warn(`[CMS Articles] Note fetching article "${slug}":`, error.message);
      return null;
    }

    if (!data) {
      return null;
    }

    return cmsArticleToPublicArticle(data as CMSArticle);
  } catch (err) {
    console.warn(`[CMS Articles] Error fetching article "${slug}":`, err);
    return null;
  }
}

/**
 * Combines existing Markdown articles and published Supabase CMS articles.
 * - Shows BOTH existing Markdown and published CMS articles.
 * - Deduplication: If a Supabase article shares a slug with a Markdown article,
 *   the CMS version takes precedence.
 * - Sorted newest first by publication date.
 */
export function mergeArticles(markdownArticles: Article[], cmsArticles: Article[]): Article[] {
  const map = new Map<string, Article>();

  // 1. Existing Markdown articles
  for (const art of markdownArticles) {
    if (!art.draft) {
      map.set(art.slug, { ...art, source: art.source || 'markdown' });
    }
  }

  // 2. Published CMS articles override / augment
  for (const art of cmsArticles) {
    if (!art.draft) {
      map.set(art.slug, art);
    }
  }

  const result = Array.from(map.values());

  // Sort newest first
  result.sort((a, b) => {
    const timeA = new Date(a.publishedDate || a.publishDate || 0).getTime() || 0;
    const timeB = new Date(b.publishedDate || b.publishDate || 0).getTime() || 0;
    return timeB - timeA;
  });

  return result;
}

/**
 * Filters merged articles for a specific category slug.
 */
export function getArticlesByCategory(articles: Article[], categorySlug: string): Article[] {
  return articles.filter((a) => a.category === categorySlug && !a.draft);
}

/**
 * Generates related articles:
 * Shows 3 articles.
 * Priority 1: Same category
 * Priority 2: Latest published articles from other categories if needed
 * Never includes drafts or the current article.
 */
export function getRelatedArticles(articles: Article[], currentSlug: string, count: number = 3): Article[] {
  const current = articles.find((a) => a.slug === currentSlug);
  const pool = articles.filter((a) => a.slug !== currentSlug && !a.draft);

  if (!current) {
    return pool.slice(0, count);
  }

  // 1. Same category first
  const sameCategory = pool.filter((a) => a.category === current.category);

  // 2. Other categories (already sorted newest first)
  const otherCategories = pool.filter((a) => a.category !== current.category);

  const combined = [...sameCategory, ...otherCategories];
  return combined.slice(0, count);
}

// In-memory runtime cache for client-side navigation
let cachedCMSArticles: Article[] | null = null;
let hasLoadedOnce = false;

/**
 * React hook to retrieve all unified articles (Markdown + CMS).
 * Initializes synchronously with markdown + cached CMS articles to prevent layout flash.
 * Asynchronously loads live CMS articles in the background.
 */
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>(() => {
    const md = getAllArticles();
    return mergeArticles(md, cachedCMSArticles || []);
  });
  const [loading, setLoading] = useState<boolean>(!hasLoadedOnce);

  useEffect(() => {
    let isMounted = true;

    fetchPublishedCMSArticles().then((cmsList) => {
      if (!isMounted) return;
      cachedCMSArticles = cmsList;
      hasLoadedOnce = true;
      const md = getAllArticles();
      setArticles(mergeArticles(md, cmsList));
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { articles, loading };
}

/**
 * React hook to retrieve a single article by slug and its related articles.
 * STRICT DRAFT PROTECTION: Draft articles will return article = null.
 */
export function useArticle(slug: string) {
  const { articles, loading: allLoading } = useArticles();

  // Find in current known articles
  const initialArticle = articles.find((a) => a.slug === slug && !a.draft) || null;
  const [article, setArticle] = useState<Article | null>(initialArticle);
  const [fetchingRemote, setFetchingRemote] = useState<boolean>(!initialArticle);

  useEffect(() => {
    let isMounted = true;

    // If already in articles list, set it
    const localMatch = articles.find((a) => a.slug === slug && !a.draft);
    if (localMatch) {
      setArticle(localMatch);
      setFetchingRemote(false);
      return;
    }

    // If not in local list, check Supabase directly (e.g. direct deep link to freshly published article)
    setFetchingRemote(true);
    fetchPublishedCMSArticleBySlug(slug).then((cmsArticle) => {
      if (!isMounted) return;
      setArticle(cmsArticle); // Will be null if draft or not found
      setFetchingRemote(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug, articles]);

  const relatedArticles = article
    ? getRelatedArticles(articles, article.slug, 3)
    : [];

  return {
    article,
    loading: allLoading && fetchingRemote,
    relatedArticles,
  };
}
