import { getPublishedArticleEntries, mergeDynamicSitemap } from '../../server/cmsRuntime';

export async function handler(event: any) {
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const origin = `${protocol}://${event.headers.host}`;
  const [staticResponse, entries] = await Promise.all([
    fetch(`${origin}/sitemap-static.xml`),
    getPublishedArticleEntries(),
  ]);
  const staticXml = staticResponse.ok ? await staticResponse.text() : '';
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
    body: mergeDynamicSitemap(staticXml, entries, origin),
  };
}
