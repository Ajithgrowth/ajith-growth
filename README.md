# Ajith Growth Website

React and Vite website for Ajith Growth.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and configure the required values.
3. Run `npm run dev`.
4. Run `npm run lint` for TypeScript validation.
5. Run `npm run build` for the production build, generated Insights data, prerendered pages and sitemap.

## Content management

The production content manager is available at `/admin/`. Publishing an Insights article updates `content/insights/`; the deployment build refreshes article listings, categories and the sitemap.

## Consultation form

The form posts to `/api/contact`. Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in the deployment environment to enable email delivery. A Vercel API handler and an equivalent Netlify Function are included; Netlify redirects `/api/contact` to that function before the single-page-app fallback.

The form supports Residential Construction and Premium & Designer Boutiques. Boutique CTAs open `/contact?industry=boutiques#consultation-form`, which preselects the boutique-specific consultation journey.

## Pre-launch verification

- Configure and test the Resend environment variables on the selected host.
- Add the verified LinkedIn profile URL before enabling that contact option.
- Configure GA4 or GTM IDs if analytics collection is required.
- Confirm the published address, telephone number, email address and working hours with the site owner.
- Have the Privacy Policy and Terms of Service reviewed by the site owner or their legal adviser.
