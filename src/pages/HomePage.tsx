import { ArrowRight, ChevronRight, AlertCircle, ShieldCheck, Briefcase, Cpu, CheckCircle2, TrendingUp, Search, Eye, Filter, Ban, Crosshair, Building2, Landmark, Sparkles, Home } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { GrowthSystemDiagram } from '../components/GrowthSystemDiagram';
import { ArticleCard } from '../components/ArticleCard';
import { getAllArticles } from '../generated/insights';
import { staticPagesSeo } from '../data/seoData';
import { trackEvent } from '../utils/analytics';
import { Button } from '../components/Button';
import { CTASection } from '../components/CTASection';

export function HomePage() {
  const seo = staticPagesSeo['/'];
  const allArticles = getAllArticles();
  const featured = allArticles.filter((a) => a.featured && !a.draft);
  const nonFeatured = allArticles.filter((a) => !a.featured && !a.draft);
  const threeInsights = [...featured, ...nonFeatured].slice(0, 3);

  return (
    <main id="main-content" className="w-full bg-white">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0D1B2A] text-white pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-slate-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy and CTAs */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/90 border border-slate-700 text-sky-400 text-xs font-supporting font-semibold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>GOOGLE GROWTH CONSULTANT FOR RESIDENTIAL CONSTRUCTION</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-[1.12] mb-6">
                Helping Residential Construction Companies Grow Through Google
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-xl text-slate-300 font-body leading-relaxed max-w-2xl mb-8">
                We build Google Growth Systems that help residential construction companies attract qualified homeowner enquiries, improve conversion, and measure what actually drives growth.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
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

              {/* Trust/Capability Line */}
              <div className="pt-6 border-t border-slate-800/80">
                <p className="text-xs sm:text-sm font-supporting uppercase tracking-wider text-slate-300 font-medium">
                  Google Ads • Local SEO • Google Business Profile • Landing Pages • Conversion Tracking • AI Search
                </p>
              </div>
            </div>

            {/* Right Column: Architectural Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
                <img
                  src="/images/hero-home.jpg"
                  alt="Modern Bangalore luxury villa residential architecture with bespoke stone and glass craftsmanship"
                  width={800}
                  height={600}
                  fetchPriority="high"
                  className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-xs">
                  <span className="text-[11px] font-supporting font-bold text-sky-400 uppercase tracking-wider block mb-1">
                    TARGET CLIENT PROFILE
                  </span>
                  <p className="text-xs sm:text-sm font-heading font-medium text-white">
                    Turnkey Builders • Villa Construction • Luxury Homes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
              THE CORE CHALLENGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              Getting Enquiries Is Easy. Getting the Right Enquiries Is Harder.
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              Residential construction companies don't simply need more leads. They need enquiries from homeowners who have a genuine project, realistic expectations, the right budget and a clear timeline.
            </p>
          </div>

          {/* 6 Exact Challenge Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* 1. Low-Intent Enquiries */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-2">
                Low-Intent Enquiries
              </h3>
              <p className="text-sm text-[#64748B] font-body leading-relaxed">
                Tire-kickers and casual inquiries—people browsing for free house plans or general ideas, but nowhere near ready to break ground.
              </p>
            </div>

            {/* 2. Budget Shoppers */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Ban className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-2">
                Rate Hunters & Price Shoppers
              </h3>
              <p className="text-sm text-[#64748B] font-body leading-relaxed">
                Leads whose first and only question is &ldquo;What is your lowest per-sq.ft rate?&rdquo; before discussing project quality, site condition, or materials.
              </p>
            </div>

            {/* 3. Poor Search Intent */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0D1B2A] flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-2">
                Irrelevant Keyword Leakage
              </h3>
              <p className="text-sm text-[#64748B] font-body leading-relaxed">
                Google Ads triggering on handyman fixes, DIY blueprints, or commercial renovations, quietly burning through daily ad spend.
              </p>
            </div>

            {/* 4. Weak Conversion */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-4">
                <Filter className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-2">
                Low-Trust Landing Pages
              </h3>
              <p className="text-sm text-[#64748B] font-body leading-relaxed">
                Website visitors bounce within seconds because pages lack clear project portfolios, local proof, and transparent consultation steps.
              </p>
            </div>

            {/* 5. Limited Local Visibility */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-2">
                Invisible in Local Maps
              </h3>
              <p className="text-sm text-[#64748B] font-body leading-relaxed">
                When affluent homeowners in your target suburbs search for custom home builders on Google Maps, your competitors rank ahead of you.
              </p>
            </div>

            {/* 6. Poor Tracking */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE5EE] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Crosshair className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-2">
                The Tracking Black Hole
              </h3>
              <p className="text-sm text-[#64748B] font-body leading-relaxed">
                Agencies show impressions and clicks, but your team has no idea which specific keyword or campaign produced the signed construction contract.
              </p>
            </div>
          </div>

          {/* Solution Shift Statement */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE5EE] shadow-xs">
            <div className="max-w-4xl">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                THE SOLUTION SHIFT
              </span>
              <h3 className="font-heading font-bold text-xl text-[#0D1B2A] mb-2">
                From clicks to qualified opportunities.
              </h3>
              <p className="text-sm sm:text-base text-[#475569] font-body leading-relaxed">
                Ajith Growth focuses on connecting the right search intent, the right message and the right conversion experience—so your marketing is built around qualified opportunities, not simply lead volume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A COMPLETE GOOGLE GROWTH SYSTEM */}
      <section id="growth-system" className="py-20 sm:py-28 bg-[#F3F7FB] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              CONNECTED ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              A Complete Google Growth System for Residential Construction
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              We connect high-intent search, local visibility, conversion-focused experiences and measurable data to help residential construction companies generate better-quality opportunities.
            </p>
          </div>

          {/* 5-Part Growth Engine Component */}
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
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              Built for Residential Construction Companies
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              Our growth systems are designed for construction businesses that build high-value residential projects and want to attract serious homeowners—not compete for low-intent enquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* 1. Turnkey Construction Companies */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-[#0D1B2A] mb-2">
                  Turnkey Construction Companies
                </h3>
                <p className="text-xs sm:text-sm font-body text-[#64748B] leading-relaxed">
                  Companies offering end-to-end design and build solutions looking for serious project partners.
                </p>
              </div>
            </div>

            {/* 2. Villa Construction */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-[#0D1B2A] mb-2">
                  Villa Construction
                </h3>
                <p className="text-xs sm:text-sm font-body text-[#64748B] leading-relaxed">
                  Specialists constructing luxury private villas, gated enclaves, and bespoke residential homes.
                </p>
              </div>
            </div>

            {/* 3. Luxury Home Builders */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-[#0D1B2A] mb-2">
                  Luxury Home Builders
                </h3>
                <p className="text-xs sm:text-sm font-body text-[#64748B] leading-relaxed">
                  Custom builders creating one-of-a-kind architect-designed residences for discerning homeowners.
                </p>
              </div>
            </div>

            {/* 4. Premium Residential Construction */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-[#0D1B2A] mb-2">
                  Premium Residential Construction
                </h3>
                <p className="text-xs sm:text-sm font-body text-[#64748B] leading-relaxed">
                  Builders who compete on architectural craftsmanship, transparency and quality execution.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-center">
            <p className="font-heading font-semibold text-sm sm:text-base text-[#0D1B2A]">
              "Different construction businesses. One focus: generating better-qualified residential project opportunities."
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY AJITH GROWTH */}
      <section className="py-20 sm:py-24 bg-[#0D1B2A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-2">
              WHY AJITH GROWTH
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
              Technology Experience. Business Thinking. Search Growth.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed">
              Ajith Growth is built on 16+ years of experience in technology and management, combined with hands-on experience building and marketing a real business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {/* 1. Technology & Management */}
            <div className="bg-slate-900/80 p-7 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                16+ Years in Technology & Management
              </h3>
              <p className="text-xs text-sky-400 font-supporting uppercase tracking-wider mb-3">
                Cognizant • Accenture • Wipro • HP • IBM • Kyndryl
              </p>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                Structured systems thinking, data integrity, and complex technical problem-solving cultivated across leading global technology enterprises.
              </p>
            </div>

            {/* 2. Real Business Experience */}
            <div className="bg-slate-900/80 p-7 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Hands-On Business Experience
              </h3>
              <p className="text-xs text-sky-400 font-supporting uppercase tracking-wider mb-3">
                Shrusara Fashion Boutique
              </p>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                Direct ownership of business strategy, operations, customer journeys, and Google growth. Marketing built around real-world commercial results.
              </p>
            </div>

            {/* 3. Systems-Driven Approach */}
            <div className="bg-slate-900/80 p-7 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Systems-Driven Approach
              </h3>
              <p className="text-xs text-sky-400 font-supporting uppercase tracking-wider mb-3">
                Disciplined Architecture
              </p>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                No disconnected campaigns or vanity metrics. Every search initiative is engineered as an interconnected growth framework delivering qualified homeowner inquiries.
              </p>
            </div>
          </div>

          {/* Personal Statement */}
          <div className="bg-slate-900/90 rounded-2xl p-8 sm:p-10 border border-slate-800 max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-3">
              FOUNDER'S PERSPECTIVE
            </span>
            <blockquote className="text-base sm:text-lg text-slate-200 font-body italic leading-relaxed mb-6">
              "{siteConfig.founder.statement}"
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div>
                <div className="font-heading font-bold text-white">
                  Ajith B R
                </div>
                <div className="text-xs text-sky-400 font-supporting uppercase tracking-wider">
                  Founder — Ajith Growth
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-supporting font-semibold uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
              >
                <span>Read Full Story & Background</span>
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
              OUR METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              A Structured Approach to Sustainable Growth
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed">
              We don't treat Google Ads, SEO, local visibility and conversion as separate activities. We follow a clear, continuous process designed to build and improve your growth engine over time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* 01 UNDERSTAND */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                Step 01
              </span>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                UNDERSTAND
              </h3>
              <p className="text-xs font-supporting font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Business first. Marketing second.
              </p>
              <p className="text-sm font-body text-[#64748B] leading-relaxed">
                Understand the builder's services, project margins, target locations, and ideal homeowner profile before launching any campaigns.
              </p>
            </div>

            {/* 02 ATTRACT */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                Step 02
              </span>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                ATTRACT
              </h3>
              <p className="text-xs font-supporting font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Get the right people searching for you.
              </p>
              <p className="text-sm font-body text-[#64748B] leading-relaxed">
                Reach homeowners actively searching for residential construction services through high-intent search campaigns and negative keywords.
              </p>
            </div>

            {/* 03 CONVERT */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                Step 03
              </span>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                CONVERT
              </h3>
              <p className="text-xs font-supporting font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Turn relevant traffic into meaningful enquiries.
              </p>
              <p className="text-sm font-body text-[#64748B] leading-relaxed">
                Design architectural landing pages that connect the customer's search intent with your craftsmanship and qualification criteria.
              </p>
            </div>

            {/* 04 MEASURE */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                Step 04
              </span>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                MEASURE
              </h3>
              <p className="text-xs font-supporting font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Know what is actually working.
              </p>
              <p className="text-sm font-body text-[#64748B] leading-relaxed">
                Track phone calls, completed consultation forms, and WhatsApp inquiries back to specific campaigns, ads, and search terms.
              </p>
            </div>

            {/* 05 OPTIMIZE */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                Step 05
              </span>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                OPTIMIZE
              </h3>
              <p className="text-xs font-supporting font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Improve based on evidence—not assumptions.
              </p>
              <p className="text-sm font-body text-[#64748B] leading-relaxed">
                Prune search terms, refine bidding strategies, and optimize landing pages continuously to reduce wasted spend and improve quality.
              </p>
            </div>

            {/* 06 GROW */}
            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                Step 06
              </span>
              <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                GROW
              </h3>
              <p className="text-xs font-supporting font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Turn successful marketing into a repeatable system.
              </p>
              <p className="text-sm font-body text-[#64748B] leading-relaxed">
                Expand search footprint across priority territories and prepare brand entity visibility for evolving AI search engines.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#DCE5EE] bg-white text-center">
            <p className="font-heading font-semibold text-sm sm:text-base text-[#0D1B2A]">
              "Built around your business. Improved through data. Designed for long-term growth."
            </p>
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS SECTION */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                CONSTRUCTION GROWTH INSIGHTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-2">
                Construction Growth Insights
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] font-body">
                Practical insights on Google Ads, SEO, local search, AI Search and growth strategies for residential construction companies.
              </p>
            </div>
            <Link
              href="/insights"
              className="mt-4 sm:mt-0 text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 hover:text-[#0D1B2A] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Featured Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {threeInsights.map((art) => (
              <ArticleCard key={art.slug} article={art} />
            ))}
          </div>

          <div className="pt-6 border-t border-[#DCE5EE] text-center">
            <p className="text-xs sm:text-sm font-supporting text-[#64748B]">
              Sharing practical knowledge to help residential construction companies make better marketing and growth decisions.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-16 sm:py-24 bg-[#0D1B2A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-3">
              DIRECT FOUNDER CONSULTATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-6">
              Tired of Chasing Unqualified Enquiries? Let's Fix Your Pipeline.
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-300 leading-relaxed mb-8">
              Let's look under the hood of your current Google presence. We'll identify exactly where your budget is leaking and map out a clean strategy to attract serious, high-ticket residential builds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                onClick={() => trackEvent('home_final_cta_click')}
              >
                <span>Book a Growth Consultation</span>
                <ArrowRight className="w-5 h-5 text-[#0D1B2A]" />
              </Button>

              <Button
                href="/services"
                variant="outline"
                size="lg"
              >
                <span>Explore Our Services</span>
              </Button>
            </div>

            <p className="text-xs sm:text-sm font-supporting text-slate-400">
              Direct founder conversation. No agency sales pitch, no upfront retainers, and no vanity metrics.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
