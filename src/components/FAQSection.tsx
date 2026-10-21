import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const servicesFAQs: FAQItem[] = [
  {
    question: 'How can residential construction companies generate qualified leads through Google?',
    answer: 'Qualified homeowner acquisition requires an integrated Google search approach. Homeowners planning custom builds or major renovations are reached through localized Google Ads, reinforced by organic Local SEO and Google Business Profile map visibility. The key differentiator is filtering out unqualified inquiries through negative keyword exclusions, intentional landing page qualification questions, and connecting CRM project milestones back to Google campaign reporting.'
  },
  {
    question: 'Is Google Ads effective for residential construction companies and custom builders?',
    answer: 'Google Ads can help builders reach homeowners actively searching for construction services when targeting, landing pages and conversion measurement are structured correctly. Because construction projects represent major commitments, success depends on search intent quality rather than click volume—filtering out DIY and repair queries while directing traffic to project portfolios.'
  },
  {
    question: 'How can builders improve Google lead quality and filter unqualified inquiries?',
    answer: 'Improving lead quality involves four practical measures: (1) A comprehensive negative keyword list excluding terms like "cheap", "diy", "repair", and commercial subcontracting; (2) Qualification fields on inquiry forms asking for project scope, location, and timeframe; (3) Clear positioning of project capabilities on landing pages; and (4) Closed-loop conversion tracking that trains ad platforms on verified consultations rather than raw form fills.'
  },
  {
    question: 'Why is Local SEO important for residential builders who take on a limited number of projects?',
    answer: 'Local SEO helps establish organic visibility in the specific communities, neighborhoods, and development zones where your target projects are located. When prospective clients research residential builders in their local area, ranking well in organic search and map listings establishes trust and generates qualified inquiries.'
  },
  {
    question: 'How does Google Business Profile help residential construction companies?',
    answer: 'A Google Business Profile provides immediate local proof of craftsmanship. High-resolution photos of recent construction projects, accurate service descriptions, verified location signals, and authentic client reviews detailing project scopes help build trust with prospective homeowners searching in your service area.'
  },
  {
    question: 'What should construction companies track as conversions instead of just form fills?',
    answer: 'Tracking form submissions alone can be misleading because a misaligned inquiry appears identical to a qualified project lead. We help builders track meaningful milestones through CRM integration—such as "Consultation Scheduled", "Feasibility Study Requested", and "Contract Executed"—enabling better evaluation of marketing effectiveness.'
  },
  {
    question: 'What is GEO (Generative Engine Optimization) and AI Search for builders?',
    answer: 'Generative Engine Optimization focuses on structuring your company\'s digital presence so AI search tools (like Google AI Overviews and Perplexity) accurately understand your business. This involves maintaining clear entity schema markup, publishing authentic project documentation, and earning authoritative local and industry citations.'
  }
];

export interface FAQSectionProps {
  items?: FAQItem[];
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}

export function FAQSection({
  items = servicesFAQs,
  title = 'Frequently Asked Strategic Questions',
  eyebrow = 'TRANSPARENT CLARITY',
  description = 'Direct, technical answers on how our Google growth systems operate for custom home builders and luxury residential remodelers.',
  className = '',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) {
    return null;
  }

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 sm:py-24 bg-white border-t border-[#DCE5EE] ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-sky-900 text-xs font-supporting font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-sky-800" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] font-body leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-4" role="region" aria-label="Frequently Asked Questions">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const faqId = `faq-answer-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-sky-800/30 bg-[#F8FAFC] shadow-xs'
                    : 'border-[#DCE5EE] bg-white hover:border-slate-300'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={faqId}
                    onClick={() => toggleIndex(index)}
                    className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-800 rounded-xl"
                  >
                    <span className="font-heading font-semibold text-sm sm:text-base text-[#0D1B2A] pr-2">
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-[#0D1B2A] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={faqId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#334155] font-body leading-relaxed border-t border-slate-100 mt-1"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
