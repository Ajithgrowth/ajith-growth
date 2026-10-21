/**
 * Ajith Growth - Comprehensive SEO Keyword -> Page Map & Topical Authority Architecture
 * 
 * This map defines the authoritative keyword assignments, search intent, and entity relationships
 * across the website to prevent keyword cannibalization and maximize topical authority.
 */

export interface PageKeywordMapping {
  path: string;
  primaryTopic: string;
  primaryKeyword: string;
  searchIntent: 'Commercial' | 'Informational' | 'Navigational' | 'Transactional';
  supportingKeywords: string[];
  entityRole: 'Pillar Hub' | 'Commercial Service' | 'Author Entity' | 'Conversion' | 'Strategic Insight';
  canonicalUrl: string;
}

export interface TopicCluster {
  id: string;
  name: string;
  pillarArticleSlug: string;
  serviceId: string;
  primaryKeyword: string;
  plannedSubtopics: string[];
}

export const keywordPageMap: PageKeywordMapping[] = [
  {
    path: '/',
    primaryTopic: 'Google Growth Consultant for Residential Construction Companies',
    primaryKeyword: 'Google growth consultant for residential construction',
    searchIntent: 'Commercial',
    supportingKeywords: [
      'residential construction marketing consultant',
      'Google marketing for builders',
      'construction growth strategy',
      'qualified homeowner leads for custom builders',
      'luxury remodeler search marketing'
    ],
    entityRole: 'Pillar Hub',
    canonicalUrl: 'https://ajithgrowth.com'
  },
  {
    path: '/services',
    primaryTopic: 'Google Growth Services for Residential Construction Companies',
    primaryKeyword: 'Google growth services for construction companies',
    searchIntent: 'Commercial',
    supportingKeywords: [
      'Google Ads for construction companies',
      'SEO for construction companies',
      'Local SEO for builders',
      'Google Business Profile for builders',
      'construction landing pages',
      'conversion tracking for builders',
      'GEO and AI search for construction companies'
    ],
    entityRole: 'Commercial Service',
    canonicalUrl: 'https://ajithgrowth.com/services'
  },
  {
    path: '/about',
    primaryTopic: 'Ajith - Google Growth Consultant & Founder of Ajith Growth',
    primaryKeyword: 'Ajith Google growth consultant',
    searchIntent: 'Navigational',
    supportingKeywords: [
      'Ajith Growth founder',
      'residential construction marketing consultant background',
      'enterprise technology consultant residential construction',
      'Cognizant Accenture Wipro HP IBM Kyndryl technology consultant'
    ],
    entityRole: 'Author Entity',
    canonicalUrl: 'https://ajithgrowth.com/about'
  },
  {
    path: '/insights',
    primaryTopic: 'Ideas, Strategies & Insights for Residential Construction Growth',
    primaryKeyword: 'residential construction growth insights',
    searchIntent: 'Informational',
    supportingKeywords: [
      'custom home builder marketing strategy',
      'Google Ads benchmarks for builders',
      'local SEO guides for contractors',
      'construction CRM conversion attribution',
      'generative engine optimization for contractors'
    ],
    entityRole: 'Pillar Hub',
    canonicalUrl: 'https://ajithgrowth.com/insights'
  },
  {
    path: '/contact',
    primaryTopic: 'Confidential Growth Consultation for Residential Construction Leaders',
    primaryKeyword: 'construction growth consultation',
    searchIntent: 'Transactional',
    supportingKeywords: [
      'book growth consultation Ajith Growth',
      'residential builder Google Ads audit',
      'custom contractor search positioning consultation'
    ],
    entityRole: 'Conversion',
    canonicalUrl: 'https://ajithgrowth.com/contact'
  }
];

/**
 * Topical Authority Architecture - Pillar + Cluster Framework
 * Prepared for long-term CMS scalability without thin doorway pages.
 */
