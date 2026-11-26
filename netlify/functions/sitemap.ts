import { getPublishedArticleEntries, mergeDynamicSitemap } from '../../server/cmsRuntime.js';

export async function handler(event: any) {
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const origin = `${protocol}://${event.headers.host}`;
  const [staticResult, entriesResult] = await Promise.allSettled([
    fetch(`${origin}/sitemap-static.xml`),
    getPublishedArticleEntries(),
  ]);
  const staticResponse = staticResult.status === 'fulfilled' ? staticResult.value : null;
  const staticXml = staticResponse?.ok ? await staticResponse.text().catch(() => '') : '';
  const entries = entriesResult.status === 'fulfilled' ? entriesResult.value : [];
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
    body: mergeDynamicSitemap(staticXml, entries, origin),
  };
}
