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

export interface ArticleSectionImage {
  url?: string;
  alt?: string;
  caption?: string;
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
  author_designation?: string;
  author_photo?: string;
  author_bio?: string;
  is_featured?: boolean;
  og_image?: string;
  ogImage?: string;
  noindex?: boolean;
  source?: 'cms' | 'markdown';
  faqs?: ArticleFAQ[];
  body?: string;

  // Personal Brand, Builder ICP & Authority Fields
  target_keyword?: string;
  targetKeyword?: string;
  builder_segment?: string;
  builderSegment?: string;
  strategic_takeaway?: string;
  strategicTakeaway?: string;
  primary_service_cta?: string;
  primaryServiceCta?: string;
  linkedin_post_summary?: string;
  linkedinPostSummary?: string;

  // Contextual section images (1-4)
  section_image_1?: string;
  section_image_1_alt?: string;
  section_image_1_caption?: string;
  section_image_2?: string;
  section_image_2_alt?: string;
  section_image_2_caption?: string;
  section_image_3?: string;
  section_image_3_alt?: string;
  section_image_3_caption?: string;
  section_image_4?: string;
  section_image_4_alt?: string;
  section_image_4_caption?: string;

  sectionImage1?: string | null;
  sectionImage1Alt?: string | null;
  sectionImage1Caption?: string | null;
  sectionImage2?: string | null;
  sectionImage2Alt?: string | null;
  sectionImage2Caption?: string | null;
  sectionImage3?: string | null;
  sectionImage3Alt?: string | null;
  sectionImage3Caption?: string | null;
  sectionImage4?: string | null;
  sectionImage4Alt?: string | null;
  sectionImage4Caption?: string | null;
  sectionImages?: ArticleSectionImage[];

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
  ctaText?: string;
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
