import { useEffect, useState } from 'react';
import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ConsultationIndustry, ContactForm } from '../components/ContactForm';
import { siteConfig } from '../data/siteConfig';
import { staticPagesSeo } from '../data/seoData';
import { Link, useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

const Linkedin = ArrowRight;

const constructionQualification = [
  ['Turnkey Construction Companies', 'Businesses managing residential construction projects from planning through execution and looking to attract suitable homeowner enquiries.'],
  ['Villa & Premium Home Builders', 'Builders focused on custom homes, premium residences and villa projects who want to reach homeowners planning significant investments.'],
  ['Duplex & Custom Home Specialists', 'Businesses offering duplex construction, individually designed homes and other specialized residential projects.'],
  ['Construction Businesses Seeking Better Leads', 'Companies that want to improve lead relevance, strengthen their Google presence and make better-informed marketing decisions.'],
];

const boutiqueQualification = [
  ['Bridal & Couture Boutiques', 'Businesses offering custom bridal wear and specialized designer creations.'],
  ['Premium & Designer Fashion Boutiques', 'Boutiques offering distinctive fashion for customers who value design and craftsmanship.'],
  ['Customization-Led Boutiques', 'Businesses offering made-to-measure outfits, personalized design and specialized craftsmanship.'],
  ['Occasion-Wear & Designer-Wear Businesses', 'Selected boutiques specializing in special-occasion and designer outfits.'],
];

const constructionDiscussion = [
  ['1', 'Your Business & Services', 'Understand your construction services, project types, target locations and business priorities.'],
  ['2', 'Your Ideal Customers', 'Discuss the types of homeowners and residential projects you want to attract.'],
  ['3', 'Your Google Visibility', 'Review how potential customers can discover your business through Google Ads, organic search and Google Business Profile.'],
  ['4', 'Your Website & Enquiry Journey', 'Explore how clearly your website communicates your services and how easily potential customers can enquire.'],
  ['5', 'Your Current Marketing & Results', 'Discuss your existing marketing activities, enquiry quality and the performance information available.'],
  ['6', 'Growth Opportunities & Next Steps', 'Identify potential areas for improvement and discuss practical next steps aligned with your business goals.'],
];

const boutiqueDiscussion = [
  ['1', 'Your Boutique & Services', 'Understand your boutique, location, customized services and business priorities.'],
  ['2', 'Your Ideal Customers', 'Discuss the customers who value your designs, craftsmanship and service.'],
  ['3', 'Your Google Visibility', 'Review how customers can discover the boutique through Google Ads, organic search and Google Business Profile.'],
  ['4', 'Your Website & Enquiry Journey', "Explore how clearly the website explains the boutique's offering, customization process and next step."],
  ['5', 'Your Current Marketing & Enquiries', 'Discuss current marketing activities and the information available about meaningful enquiries.'],
  ['6', 'Growth Opportunities & Next Steps', 'Identify practical areas to improve around customer discovery, conversion and measurement.'],
];

function industryFromSearch(search: string): ConsultationIndustry {
  const value = new URLSearchParams(search).get('industry');
  return value === 'boutique' || value === 'boutiques' || value === 'premium-designer-boutiques'
    ? 'premium-designer-boutiques'
    : 'residential-construction';
}

export function ContactPage() {
  const seo = staticPagesSeo['/contact'];
  const { search, navigate } = useRouter();
  const [industry, setIndustry] = useState<ConsultationIndustry>(() => industryFromSearch(search));

  useEffect(() => setIndustry(industryFromSearch(search)), [search]);

  const isBoutique = industry === 'premium-designer-boutiques';
  const qualification = isBoutique ? boutiqueQualification : constructionQualification;
  const discussion = isBoutique ? boutiqueDiscussion : constructionDiscussion;

  function selectIndustry(nextIndustry: ConsultationIndustry, location: string) {
    setIndustry(nextIndustry);
    const queryValue = nextIndustry === 'premium-designer-boutiques' ? 'boutiques' : 'construction';
    navigate(`/contact?industry=${queryValue}#consultation-form`, { replace: true, preserveScroll: true });
    trackEvent('industry_selection', { industry: nextIndustry, location });
  }

  return <main id="main-content">
    <SEO title={seo.title} description={seo.description} canonicalUrl={seo.canonicalUrl} ogImage={seo.ogImage} breadcrumbs={seo.breadcrumbs} includeLocalBusiness />

    <section className="bg-[#0D1B2A] text-white py-20 sm:py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl"><nav className="text-xs text-slate-400 mb-6"><Link href="/">Home</Link> / Growth Consultation</nav><span className="text-xs font-semibold tracking-wider text-sky-400">GROWTH CONSULTATION</span><h1 className="mt-3 text-4xl sm:text-5xl font-heading font-bold">{isBoutique ? "Let's Talk About Your Boutique Growth" : "Let's Talk About Your Construction Business Growth"}</h1><p className="mt-6 text-lg text-slate-300 leading-relaxed">{isBoutique ? "Let's start with a conversation about your boutique, location, ideal customers, current Google visibility and growth priorities." : "Whether you're already running Google Ads, looking to improve local visibility or planning your digital growth strategy, let's start with a conversation about your business and your goals."}</p><div className="mt-8 flex flex-col sm:flex-row gap-4"><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'contact_hero', industry })} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 font-semibold text-white"><MessageCircle className="w-5 h-5" />Chat on WhatsApp</a><a href="#consultation-form" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-6 py-3.5 font-semibold text-white">Book a Growth Consultation <ArrowRight className="w-4 h-4" /></a></div><p className="mt-6 text-sm text-sky-400">{isBoutique ? 'Premium & Designer Boutiques • Google Ads • Google Business Profile • Local SEO • Conversion' : 'Residential Construction • Google Ads • Local SEO • Google Business Profile • AI Search'}</p></div></div></section>

    <section className="py-12 bg-[#F3F7FB] border-b border-[#DCE5EE]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-xl font-heading font-semibold text-[#0D1B2A]">Choose Your Industry</h2><p className="mt-2 text-sm text-[#64748B]">Select the option that best describes your business so the consultation journey can show the most relevant prompts.</p><div className="mt-5 grid sm:grid-cols-2 gap-4"><button type="button" onClick={() => selectIndustry('residential-construction', 'contact_industry_selector')} className={`rounded-xl border p-5 text-left ${!isBoutique ? 'border-[#0D1B2A] bg-[#0D1B2A] text-white' : 'border-[#DCE5EE] bg-white text-[#0D1B2A]'}`}><span className="font-heading font-semibold">Residential Construction</span><span className={`mt-1 block text-sm ${!isBoutique ? 'text-slate-300' : 'text-[#64748B]'}`}>Primary focus</span></button><button type="button" onClick={() => selectIndustry('premium-designer-boutiques', 'contact_industry_selector')} className={`rounded-xl border p-5 text-left ${isBoutique ? 'border-[#0D1B2A] bg-[#0D1B2A] text-white' : 'border-[#DCE5EE] bg-white text-[#0D1B2A]'}`}><span className="font-heading font-semibold">Premium &amp; Designer Boutiques</span><span className={`mt-1 block text-sm ${isBoutique ? 'text-slate-300' : 'text-[#64748B]'}`}>Selected secondary focus</span></button></div></div></section>

    <section className="py-20 bg-white border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mb-10"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">This Consultation Is Designed For</h2><p className="mt-4 text-lg text-[#64748B]">{isBoutique ? 'Ajith Growth works selectively with premium, designer and customization-led boutiques that want to strengthen their Google presence and connect with customers who appreciate their work.' : 'Ajith Growth works primarily with residential construction businesses looking to build a stronger Google growth system, improve search visibility and attract better-qualified homeowner opportunities.'}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{qualification.map(([title, text]) => <article key={title} className="rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-6"><h3 className="font-heading font-semibold text-[#0D1B2A]">{title}</h3><p className="mt-3 text-sm text-[#64748B] leading-relaxed">{text}</p></article>)}</div><p className="mt-8 font-semibold text-[#0D1B2A]">{isBoutique ? 'If your goal is to strengthen relevant search visibility and create a clearer path from discovery to enquiry, this consultation is for you.' : 'If your goal is to attract better-qualified residential construction opportunities, this consultation is for you.'}</p></div></section>

    <section className="py-20 bg-[#F8FAFC] border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mb-10"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">What We'll Discuss During the Consultation</h2><p className="mt-4 text-lg text-[#64748B]">Every consultation starts with understanding your business before discussing marketing solutions.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{discussion.map(([number, title, text]) => <article key={number} className="rounded-2xl border border-[#DCE5EE] bg-white p-7"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1B2A] text-xs font-bold text-white">{number}</span><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">{title}</h3><p className="mt-2 text-sm text-[#64748B] leading-relaxed">{text}</p></article>)}</div><p className="mt-8 text-[#0D1B2A]">The consultation is about understanding your business first—not selling a generic marketing package.</p></div></section>

    <section className="py-20 bg-white border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mb-10"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">Choose the Way You'd Like to Connect</h2><p className="mt-4 text-lg text-[#64748B]">Reach out through the channel that's most convenient for you.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'contact_methods', industry })} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7"><MessageCircle className="w-6 h-6 text-emerald-700" /><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">Chat on WhatsApp</h3><p className="mt-2 text-sm text-[#64748B]">Start a conversation about your {isBoutique ? 'boutique, current Google visibility' : 'construction business, current challenges'} and growth goals.</p><span className="mt-4 block text-xs font-bold text-emerald-700">PRIMARY CONTACT OPTION</span></a><a href={siteConfig.phoneTel} className="rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-7"><Phone className="w-6 h-6 text-sky-800" /><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">Call Ajith</h3><p className="mt-2 text-sm text-[#64748B]">Speak directly to discuss your business and explore whether Ajith Growth is the right fit.</p></a><a href={siteConfig.emailMailto} className="rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-7"><Mail className="w-6 h-6 text-sky-800" /><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">Send an Email</h3><p className="mt-2 text-sm text-[#64748B]">Share your requirements or questions in writing.</p></a>{siteConfig.socialProfiles.linkedin ? <a href={siteConfig.socialProfiles.linkedin} target="_blank" rel="noreferrer" className="rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-7"><Linkedin className="w-6 h-6 text-sky-800" /><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">Connect on LinkedIn</h3><p className="mt-2 text-sm text-[#64748B]">Connect professionally and learn more about Ajith's work and business insights.</p></a> : <div className="rounded-2xl border border-dashed border-[#DCE5EE] bg-[#F8FAFC] p-7"><Linkedin className="w-6 h-6 text-slate-400" /><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">Connect on LinkedIn</h3><p className="mt-2 text-sm text-[#64748B]">LinkedIn will be available after the verified profile URL is approved.</p></div>}</div><p className="mt-8 text-[#64748B]">Choose the channel that's most comfortable for you. Every enquiry receives a personal response from Ajith.</p></div></section>

    <section id="consultation-form" className="py-20 bg-[#F8FAFC] border-b border-[#DCE5EE] scroll-mt-24"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><ContactForm initialIndustry={industry} onIndustryChange={(nextIndustry) => selectIndustry(nextIndustry, 'consultation_form')} /></div></section>

    <section className="py-20 sm:py-24 bg-[#0D1B2A] text-white"><div className="max-w-5xl mx-auto px-4 text-center"><h2 className="text-3xl sm:text-4xl font-heading font-bold">Let's Build a Better Google Growth System Together</h2><p className="mt-5 text-lg text-slate-300">{isBoutique ? "If you're serious about strengthening your boutique's Google presence and creating a clearer path from search to enquiry, I'd be happy to start with a conversation." : "If you're serious about improving your construction company's visibility, attracting qualified homeowner enquiries and building measurable long-term growth, I'd be happy to start with a conversation."}</p><div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 font-semibold text-white"><MessageCircle className="w-5 h-5" />Chat on WhatsApp</a><a href="#consultation-form" className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3.5 font-semibold">Request a Growth Consultation</a></div><p className="mt-6 text-sm text-sky-400">A conversation first. A strategy next. Growth built around your business.</p></div></section>
  </main>;
}
