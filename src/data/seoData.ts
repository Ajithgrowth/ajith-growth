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
    title: 'Ajith Growth | Google Ads & SEO for Home Builders',
    description: 'Ajith Growth helps residential construction companies win qualified homeowner leads through Google Ads, Local SEO, and conversion-focused growth systems.',
    canonicalUrl: siteConfig.canonicalDomain,
    ogImage: `${siteConfig.canonicalDomain}/images/og-default.jpg`,
    ogType: 'website',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '1.0',
    noscriptHeading: 'Turn Google Searches Into High-Value Construction Opportunities',
    noscriptBody: '<p>Ajith Growth helps residential construction companies, turnkey builders, villa developers, and luxury remodelers attract qualified homeowners through Google Ads, Local SEO, Google Business Profile optimization, landing pages, and closed-loop conversion tracking.</p><p><a href="/services">View Services</a> | <a href="/insights">Read Insights</a> | <a href="/contact">Book Consultation</a></p>'
  },
  '/about': {
    path: '/about',
    title: 'About Ajith | Google Growth Consultant',
    description: 'Meet Ajith, a Google Growth Consultant for residential builders, bringing 16+ years of enterprise tech experience to engineered growth systems.',
    canonicalUrl: `${siteConfig.canonicalDomain}/about`,
    ogImage: `${siteConfig.canonicalDomain}/images/og-about.jpg`,
    ogType: 'website',
    lastmod: '2026-08-15',
    changefreq: 'monthly',
    priority: '0.8',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'About', url: `${siteConfig.canonicalDomain}/about` }
    ],
    noscriptHeading: 'About Ajith | Google Growth Consultant for Residential Construction',
    noscriptBody: '<p>With 16+ years in Technology & Management across global leaders (Cognizant, Accenture, Wipro, HP, IBM, Kyndryl), Ajith specializes exclusively in engineered Google growth systems for residential construction companies.</p><p><a href="/contact">Contact Ajith</a></p>'
  },
  '/services': {
    path: '/services',
    title: 'Google Ads, SEO & GBP for Builders | Ajith Growth',
    description: 'Google Ads, Local SEO, Google Business Profile, landing pages, and closed-loop tracking built for custom home builders and luxury remodelers.',
    canonicalUrl: `${siteConfig.canonicalDomain}/services`,
    ogImage: `${siteConfig.canonicalDomain}/images/article-google-ads.jpg`,
    ogType: 'website',
    lastmod: '2026-09-09',
    changefreq: 'monthly',
    priority: '0.9',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Services', url: `${siteConfig.canonicalDomain}/services` }
    ],
    faqs: [
      {
        question: 'Why choose a specialist consultant over a generic marketing agency?',
        answer: 'Generic agencies deploy boilerplate templates across unrelated industries. A specialist consultant understands residential construction sales cycles, qualification friction, and builds customized search architectures tied directly to signed construction contracts.'
      },
      {
        question: 'How does Google Ads perform for residential construction companies?',
        answer: 'Google Ads can help builders reach homeowners actively searching for construction services when targeting, landing pages and conversion measurement are structured correctly.'
      },
      {
        question: 'What types of residential construction firms do you work with?',
        answer: 'We work with established residential construction companies, including turnkey builders, villa construction specialists, luxury custom home builders, and major residential remodelers.'
      }
    ],
    noscriptHeading: 'Google Growth Services for Residential Construction Companies',
    noscriptBody: `
      <p>Specialized search systems engineered for residential builders: Google Ads, Local SEO, Google Business Profile, Architectural Landing Pages, Closed-Loop Tracking, and Generative Engine Optimization.</p>
      <ul>
        <li><a href="/services#google-ads"><strong>Google Ads for Residential Construction:</strong> High-intent search campaigns targeting homeowners actively searching for residential building and remodeling services.</a></li>
        <li><a href="/services#local-seo"><strong>Local SEO for Custom Home Builders:</strong> Improve local organic search visibility in key neighborhoods and service areas.</a></li>
        <li><a href="/services#google-business-profile"><strong>Google Business Profile Optimization:</strong> Map pack ranking, verified local citations, and trust signals for luxury contractors.</a></li>
        <li><a href="/services#landing-pages"><strong>Landing Page Architecture:</strong> High-converting, portfolio-centered landing experiences engineered with qualification friction.</a></li>
        <li><a href="/services#conversion-tracking"><strong>Conversion Tracking & Revenue Loop:</strong> Connect offline CRM milestones and signed construction contracts directly to Google search terms.</a></li>
        <li><a href="/services#growth-strategy"><strong>Residential Growth Architecture:</strong> Holistic search and sales alignment for sustainable contractor growth.</a></li>
        <li><a href="/services#geo-ai-search"><strong>Generative Engine Optimization (GEO):</strong> Structured entity architecture positioning your firm for AI Overviews and answer engines.</a></li>
      </ul>
      <p><a href="/contact">Book a Growth Consultation</a> | <a href="/insights">Explore Strategic Insights</a></p>
    `
  },
  '/insights': {
    path: '/insights',
    title: 'Construction Marketing Insights | Ajith Growth',
    description: 'Search strategy and technical insights on Google Ads, Local SEO, conversion, and AI search for residential construction companies.',
    canonicalUrl: `${siteConfig.canonicalDomain}/insights`,
    ogImage: `${siteConfig.canonicalDomain}/images/article-google-business-profile.jpg`,
    ogType: 'website',
    lastmod: '2026-09-08',
    changefreq: 'weekly',
    priority: '0.9',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Insights', url: `${siteConfig.canonicalDomain}/insights` }
    ],
    noscriptHeading: 'Construction Growth Insights & Technical Strategy',
    noscriptBody: '<p>In-depth technical guides for residential contractors and custom builders covering Google Ads, Local SEO, GBP optimization, conversion architecture, and AI search.</p>'
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Ajith | Construction Growth Consultant',
    description: 'Book a confidential growth consultation with Ajith to review your construction company\'s Google search positioning and local competition.',
    canonicalUrl: `${siteConfig.canonicalDomain}/contact`,
    ogImage: `${siteConfig.canonicalDomain}/images/article-landing-pages.jpg`,
    ogType: 'website',
    lastmod: '2026-08-18',
    changefreq: 'monthly',
    priority: '0.8',
    breadcrumbs: [
      { name: 'Home', url: siteConfig.canonicalDomain },
      { name: 'Contact', url: `${siteConfig.canonicalDomain}/contact` }
    ],
    noscriptHeading: 'Schedule a Confidential Construction Growth Consultation',
    noscriptBody: `<p>Direct communication with Ajith: email <a href="mailto:${siteConfig.email}">${siteConfig.email}</a> or submit the preliminary consultation request form.</p>`
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
