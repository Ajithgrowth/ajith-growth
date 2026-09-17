import { Target, Compass, MapPin, Layout, BarChart3, Cpu, ShieldCheck, ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';
import { services } from '../data/services';
import { trackEvent } from '../utils/analytics';
import { siteConfig } from '../data/siteConfig';
import { staticPagesSeo } from '../data/seoData';
import { CTASection } from '../components/CTASection';
import { Button } from '../components/Button';
import { FAQSection, servicesFAQs } from '../components/FAQSection';

export function ServicesPage() {
  const seo = staticPagesSeo['/services'];
  const iconMap: Record<string, any> = {
    Target,
    Compass,
    MapPin,
    Layout,
    BarChart3,
    Cpu,
    ShieldCheck,
  };

  const serviceImages: Record<string, string> = {
    'google-ads': '/images/article-google-ads.jpg',
    'local-seo': '/images/article-local-seo.jpg',
    'google-business-profile': '/images/article-google-business-profile.jpg',
    'landing-pages': '/images/article-landing-pages.jpg',
    'conversion-tracking': '/images/service-conversion-tracking.jpg',
    'geo-ai-search': '/images/article-geo-ai-search.jpg',
    'growth-strategy': '/images/article-conversion-tracking.jpg',
  };

  const serviceInsightMap: Record<string, { slug: string; title: string }> = {
    'google-ads': {
      slug: 'google-ads-residential-construction-cost-per-lead',
      title: 'Why Residential Builders Waste Google Ads Budget and How to Reduce It',
    },
    'local-seo': {
      slug: 'local-seo-framework-custom-home-builders',
      title: 'The Local SEO Framework for Residential Construction Companies',
    },
    'google-business-profile': {
      slug: 'google-business-profile-ranking-signals-contractors',
      title: 'Google Business Profile for Residential Construction: Key Ranking Factors for Builders',
    },
    'landing-pages': {
      slug: 'high-ticket-remodeling-landing-page-architecture',
      title: 'Landing Page Architecture for Residential Builders: Converting High-Value Homeowner Inquiries',
    },
    'conversion-tracking': {
      slug: 'conversion-tracking-custom-builders-offline-crm',
      title: 'Closed-Loop Conversion Tracking: Connecting Google Clicks to CRM Offline Contracts',
    },
    'geo-ai-search': {
      slug: 'generative-engine-optimization-ai-search-builders',
      title: 'Generative Engine Optimization (GEO): How AI Overviews & Perplexity Change Builder Discovery',
    },
  };

  return (
    <main id="main-content" className="w-full bg-white">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
        breadcrumbs={seo.breadcrumbs}
        faqs={servicesFAQs}
        includeServices={true}
      />

      {/* SECTION 1: SERVICES HERO */}
      <section className="bg-[#0D1B2A] text-white pt-8 pb-16 sm:pt-12 sm:pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-supporting uppercase tracking-wider text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-sky-400">Services</span>
            </nav>

            <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
              SPECIALIZED CAPABILITIES
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
              Turn High-Intent Homeowners Into Scheduled Consultations
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed mb-6 max-w-3xl">
              A connected Google growth system engineered specifically for custom home builders, luxury villa contractors, and turnkey residential firms. We connect precision search ads, local map visibility, high-trust landing pages, and CRM contract tracking so your pipeline stays filled with qualified projects.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-8 max-w-2xl">
              <p className="text-sm font-body text-sky-300 italic">
                &ldquo;Not every business needs more traffic. It needs the right traffic, the right message and a system that turns attention into opportunity.&rdquo;
              </p>
            </div>

            <div>
              <Link
                href="/contact"
                onClick={() => trackEvent('services_hero_cta_click')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0D1B2A] font-body font-semibold text-sm transition-all shadow-xs"
              >
                <span>Talk About Your Growth</span>
                <ArrowRight className="w-4 h-4 text-[#0D1B2A]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Disclosure Banner */}
      <section className="bg-[#F8FAFC] border-b border-[#DCE5EE] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs font-body text-[#64748B]">
            <AlertCircle className="w-4 h-4 text-sky-800 shrink-0" />
            <span>
              <strong className="text-[#0D1B2A]">Consultant Transparency:</strong> We operate strictly on engineering frameworks and verified search data. We do not make false claims of guaranteed rankings, leads, or ROI.
            </span>
          </div>
        </div>
      </section>

      {/* Sub-Navigation Anchors */}
      <section className="bg-white border-b border-[#DCE5EE] sticky top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none py-3">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-max text-xs font-supporting font-semibold uppercase tracking-wider text-[#64748B]">
            <span className="text-slate-400 pr-2">Jump to:</span>
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="hover:text-[#0D1B2A] py-1 px-2.5 rounded hover:bg-slate-100 transition-colors"
              >
                {service.title.split(' for')[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The Specialized Services Sections with Alternating Layouts */}
      <div className="divide-y divide-[#DCE5EE]">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.iconName] || Target;
          const isEven = index % 2 === 1;
          const bgClass = index === 0 ? 'bg-white' : isEven ? 'bg-[#F8FAFC]' : 'bg-[#F3F7FB]';
          const imageUrl = serviceImages[service.id];

          return (
            <section
              key={service.id}
              id={service.id}
              className={`py-16 sm:py-24 scroll-mt-32 ${bgClass}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] text-white flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-sky-400" />
                      </div>
                      <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800">
                        {service.eyebrow}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
                      {service.title}
                    </h2>

                    <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed mb-8">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-3 mb-8">
                      <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] block">
                        Focus Areas & Execution:
                      </span>
                      {service.focusAreas.map((area, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-[#64748B] font-body">
                          <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                      <Link
                        href="/contact"
                        onClick={() => trackEvent('service_cta_click', { service: service.id })}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0D1B2A] hover:bg-slate-800 text-white font-body font-semibold text-xs tracking-wider uppercase transition-all shadow-xs"
                      >
                        <span>{service.ctaText || `Discuss ${service.title.split(' for')[0]}`}</span>
                        <ArrowRight className="w-4 h-4 text-sky-400" />
                      </Link>

                      {serviceInsightMap[service.id] && (
                        <Link
                          href={`/insights/${serviceInsightMap[service.id].slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 hover:text-[#0D1B2A] transition-colors py-2"
                        >
                          <span>Read Strategy Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Outcome & Visual Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-6">
                      {imageUrl && (
                        <div className="rounded-2xl overflow-hidden border border-[#DCE5EE] shadow-xs aspect-16/10">
                          <img
                            src={imageUrl}
                            alt={`${service.title} architectural residential context`}
                            width={800}
                            height={500}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs">
                        <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
                          Commercial Outcome
                        </span>
                        <p className="text-sm sm:text-base font-heading font-semibold text-[#0D1B2A] mb-4">
                          {service.businessOutcome}
                        </p>

                        <div className="pt-3 border-t border-slate-100 text-xs font-body text-[#64748B] leading-relaxed">
                          <strong className="text-[#0D1B2A]">Strategic Philosophy:</strong> {service.strategicNote}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* SECTION 9: HOW EVERYTHING WORKS TOGETHER (ONE GROWTH SYSTEM) */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              CONNECTED ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              One Growth System. Connected From Search to Opportunity.
            </h2>
            <p className="text-base sm:text-lg font-body text-[#475569] leading-relaxed">
              Google Ads, SEO, Google Business Profile, landing pages, conversion tracking and AI search are not separate tasks. They are parts of a single system designed to turn search intent into measurable opportunities.
            </p>
          </div>

          {/* Growth Journey Flow Diagram */}
          <div className="max-w-5xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-[#DCE5EE] shadow-xs mb-10">
            {/* Top Strategic Layer */}
            <div className="p-4 rounded-xl bg-slate-900 text-white text-center mb-8 border border-slate-800">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-1">
                Strategic Foundation
              </span>
              <h3 className="text-lg font-heading font-bold text-white">
                GROWTH STRATEGY
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Connects every stage with business understanding, target projects, and market intelligence.
              </p>
            </div>

            {/* Step-by-step horizontal journey on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/60 text-center">
                <span className="text-[11px] font-supporting font-bold text-sky-800 uppercase tracking-wider block mb-1">Step 01</span>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A] mb-1">ATTRACT</h4>
                <p className="text-xs text-[#64748B]">Google Ads high-intent homeowner search</p>
              </div>

              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/60 text-center">
                <span className="text-[11px] font-supporting font-bold text-sky-800 uppercase tracking-wider block mb-1">Step 02</span>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A] mb-1">GET FOUND</h4>
                <p className="text-xs text-[#64748B]">Local SEO & Google Business Profile</p>
              </div>

              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/60 text-center">
                <span className="text-[11px] font-supporting font-bold text-sky-800 uppercase tracking-wider block mb-1">Step 03</span>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A] mb-1">CONVERT</h4>
                <p className="text-xs text-[#64748B]">Landing pages built for qualification</p>
              </div>

              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/60 text-center">
                <span className="text-[11px] font-supporting font-bold text-sky-800 uppercase tracking-wider block mb-1">Step 04</span>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A] mb-1">MEASURE</h4>
                <p className="text-xs text-[#64748B]">Calls, forms & WhatsApp tracking</p>
              </div>

              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/60 text-center">
                <span className="text-[11px] font-supporting font-bold text-sky-800 uppercase tracking-wider block mb-1">Step 05</span>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A] mb-1">EVOLVE</h4>
                <p className="text-xs text-[#64748B]">GEO & emerging AI Search visibility</p>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-[#DCE5EE]">
              <p className="font-heading font-semibold text-base text-[#0D1B2A]">
                "One strategy. Connected capabilities. Continuous improvement."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic FAQ Section */}
      <FAQSection />

      {/* SECTION 10: FINAL CTA */}
      <section className="py-16 sm:py-24 bg-[#0D1B2A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-3">
              FOCUSED RESIDENTIAL STRATEGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-6">
              Ready to Attract Homeowners Who Value Craftsmanship Over Cheap Bids?
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-300 leading-relaxed mb-8">
              Whether you build luxury villas, architectural residences, or turnkey homes, we help you capture high-intent demand in your target micro-markets. Let's discuss your active territories and ideal project size.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                onClick={() => trackEvent('services_final_cta_click')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0D1B2A] font-body font-semibold text-sm transition-all shadow-xs"
              >
                <span>Book a Growth Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#0D1B2A]" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-white font-body font-medium text-sm transition-all"
              >
                <span>Explore Our Approach</span>
              </Link>
            </div>

            <p className="text-xs sm:text-sm font-supporting text-slate-400">
              Tailored around your active building territories, site capacity, and minimum budget threshold.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
