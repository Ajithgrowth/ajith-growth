/**
 * Supabase CMS Article Record Interface
 * Strictly aligned with existing Supabase 'articles' table schema:
 * - quick_summary: TEXT
 * - published_at: TIMESTAMPTZ
 * - author_name: TEXT (Default: "Ajith")
 * - faqs: JSONB
 */

import { INSIGHT_CATEGORIES } from '../data/insightCategories';

export type CMSArticleStatus = 'draft' | 'scheduled' | 'published';

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
  og_image?: string;
  noindex?: boolean;
  excerpt?: string;
  quick_summary?: string; // Plain TEXT
  content?: string;
  seo_title?: string;
  meta_description?: string;
  faqs?: CMSArticleFAQ[]; // JSONB
  status: CMSArticleStatus;
  published_at?: string | null; // TIMESTAMPTZ
  scheduled_at?: string | null;
  is_featured?: boolean;
  keywords?: string[];
  canonical_override?: string | null;
  author_id?: string | null;
  featured_media_id?: string | null;
  author_name?: string; // Plain TEXT ("Ajith B R")
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface CMSCategoryOption {
  value: string;
  label: string;
}

export const CMS_CATEGORIES: CMSCategoryOption[] = INSIGHT_CATEGORIES.map(({ label, slug }) => ({
  label,
  value: slug,
}));

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
