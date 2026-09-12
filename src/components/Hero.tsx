import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { siteConfig } from '../data/siteConfig';

interface HeroProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  trustPoints?: string[];
}

export function Hero({
  eyebrow = siteConfig.positioning,
  title = (
    <>
      Helping Residential Construction Companies{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">
        Grow Through Google
      </span>
    </>
  ),
  subtitle = siteConfig.secondaryStatement,
  primaryCtaText = 'Book a Growth Consultation',
  primaryCtaHref = '/contact',
  secondaryCtaText = 'Explore the Growth System',
  secondaryCtaHref = '#growth-system',
  trustPoints = [
    'Specialist Google Growth Consultant',
    'Residential Construction Only',
    'Signed Contracts Over Vanity Clicks',
    'Systems-Led Engineering Discipline'
  ],
}: HeroProps) {
  return (
    <section className="relative bg-[#0D1B2A] text-white pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden border-b border-slate-800">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 mb-8 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-sky-300 font-supporting uppercase">
              {eyebrow}
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-[1.14] mb-6">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-body leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button
              href={primaryCtaHref}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-white text-[#0D1B2A] hover:bg-slate-100 shadow-md font-semibold text-sm sm:text-base px-8 py-4"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-[#0D1B2A]" />
            </Button>

            <Button
              href={secondaryCtaHref}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800 font-medium text-sm sm:text-base px-8 py-4"
            >
              {secondaryCtaText}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-xs font-supporting font-medium text-slate-300">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
