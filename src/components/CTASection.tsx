import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { trackEvent } from '../utils/analytics';

export interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  supportingLine?: string;
  trackingLocation?: string;
  className?: string;
}

export function CTASection({
  eyebrow,
  title = "Let's Build a Better Growth System",
  description = "If you're looking to attract better-quality enquiries through Google, let's start with a conversation about your business, your goals and where your current growth system can improve.",
  primaryButtonText = "Book a Growth Consultation",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore Our Services",
  secondaryButtonHref = "/services",
  supportingLine,
  trackingLocation = 'cta_section_primary',
  className = "",
}: CTASectionProps) {
  return (
    <section className={`py-20 sm:py-24 bg-[#0D1B2A] text-white ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-5 leading-tight">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-2xl mx-auto mb-10">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={primaryButtonHref}
            variant="primary"
            size="lg"
            onClick={() => trackEvent('consultation_cta_click', { location: trackingLocation })}
            className="w-full sm:w-auto"
          >
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-5 h-5 text-[#0D1B2A]" />
          </Button>

          {secondaryButtonText && (
            <Button
              href={secondaryButtonHref}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <span>{secondaryButtonText}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Button>
          )}

        </div>
        {supportingLine && <p className="text-xs font-supporting text-slate-400 mt-6">{supportingLine}</p>}
      </div>
    </section>
  );
}
