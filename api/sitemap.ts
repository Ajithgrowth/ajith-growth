import { getPublishedArticleEntries, mergeDynamicSitemap } from '../server/cmsRuntime';

export default async function handler(req: any, res: any) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const origin = `${protocol}://${req.headers.host}`;
  const [staticResponse, entries] = await Promise.all([
    fetch(`${origin}/sitemap-static.xml`),
    getPublishedArticleEntries(),
  ]);
  const staticXml = staticResponse.ok ? await staticResponse.text() : '';
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  return res.status(200).send(mergeDynamicSitemap(staticXml, entries, origin));
}
