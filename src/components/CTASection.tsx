import { ArrowRight, ChevronRight, Mail, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';

export interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
}

export function CTASection({
  eyebrow = "DIRECT STRATEGIC CONSULTATION",
  title = "Ready to Build a Predictable Google Pipeline for Your Construction Firm?",
  description = "Speak directly with Ajith. We will review your current search visibility, analyze your local market competitors, and identify the exact levers to capture qualified custom builds.",
  primaryButtonText = "Book a Growth Consultation",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore Our Services",
  secondaryButtonHref = "/services",
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
            onClick={() => trackEvent('consultation_cta_click', { location: 'cta_section_primary' })}
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

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'cta_section' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-emerald-700/60 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-body text-sm font-medium hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <a
            href={siteConfig.emailMailto}
            onClick={() => trackEvent('email_click', { location: 'cta_section' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 font-body text-sm font-medium hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Email Directly</span>
          </a>
        </div>

        <p className="text-xs font-supporting text-slate-400 mt-6">
          Confidential review • Tailored to residential builders & luxury remodelers • No pressure sales
        </p>
      </div>
    </section>
  );
}
