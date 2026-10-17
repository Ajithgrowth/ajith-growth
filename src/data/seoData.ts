import { siteConfig } from './siteConfig';
import { Article } from '../types';
import { INSIGHT_CATEGORIES, getCategoryBySlug, getCategoryLabel } from './insightCategories';

export interface SeoRouteData {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  lastmod: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: string;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
  noscriptHeading: string;
  noscriptBody: string;
  keywords?: string[];
  articleSection?: string;
  imageAlt?: string;
}

export const staticPagesSeo: Record<string, SeoRouteData> = {
  '/': {
    path: '/',
    title: 'Ajith Growth | Google Growth Systems for Business',
    description: 'Ajith Growth helps residential construction companies and selected premium bridal and designer boutiques build Google visibility, improve conversion and measure growth.',
    canonicalUrl: siteConfig.canonicalDomain,
    ogImage: `${siteConfig.canonicalDomain}/images/og-default.jpg`,
    ogType: 'website',
    lastmod: '2026-10-16',
    changefreq: 'weekly',
    priority: '1.0',
    noscriptHeading: 'Turning Google Visibility Into Meaningful Business Growth',
    noscriptBody: '<p><strong>For residential construction companies and selected premium bridal and designer boutiques.</strong></p><p>Ajith Growth connects Google Ads, SEO, local search, landing pages and conversion tracking to help the right customers discover your business, understand its value and take the next step.</p><p><a href="/industries/construction">Explore Construction Growth</a> | <a href="/industries/boutiques">Explore Boutique Growth</a> | <a href="/services">View Services</a> | <a href="/contact">Book Consultation</a></p>'
  },
  '/about': {
    path: '/about',
    title: 'About Ajith Growth | Technology, Business & Growth',
    description: 'Ajith Growth combines 16+ years in technology and management with hands-on business experience and practical Google growth consulting.',
    canonicalUrl: `${siteConfig.canonicalDomain}/about`,
    ogImage: `${siteConfig.canonicalDomain}/images/og-about.jpg`,
    ogType: 'website',
    lastmod: '2026-10-16',
    changefreq: 'monthly',
    priority: '0.8',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'About', url: `${siteConfig.canonicalDomain}/about` }
    ],
    noscriptHeading: 'About Ajith | Google Growth Consultant for Residential Construction',
    noscriptBody: '<p>Ajith Growth is built on 16+ years of experience in technology and management, combined with hands-on experience building and marketing a real business.</p><p><a href="/contact">Contact Ajith</a></p>'
  },
  '/services': {
    path: '/services',
    title: 'Google Growth Services | Ajith Growth',
    description: 'Google Ads, SEO, Google Business Profile, landing pages, conversion tracking and growth strategy built around your business.',
    canonicalUrl: `${siteConfig.canonicalDomain}/services`,
    ogImage: `${siteConfig.canonicalDomain}/images/article-google-ads.jpg`,
    ogType: 'website',
    lastmod: '2026-10-16',
    changefreq: 'monthly',
    priority: '0.9',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Services', url: `${siteConfig.canonicalDomain}/services` }
    ],
    noscriptHeading: 'Google Growth Services for Residential Construction Companies',
    noscriptBody: `
      <p>Google Ads, SEO, Google Business Profile, landing pages and conversion tracking connected around the business, its customers and its goals.</p>
      <ul>
        <li><a href="/services#google-ads"><strong>Google Ads:</strong> Reach people who are actively searching for the products or services your business offers.</a></li>
        <li><a href="/services#local-seo"><strong>SEO & Local Search:</strong> Build visibility beyond paid advertising.</a></li>
        <li><a href="/services#google-business-profile"><strong>Google Business Profile:</strong> Help potential customers discover accurate business information in Google Search and Maps.</a></li>
        <li><a href="/services#landing-pages"><strong>Landing Page Optimization:</strong> A clearer journey from search to enquiry.</a></li>
        <li><a href="/services#conversion-tracking"><strong>Conversion Tracking:</strong> Measure calls, forms, WhatsApp enquiries and other meaningful actions.</a></li>
        <li><a href="/services#growth-strategy"><strong>Growth Strategy:</strong> Connect search, visibility, conversion and measurement around your business goals.</a></li>
        <li><a href="/services#geo-ai-search"><strong>GEO & AI Search:</strong> Build clear business information and a well-structured website for evolving search experiences.</a></li>
      </ul>
      <p><a href="/industries/boutiques">Explore Boutique Growth</a> | <a href="/contact">Book a Growth Consultation</a> | <a href="/insights">Explore Growth Insights</a></p>
    `
  },
  '/insights': {
    path: '/insights',
    title: 'Growth Insights | Ajith Growth',
    description: 'Practical insights on Google Ads, SEO, local search, conversion, AI Search and business growth from Ajith Growth.',
    canonicalUrl: `${siteConfig.canonicalDomain}/insights`,
    ogImage: `${siteConfig.canonicalDomain}/images/article-google-business-profile.jpg`,
    ogType: 'website',
    lastmod: '2026-10-16',
    changefreq: 'weekly',
    priority: '0.9',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Insights', url: `${siteConfig.canonicalDomain}/insights` }
    ],
    noscriptHeading: 'Ajith Growth Insights',
    noscriptBody: '<p>Practical insights on Google Ads, SEO, Google Business Profile, AI Search and business growth, with construction as the primary focus and selected boutique-growth topics.</p>'
  },
  '/contact': {
    path: '/contact',
    title: 'Book a Growth Consultation | Ajith Growth',
    description: 'Start a growth consultation with Ajith about your construction company or premium bridal or designer boutique, Google visibility, enquiry journey and business goals.',
    canonicalUrl: `${siteConfig.canonicalDomain}/contact`,
    ogImage: `${siteConfig.canonicalDomain}/images/article-landing-pages.jpg`,
    ogType: 'website',
    lastmod: '2026-10-16',
    changefreq: 'monthly',
    priority: '0.8',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Contact', url: `${siteConfig.canonicalDomain}/contact` }
    ],
    noscriptHeading: 'Book a Growth Consultation',
    noscriptBody: `<p>Start with a conversation about your business, ideal customers, Google visibility and growth goals. Email <a href="mailto:${siteConfig.email}">${siteConfig.email}</a> or use the consultation form.</p>`
  },

  '/industries/construction': {
    path: '/industries/construction',
    title: 'Residential Construction Growth | Ajith Growth',
    description: 'Google growth strategy for residential construction companies seeking stronger visibility and better homeowner enquiries.',
    canonicalUrl: `${siteConfig.canonicalDomain}/industries/construction`,
    ogImage: `${siteConfig.canonicalDomain}/images/hero-home.jpg`, ogType: 'website', lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.8',
    breadcrumbs: [{ name: 'Home', url: siteConfig.canonicalDomain }, { name: 'Construction Growth', url: `${siteConfig.canonicalDomain}/industries/construction` }],
    noscriptHeading: 'Residential Construction Growth', noscriptBody: '<p>Helping residential construction companies build stronger Google visibility and attract homeowners who are genuinely planning their next project.</p>'
  },
  '/industries/boutiques': {
    path: '/industries/boutiques',
    title: 'Premium Bridal & Designer Boutique Growth | Ajith Growth',
    description: 'Google growth support for selected premium bridal and designer boutiques seeking stronger visibility and more relevant customer enquiries.',
    canonicalUrl: `${siteConfig.canonicalDomain}/industries/boutiques`,
    ogImage: `${siteConfig.canonicalDomain}/images/og-default.jpg`, ogType: 'website', lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.6',
    breadcrumbs: [{ name: 'Home', url: siteConfig.canonicalDomain }, { name: 'Boutique Growth', url: `${siteConfig.canonicalDomain}/industries/boutiques` }],
    noscriptHeading: 'Premium Bridal & Designer Boutique Growth', noscriptBody: '<p>Helping selected premium bridal and designer boutiques strengthen their Google presence and connect with customers who appreciate their work.</p>'
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | Ajith Growth',
    description: 'Privacy Policy for Ajith Growth. Learn how we handle and protect confidential business and contact information.',
    canonicalUrl: `${siteConfig.canonicalDomain}/privacy`,
    ogImage: `${siteConfig.canonicalDomain}/images/og-default.jpg`,
    ogType: 'website',
    lastmod: '2026-06-01',
    changefreq: 'yearly',
    priority: '0.3',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Privacy Policy', url: `${siteConfig.canonicalDomain}/privacy` }
    ],
    noscriptHeading: 'Privacy Policy | Ajith Growth',
    noscriptBody: '<p>Ajith Growth is committed to safeguarding client privacy and ensuring responsible data stewardship.</p>'
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Service | Ajith Growth',
    description: 'Terms of Service governing the use of Ajith Growth strategic consulting services and website resources.',
    canonicalUrl: `${siteConfig.canonicalDomain}/terms`,
    ogImage: `${siteConfig.canonicalDomain}/images/og-default.jpg`,
    ogType: 'website',
    lastmod: '2026-06-01',
    changefreq: 'yearly',
    priority: '0.3',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Terms of Service', url: `${siteConfig.canonicalDomain}/terms` }
    ],
    noscriptHeading: 'Terms of Service | Ajith Growth',
    noscriptBody: '<p>Terms and conditions applicable to Ajith Growth strategic consulting services.</p>'
  }
};

