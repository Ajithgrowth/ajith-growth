import { ArrowRight, Check } from 'lucide-react';
import { Link } from '../utils/router';
import { Button } from './Button';

export interface ServiceCardProps {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  focusAreas: string[];
  businessOutcome: string;
  strategicNote?: string;
  ctaText?: string;
  variant?: 'light' | 'soft' | 'card';
  reversed?: boolean;
}

export function ServiceCard({
  id,
  eyebrow,
  title,
  description,
  focusAreas,
  businessOutcome,
  strategicNote,
  ctaText = "Discuss This Service",
  variant = 'light',
  reversed = false,
}: ServiceCardProps) {
  const bgClass =
    variant === 'soft' ? 'bg-[#F3F7FB]' : variant === 'card' ? 'bg-[#F8FAFC]' : 'bg-white';

  return (
    <div
      id={id}
      className={`py-16 sm:py-20 border-b border-[#DCE5EE] scroll-mt-28 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Main Description Column */}
          <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
            {eyebrow && (
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
                {eyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-[#0D1B2A] tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed mb-6">
              {description}
            </p>

            <div className="space-y-3 mb-8">
              <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] block">
                Core Implementation Areas:
              </span>
              {focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-[#64748B] font-body">
                  <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome & Action Card */}
          <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="bg-white rounded-2xl p-7 border border-[#DCE5EE] shadow-xs">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                Commercial Outcome
              </span>
              <p className="text-base font-heading font-semibold text-[#0D1B2A] mb-4">
                {businessOutcome}
              </p>

              {strategicNote && (
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE5EE] text-xs text-[#64748B] font-body leading-relaxed mb-6">
                  <strong className="text-[#0D1B2A]">Strategic Principle:</strong> {strategicNote}
                </div>
              )}

              <Button
                href="/contact"
                variant="secondary"
                size="md"
                className="w-full"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
