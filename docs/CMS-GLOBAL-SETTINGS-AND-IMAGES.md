# CMS global settings and article images

## One-time database step

After deploying this source, run `supabase/migrations/202610220002_global_cms_settings.sql` once in the Supabase SQL Editor. It creates the protected `cms_site_settings` record used by the new **Settings** button in `/admin`.

## Global article settings

In `/admin`, select **Settings** in the top bar. You can update:

- Author name, bio, optional profile image URL and optional closing text.
- The consulting CTA heading, description, primary and optional secondary buttons.
- Optional WhatsApp button label, number and prefilled message. Leaving the number blank hides it on article pages.
- The important homepage, service, industry, contact and Insights URLs used by the editor.

Saved settings apply to article pages without changing each article template.

## Internal links in Markdown

In the article editor, select text and choose **Site link**. Enter one of the listed page names (for example `Contact`) or a valid site-relative URL. The editor adds normal Markdown such as `[Book a consultation](/contact)`.

## Article-body images

Use **Upload image** in the Markdown toolbar. Choose a JPEG, PNG or WebP image below 5 MB, provide descriptive alt text when prompted, and the editor inserts the Markdown image at the cursor. Body images are rendered responsively and lazy-loaded. The featured image remains the article's primary social/share image.

Use the existing image button only when the image has already been uploaded and you have its HTTPS or site-relative URL.

## FAQs

Enter public FAQs in the dedicated FAQ builder, not again in the Markdown body. The article editor warns when it detects a dedicated FAQ question repeated in the body. The public page and FAQ structured data use the same dedicated FAQ entries.
