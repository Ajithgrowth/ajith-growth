/**
 * Generates URL-safe and HTML ID-safe slugs from strings and headings.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove markdown links
    .replace(/[*_`#]/g, '') // remove markdown formatting
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Creates a stateful heading slug generator that tracks duplicates within one article.
 * First "Google Ads" -> "google-ads"
 * Second "Google Ads" -> "google-ads-2"
 * Third "Google Ads" -> "google-ads-3"
 * 
 * Works identically for TOC extraction and React Markdown heading rendering.
 */
export function createHeadingSlugger() {
  const seenIds = new Set<string>();

  return function getHeadingId(text: string): string {
    const baseSlug = slugify(text) || 'section';
    let id = baseSlug;
    if (seenIds.has(id)) {
      let counter = 2;
      while (seenIds.has(`${baseSlug}-${counter}`)) {
        counter++;
      }
      id = `${baseSlug}-${counter}`;
    }
    seenIds.add(id);
    return id;
  };
}
