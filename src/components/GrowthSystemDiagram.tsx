import React, { useState } from 'react';
import { Target, Compass, MapPin, Layout, BarChart3, Cpu, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from '../utils/router';

interface StepDetail {
  id: string;
  stage: string;
  badge: string;
  title: string;
  subhead: string;
  icon: React.ElementType;
  focus: string[];
  deliverable: string;
}

const systemSteps: StepDetail[] = [
  {
    id: 'strategy',
    stage: 'Phase 01',
    badge: 'FOUNDATION',
    title: 'Growth Strategy',
    subhead: 'Market intelligence & competitor search landscape',
    icon: ShieldCheck,
    focus: [
      'Competitor search auction & budget audit',
      'Affluent zip code & subdivision mapping',
      'Ideal Client Profile & project scope definition'
    ],
    deliverable: 'Custom Google Growth Blueprint & Channel Map'
  },
  {
    id: 'attract',
    stage: 'Phase 02',
    badge: 'PAID INTENT',
    title: 'Attract: Google Ads',
    subhead: 'Precision targeting for qualified homeowners',
    icon: Target,
    focus: [
      'Account-level negative keyword fortress (filters cheap/DIY)',
      'High-intent luxury custom build keyword silos',
      'Hyper-local radius & postal code bidding'
    ],
    deliverable: 'High-margin homeowner lead pipeline'
  },
  {
    id: 'get-found',
    stage: 'Phase 03',
    badge: 'ORGANIC DOMINANCE',
    title: 'Get Found: SEO & Local 3-Pack',
    subhead: 'Google Maps & high-intent organic rankings',
    icon: MapPin,
    focus: [
      'Google Business Profile category & review engineering',
      'Subdivision & neighborhood project case study hubs',
      'Schema.org Project & LocalBusiness structured data'
    ],
    deliverable: 'Sustainable 3-Pack & organic search authority'
  },
  {
    id: 'convert',
    stage: 'Phase 04',
    badge: 'CONVERSION',
    title: 'Convert: Landing Pages',
    subhead: 'Architectural pages designed for trust & qualification',
    icon: Layout,
    focus: [
      'High-resolution residential portfolio presentation',
      'Intentional qualification friction (budget & timeline filters)',
      'Mobile-first one-tap WhatsApp & consultation scheduling'
    ],
    deliverable: 'Pre-qualified consultation bookings'
  },
  {
    id: 'measure',
    stage: 'Phase 05',
    badge: 'ATTRIBUTION',
    title: 'Measure: Conversion Tracking',
    subhead: 'Closed-loop attribution connected to CRM revenue',
    icon: BarChart3,
    focus: [
      'Server-side Google Tag Manager & GCLID capture',
      'Offline CRM conversion sync (Signed Contract data)',
      'Smart Bidding optimized for closed contract revenue'
    ],
    deliverable: 'True ROI & Cost-Per-Contract clarity'
  },
  {
    id: 'evolve',
    stage: 'Phase 06',
    badge: 'FUTURE-PROOF',
    title: 'Evolve: GEO & AI Search',
    subhead: 'Generative Engine Optimization for AI Overviews & Perplexity',
    icon: Cpu,
    focus: [
      'Machine-readable brand entity graph architecture',
      'Information gain first-party construction specifications',
      'Authoritative co-citations across regional design media'
    ],
    deliverable: 'Conversational AI search citation readiness'
  }
];

export function GrowthSystemDiagram() {
  const [activeStepId, setActiveStepId] = useState<string>('strategy');
  const activeStep = systemSteps.find((s) => s.id === activeStepId) || systemSteps[0];

  return (
    <div className="w-full bg-[#0D1B2A] text-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl overflow-hidden">
      <div className="max-w-3xl mb-8">
        <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
          INTERCONNECTED ARCHITECTURE
        </span>
        <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight mb-3">
          The Complete Google Growth Engine
        </h3>
        <p className="text-slate-300 font-body text-base leading-relaxed">
          Unlike agencies running isolated ads or random blog posts, our system operates as a single, coherent machine where each tier fuels and reinforces the next.
        </p>
      </div>

      {/* Interactive Desktop / Tablet Stepper Flow */}
      <div className="hidden lg:grid grid-cols-6 gap-3 mb-8 relative">
        {systemSteps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = step.id === activeStepId;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/90 border-sky-400 shadow-lg shadow-sky-950/50'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold font-supporting uppercase tracking-wider ${
                    isActive ? 'text-sky-400' : 'text-slate-400'
                  }`}>
                    {step.stage}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                </div>
                <h4 className="font-heading font-medium text-sm text-white leading-tight mb-1">
                  {step.title.split(':')[0]}
                </h4>
                <p className="text-xs text-slate-400 font-body line-clamp-1">
                  {step.title.includes(':') ? step.title.split(':')[1] : step.subhead}
                </p>
              </div>

              {idx < systemSteps.length - 1 && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden xl:block text-slate-600 pointer-events-none">
                  →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Step Spotlight Panel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded bg-sky-950/80 border border-sky-700/50 text-sky-300 text-xs font-supporting font-semibold uppercase tracking-wider">
                {activeStep.badge}
              </span>
              <span className="text-xs text-slate-400 font-supporting">
                {activeStep.stage} in the Unified Growth Engine
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-heading font-semibold text-white mb-2">
              {activeStep.title}
            </h4>
            <p className="text-slate-300 font-body text-sm sm:text-base leading-relaxed mb-6">
              {activeStep.subhead}
            </p>

            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-400 font-supporting uppercase tracking-wider block">
                Engineered Focus Areas:
              </span>
              {activeStep.focus.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200 font-body">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800/80 rounded-lg p-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-supporting uppercase tracking-wider text-slate-400 block mb-2">
                Primary Business Deliverable
              </span>
              <p className="text-base font-heading font-medium text-white mb-4">
                {activeStep.deliverable}
              </p>
              <div className="p-3.5 rounded bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-body leading-relaxed">
                Connects directly into the next phase so no inquiry, click, or attribution data is ever lost.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                href="/services"
                className="text-xs sm:text-sm font-body font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Service Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Journey Fallback List (Clean Vertical Stack) */}
      <div className="lg:hidden mt-8 space-y-3">
        <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Full System Flow:
        </span>
        {systemSteps.map((step) => {
          const Icon = step.icon;
          const isCurrent = step.id === activeStepId;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all ${
                isCurrent
                  ? 'bg-slate-800/90 border-sky-400 text-white'
                  : 'bg-slate-900/40 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isCurrent ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-supporting font-bold uppercase tracking-wider text-slate-400 block">
                    {step.stage}
                  </span>
                  <span className="font-heading text-sm font-medium text-white">
                    {step.title}
                  </span>
                </div>
              </div>
              <span className="text-xs text-sky-400 font-medium font-supporting">
                {isCurrent ? 'Active' : 'Tap to View'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
