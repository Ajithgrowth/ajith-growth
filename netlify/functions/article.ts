import { getArticleRedirect, getPublishedArticleRecord, injectArticleSeo } from '../../server/cmsRuntime.js';

export async function handler(event: any) {
  const slug = String(event.queryStringParameters?.slug || '').toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { statusCode: 404, body: 'Not found' };
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const origin = `${protocol}://${event.headers.host}`;
  const article = await getPublishedArticleRecord(slug);
  if (!article) {
    const redirect = await getArticleRedirect(slug);
    return redirect
      ? { statusCode: 301, headers: { Location: `/insights/${redirect}` }, body: '' }
      : { statusCode: 302, headers: { Location: '/404.html' }, body: '' };
  }
  const shellResponse = await fetch(`${origin}/?cms-shell=1`);
  if (!shellResponse.ok) return { statusCode: 503, body: 'Article is temporarily unavailable.' };
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
    body: injectArticleSeo(await shellResponse.text(), article, origin),
  };
}
