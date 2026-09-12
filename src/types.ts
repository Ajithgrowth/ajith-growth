import { InsightCategorySlug } from './data/insightCategories';

export interface NavItem {
  label: string;
  href: string;
}

export type Category = 
  | 'Google Ads'
  | 'SEO & Local Search'
  | 'Google Business Profile'
  | 'Conversion & Landing Pages'
  | 'Construction Growth'
  | 'GEO & AI Search'
  | 'Business Strategy';

export interface TableOfContentsItem {
  id: string;
  title: string;
  level?: number;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  title: string;
  slug: string;
  category: InsightCategorySlug | string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt?: string;
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
  featured?: boolean;
  draft?: boolean;
  keywords?: string[];
  seoTitle?: string;
  metaDescription?: string;
  summary?: string[];
  quick_summary?: string;
  author_name?: string;
  source?: 'cms' | 'markdown';
  faqs?: ArticleFAQ[];
  body?: string;

  // Optional future-ready fields
  tags?: string[];
  relatedServices?: string[];
  popular?: boolean;

  // Automatically code-generated helper fields
  readingTime?: string;
  tableOfContents?: TableOfContentsItem[];
  canonicalUrl?: string;

  // Compatibility accessors for seamless migration
  publishDate?: string;
  modifiedDate?: string;
  readTime?: string;
  imageAlt?: string;
  keyTakeaways?: string[];
  relatedSlugs?: string[];
  content?: string[];
  clusterId?: string;
  relatedServiceId?: string;
  primaryKeyword?: string;
  contentType?: 'strategic-analysis' | 'original-benchmark' | 'case-study' | 'framework';
}

export interface Service {
  id: string;
  eyebrow: string;
  title: string;
  shortDesc: string;
  description: string;
  focusAreas: string[];
  businessOutcome: string;
  strategicNote: string;
  iconName: string;
  tag: string;
  relatedArticleSlug?: string;
  relatedArticleTitle?: string;
}

export interface TimelineMilestone {
  year: string;
  role: string;
  company: string;
  category: 'corporate' | 'entrepreneurship' | 'consulting';
  description: string;
  keySkills: string[];
}

export interface ConsultationFormData {
  name: string;
  company: string;
  website: string;
  location: string;
  primaryChallenge: string;
  preferredContact: 'WhatsApp' | 'Phone' | 'Email';
  phoneOrEmail: string;
  message: string;
}
