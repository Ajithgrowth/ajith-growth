/**
 * Supabase CMS Article Record Interface
 * Strictly aligned with existing Supabase 'articles' table schema:
 * - quick_summary: TEXT
 * - published_at: TIMESTAMPTZ
 * - author_name: TEXT (Default: "Ajith")
 * - faqs: JSONB
 */

export type CMSArticleStatus = 'draft' | 'published';

export interface CMSArticleFAQ {
  question: string;
  answer: string;
}

export interface CMSArticle {
  id?: string;
  title: string;
  slug: string;
  category: string;
  featured_image?: string;
  featured_image_alt?: string;
  excerpt?: string;
  quick_summary?: string; // Plain TEXT
  content?: string;
  seo_title?: string;
  meta_description?: string;
  faqs?: CMSArticleFAQ[]; // JSONB
  status: CMSArticleStatus;
  published_at?: string | null; // TIMESTAMPTZ
  author_name?: string; // Plain TEXT ("Ajith")
  created_at?: string;
  updated_at?: string;
}

export interface CMSCategoryOption {
  value: string;
  label: string;
}

export const CMS_CATEGORIES: CMSCategoryOption[] = [
  { label: 'Google Ads', value: 'google-ads' },
  { label: 'SEO & Local Search', value: 'seo-local-search' },
  { label: 'Google Business Profile', value: 'google-business-profile' },
  { label: 'Conversion & Landing Pages', value: 'conversion-landing-pages' },
  { label: 'Construction Growth', value: 'construction-growth' },
  { label: 'GEO & AI Search', value: 'geo-ai-search' },
  { label: 'Boutique Growth', value: 'boutique-growth' },
  { label: 'Business Strategy', value: 'business-strategy' },
];

/**
 * Normalizes title into an SEO-friendly URL slug:
 * Lowercase, alphanumeric + hyphen, trim hyphens, collapse duplicates.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars except space and hyphen
    .replace(/\s+/g, '-')     // replace spaces with single hyphen
    .replace(/-+/g, '-')     // collapse repeated hyphens
    .replace(/^-+|-+$/g, ''); // trim leading & trailing hyphens
}
