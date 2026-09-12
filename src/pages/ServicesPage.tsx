import { Target, Compass, MapPin, Layout, BarChart3, Cpu, ShieldCheck, ArrowRight, Check, AlertCircle } from 'lucide-react';
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

  // Curated residential architecture imagery matching each service discipline
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
    <main id="main-content" className="w-full">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
        breadcrumbs={seo.breadcrumbs}
        faqs={servicesFAQs}
        includeServices={true}
      />


      {/* Services Hero with exact requested H1 */}
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
              Google Growth Services for Residential Construction Companies
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-3xl">
              Every service is engineered exclusively for turnkey home builders, custom villa contractors, and luxury remodeling firms. We eliminate marketing silos to construct a unified client-acquisition engine.
            </p>
          </div>
        </div>
      </section>

      {/* Ethical Disclosure Banner (No false guarantees requirement) */}
      <section className="bg-[#F8FAFC] border-b border-[#DCE5EE] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs font-body text-[#64748B]">
            <AlertCircle className="w-4 h-4 text-sky-800 shrink-0" />
            <span>
              <strong className="text-[#0D1B2A]">Consultant Transparency:</strong> We operate strictly on proven engineering frameworks and verified search data. We do not make false claims of guaranteed rankings, leads, ROI, or AI visibility.
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

      {/* The 7 Specialized Services Sections with Alternating Layouts */}
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
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] block">
                        Focus Areas & Deliverables:
                      </span>
                      {service.focusAreas.map((area, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-[#64748B] font-body">
                          <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                      <Button
                        href="/contact"
                        variant="secondary"
                        size="md"
                        onClick={() => trackEvent('service_cta_click', { service: service.id })}
                      >
                        <span>Discuss {service.title.split(' for')[0]}</span>
                        <ArrowRight className="w-4 h-4 text-sky-400" />
                      </Button>

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

                  {/* Outcome & Architectural Visual Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-6">
                      {/* Image representation of residential luxury project */}
                      {imageUrl && (
                        <div className="rounded-2xl overflow-hidden border border-[#DCE5EE] shadow-sm aspect-16/10">
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

                      {/* Commercial Outcome Card */}
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

                        {service.relatedArticleSlug && (
                          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-supporting text-slate-500 uppercase tracking-wider">
                              Strategic Analysis
                            </span>
                            <Link
                              href={`/insights/${service.relatedArticleSlug}`}
                              className="text-xs font-supporting font-semibold text-sky-800 hover:text-[#0D1B2A] inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Read In-Depth Guide</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Useful Strategic FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <CTASection
        eyebrow="TAILORED GROWTH BLUEPRINT"
        title="Ready to Build a Better Growth System?"
        description="Book a strategic consultation to examine your local residential construction market, assess your search footprint, and design a custom growth roadmap."
        primaryButtonText="Book a Growth Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Read Construction Insights"
        secondaryButtonHref="/insights"
      />
    </main>
  );
}
