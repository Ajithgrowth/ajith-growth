// Serverless function for Decap CMS GitHub OAuth initiation
export default async function handler(req: any, res: any) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).json({ error: 'GITHUB_CLIENT_ID is not configured.' });
    return;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
  githubAuthUrl.searchParams.set('scope', 'repo,user');

  res.redirect(302, githubAuthUrl.toString());
}
