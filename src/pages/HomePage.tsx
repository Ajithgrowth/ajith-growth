import { ArrowRight, ChevronRight, AlertCircle, ShieldCheck, Briefcase, Cpu, CheckCircle2, TrendingUp, Search, Eye, Filter, Ban, Crosshair } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { GrowthSystemDiagram } from '../components/GrowthSystemDiagram';
import { ArticleCard } from '../components/ArticleCard';
import { getAllArticles } from '../generated/insights';
import { staticPagesSeo } from '../data/seoData';
import { trackEvent } from '../utils/analytics';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { IndustryCard } from '../components/IndustryCard';
import { ProcessStep } from '../components/ProcessStep';
import { CTASection } from '../components/CTASection';

export function HomePage() {
  const seo = staticPagesSeo['/'];
  const allArticles = getAllArticles();
  const featured = allArticles.filter((a) => a.featured && !a.draft);
  const nonFeatured = allArticles.filter((a) => !a.featured && !a.draft);
  const threeInsights = [...featured, ...nonFeatured].slice(0, 3);

  return (
    <main id="main-content" className="w-full">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0D1B2A] text-white pt-8 pb-20 sm:pt-12 sm:pb-28 border-b border-slate-800">
        {/* Luxury Villa Architecture Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <img
            src="/images/hero-home.jpg"
            alt="Luxury residential architectural estate with bespoke stone and glass craftsmanship"
            width={2000}
            height={1200}
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Eyebrow & Brand Tagline */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/90 border border-slate-700 text-sky-400 text-xs font-supporting font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>GOOGLE GROWTH CONSULTANT FOR RESIDENTIAL CONSTRUCTION</span>
              </div>
              <span className="hidden sm:inline-block text-xs font-supporting text-slate-400">|</span>
              <span className="inline-block text-xs font-supporting text-slate-300 font-medium tracking-wide">
                Helping Residential Construction Companies Grow Through Google
              </span>
            </div>

            {/* Exactly Requested Primary H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-[1.12] mb-6">
              Turn Google Searches Into High-Value Construction Opportunities.
            </h1>

            {/* Exactly Requested Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-200 font-body leading-relaxed max-w-3xl mb-10">
              Ajith Growth helps residential construction companies attract qualified homeowners through Google Ads, Local SEO, Google Business Profile, conversion-focused landing pages and measurable growth systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                onClick={() => trackEvent('consultation_cta_click', { location: 'hero_primary' })}
              >
                <span>Book a Growth Consultation</span>
                <ArrowRight className="w-5 h-5 text-[#0D1B2A]" />
              </Button>

              <Button
                href="#growth-system"
                variant="outline"
                size="lg"
              >
                <span>Explore Our Approach</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Button>
            </div>

            {/* Contextual Internal Links Capability Line */}
            <div className="pt-8 border-t border-slate-800/80">
              <span className="text-[11px] font-supporting font-semibold tracking-wider text-slate-400 uppercase block mb-3">
                Core Growth Capabilities:
              </span>
              <nav aria-label="Core Capabilities" className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm font-supporting text-slate-300 font-medium tracking-wide">
                <Link href="/services#google-ads" className="hover:text-sky-400 transition-colors underline decoration-slate-600 underline-offset-4">
                  Google Ads
                </Link>
                <span className="text-slate-600">•</span>
                <Link href="/services#local-seo" className="hover:text-sky-400 transition-colors underline decoration-slate-600 underline-offset-4">
                  Local SEO
                </Link>
                <span className="text-slate-600">•</span>
                <Link href="/services#google-business-profile" className="hover:text-sky-400 transition-colors underline decoration-slate-600 underline-offset-4">
                  Google Business Profile
                </Link>
                <span className="text-slate-600">•</span>
                <Link href="/services#landing-pages" className="hover:text-sky-400 transition-colors underline decoration-slate-600 underline-offset-4">
                  Landing Pages
                </Link>
                <span className="text-slate-600">•</span>
                <Link href="/services#conversion-tracking" className="hover:text-sky-400 transition-colors underline decoration-slate-600 underline-offset-4">
                  Conversion Tracking
                </Link>
                <span className="text-slate-600">•</span>
                <Link href="/services#geo-ai-search" className="hover:text-sky-400 transition-colors underline decoration-slate-600 underline-offset-4">
                  AI Search
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
              THE CORE CHALLENGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-[#0D1B2A] tracking-tight mb-4">
              Getting Enquiries Is Easy. Getting the Right Enquiries Is Harder.
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              Most residential construction companies don't suffer from a lack of clicks. They suffer from generic marketing campaigns that attract unqualified prospects, draining time and estimating capacity.
            </p>
          </div>

          {/* Six Problems Required */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* 1. Low-Intent Enquiries */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-2">
                  Low-Intent Enquiries
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                  Traffic from users browsing ideas with zero urgency or financial readiness to commit to a major residential project.
                </p>
              </div>
            </div>

            {/* 2. Budget Shoppers */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Ban className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-2">
                  Budget Shoppers
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                  Callers seeking discount pricing, minor handyman jobs, or partial DIY work rather than custom builds and architectural renovations.
                </p>
              </div>
            </div>

            {/* 3. Poor Search Intent */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0D1B2A] flex items-center justify-center mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-2">
                  Poor Search Intent
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                  Campaigns targeting broad keywords like "builders near me" without filtering out commercial, handyman, or cheap trade searches.
                </p>
              </div>
            </div>

            {/* 4. Weak Conversion */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-4">
                  <Filter className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-2">
                  Weak Conversion
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                  Websites that fail to establish luxury craftsmanship, lack architectural portfolio clarity, or make contacting the builder cumbersome.
                </p>
              </div>
            </div>

            {/* 5. Limited Local Visibility */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-2">
                  Limited Local Visibility
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                  Limited visibility in Google Maps and local organic results for key residential communities where prospective clients are searching.
                </p>

              </div>
            </div>

            {/* 6. Poor Tracking */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Crosshair className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-2">
                  Poor Tracking
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                  Zero integration between Google Ads and offline CRM contracts, meaning you can't tell which campaigns produced real signed revenue.
                </p>
              </div>
            </div>
          </div>

          {/* Problem Closing Callout */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE5EE] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div>
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                THE SOLUTION SHIFT
              </span>
              <p className="font-heading font-semibold text-lg text-[#0D1B2A]">
                From clicks to qualified opportunities.
              </p>
            </div>
            <Link
              href="#growth-system"
              className="inline-flex items-center gap-1.5 text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] hover:text-sky-800 transition-colors"
            >
              <span>See The Growth System</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. GOOGLE GROWTH SYSTEM */}
      <section id="growth-system" className="py-20 sm:py-28 bg-[#F3F7FB] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              CONNECTED ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-[#0D1B2A] tracking-tight mb-4">
              The Complete Google Growth System
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              We connect every critical growth discipline into a single, cohesive engine—from high-intent acquisition to offline revenue attribution.
            </p>
          </div>

          {/* Interactive Connected System Diagram */}
          <GrowthSystemDiagram />
        </div>
      </section>

      {/* 4. WHO WE HELP */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
              CLIENT SPECIALIZATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-[#0D1B2A] tracking-tight mb-4">
              Who We Help
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              We exclusively serve established residential builders and contractors who build high-value residential homes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Turnkey Construction Companies */}
            <IndustryCard
              title="Turnkey Construction Companies"
              description="Full-service firms managing end-to-end residential development from ground excavation through handover."
              iconName="building"
              typicalProjects="Complete residential projects & multi-stage turnkey builds"
            />

            {/* 2. Villa Construction */}
            <IndustryCard
              title="Villa Construction"
              description="Specialized contractors constructing luxury private villas, estate residences, and bespoke architectural homes."
              iconName="landmark"
              typicalProjects="High-end private villas & architectural estate residences"
            />

            {/* 3. Luxury Home Builders */}
            <IndustryCard
              title="Luxury Home Builders"
              description="Custom builders creating one-of-a-kind architect-designed residences on client-owned lots in premium zip codes."
              iconName="sparkles"
              typicalProjects="Bespoke luxury custom homes & private residential developments"
            />

            {/* 4. Premium Residential Construction */}
            <IndustryCard
              title="Premium Residential Construction"
              description="Builders focused on major structural transformations, whole-house renovations, and architect-led additions."
              iconName="home"
              typicalProjects="Whole-home transformations & high-end extensions"
            />
          </div>
        </div>
      </section>

      {/* 5. WHY AJITH GROWTH */}
      <section className="py-20 sm:py-24 bg-[#0D1B2A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-2">
              CONSULTANCY APPROACH & SPECIALIZATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-white tracking-tight mb-4">
              Search Expertise. Construction Focus. Measurable Results.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed">
              We combine deep Google search specialization, intentional lead qualification, and a systems-driven framework built specifically for residential builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {/* 1. Deep Google Specialization */}
            <div className="bg-slate-900/70 p-7 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mb-3">
                Deep Google Specialization
              </h3>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                Focused exclusively on Google Ads, Local SEO, Google Business Profile, and conversion tracking engineered for residential construction search intent.
              </p>
            </div>

            {/* 2. Intentional Inquiry Qualification */}
            <div className="bg-slate-900/70 p-7 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center mb-5">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mb-3">
                Intentional Lead Qualification
              </h3>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                Designed to filter out budget shoppers and unqualified inquiries so your estimating team spends time only on serious, high-value project opportunities.
              </p>
            </div>

            {/* 3. Systems-Driven Approach */}
            <div className="bg-slate-900/70 p-7 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mb-3">
                Systems-Driven Accountability
              </h3>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                No random tactics or vanity metrics. Every search initiative is engineered as an interconnected growth framework delivering qualified homeowner inquiries.
              </p>
            </div>
          </div>

          {/* Ajith's Approved Personal Statement */}
          <div className="bg-slate-900/90 rounded-2xl p-8 sm:p-10 border border-slate-800 max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-3">
              CONSULTANT'S PERSONAL STATEMENT
            </span>
            <blockquote className="text-base sm:text-lg text-slate-200 font-body italic leading-relaxed mb-6">
              "{siteConfig.founder.statement}"
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-[#0D1B2A] flex items-center justify-center font-heading font-bold text-lg">
                  AG
                </div>
                <div>
                  <div className="font-heading font-semibold text-white">
                    {siteConfig.founder.name}
                  </div>
                  <div className="text-xs text-sky-400 font-supporting uppercase tracking-wider">
                    {siteConfig.founder.title}
                  </div>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-supporting font-semibold uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
              >
                <span>Read Full Background & Approach</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. METHODOLOGY */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
              SYSTEMATIC FRAMEWORK
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-[#0D1B2A] tracking-tight mb-4">
              Our 6-Step Growth Methodology
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              Every partnership follows our proven six-stage framework to engineer predictable, qualified enquiry flow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. UNDERSTAND */}
            <ProcessStep
              number="01"
              title="UNDERSTAND"
              description="Deep analysis of your target geographical territory, average contract values, local competitors, and historical inquiry data."
              deliverable="Territory Search Audit & Ideal Client Profile Definition"
            />

            {/* 2. ATTRACT */}
            <ProcessStep
              number="02"
              title="ATTRACT"
              description="Deploying Google Ads with negative-keyword fortresses to isolate high-intent homeowners and block DIY searchers."
              deliverable="Negative-Keyword Architecture & Custom Search Silos"
            />

            {/* 3. CONVERT */}
            <ProcessStep
              number="03"
              title="CONVERT"
              description="Designing architectural landing pages with deliberate qualification friction and mobile-first consultation flows."
              deliverable="Pre-Qualified Homeowner Inquiry Flows"
            />

            {/* 4. MEASURE */}
            <ProcessStep
              number="04"
              title="MEASURE"
              description="Setting up server-side conversion tracking and connecting Google Ads directly with your offline CRM milestones."
              deliverable="Closed-Loop Attribution & Contract Tracking"
            />

            {/* 5. OPTIMIZE */}
            <ProcessStep
              number="05"
              title="OPTIMIZE"
              description="Weekly search query pruning, bidding calibration, and 3-Pack Google Business Profile authority expansion."
              deliverable="Continuous CPA Reduction & Quality Calibration"
            />

            {/* 6. GROW */}
            <ProcessStep
              number="06"
              title="GROW"
              description="Scaling into adjacent service areas while optimizing brand entities for Google AI Overviews and GEO."
              deliverable="Predictable Inquiries & Sustainable Search Visibility"
            />
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                RESEARCH & STRATEGY
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-[#0D1B2A] tracking-tight">
                Construction Growth Insights
              </h2>
            </div>
            <Link
              href="/insights"
              className="mt-4 sm:mt-0 text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] hover:text-sky-800 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 featured/latest article cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threeInsights.map((art) => (
              <ArticleCard key={art.slug} article={art} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <CTASection
        eyebrow="DIRECT STRATEGIC ENGAGEMENT"
        title="Ready to Build a Predictable Google Pipeline for Your Construction Firm?"
        description="Speak directly with Ajith. We will review your current search visibility, analyze your local market competitors, and identify the exact levers to capture qualified custom builds."
        primaryButtonText="Book a Growth Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Our Services"
        secondaryButtonHref="/services"
      />
    </main>
  );
}
