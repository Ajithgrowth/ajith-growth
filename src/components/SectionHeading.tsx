import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  centered?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  centered,
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  const isCenter = centered ?? (align === 'center');

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-supporting font-bold uppercase tracking-wider mb-2.5 ${
            isDark ? 'text-sky-400' : 'text-[#64748B]'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight leading-tight mb-4 ${
          isDark ? 'text-white' : 'text-[#0D1B2A]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg font-body leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-[#64748B]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