export const topicClusters: TopicCluster[] = [
  {
    id: 'google-ads',
    name: 'Google Ads for Residential Construction',
    pillarArticleSlug: 'google-ads-residential-construction-cost-per-lead',
    serviceId: 'google-ads',
    primaryKeyword: 'Google Ads for residential construction companies',
    plannedSubtopics: [
      'Google Ads Keyword Strategy for Builders',
      'Negative Keywords Architecture for Construction Ads',
      'Google Ads Cost Per Lead for Luxury Remodelers',
      'How Builders Can Improve Lead Quality from Search',
      'Google Ads Postal Code & Radius Targeting for Builders',
      'Value-Based Smart Bidding for Long Construction Sales Cycles'
    ]
  },
  {
    id: 'local-seo',
    name: 'SEO & Local Search for Builders',
    pillarArticleSlug: 'local-seo-framework-custom-home-builders',
    serviceId: 'local-seo',
    primaryKeyword: 'Local SEO for custom home builders',
    plannedSubtopics: [
      'Subdivision & Enclave Content Hub Architecture',
      'Architectural Project Schema for Home Builders',
      'Local Citations & Co-Citations in Architectural Media',
      'Technical SEO & Core Web Vitals for Builder Websites',
      'Hyper-Local Keyword Stratification in Affluent Suburbs'
    ]
  },
  {
    id: 'google-business-profile',
    name: 'Google Business Profile for Contractors',
    pillarArticleSlug: 'google-business-profile-ranking-signals-contractors',
    serviceId: 'google-business-profile',
    primaryKeyword: 'Google Business Profile for residential contractors',
    plannedSubtopics: [
      'Primary Category Selection for High-End Builders',
      'Architectural Photo Upload Cadence & Vision AI',
      'Semantic Review Acquisition Protocols for Handover Milestones',
      'Configuring the GBP Project & Service Catalog',
      'Google Maps 3-Pack Proximity Strategies for Showrooms'
    ]
  },
  {
    id: 'landing-pages',
    name: 'High-Ticket Landing Pages & Conversion Design',
    pillarArticleSlug: 'high-ticket-remodeling-landing-page-architecture',
    serviceId: 'landing-pages',
    primaryKeyword: 'Construction landing pages conversion rate optimization',
    plannedSubtopics: [
      'The Four Trust Pillars on Luxury Construction Pages',
      'Intentional Qualification Friction to Eliminate Tire-Kickers',
      'Designing High-Value Feasibility Consultation CTAs',
      'Mobile WhatsApp & Call Routing for Affluent Homeowners',
      'Heatmap Analysis & Form Field Abandonment for Builders'
    ]
  },
  {
    id: 'conversion-tracking',
    name: 'Closed-Loop Conversion Tracking & Attribution',
    pillarArticleSlug: 'conversion-tracking-custom-builders-offline-crm',
    serviceId: 'conversion-tracking',
    primaryKeyword: 'Conversion tracking for construction companies',
    plannedSubtopics: [
      'Capturing the GCLID Pipeline in Builder CRM',
      'Mapping Construction Sales Milestones to Google Ads API',
      'Server-Side Google Tag Manager for Privacy-Compliant Tracking',
      'Dynamic Number Insertion (DNI) Keyword Call Tracking',
      'Calculating Customer Acquisition Cost for $1M+ Custom Builds'
    ]
  },
  {
    id: 'geo-ai-search',
    name: 'Generative Engine Optimization (GEO) & AI Search',
    pillarArticleSlug: 'generative-engine-optimization-ai-search-builders',
    serviceId: 'geo-ai-search',
    primaryKeyword: 'Generative engine optimization for residential builders',
    plannedSubtopics: [
      'How AI Overviews & Perplexity Extract Contractor Entities',
      'Brand Entity Knowledge Graph Construction for Builders',
      'Information Gain Content Strategies for Technical Specs',
      'Conversational Query Optimization for Multi-Variable Searches',
      'Separating AI Reality from Marketing Hype in Construction'
    ]
  }
];