export function getArticleSeo(article: Article): SeoRouteData {
  const canonicalUrl = `${siteConfig.canonicalDomain}/insights/${article.slug}`;
  const categoryLabel = getCategoryLabel(article.category);
  const categoryUrl = `${siteConfig.canonicalDomain}/insights/${article.category}`;

  // Generate accessible semantic HTML for static crawlability
  const sectionsHtml = article.content
    ? article.content
        .map((block) => {
          if (block.startsWith('### ')) {
            const title = block.replace('### ', '');
            return `<h3>${title}</h3>`;
          }
          if (block.startsWith('## ')) {
            const title = block.replace('## ', '');
            return `<h2>${title}</h2>`;
          }
          // Convert markdown links [label](url) to <a href="url">label</a>
          const htmlText = block.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
          return `<p>${htmlText}</p>`;
        })
        .join('\n')
    : article.body
    ? `<p>${article.body.substring(0, 500)}...</p>`
    : '';

  const summaryItems = article.summary || article.keyTakeaways || [];
  const takeawaysHtml =
    summaryItems.length > 0
      ? `<div style="background:#F1F5F9;padding:1rem;border-left:4px solid #0284C7;margin:1.5rem 0;"><h3>Quick Summary</h3><ul>${summaryItems
          .map((t) => `<li>${t}</li>`)
          .join('')}</ul></div>`
      : '';

  const noscriptBody = `
    <p><strong>${article.excerpt}</strong></p>
    ${takeawaysHtml}
    ${sectionsHtml}
    <p style="margin-top:2rem;border-top:1px solid #E2E8F0;padding-top:1rem;">
      <a href="/insights">← Back to all Insights</a> | 
      <a href="${categoryUrl}">More in ${categoryLabel}</a> | 
      <a href="/contact">Book a Growth Consultation</a> | 
      <a href="/services">Explore Growth Services</a>
    </p>
  `;

  const pubDate = article.publishedDate || article.publishDate || '2026-09-08';
  const modDate = article.updatedDate || article.modifiedDate;

  return {
    path: `/insights/${article.slug}`,
    title: article.seoTitle || `${article.title} | Ajith Growth`,
    description: article.metaDescription || article.excerpt,
    canonicalUrl,
    ogImage: article.featuredImage.startsWith('http')
      ? article.featuredImage
      : `${siteConfig.canonicalDomain}${article.featuredImage}`,
    ogType: 'article',
    publishedTime: pubDate,
    modifiedTime: modDate,
    lastmod: modDate || pubDate,
    changefreq: 'monthly',
    priority: '0.7',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Insights', url: `${siteConfig.canonicalDomain}/insights` },
      { name: categoryLabel, url: categoryUrl },
      { name: article.title, url: canonicalUrl }
    ],
    faqs: article.faqs && article.faqs.length > 0 ? article.faqs : undefined,
    noscriptHeading: article.title,
    noscriptBody,
    keywords: article.keywords,
    articleSection: categoryLabel,
    imageAlt: article.featuredImageAlt,
  };
}

