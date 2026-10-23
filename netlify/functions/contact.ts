const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const approvedIndustries = ['residential-construction', 'premium-designer-boutiques'];

function response(statusCode: number, body: Record<string, unknown>) {
  return { statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

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

  const delivery = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...lead, token: webhookToken }),
  });
  return delivery.ok;
}

async function sendLeadEmail(lead: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const delivery = await fetch('https://api.resend.com/emails', {
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
  return delivery.ok;
}

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed.' });

  let data: any;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return response(400, { error: 'Please submit valid form information.' });
  }

  const { industry, name, businessName, location, website, email, growthGoal, currentMarketing } = data;
  const required = [name, businessName, location, email, growthGoal, currentMarketing];
  if (!approvedIndustries.includes(industry) || !required.every((value) => typeof value === 'string' && value.trim()) || !emailPattern.test(email)) {
    return response(400, { error: 'Please complete all required fields with a valid email.' });
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
    if (!sheetDelivered && !emailDelivered) return response(503, { error: 'Online form delivery is being configured. Please use WhatsApp or email for now.' });
    return response(200, { success: true });
  } catch {
    return response(502, { error: 'The request could not be delivered. Please use WhatsApp or email.' });
  }
}
