# Ajith Growth SEO, Entity and GEO Handover

## What is implemented

- One environment-controlled canonical domain through `VITE_SITE_URL`.
- Page-specific title, description, canonical, robots, Open Graph and Twitter metadata.
- Stable Organization, Person, WebSite, WebPage, Service, BreadcrumbList, BlogPosting and conditional FAQ JSON-LD.
- Published CMS articles are server-rendered with their CMS SEO title, description, canonical URL, social image, image alt text, dates and a single BlogPosting graph.
- `/sitemap.xml` combines approved static public routes with only published, indexable CMS articles. It uses real article update dates and omits `priority` and `changefreq`.
- Build-time `robots.txt` follows the same canonical-domain setting and excludes `/admin/` and `/api/` from crawling.
- Missing public article slugs now return a real HTTP 404. Changed article slugs keep their permanent redirect path.
- Hero image uses WebP with a JPEG fallback and remains high priority. Article card images remain lazy-loaded with width and height attributes.
- Security response headers and long-lived caching for fingerprinted Vite assets are configured in `vercel.json`.

## Required production settings

Set these Vercel variables for **Production and Preview**, then redeploy:

```text
VITE_SITE_URL=https://your-final-public-domain
VITE_GA_MEASUREMENT_ID=G-...
VITE_GTM_ID=GTM-...              # only if GTM is used instead of a duplicate setup
VITE_GOOGLE_SITE_VERIFICATION=... # optional, when Search Console supplies a token
```

Use only one final public domain in `VITE_SITE_URL`. HTTPS, `www`/non-`www` redirects and the domain alias belong in Vercel's domain settings because they cannot be safely guessed in source code.

`VITE_ENABLE_LOCAL_BUSINESS_SCHEMA` deliberately remains off. Set it to `true` only after the public address and opening hours have been explicitly confirmed as accurate and approved for publication.

## After deployment

1. Confirm `https://your-final-public-domain/sitemap.xml` contains only the intended public URLs and published articles.
2. Confirm `https://your-final-public-domain/robots.txt` has the same domain in its sitemap line.
3. In Google Search Console, verify the preferred domain property and submit the sitemap.
4. Test Home, Services, both industry pages, Insights, one article, About and Contact with PageSpeed Insights or Lighthouse.
5. Test an intentionally nonexistent `/insights/not-a-real-article` URL returns 404, and a changed article slug returns one 301 redirect.

These deployment checks require the live Vercel and Search Console accounts; source code alone cannot prove indexing, redirects or Core Web Vitals field data.
