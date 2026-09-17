import fs from 'node:fs';
import path from 'node:path';
import { getAllSeoRoutes } from '../src/data/seoData.ts';
import { getAllArticles } from '../src/generated/insights.ts';
import { fetchPublishedCMSArticles, mergeArticles } from '../src/lib/cmsArticles.ts';
import { siteConfig, SCHEMA_IDS } from '../src/data/siteConfig.ts';
import { services as siteServices } from '../src/data/services.ts';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('prerender.ts: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(BASE_HTML_PATH, 'utf8');

async function runPrerender() {
  // Combine static routes, category archive routes, and dynamic article routes
  const markdownArticles = getAllArticles();
  let cmsArticles: any[] = [];

  try {
    console.log('prerender.ts: Fetching published Supabase CMS articles...');
    cmsArticles = await Promise.race([
      fetchPublishedCMSArticles(),
      new Promise<any[]>((resolve) => setTimeout(() => resolve([]), 5000)),
    ]);
    if (cmsArticles.length > 0) {
      console.log(`prerender.ts: Fetched ${cmsArticles.length} published CMS articles.`);
    } else {
      console.log('prerender.ts: No remote CMS articles returned. Proceeding with local markdown articles.');
    }
  } catch (err: any) {
    console.warn('prerender.ts: Remote CMS fetch notice:', err?.message || err);
  }

  const allArticles = mergeArticles(markdownArticles, cmsArticles);
  const routes = getAllSeoRoutes(allArticles);

function buildSchemaGraph(route: typeof routes[0]) {
  const validSameAs = siteConfig.getValidSameAs();

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
      audienceType: 'Residential Construction Companies, Turnkey Builders, Villa Construction Companies, and Luxury Home Builders',
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
      '@id': `${route.canonicalUrl}#webpage`,
      url: route.canonicalUrl,
      name: route.title,
      description: route.description,
      isPartOf: {
        '@id': SCHEMA_IDS.website,
      },
    },
  ];

  // Contact page: LocalBusiness schema
  if (route.path === '/contact') {
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

  // Services page: Service schemas
  if (route.path === '/services') {
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

  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${route.canonicalUrl}#breadcrumb`,
      itemListElement: route.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  if (route.ogType === 'article') {
    const articlePosting: Record<string, any> = {
      '@type': 'BlogPosting',
      '@id': `${route.canonicalUrl}#article`,
      headline: route.title,
      description: route.description,
      datePublished: route.publishedTime,
      dateModified: route.modifiedTime || route.publishedTime,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': route.canonicalUrl,
      },
      author: {
        '@id': SCHEMA_IDS.person,
      },
      publisher: {
        '@id': SCHEMA_IDS.organization,
      },
    };

    if (route.ogImage) {
      articlePosting.image = {
        '@type': 'ImageObject',
        url: route.ogImage,
        contentUrl: route.ogImage,
        caption: route.imageAlt || route.title,
      };
    }

    if (route.articleSection) {
      articlePosting.articleSection = route.articleSection;
    }

    if (route.keywords && route.keywords.length > 0) {
      articlePosting.keywords = route.keywords.join(', ');
    }

    graph.push(articlePosting);
  }

  if (route.faqs && route.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${route.canonicalUrl}#faq`,
      mainEntity: route.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}


let renderedCount = 0;

for (const route of routes) {
  let html = baseTemplate;

  // 1. Replace <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

  // 2. Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${route.description}" />`
  );

  // 3. Replace canonical
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/s,
    `<link rel="canonical" href="${route.canonicalUrl}" />`
  );

  // 4. Replace og:title
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${route.title}" />`
  );

  // 5. Replace og:description
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${route.description}" />`
  );

  // 6. Replace og:url
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${route.canonicalUrl}" />`
  );

  // 7. Replace og:image
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/s,
    `<meta property="og:image" content="${route.ogImage}" />`
  );

  // 8. Replace og:type
  html = html.replace(
    /<meta property="og:type" content=".*?" \/>/s,
    `<meta property="og:type" content="${route.ogType}" />`
  );

  // 9. Replace twitter tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/s,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/s,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/s,
    `<meta name="twitter:image" content="${route.ogImage}" />`
  );

  // 10. Replace JSON-LD schema
  const schema = buildSchemaGraph(route);
  const schemaTag = `<script id="page-schema-jsonld" type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>`;
  html = html.replace(/<script id="page-schema-jsonld" type="application\/ld\+json">.*?<\/script>/s, schemaTag);
  if (!html.includes('id="page-schema-jsonld"')) {
    html = html.replace(/<script type="application\/ld\+json">.*?<\/script>/s, schemaTag);
  }

  // 10b. Verification & robots tags
  if (route.noindex) {
    if (html.includes('<meta name="robots"')) {
      html = html.replace(/<meta name="robots".*?\/>/, '<meta name="robots" content="noindex, follow" />');
    } else {
      html = html.replace('</head>', '  <meta name="robots" content="noindex, follow" />\n  </head>');
    }
  }

  if (siteConfig.analytics.googleSiteVerification && siteConfig.analytics.googleSiteVerification.trim() !== '') {
    const gscTag = `<meta name="google-site-verification" content="${siteConfig.analytics.googleSiteVerification.trim()}" />\n  `;
    if (!html.includes('name="google-site-verification"')) {
      html = html.replace('</head>', `  ${gscTag}</head>`);
    }
  }

  // 11. Replace noscript content

  const noscriptContent = `
    <noscript>
      <header style="background: #0D1B2A; color: #FFFFFF; padding: 2rem 1rem; text-align: center;">
        <h1 style="font-size: 1.8rem; margin: 0 0 0.5rem 0;">${route.title}</h1>
        <p style="color: #94A3B8; margin: 0;">Ajith Growth | Google Growth Consultant for Residential Construction</p>
      </header>
      <main style="max-width: 800px; margin: 2rem auto; padding: 0 1rem; font-family: sans-serif; line-height: 1.6; color: #1E293B;">
        <h2>${route.noscriptHeading}</h2>
        ${route.noscriptBody}
      </main>
    </noscript>`;
  html = html.replace(/<noscript>.*?<\/noscript>/s, noscriptContent);

  // Determine output path
  let targetFile: string;
  if (route.path === '/') {
    targetFile = path.join(DIST_DIR, 'index.html');
  } else {
    const routeFolder = path.join(DIST_DIR, route.path.replace(/^\//, ''));
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }
    targetFile = path.join(routeFolder, 'index.html');
  }

  fs.writeFileSync(targetFile, html, 'utf8');
  renderedCount++;
}

console.log(`prerender.ts: Successfully prerendered ${renderedCount} static routes.`);

// Automated sitemap.xml generation (excluding noindex routes)
const sitemapRoutes = routes.filter((r) => !r.noindex);
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map((r) => {
    return `  <url>
    <loc>${r.canonicalUrl}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
if (fs.existsSync(PUBLIC_DIR)) {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
}

console.log(`prerender.ts: Successfully generated sitemap.xml with ${routes.length} URLs in both dist/ and public/.`);
}

runPrerender().catch((err) => {
  console.error('prerender.ts: Fatal prerender error:', err);
  process.exit(1);
});