export function getCategorySeo(categorySlug: string): SeoRouteData | null {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  const canonicalUrl = `${siteConfig.canonicalDomain}/insights/${category.slug}`;

  return {
    path: `/insights/${category.slug}`,
    title: category.seoTitle || `${category.label} | Ajith Growth Insights`,
    description: category.metaDescription || category.description,
    canonicalUrl,
    ogImage: `${siteConfig.canonicalDomain}/images/og-default.jpg`,
    ogType: 'website',
    lastmod: '2026-09-12',
    changefreq: 'weekly',
    priority: '0.8',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Insights', url: `${siteConfig.canonicalDomain}/insights` },
      { name: category.label, url: canonicalUrl }
    ],
    noscriptHeading: `${category.label} Insights`,
    noscriptBody: `<p>${category.description}</p><p><a href="/insights">← Back to All Insights</a></p>`
  };
}

export function getAllSeoRoutes(articles: Article[]): SeoRouteData[] {
  const publishedArticles = articles.filter((a) => !a.draft);
  const staticList = Object.values(staticPagesSeo);

  // Only include categories that have at least 1 published article in the sitemap/prerender
  const categoryList = INSIGHT_CATEGORIES.map((cat) => {
    const hasPublished = publishedArticles.some((a) => a.category === cat.slug);
    if (!hasPublished) return null;
    return getCategorySeo(cat.slug);
  }).filter((item): item is SeoRouteData => item !== null);

  const articleList = publishedArticles.map(getArticleSeo);
  return [...staticList, ...categoryList, ...articleList];
}
