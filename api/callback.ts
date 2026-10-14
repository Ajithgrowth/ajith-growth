// Serverless function for Decap CMS GitHub OAuth callback
export default async function handler(req: any, res: any) {
  const code = req.query.code;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    res.status(400).send('Missing authorization code');
    return;
  }

  if (!clientId || !clientSecret) {
    res.status(500).send('OAuth credentials not configured on the server.');
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      res.status(400).send(`GitHub OAuth Error: ${data.error_description || data.error}`);
      return;
    }

    const token = data.access_token;
    const provider = 'github';

    // Standard Decap CMS / Netlify CMS postMessage handshake
    const script = `
      <!doctype html>
      <html>
      <head><title>Authorizing...</title></head>
      <body>
      <p>Authentication successful. Returning to Ajith Growth CMS...</p>
      <script>
        (function() {
          function receiveMessage(e) {
            window.opener.postMessage(
              'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
              e.origin
            );
            window.removeEventListener("message", receiveMessage, false);
            setTimeout(function() { window.close(); }, 500);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:${provider}", "*");
        })();
      </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(script);
  } catch (err: any) {
    res.status(500).send(`Authentication failed: ${err.message}`);
  }
}
