import { Mail, Phone, MapPin, Clock, Linkedin, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ContactForm } from '../components/ContactForm';
import { siteConfig } from '../data/siteConfig';
import { staticPagesSeo } from '../data/seoData';
import { trackEvent } from '../utils/analytics';
import { Link } from '../utils/router';

export function ContactPage() {
  const seo = staticPagesSeo['/contact'];

  return (
    <main id="main-content" className="w-full">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
        breadcrumbs={seo.breadcrumbs}
        includeLocalBusiness={true}
      />

      {/* Hero Header with exact requested eyebrow and H1 */}
      <section className="bg-[#0D1B2A] text-white pt-8 pb-16 sm:pt-12 sm:pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-supporting uppercase tracking-wider text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-sky-400">Contact</span>
            </nav>

            <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
              GROWTH CONSULTATION
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
              Let's Talk About Your Construction Business Growth
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed mb-8">
              Speak directly with Ajith to evaluate your market territory, analyze competitor search vulnerabilities, and determine the exact Google growth architecture for your construction business.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA: Book a Growth Consultation (Scrolls to form) */}
              <a
                href="#consultation-form"
                onClick={() => trackEvent('consultation_cta_click', { location: 'contact_hero_primary' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0D1B2A] font-body font-semibold text-sm transition-all shadow-xs"
              >
                <span>Request Growth Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#0D1B2A]" />
              </a>

              {/* Secondary CTA: Direct Phone */}
              <a
                href={siteConfig.phoneTel}
                onClick={() => trackEvent('phone_click', { location: 'contact_hero_secondary' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-white font-body font-medium text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call {siteConfig.phone}</span>
              </a>

              {/* Tertiary CTA: WhatsApp */}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'contact_hero_tertiary' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-emerald-600/70 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-body font-medium text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Qualification + Agenda + Ways to Connect + Form */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Who This Is For + Agenda + Ways to Connect */}
            <div className="lg:col-span-6 space-y-10">
              {/* 1. Who consultation is for */}
              <div className="bg-white p-7 rounded-2xl border border-[#DCE5EE] shadow-xs">
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
                  QUALIFICATION CRITERIA
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[#0D1B2A] mb-4">
                  Who This Consultation Is For
                </h2>
                <div className="space-y-3 font-body text-sm text-[#64748B]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0D1B2A]">Residential Construction Companies:</strong> Turnkey home builders, custom villa contractors, and residential construction firms.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0D1B2A]">Substantial Project Focus:</strong> Companies focused on turnkey home construction, private villas, and bespoke residential builds.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0D1B2A]">Frustrated by Generic Marketing:</strong> Builders tired of tire-kickers, budget shoppers, and agencies that don't understand residential construction.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0D1B2A]">Commitment to Growth Systems:</strong> Leaders who view marketing as an integrated pipeline delivering qualified leads and measurable results.
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. What we’ll discuss */}
              <div className="bg-white p-7 rounded-2xl border border-[#DCE5EE] shadow-xs">
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
                  CONSULTATION AGENDA
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[#0D1B2A] mb-4">
                  What We’ll Discuss
                </h2>
                <div className="space-y-4 font-body text-sm text-[#64748B]">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0D1B2A]">
                        Territory Search Footprint
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        We analyze your exact geographical zip codes and evaluate current Google Ads and 3-Pack Maps visibility against local competitors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0D1B2A]">
                        Inquiry Quality & Qualification Levers
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        We identify why budget shoppers may be leaking through and review negative keyword fortresses and landing page friction needed to filter them.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0D1B2A]">
                        Closed-Loop Attribution Strategy
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        How to connect your website and Google Ads to your CRM so bidding algorithms train on closed contracts rather than cheap form fills.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-xs shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0D1B2A]">
                        Actionable Next Steps
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        A candid assessment of whether an Ajith Growth partnership is appropriate for your firm, with zero pressure sales tactics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Ways to connect & Verified Business Information */}
              <div className="bg-white p-7 rounded-2xl border border-[#DCE5EE] shadow-xs">
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
                  BUSINESS INFORMATION & DIRECT CHANNELS
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[#0D1B2A] mb-4">
                  Ways to Connect
                </h2>
                <div className="space-y-3.5">
                  {/* Direct Phone */}
                  <a
                    href={siteConfig.phoneTel}
                    onClick={() => trackEvent('phone_click', { location: 'contact_page_list' })}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] hover:bg-slate-100 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-heading font-semibold text-sm text-[#0D1B2A] block group-hover:text-sky-800">
                        Direct Phone
                      </span>
                      <span className="text-xs text-[#64748B]">
                        {siteConfig.phone}
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp Chat */}
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'contact_page_list' })}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-heading font-semibold text-sm text-[#0D1B2A] block group-hover:text-emerald-800">
                        WhatsApp Chat
                      </span>
                      <span className="text-xs text-[#64748B]">
                        {siteConfig.phone} (Fastest response)
                      </span>
                    </div>
                  </a>

                  {/* Direct Email */}
                  <a
                    href={siteConfig.emailMailto}
                    onClick={() => trackEvent('email_click', { location: 'contact_page_list' })}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] hover:bg-slate-100 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-heading font-semibold text-sm text-[#0D1B2A] block group-hover:text-sky-800">
                        Direct Email
                      </span>
                      <span className="text-xs text-[#64748B] break-all">
                        {siteConfig.email}
                      </span>
                    </div>
                  </a>

                  {/* Office Address */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC]">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0D1B2A] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-heading font-semibold text-sm text-[#0D1B2A] block">
                        Registered Office
                      </span>
                      <address className="text-xs text-[#64748B] not-italic leading-relaxed">
                        {siteConfig.address.formatted}
                      </address>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC]">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0D1B2A] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-heading font-semibold text-sm text-[#0D1B2A] block">
                        Opening Hours
                      </span>
                      <span className="text-xs text-[#64748B]">
                        {siteConfig.openingHours} ({siteConfig.openingHoursDisplay})
                      </span>
                    </div>
                  </div>

                  {/* Founder LinkedIn (if configured) */}
                  {siteConfig.socialProfiles.linkedin ? (
                    <a
                      href={siteConfig.socialProfiles.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] hover:bg-slate-100 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0D1B2A] flex items-center justify-center shrink-0 mt-0.5">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-heading font-semibold text-sm text-[#0D1B2A] block group-hover:text-sky-800">
                          Founder LinkedIn
                        </span>
                        <span className="text-xs text-[#64748B]">
                          Connect directly with Ajith
                        </span>
                      </div>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Right Column: 4. Qualification form */}
            <div id="consultation-form" className="lg:col-span-6 scroll-mt-28">
              <ContactForm />
            </div>
          </div>

          {/* Final Statement */}
          <div className="mt-16 pt-10 border-t border-[#DCE5EE] text-center max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl font-heading font-semibold text-[#0D1B2A] tracking-tight">
              A conversation first. A strategy next. Growth built around your business.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

