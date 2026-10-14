export type InsightCategorySlug = 'google-ads' | 'seo-local-search' | 'google-business-profile' | 'conversion-landing-pages' | 'construction-growth' | 'geo-ai-search' | 'boutique-growth' | 'business-strategy';

export interface InsightCategory { slug: InsightCategorySlug; label: string; description: string; seoTitle?: string; metaDescription?: string }

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  { slug: 'google-ads', label: 'Google Ads', description: 'Search campaigns, keyword strategy, lead quality and campaign optimization.' },
  { slug: 'seo-local-search', label: 'SEO & Local Search', description: 'Organic visibility, local search strategy and website SEO.' },
  { slug: 'google-business-profile', label: 'Google Business Profile', description: 'Profile optimization, local presence, reviews and business information.' },
  { slug: 'conversion-landing-pages', label: 'Conversion & Landing Pages', description: 'Website experience, enquiry journeys and conversion improvement.' },
  { slug: 'construction-growth', label: 'Construction Growth', description: 'Homeowner enquiries, project opportunities and residential construction marketing.' },
  { slug: 'geo-ai-search', label: 'GEO & AI Search', description: 'Search evolution, structured data and AI-search readiness.' },
  { slug: 'boutique-growth', label: 'Boutique Growth', description: 'Google marketing, premium customer acquisition and growth strategies for selected fashion boutiques.' },
  { slug: 'business-strategy', label: 'Business Strategy', description: 'Business development, customer experience, decision-making and sustainable growth.' },
];

const aliases: Record<string, InsightCategorySlug> = {
  seo: 'seo-local-search', 'seo-insights': 'seo-local-search',
  'ai-search': 'geo-ai-search', 'ai-search-insights': 'geo-ai-search',
  'google-business-profile-tips': 'google-business-profile', 'google-ads-insights': 'google-ads',
  'construction-marketing': 'conversion-landing-pages', 'business-insights': 'business-strategy',
};

export function normalizeCategorySlug(slug: string): InsightCategorySlug | string { return aliases[slug] || slug; }
export function getCategoryBySlug(slug: string) { const normalized = normalizeCategorySlug(slug); return INSIGHT_CATEGORIES.find((category) => category.slug === normalized); }
export function getCategoryLabel(slugOrLabel: string) { const normalized = normalizeCategorySlug(slugOrLabel); return INSIGHT_CATEGORIES.find((category) => category.slug === normalized || category.label.toLowerCase() === slugOrLabel.toLowerCase())?.label || slugOrLabel; }
export function isValidCategorySlug(slug: string): slug is InsightCategorySlug { return Boolean(getCategoryBySlug(slug)); }
export const isCategorySlug = isValidCategorySlug;
