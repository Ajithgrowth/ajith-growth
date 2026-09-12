import { ShieldCheck, ArrowRight, Briefcase, Cpu, CheckCircle2, ChevronRight, Compass, Phone, MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { aboutData } from '../data/about';
import { staticPagesSeo } from '../data/seoData';
import { trackEvent } from '../utils/analytics';
import { CTASection } from '../components/CTASection';
import { Button } from '../components/Button';

export function AboutPage() {
  const seo = staticPagesSeo['/about'];
  const growthPrinciples = [
    {
      number: "01",
      title: "Understand Before You Advertise",
      description: "Never deploy a dollar into Google Ads before understanding the local trade territory, competitor bidding landscape, and homeowner search intent profiles."
    },
    {
      number: "02",
      title: "Intent Over Volume",
      description: "Inquiries from mismatched project scopes create unnecessary overhead. We structure campaigns to qualify inquiries and attract relevant residential construction opportunities."
    },
    {
      number: "03",
      title: "Build Systems, Not Campaigns",
      description: "Siloed ads fail. A durable growth system connects Google Ads, local Google search visibility, structured landing pages, and CRM milestones into a unified framework."
    },
    {
      number: "04",
      title: "Measure What Matters",
      description: "Clicks, impressions, and even form fills are vanity metrics if they don't produce pre-construction agreements and signed builder contracts."
    },
    {
      number: "05",
      title: "Improve Continuously",
      description: "Search algorithms, competitor bids, and homeowner search behaviors evolve constantly. Ongoing negative keyword pruning and entity optimization ensure sustained search visibility."
    }
  ];

  return (
    <main id="main-content" className="w-full">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
        breadcrumbs={seo.breadcrumbs}
      />

      {/* Hero Header */}
      <section className="bg-[#0D1B2A] text-white pt-8 pb-16 sm:pt-12 sm:pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-supporting uppercase tracking-wider text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-sky-400">About Ajith</span>
            </nav>

            <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
              ABOUT AJITH GROWTH
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
              Helping Residential Construction Companies Grow Through Google
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed">
              A dedicated Google Growth consultancy built to help residential construction companies attract qualified homeowner inquiries through Google Ads, Local SEO, and conversion-focused growth systems.
            </p>

          </div>
        </div>
      </section>

      {/* Visual Journey Overview: The 4 Milestones */}
      <section className="py-12 bg-[#F3F7FB] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-4">
            HOW AJITH GROWTH WAS BUILT
          </span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {aboutData.milestones.map((milestone, idx) => (
              <div key={milestone.title} className="bg-white p-5 rounded-xl border border-[#DCE5EE] shadow-2xs">
                <span className="text-[11px] font-supporting font-bold text-sky-800 uppercase block mb-1">
                  {milestone.phase}
                </span>
                <h3 className="font-heading font-semibold text-sm text-[#0D1B2A] mb-1.5">
                  {milestone.title}
                </h3>
                <p className="text-xs text-[#64748B] font-body leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Narrative & Consultant Profile */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Narrative & Three Core Pillars */}
            <div className="lg:col-span-7 space-y-8 text-[#0D1B2A]">
              <div>
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                  THE STORY BEHIND THE CONSULTANCY
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-[#0D1B2A] mb-4">
                  Why We Focused Exclusively on Google for Construction
                </h2>
                <p className="text-base text-[#64748B] font-body leading-relaxed mb-6">
                  {aboutData.introduction}
                </p>
              </div>

              {/* Story Sections */}
              <div className="space-y-4">
                {aboutData.story.map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EE] space-y-2">
                    <h3 className="text-base font-heading font-semibold text-[#0D1B2A]">
                      {item.title}
                    </h3>
                    <p className="text-sm font-body text-[#64748B] leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Three Pillars */}
              <div className="pt-6 border-t border-[#DCE5EE] space-y-4">
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                  OUR CORE PILLARS
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aboutData.pillars.map((pillar) => (
                    <div key={pillar.title} className="p-5 rounded-xl bg-white border border-[#DCE5EE] shadow-2xs space-y-2">
                      <h4 className="text-sm font-heading font-semibold text-[#0D1B2A]">
                        {pillar.title}
                      </h4>
                      <p className="text-xs font-body text-[#64748B] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Founder Profile Card */}
            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-[#DCE5EE] sticky top-28">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-2xl shadow-xs">
                  AG
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#0D1B2A]">
                    {siteConfig.founder.name}
                  </h3>
                  <p className="text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800">
                    {siteConfig.founder.role}
                  </p>
                  <p className="text-xs text-[#64748B] font-body mt-0.5">
                    {siteConfig.founder.positioning}
                  </p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm font-body text-[#0D1B2A] italic border-l-2 border-sky-800 pl-3.5 mb-6 leading-relaxed">
                "{siteConfig.founder.statement}"
              </blockquote>

              <div className="border-t border-[#DCE5EE] pt-5 space-y-3">
                <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] block">
                  Core Specialization:
                </span>
                <div className="space-y-2 text-xs font-body text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-800 shrink-0" />
                    <span>Google Ads for Residential Construction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-800 shrink-0" />
                    <span>Local SEO & Google Business Profile Optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-800 shrink-0" />
                    <span>Conversion-Focused Landing Pages for Builders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-800 shrink-0" />
                    <span>Closed-Loop Conversion Tracking & Attribution</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#DCE5EE] space-y-2.5">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 text-sky-400" />
                </Button>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={siteConfig.phoneTel}
                    onClick={() => trackEvent('phone_click', { location: 'about_founder_card' })}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#DCE5EE] bg-white hover:bg-slate-50 text-[#0D1B2A] text-xs font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-700" />
                    <span>Call</span>
                  </a>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'about_founder_card' })}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Principles (Exact 5 Required) */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
              OUR GUIDING PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-[#0D1B2A] tracking-tight mb-4">
              Growth Principles
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              Every system we engineer for residential builders is governed by five unwavering operational principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growthPrinciples.map((principle) => (
              <div
                key={principle.number}
                className="bg-white p-7 rounded-2xl border border-[#DCE5EE] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
                    Principle {principle.number}
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-[#64748B] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        eyebrow="DIRECT STRATEGIC ENGAGEMENT"
        title="Discuss Your Residential Growth System with Ajith"
        description="Book a confidential preliminary discussion to assess your local search footprint, review competitor strategies, and evaluate the right Google growth architecture for your construction firm."
        primaryButtonText="Book a Growth Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Our Services"
        secondaryButtonHref="/services"
      />
    </main>
  );
}
