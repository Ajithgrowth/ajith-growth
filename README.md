# Ajith Growth Website

React and Vite website for Ajith Growth.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and configure the required values.
3. Run `npm run dev`.
4. Run `npm run lint` for TypeScript validation.
5. Run `npm run build` for the production build, generated Insights data, prerendered pages and sitemap.

## Content management

The secure Supabase content manager is available at `/admin`. Published and due scheduled articles are read dynamically from the `published_articles` database view, so routine publishing does not require a code change or redeployment. Existing Markdown articles remain as a safe build-time fallback.

Apply `supabase/migrations/20261021_cms_dynamic_blog_v21.sql`, followed by `supabase/migrations/20261021_seed_existing_insights.sql` and `supabase/migrations/20261022_cms_refinements_v22.sql`, before deploying this release. Follow `docs/SUPABASE-SQL-STEPS.md` for the exact order, verification queries, Auth setup and backup checklist.

The Insights hub uses in-place category filters, combined title/summary search, featured fallback and Load More. Individual article URLs remain `/insights/article-slug`; category landing pages are intentionally not generated.

Set `VITE_SITE_URL` to the single public canonical domain (for example, `https://ajithgrowth.consulting`) before building. Do not leave multiple domains indexed.

## Consultation form

The form posts to `/api/contact`. Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in the deployment environment to enable email delivery. A Vercel API handler and an equivalent Netlify Function are included; Netlify redirects `/api/contact` to that function before the single-page-app fallback.

The form supports Residential Construction and Premium Bridal & Designer Boutiques. Boutique CTAs open `/contact?industry=boutiques#consultation-form`, which preselects the boutique-specific consultation journey.

## Pre-launch verification

- Configure and test the Resend environment variables on the selected host.
- Add the verified LinkedIn profile URL before enabling that contact option.
- Configure GA4 or GTM IDs if analytics collection is required.
- Confirm the published address, telephone number, email address and working hours with the site owner.
- Have the Privacy Policy and Terms of Service reviewed by the site owner or their legal adviser.
