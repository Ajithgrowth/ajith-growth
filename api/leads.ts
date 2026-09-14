import type { IncomingMessage, ServerResponse } from 'node:http';

interface VercelRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => void;
  send: (body: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Server-side environment variable only
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('LEADS_WEBHOOK_URL server environment variable is missing.');
    return res.status(500).json({ error: 'Server configuration error: Webhook endpoint not configured' });
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON body' });
      }
    }

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Request body must be a JSON object' });
    }

    // Basic validation
    const { name, company, phoneOrEmail } = payload;
    if (!name || !company || !phoneOrEmail) {
      return res.status(400).json({ error: 'Missing required lead fields: name, company, phoneOrEmail' });
    }

    // Forward JSON payload to Google Apps Script Web App
    const upstreamResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const responseText = await upstreamResponse.text();
    let responseData: any;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { success: upstreamResponse.ok, message: responseText };
    }

    if (!upstreamResponse.ok) {
      console.error('Google Apps Script upstream error:', upstreamResponse.status, responseText);
      const statusCode = upstreamResponse.status >= 400 && upstreamResponse.status < 600 ? upstreamResponse.status : 502;
      return res.status(statusCode).json({
        error: 'Failed to record lead in Google Sheets',
        upstreamStatus: upstreamResponse.status,
      });
    }

    return res.status(200).json(
      responseData && typeof responseData === 'object' ? responseData : { success: true }
    );
  } catch (error: any) {
    console.error('Error in /api/leads serverless proxy:', error);
    return res.status(500).json({
      error: 'Internal server error processing lead',
      message: error?.message || 'Unknown error',
    });
  }
}
