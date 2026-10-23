const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const approvedIndustries = ['residential-construction', 'premium-designer-boutiques'];

function safe(value: string) {
  return value.replace(/[<>]/g, '').trim();
}

function industryLabel(industry: string) {
  return industry === 'premium-designer-boutiques' ? 'Premium Bridal & Designer Boutiques' : 'Residential Construction';
}

async function sendLeadToSheet(lead: Record<string, string>) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const webhookToken = process.env.LEADS_WEBHOOK_TOKEN;
  if (!webhookUrl || !webhookToken) return false;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...lead, token: webhookToken }),
  });

  return response.ok;
}

async function sendLeadEmail(lead: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Ajith Growth <onboarding@resend.dev>',
      to: ['ajithgrowth.consulting@gmail.com'],
      reply_to: lead.email,
      subject: `${lead.industry} growth consultation — ${lead.businessName}`,
      text: `Industry: ${lead.industry}\nName: ${lead.name}\nBusiness: ${lead.businessName}\nLocation: ${lead.location}\nWebsite: ${lead.website || 'Not provided'}\nEmail: ${lead.email}\nGrowth goal: ${lead.growthGoal}\nCurrent marketing: ${lead.currentMarketing}`,
    }),
  });

  return response.ok;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { industry, name, businessName, location, website, email, growthGoal, currentMarketing } = req.body || {};
  const required = [name, businessName, location, email, growthGoal, currentMarketing];
  if (!approvedIndustries.includes(industry) || !required.every((value) => typeof value === 'string' && value.trim()) || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please complete all required fields with a valid email.' });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    industry: industryLabel(industry),
    name: safe(name),
    businessName: safe(businessName),
    location: safe(location),
    website: safe(website || ''),
    email: safe(email),
    growthGoal: safe(growthGoal),
    currentMarketing: safe(currentMarketing),
    source: 'ajithgrowth.com contact form',
  };

  try {
    const sheetDelivered = await sendLeadToSheet(lead);
    const emailDelivered = await sendLeadEmail(lead);

    if (!sheetDelivered && !emailDelivered) {
      return res.status(503).json({ error: 'Online form delivery is being configured. Please use WhatsApp or email for now.' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(502).json({ error: 'The request could not be delivered. Please use WhatsApp or email.' });
  }
}
