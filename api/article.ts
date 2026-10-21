import { getArticleRedirect, getPublishedArticleRecord, injectArticleSeo } from '../server/cmsRuntime';

export default async function handler(req: any, res: any) {
  const slug = String(req.query?.slug || '').toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return res.status(404).send('Not found');
  }
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const origin = `${protocol}://${req.headers.host}`;
  const article = await getPublishedArticleRecord(slug);
  if (!article) {
    const redirect = await getArticleRedirect(slug);
    if (redirect) return res.redirect(301, `/insights/${redirect}`);
    return res.redirect(302, '/404.html');
  }
  const shellResponse = await fetch(`${origin}/?cms-shell=1`);
  if (!shellResponse.ok) return res.status(503).send('Article is temporarily unavailable.');
  const html = injectArticleSeo(await shellResponse.text(), article, origin);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  return res.status(200).send(html);
}
