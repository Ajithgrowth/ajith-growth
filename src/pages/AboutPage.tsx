import { ShieldCheck, ArrowRight, Briefcase, Cpu, CheckCircle2, ChevronRight, Compass, Phone, MessageCircle, Building2, Layers, Award, Sparkles, Target, BarChart3 } from 'lucide-react';
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

  return (
    <main id="main-content" className="w-full bg-white">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
        breadcrumbs={seo.breadcrumbs}
      />

      {/* SECTION 1: HERO */}
      <section className="bg-[#0D1B2A] text-white pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-supporting uppercase tracking-wider text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-sky-400">About</span>
            </nav>

            <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
              {aboutData.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
              {aboutData.headline}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed mb-6">
              {aboutData.supportingText}
            </p>

            {/* Small Credibility Line */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-xs sm:text-sm font-supporting font-semibold uppercase tracking-wider text-sky-300">
                {aboutData.credibilityLine}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MY JOURNEY */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              BACKGROUND & EVOLUTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-8">
              {aboutData.journey.headline}
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-5 font-body text-base text-[#475569] leading-relaxed mb-14">
              {aboutData.journey.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Visual Timeline */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#DCE5EE] shadow-xs">
              <h3 className="text-sm font-supporting font-bold uppercase tracking-wider text-[#0D1B2A] mb-8 pb-3 border-b border-[#DCE5EE]">
                Career Evolution & Experience Timeline
              </h3>

              <div className="relative border-l-2 border-sky-800/30 ml-3 sm:ml-4 space-y-8">
                {aboutData.journey.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-sky-800 group-hover:scale-110 transition-transform" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800">
                        {item.label}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                      {item.subhead}
                    </h4>

                    <p className="text-sm font-body text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY AJITH GROWTH */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              FOUNDATIONAL ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              {aboutData.whyAjithGrowth.headline}
            </h2>
            <p className="text-base sm:text-lg font-body text-[#475569] leading-relaxed mb-12">
              {aboutData.whyAjithGrowth.supportingText}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {aboutData.whyAjithGrowth.pillars.map((pillar, idx) => {
                const icons = [Cpu, Briefcase, Target];
                const Icon = icons[idx] || ShieldCheck;
                return (
                  <div key={idx} className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-heading font-bold text-[#0D1B2A] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm font-body text-[#64748B] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-xl bg-slate-900 text-white text-center">
              <p className="font-heading font-medium text-base sm:text-lg text-slate-200 italic">
                "{aboutData.whyAjithGrowth.closingStatement}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HANDS-ON BUSINESS EXPERIENCE */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              REAL-WORLD FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              {aboutData.handsOnExperience.headline}
            </h2>

            <div className="space-y-4 font-body text-base text-[#475569] leading-relaxed mb-12">
              {aboutData.handsOnExperience.supportingText.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <h3 className="text-sm font-supporting font-bold uppercase tracking-wider text-[#0D1B2A] mb-6">
              What This Experience Taught Me
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {aboutData.handsOnExperience.lessons.map((lesson, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-sky-800 shrink-0" />
                    <h4 className="text-base font-heading font-bold text-[#0D1B2A]">
                      {lesson.title}
                    </h4>
                  </div>
                  <p className="text-sm font-body text-[#64748B] leading-relaxed pl-7">
                    {lesson.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-sky-200 bg-sky-50 text-[#0D1B2A] text-center">
              <p className="font-heading font-semibold text-base sm:text-lg">
                "{aboutData.handsOnExperience.closingStatement}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW I THINK ABOUT GROWTH (PRINCIPLES) */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              CORE PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              {aboutData.growthPrinciples.headline}
            </h2>
            <p className="text-base sm:text-lg font-body text-[#475569] leading-relaxed mb-12">
              {aboutData.growthPrinciples.supportingText}
            </p>

            <div className="space-y-4 mb-12">
              {aboutData.growthPrinciples.principles.map((principle) => (
                <div key={principle.number} className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
                    {principle.number}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0D1B2A] mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-sm font-body text-[#64748B] leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-[#0D1B2A] text-white text-center">
              <p className="font-heading font-medium text-base sm:text-lg text-slate-200">
                "{aboutData.growthPrinciples.closingStatement}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHO I WORK WITH */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              SPECIALIZATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
              {aboutData.whoIWorkWith.headline}
            </h2>
            <p className="text-base sm:text-lg font-body text-[#475569] leading-relaxed mb-12">
              {aboutData.whoIWorkWith.supportingText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {aboutData.whoIWorkWith.clientTypes.map((type, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-[#DCE5EE] bg-white shadow-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-sky-800 shrink-0" />
                    <h3 className="text-base font-heading font-bold text-[#0D1B2A]">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-sm font-body text-[#64748B] leading-relaxed pl-8">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-white text-center">
              <p className="font-body text-sm sm:text-base text-[#0D1B2A] font-medium">
                {aboutData.whoIWorkWith.closingStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: MY APPROACH */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              EXECUTION PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-2">
              {aboutData.approach.headline}
            </h2>
            <p className="text-sm font-supporting font-bold uppercase tracking-wider text-sky-800 mb-4">
              {aboutData.approach.subhead}
            </p>
            <p className="text-base sm:text-lg font-body text-[#475569] leading-relaxed mb-12">
              {aboutData.approach.intro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {aboutData.approach.steps.map((step) => (
                <div key={step.number} className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC]">
                  <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                    Step {step.number}
                  </span>
                  <h3 className="text-base font-heading font-bold text-[#0D1B2A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-center">
              <p className="font-heading font-semibold text-sm sm:text-base text-[#0D1B2A]">
                "{aboutData.approach.closingStatement}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="py-16 sm:py-24 bg-[#0D1B2A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-400 block mb-3">
              TAILORED GROWTH STRATEGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-6">
              {aboutData.finalCta.headline}
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-300 leading-relaxed mb-8">
              {aboutData.finalCta.supportingText}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                onClick={() => trackEvent('about_final_cta_click')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0D1B2A] font-body font-semibold text-sm transition-all shadow-xs"
              >
                <span>{aboutData.finalCta.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 text-[#0D1B2A]" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-white font-body font-medium text-sm transition-all"
              >
                <span>{aboutData.finalCta.secondaryButtonText}</span>
              </Link>
            </div>

            <p className="text-xs sm:text-sm font-supporting text-slate-400">
              {aboutData.finalCta.smallNote}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
