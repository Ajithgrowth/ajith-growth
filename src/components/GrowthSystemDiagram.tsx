import React, { useState } from 'react';
import { Target, Compass, MapPin, Layout, BarChart3, Cpu, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from '../utils/router';

interface SystemPart {
  number: string;
  id: string;
  badge: string;
  title: string;
  channel: string;
  description: string;
  icon: React.ElementType;
  focus: string[];
  deliverable: string;
}

const systemParts: SystemPart[] = [
  {
    number: '01',
    id: 'attract',
    badge: 'PAID INTENT',
    title: 'ATTRACT',
    channel: 'Google Ads',
    description: 'Reach homeowners actively searching for construction services through high-intent search campaigns.',
    icon: Target,
    focus: [
      'High-intent keyword architecture isolating genuine construction requirements',
      'Account-level negative keyword protection filtering budget shoppers and DIY',
      'Hyper-local radius and geographic territory bidding'
    ],
    deliverable: 'Consistent flow of qualified homeowner search inquiries'
  },
  {
    number: '02',
    id: 'get-found',
    badge: 'LOCAL VISIBILITY & TRUST',
    title: 'GET FOUND',
    channel: 'SEO & Google Business Profile',
    description: 'Build organic visibility and local trust across Google Search and Maps in your key markets.',
    icon: MapPin,
    focus: [
      'Google Business Profile category, review, and photo optimization',
      'Local territory and residential project topic clusters',
      'Structured technical SEO and schema data architecture'
    ],
    deliverable: 'Sustainable 3-Pack and organic search authority'
  },
  {
    number: '03',
    id: 'convert',
    badge: 'CONVERSION EXPERIENCE',
    title: 'CONVERT',
    channel: 'Landing Pages',
    description: 'Turn relevant search traffic into qualified enquiries with pages built specifically for construction clients.',
    icon: Layout,
    focus: [
      'Search intent alignment connecting homeowner queries directly to your offer',
      'Architectural visual hierarchy and credibility proof points',
      'Intentional qualification forms capturing project scope, budget, and timeline'
    ],
    deliverable: 'Higher consultation conversion rates from existing traffic'
  },
  {
    number: '04',
    id: 'measure',
    badge: 'ATTRIBUTION & DATA',
    title: 'MEASURE',
    channel: 'Conversion Tracking',
    description: 'Measure calls, forms and WhatsApp enquiries to understand what drives business opportunities.',
    icon: BarChart3,
    focus: [
      'Clean tracking of inbound calls, completed forms, and WhatsApp chats',
      'Campaign attribution connecting inquiries back to specific keywords and ads',
      'Data-driven feedback loops to allocate budget to high-performing campaigns'
    ],
    deliverable: 'Clarity on what marketing actually contributes to signed contracts'
  },
  {
    number: '05',
    id: 'evolve',
    badge: 'FUTURE-PROOF',
    title: 'EVOLVE',
    channel: 'GEO & AI Search',
    description: 'Prepare your digital presence for the future of AI-powered search and modern discovery.',
    icon: Cpu,
    focus: [
      'Entity identity and structured data across the digital ecosystem',
      'Authoritative content answering complex homeowner research queries',
      'Brand consistency and co-citations for AI model recognition'
    ],
    deliverable: 'Early-mover presence in AI Overviews and generative search'
  }
];

export function GrowthSystemDiagram() {
  const [activePartId, setActivePartId] = useState<string>('attract');
  const activePart = systemParts.find((p) => p.id === activePartId) || systemParts[0];

  return (
    <div className="w-full bg-[#0D1B2A] text-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl overflow-hidden">
      {/* Header & Strategic Foundation Layer */}
      <div className="max-w-3xl mb-8">
        <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
          A COMPLETE GOOGLE GROWTH SYSTEM
        </span>
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight mb-3">
          One Connected System for Residential Construction
        </h3>
        <p className="text-slate-300 font-body text-base leading-relaxed">
          We connect high-intent search, local visibility, conversion-focused experiences and measurable data to help residential construction companies generate better-quality opportunities.
        </p>
      </div>

      {/* Top Strategic Layer Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-700/80 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-600/60 text-sky-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-supporting font-bold uppercase tracking-wider text-sky-400 block">
              Strategic Foundation
            </span>
            <h4 className="text-base font-heading font-bold text-white">
              GROWTH STRATEGY CONNECTS EVERY STAGE
            </h4>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 font-body max-w-md">
          Aligning search, visibility, conversion, and measurement with your target homeowners, project margins, and business goals.
        </p>
      </div>

      {/* 5-Part Interactive System Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {systemParts.map((part) => {
          const Icon = part.icon;
          const isActive = part.id === activePartId;
          return (
            <button
              key={part.id}
              onClick={() => setActivePartId(part.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/95 border-sky-400 shadow-lg shadow-sky-950/50'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold font-supporting uppercase tracking-wider ${
                    isActive ? 'text-sky-400' : 'text-slate-400'
                  }`}>
                    Part {part.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                </div>
                <h4 className="font-heading font-bold text-base text-white leading-tight mb-1">
                  {part.title}
                </h4>
                <p className="text-xs text-sky-300 font-supporting mb-1">
                  {part.channel}
                </p>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                {isActive ? '● Selected' : 'Click to view'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Part Spotlight Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded bg-sky-950/80 border border-sky-700/50 text-sky-300 text-xs font-supporting font-semibold uppercase tracking-wider">
                {activePart.badge}
              </span>
              <span className="text-xs text-slate-400 font-supporting">
                Part {activePart.number} of the Growth Engine
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
              {activePart.title}: {activePart.channel}
            </h4>
            <p className="text-slate-300 font-body text-sm sm:text-base leading-relaxed mb-6">
              {activePart.description}
            </p>

            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-400 font-supporting uppercase tracking-wider block">
                Key Focus & Capabilities:
              </span>
              {activePart.focus.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200 font-body">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/80 rounded-lg p-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-supporting uppercase tracking-wider text-slate-400 block mb-2">
                Business Outcome
              </span>
              <p className="text-base font-heading font-semibold text-white mb-4">
                {activePart.deliverable}
              </p>
              <div className="p-3.5 rounded bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-body leading-relaxed">
                Integrated directly with all other stages so traffic, conversion signals, and attribution data are never siloed.
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

      {/* Closing Statement */}
      <div className="pt-6 border-t border-slate-800 text-center max-w-2xl mx-auto">
        <p className="text-sm sm:text-base font-heading font-medium text-slate-300 leading-relaxed">
          <strong className="text-white">One system. One strategy. Measurable growth.</strong>
          <br className="hidden sm:inline" />
          {' '}Ajith Growth brings these capabilities together into a single growth strategy designed around the business goals of residential construction companies.
        </p>
      </div>
    </div>
  );
}
