export interface InsightCategory {
  slug: InsightCategorySlug;
  label: string;
  description: string;
  seoTitle?: string;
  metaDescription?: string;
}

export type InsightCategorySlug =
  | 'google-ads'
  | 'seo'
  | 'ai-search'
  | 'google-business-profile'
  | 'construction-marketing'
  | 'business-insights';

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  {
    slug: 'google-ads',
    label: 'Google Ads Insights',
    description: 'Data-driven paid search strategies, negative keyword architecture, Smart Bidding calibration, and lead qualification frameworks for residential construction companies.',
    seoTitle: 'Google Ads Insights for Residential Construction | Ajith Growth',
    metaDescription: 'Strategic analysis and tactical guides on running profitable Google Ads campaigns for custom home builders and luxury remodeling contractors.',
  },
  {
    slug: 'seo',
    label: 'SEO Insights',
    description: 'Technical, on-page, and local territory SEO methodologies engineered to establish enduring organic visibility in prime residential building markets.',
    seoTitle: 'SEO Insights for Residential Construction | Ajith Growth',
    metaDescription: 'In-depth SEO frameworks, subdivision topical hubs, and schema markup strategies for residential builders and luxury general contractors.',
  },
  {
    slug: 'ai-search',
    label: 'AI Search Insights',
    description: 'Generative Engine Optimization (GEO), entity graph architecture, and citation strategies for Google AI Overviews, Perplexity, and modern conversational discovery.',
    seoTitle: 'AI Search & GEO Insights for Builders | Ajith Growth',
    metaDescription: 'Preparing residential construction brands for AI search engines, Google AI Overviews, and conversational discovery through structured entity data.',
  },
  {
    slug: 'google-business-profile',
    label: 'Google Business Profile Tips',
    description: 'Proven optimization protocols to improve placement in the Google Maps 3-Pack, manage project photography feeds, and cultivate high-intent local inquiries.',
    seoTitle: 'Google Business Profile Tips for Builders | Ajith Growth',
    metaDescription: 'Actionable guidance on optimizing your Google Business Profile to capture high-intent local homeowners in Google Maps and local 3-pack results.',
  },
  {
    slug: 'construction-marketing',
    label: 'Construction Marketing',
    description: 'High-converting landing page design, conversion rate optimization, and closed-loop CRM attribution frameworks built for long residential sales cycles.',
    seoTitle: 'Construction Marketing Insights | Ajith Growth',
    metaDescription: 'Architectural landing page architecture, lead qualification funnels, and revenue attribution systems for residential builders.',
  },
  {
    slug: 'business-insights',
    label: 'Business Insights',
    description: 'Commercial ownership lessons, customer acquisition unit economics, cash flow discipline, and growth strategy for residential construction firm leaders.',
    seoTitle: 'Business Growth Insights | Ajith Growth',
    metaDescription: 'Strategic business insights, marketing ROI economics, and growth consulting frameworks for custom builders and remodeling executives.',
  },
];

const SLUG_ALIASES: Record<string, InsightCategorySlug> = {
  'seo-insights': 'seo',
  'ai-search-insights': 'ai-search',
  'google-business-profile-tips': 'google-business-profile',
  'google-ads-insights': 'google-ads',
  'construction-marketing-insights': 'construction-marketing',
  'business-insights-category': 'business-insights',
};

export function normalizeCategorySlug(slug: string): InsightCategorySlug | string {
  return SLUG_ALIASES[slug] || slug;
}

export function getCategoryBySlug(slug: string): InsightCategory | undefined {
  const normalized = normalizeCategorySlug(slug);
  return INSIGHT_CATEGORIES.find((cat) => cat.slug === normalized);
}

export function getCategoryLabel(slugOrLabel: string): string {
  const normalized = normalizeCategorySlug(slugOrLabel);
  const found = INSIGHT_CATEGORIES.find(
    (cat) => cat.slug === normalized || cat.label.toLowerCase() === slugOrLabel.toLowerCase()
  );
  return found ? found.label : slugOrLabel;
}

export function isValidCategorySlug(slug: string): slug is InsightCategorySlug {
  const normalized = normalizeCategorySlug(slug);
  return INSIGHT_CATEGORIES.some((cat) => cat.slug === normalized);
}

export const isCategorySlug = isValidCategorySlug;


