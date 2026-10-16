import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { ConsultationFormData } from '../types';
import { trackEvent } from '../utils/analytics';

const goals = ['Get better-quality enquiries', 'Improve Google visibility', 'Improve existing Google Ads', 'Build a complete Google growth strategy'];
const marketingOptions = ['Google Ads', 'SEO / Google Business Profile', 'Both Google Ads and SEO', 'Not using Google marketing yet'];

export type ConsultationIndustry = ConsultationFormData['industry'];

interface ContactFormProps {
  initialIndustry?: ConsultationIndustry;
  onIndustryChange?: (industry: ConsultationIndustry) => void;
}

function createInitialForm(industry: ConsultationIndustry): ConsultationFormData {
  return { industry, name: '', businessName: '', location: '', website: '', email: '', growthGoal: goals[0], currentMarketing: marketingOptions[0] };
}

export function ContactForm({ initialIndustry = 'residential-construction', onIndustryChange }: ContactFormProps) {
  const [form, setForm] = useState<ConsultationFormData>(() => createInitialForm(initialIndustry));
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setForm((current) => ({ ...current, industry: initialIndustry }));
  }, [initialIndustry]);

  function updateIndustry(industry: ConsultationIndustry) {
    setForm((current) => ({ ...current, industry }));
    onIndustryChange?.(industry);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setStatus('sending'); setError('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your request could not be sent.');
      setStatus('success'); trackEvent('consultation_form_submit', { goal: form.growthGoal, industry: form.industry });
    } catch (err: any) { setStatus('error'); setError(err?.message || 'Your request could not be sent. Please use WhatsApp or email.'); }
  }

  if (status === 'success') return <div className="rounded-2xl border border-emerald-200 bg-white p-10 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" /><h3 className="mt-4 text-2xl font-heading font-semibold text-[#0D1B2A]">Consultation Request Received</h3><p className="mt-3 text-[#64748B]">Thank you, {form.name}. Ajith will review your information and respond personally.</p><button onClick={() => { setForm(createInitialForm(form.industry)); setStatus('idle'); }} className="mt-6 text-sm font-semibold text-sky-800">Submit another request</button></div>;

  const inputClass = 'mt-1.5 w-full rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0D1B2A] focus:border-sky-600 focus:bg-white focus:outline-none';
  const isBoutique = form.industry === 'premium-designer-boutiques';

  return <form onSubmit={submit} className="rounded-2xl border border-[#DCE5EE] bg-white p-6 sm:p-10" aria-label="Growth consultation form">
    <h2 className="text-2xl font-heading font-semibold text-[#0D1B2A]">Tell Me About Your Business</h2>
    <p className="mt-3 text-[#64748B]">{isBoutique ? 'Share a few details about your boutique so the conversation can focus on your ideal customers, Google visibility and growth priorities.' : 'Share a few details about your business so the conversation can be focused on your goals and current challenges.'}</p>
    {status === 'error' && <div className="mt-5 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}
    <div className="mt-7 grid sm:grid-cols-2 gap-5">
      <label className="sm:col-span-2 text-sm font-semibold text-[#0D1B2A]">Industry *<select required value={form.industry} onChange={(e) => updateIndustry(e.target.value as ConsultationIndustry)} className={inputClass}><option value="residential-construction">Residential Construction</option><option value="premium-designer-boutiques">Premium &amp; Designer Boutiques</option></select></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Your Name *<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} autoComplete="name" /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Business Name *<input required value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className={inputClass} autoComplete="organization" /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Business Location *<input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Website (optional)<input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="https://" /></label>
      <label className="sm:col-span-2 text-sm font-semibold text-[#0D1B2A]">Your Email *<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} autoComplete="email" /></label>
      <label className="sm:col-span-2 text-sm font-semibold text-[#0D1B2A]">What is your main growth goal? *<select required value={form.growthGoal} onChange={(e) => setForm({ ...form, growthGoal: e.target.value })} className={inputClass}>{goals.map((goal) => <option key={goal}>{goal}</option>)}</select></label>
      <label className="sm:col-span-2 text-sm font-semibold text-[#0D1B2A]">What marketing are you currently using? *<select required value={form.currentMarketing} onChange={(e) => setForm({ ...form, currentMarketing: e.target.value })} className={inputClass}>{marketingOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
    </div>
    <button disabled={status === 'sending'} type="submit" className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0D1B2A] px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Request a Growth Consultation'} <Send className="h-4 w-4 text-sky-400" /></button>
    <p className="mt-4 text-center text-xs text-[#64748B]">We'll use this information only to understand your enquiry and respond personally. See our <a href="/privacy" className="font-semibold text-sky-800 underline underline-offset-2">Privacy Policy</a>.</p>
  </form>;
}
