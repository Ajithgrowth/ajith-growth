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
  author_designation?: string; // Plain TEXT
  author_photo?: string; // Plain TEXT (Supabase storage URL or external image URL)
  author_bio?: string; // Plain TEXT
  is_featured?: boolean; // BOOLEAN DEFAULT FALSE
  og_image?: string; // Plain TEXT (Optional social sharing image)
  noindex?: boolean; // BOOLEAN DEFAULT FALSE
  created_at?: string;
  updated_at?: string;
}

export interface CMSCategoryOption {
  value: string;
  label: string;
}

export const CMS_CATEGORIES: CMSCategoryOption[] = [
  { label: 'Google Ads Insights', value: 'google-ads' },
  { label: 'SEO Insights', value: 'seo' },
  { label: 'AI Search Insights', value: 'ai-search' },
  { label: 'Google Business Profile Tips', value: 'google-business-profile' },
  { label: 'Construction Marketing', value: 'construction-marketing' },
  { label: 'Business Insights', value: 'business-insights' },
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
