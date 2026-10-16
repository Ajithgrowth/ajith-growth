const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const { industry, name, businessName, location, website, email, growthGoal, currentMarketing } = req.body || {};
  const approvedIndustries = ['residential-construction', 'premium-designer-boutiques'];
  if (!approvedIndustries.includes(industry) || ![name, businessName, location, email, growthGoal, currentMarketing].every((value) => typeof value === 'string' && value.trim()) || !emailPattern.test(email)) return res.status(400).json({ error: 'Please complete all required fields with a valid email.' });
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Online form delivery is being configured. Please use WhatsApp or email for now.' });
  const safe = (value: string) => value.replace(/[<>]/g, '');
  const industryLabel = industry === 'premium-designer-boutiques' ? 'Premium & Designer Boutiques' : 'Residential Construction';
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL || 'Ajith Growth <onboarding@resend.dev>', to: ['ajithgrowth.consulting@gmail.com'], reply_to: email, subject: `${industryLabel} growth consultation — ${safe(businessName)}`, text: `Industry: ${industryLabel}\nName: ${safe(name)}\nBusiness: ${safe(businessName)}\nLocation: ${safe(location)}\nWebsite: ${safe(website || 'Not provided')}\nEmail: ${safe(email)}\nGrowth goal: ${safe(growthGoal)}\nCurrent marketing: ${safe(currentMarketing)}` }) });
  if (!response.ok) return res.status(502).json({ error: 'The request could not be delivered. Please use WhatsApp or email.' });
  return res.status(200).json({ success: true });
}
