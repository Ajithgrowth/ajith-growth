const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const approvedIndustries = ['residential-construction', 'premium-designer-boutiques'];

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return response(405, { error: 'Method not allowed.' });
  }

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return response(503, { error: 'Online form delivery is being configured. Please use WhatsApp or email for now.' });
  }

  const safe = (value: string) => value.replace(/[<>]/g, '');
  const industryLabel = industry === 'premium-designer-boutiques' ? 'Premium & Designer Boutiques' : 'Residential Construction';
  const delivery = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Ajith Growth <onboarding@resend.dev>',
      to: ['ajithgrowth.consulting@gmail.com'],
      reply_to: email,
      subject: `${industryLabel} growth consultation — ${safe(businessName)}`,
      text: `Industry: ${industryLabel}\nName: ${safe(name)}\nBusiness: ${safe(businessName)}\nLocation: ${safe(location)}\nWebsite: ${safe(website || 'Not provided')}\nEmail: ${safe(email)}\nGrowth goal: ${safe(growthGoal)}\nCurrent marketing: ${safe(currentMarketing)}`,
    }),
  });

  if (!delivery.ok) {
    return response(502, { error: 'The request could not be delivered. Please use WhatsApp or email.' });
  }

  return response(200, { success: true });
}

function response(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
