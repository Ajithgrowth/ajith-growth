import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MessageCircle } from 'lucide-react';
import { ConsultationFormData } from '../types';
import { trackEvent } from '../utils/analytics';
import { siteConfig } from '../data/siteConfig';

export function ContactForm() {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    company: '',
    website: '',
    location: '',
    primaryChallenge: 'Unqualified inquiries & budget shoppers',
    preferredContact: 'Email',
    phoneOrEmail: '',
    message: '',
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const challenges = [
    'Unqualified inquiries & budget shoppers',
    'High Google Ads spend with low signed contracts',
    'Poor Google 3-Pack Maps ranking in target suburbs',
    'Landing page fails to convert qualified homeowners',
    'Lack of offline CRM conversion tracking & attribution',
    'Preparing for AI Search & Google AI Overviews',
  ];

  const handleFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('consultation_form_start', { form_id: 'growth_consultation' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.company.trim() || !formData.phoneOrEmail.trim()) {
      setErrorMessage('Please fill in your name, company name, and contact information.');
      return;
    }

    trackEvent('consultation_form_submit', {
      company: formData.company,
      challenge: formData.primaryChallenge,
      contact_method: formData.preferredContact,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#DCE5EE] shadow-xs text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-heading font-semibold text-[#0D1B2A] mb-2">
          Consultation Request Received
        </h3>
        <p className="text-[#64748B] font-body text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
          Thank you, <span className="font-semibold text-[#0D1B2A]">{formData.name}</span>. Ajith personally reviews your company and local search landscape before our call. We will reach out via {formData.preferredContact} within 1 business day.
        </p>

        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE5EE] max-w-sm mx-auto text-left text-xs font-body text-[#64748B] mb-6">
          <span className="font-semibold text-[#0D1B2A] block mb-1">Direct inquiries</span>
          <span>Have an urgent timeline or preliminary questions? You can reach out directly via:</span>
          <div className="flex flex-col gap-2 mt-2.5">
            <a
              href={siteConfig.phoneTel}
              onClick={() => trackEvent('phone_click', { location: 'form_success_screen' })}
              className="inline-flex items-center gap-1.5 text-slate-800 font-semibold hover:text-sky-700"
            >
              <Phone className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span>Call: {siteConfig.phone}</span>
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'form_success_screen' })}
              className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>WhatsApp: {siteConfig.phone}</span>
            </a>
            <a
              href={siteConfig.emailMailto}
              onClick={() => trackEvent('email_click', { location: 'form_success_screen' })}
              className="inline-flex items-center gap-1.5 text-sky-700 font-semibold hover:underline"
            >
              <Mail className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span>Email: {siteConfig.email}</span>
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              company: '',
              website: '',
              location: '',
              primaryChallenge: challenges[0],
              preferredContact: 'Email',
              phoneOrEmail: '',
              message: '',
            });
          }}
          className="text-xs font-supporting font-semibold text-[#64748B] hover:text-[#0D1B2A] uppercase tracking-wider underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-10 border border-[#DCE5EE] shadow-xs space-y-5"
      aria-label="Growth Consultation Request Form"
    >
      <div className="border-b border-[#DCE5EE] pb-4 mb-2">
        <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 block mb-1">
          Direct Strategic Intake
        </span>
        <h3 className="text-xl sm:text-2xl font-heading font-semibold text-[#0D1B2A]">
          Request a Growth Consultation
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] font-body mt-1">
          No automated sales reps. You will speak directly with Ajith regarding your market positioning and Google growth architecture.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Field 1 & 2: Name & Company Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="form-name" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="form-name"
            type="text"
            required
            placeholder="e.g. Marcus Vance"
            value={formData.name}
            onFocus={handleFocus}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="form-company" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
            Company Name <span className="text-red-600">*</span>
          </label>
          <input
            id="form-company"
            type="text"
            required
            placeholder="e.g. Vance Custom Homes"
            value={formData.company}
            onFocus={handleFocus}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
          />
        </div>
      </div>

      {/* Field 3 & 4: Website & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="form-website" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
            Website
          </label>
          <input
            id="form-website"
            type="text"
            placeholder="e.g. vancecustomhomes.com"
            value={formData.website}
            onFocus={handleFocus}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="form-location" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
            Location
          </label>
          <input
            id="form-location"
            type="text"
            placeholder="e.g. Scottsdale, AZ / Greenwich, CT"
            value={formData.location}
            onFocus={handleFocus}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
          />
        </div>
      </div>

      {/* Field 5: Primary Growth Challenge */}
      <div>
        <label htmlFor="form-challenge" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
          Primary Growth Challenge
        </label>
        <select
          id="form-challenge"
          value={formData.primaryChallenge}
          onFocus={handleFocus}
          onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
        >
          {challenges.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Field 6: Preferred Contact Method */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="form-pref-contact" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
            Preferred Contact Method
          </label>
          <select
            id="form-pref-contact"
            value={formData.preferredContact}
            onFocus={handleFocus}
            onChange={(e) =>
              setFormData({
                ...formData,
                preferredContact: e.target.value as 'WhatsApp' | 'Phone' | 'Email',
              })
            }
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
          >
            <option value="WhatsApp">WhatsApp (Fastest response)</option>
            <option value="Phone">Phone Call</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div>
          <label htmlFor="form-contact-val" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
            {formData.preferredContact} Details <span className="text-red-600">*</span>
          </label>
          <input
            id="form-contact-val"
            type="text"
            required
            placeholder={
              formData.preferredContact === 'Email'
                ? 'builder@example.com'
                : 'Direct phone number or handle'
            }
            value={formData.phoneOrEmail}
            onFocus={handleFocus}
            onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
          />
        </div>
      </div>

      {/* Field 7: Message */}
      <div>
        <label htmlFor="form-message" className="block text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] mb-1.5">
          Message
        </label>
        <textarea
          id="form-message"
          rows={3}
          placeholder="Briefly describe your current construction focus, project types, or growth goals..."
          value={formData.message}
          onFocus={handleFocus}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:bg-white focus:border-[#0D1B2A] transition-colors"
        />
      </div>

      {/* Button: Request a Growth Consultation */}
      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-lg bg-[#0D1B2A] hover:bg-[#172A3A] text-white font-body font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xs active:scale-[0.99]"
      >
        <span>Request a Growth Consultation</span>
        <Send className="w-4 h-4 text-sky-400" />
      </button>

      <p className="text-center text-[11px] font-supporting text-[#64748B] pt-1">
        Confidential review. We strictly respect your trade territory and never share your data.
      </p>
    </form>
  );
}
