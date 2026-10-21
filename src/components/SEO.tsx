import { useEffect } from 'react';
import { siteConfig, SCHEMA_IDS } from '../data/siteConfig';
import { services as siteServices } from '../data/services';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: { question: string; answer: string }[];
  noindex?: boolean;
  schema?: Record<string, any> | Record<string, any>[];
  keywords?: string[];
  articleSection?: string;
  imageAlt?: string;
  includeLocalBusiness?: boolean;
  includeServices?: boolean;
}

export function SEO({
  title,
  description,
  canonicalUrl = siteConfig.canonicalDomain,
  ogImage = `${siteConfig.canonicalDomain}/images/og-default.jpg`,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author = siteConfig.founder.name,
  breadcrumbs,
  faqs,
  noindex = false,
  schema,
  keywords,
  articleSection,
  imageAlt,
  includeLocalBusiness = false,
  includeServices = false,
}: SEOProps) {
  const fullTitle = title.includes('Ajith')
    ? title
    : `${title} | ${siteConfig.brandName}`;

  useEffect(() => {
    // 1. Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Robots meta tag for clean indexation control
    setMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', siteConfig.brandName);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');

    // Google Site Verification meta tag (only if configured)
    if (siteConfig.analytics.googleSiteVerification && siteConfig.analytics.googleSiteVerification.trim() !== '') {
      setMetaTag('name', 'google-site-verification', siteConfig.analytics.googleSiteVerification.trim());
    }

    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      setMetaTag('property', 'article:modified_time', modifiedTime);
    }
    if (author) {
      setMetaTag('property', 'article:author', author);
    }

    // 3. Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Schema JSON-LD Graph for Entity and GEO readiness
    let scriptTag = document.getElementById('page-schema-jsonld') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'page-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (schema) {
      scriptTag.textContent = JSON.stringify(schema);
    } else {
      const validSameAs = siteConfig.getValidSameAs();

      // Entity Graph: Organization (Publisher/Entity) & Person (Founder)
      const orgEntity: Record<string, any> = {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': SCHEMA_IDS.organization,
        name: siteConfig.brandName,
        url: siteConfig.canonicalDomain,
        logo: `${siteConfig.canonicalDomain}/favicon.svg`,
        slogan: siteConfig.primaryTagline,
        description: siteConfig.heroSupportingCopy,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        audience: {
          '@type': 'Audience',
          audienceType: 'Residential Construction Companies, Custom Home Builders, and Remodeling Contractors',
        },
        founder: {
          '@type': 'Person',
          '@id': SCHEMA_IDS.person,
        },
        knowsAbout: [
          'Google Ads for Residential Construction',
          'Local SEO for Custom Home Builders',
          'Google Business Profile for Contractors',
          'Landing Pages for Construction Companies',
          'Conversion Tracking for Construction Companies',
          'Generative Engine Optimization for Builders',
          'AI Search for Residential Construction',
          'Residential Construction Marketing',
        ],
      };

      if (validSameAs.length > 0) {
        orgEntity.sameAs = validSameAs;
      }

      const personEntity: Record<string, any> = {
        '@type': 'Person',
        '@id': SCHEMA_IDS.person,
        name: siteConfig.founder.name,
        jobTitle: siteConfig.founder.title,
        worksFor: {
          '@id': SCHEMA_IDS.organization,
        },
        url: `${siteConfig.canonicalDomain}/about`,
        description: siteConfig.founder.bio,
        knowsAbout: [
          'Google Growth Consulting',
          'Google Ads for Residential Construction',
          'Local SEO for Custom Home Builders',
          'Google Business Profile Optimization',
          'Conversion Rate Optimization & Landing Pages',
          'Closed-Loop Attribution & Construction CRM',
          'Generative Engine Optimization (GEO)',
        ],
      };

      if (validSameAs.length > 0) {
        personEntity.sameAs = validSameAs;
      }

      const graph: Record<string, any>[] = [
        orgEntity,
        personEntity,
        {
          '@type': 'WebSite',
          '@id': SCHEMA_IDS.website,
          url: siteConfig.canonicalDomain,
          name: siteConfig.brandName,
          publisher: {
            '@id': SCHEMA_IDS.organization,
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: fullTitle,
          description: description,
          isPartOf: {
            '@id': SCHEMA_IDS.website,
          },
        },
      ];

      // Add LocalBusiness schema on Contact page
      if (includeLocalBusiness) {
        graph.push({
          '@type': 'LocalBusiness',
          '@id': SCHEMA_IDS.localBusiness,
          name: siteConfig.brandName,
          url: siteConfig.canonicalDomain,
          email: siteConfig.email,
          telephone: siteConfig.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.streetAddress,
            addressLocality: siteConfig.address.addressLocality,
            addressRegion: siteConfig.address.addressRegion,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.addressCountry,
          },
          parentOrganization: {
            '@id': SCHEMA_IDS.organization,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
          ],
        });
      }

      // Add Service schemas on Services page
      if (includeServices) {
        siteServices.forEach((service) => {
          graph.push({
            '@type': 'Service',
            '@id': `${siteConfig.canonicalDomain}/services#${service.id}`,
            name: service.title,
            description: service.shortDesc || service.description,
            serviceType: service.eyebrow || service.title,
            url: `${siteConfig.canonicalDomain}/services#${service.id}`,
            provider: {
              '@type': 'Organization',
              '@id': SCHEMA_IDS.organization,
            },
            areaServed: {
              '@type': 'Country',
              name: 'India',
            },
          });
        });
      }

      // Add breadcrumb schema if present
      if (breadcrumbs && breadcrumbs.length > 0) {
        graph.push({
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: breadcrumbs.map((crumb, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        });
      }

      // Add Article schema if this is an article
      if (ogType === 'article') {
        const articlePosting: Record<string, any> = {
          '@type': 'BlogPosting',
          '@id': `${canonicalUrl}#article`,
          headline: fullTitle,
          description: description,
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          author: {
            '@id': SCHEMA_IDS.person,
          },
          publisher: {
            '@id': SCHEMA_IDS.organization,
          },
        };

        if (ogImage) {
          articlePosting.image = {
            '@type': 'ImageObject',
            url: ogImage,
            contentUrl: ogImage,
            caption: imageAlt || fullTitle,
          };
        }

        if (articleSection) {
          articlePosting.articleSection = articleSection;
        }

        if (keywords && keywords.length > 0) {
          articlePosting.keywords = keywords.join(', ');
        }

        graph.push(articlePosting);
      }

      // Add FAQPage schema ONLY if faqs are provided and non-empty
      if (faqs && faqs.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        });
      }

      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graph,
      });
    }
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, publishedTime, modifiedTime, author, breadcrumbs, faqs, noindex, schema, keywords, articleSection, imageAlt, includeLocalBusiness, includeServices]);

  return null;
}

