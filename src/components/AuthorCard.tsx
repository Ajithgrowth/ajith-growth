import { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from '../utils/router';
import { defaultAuthor } from '../data/authors';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';

export interface AuthorCardProps {
  compact?: boolean;
  className?: string;
}

export function AuthorCard({ compact = false, className = '' }: AuthorCardProps) {
  const [imageError, setImageError] = useState(false);
  const author = defaultAuthor;

  if (compact) {
    return (
      <div className={`bg-white p-6 rounded-2xl border border-[#DCE5EE] shadow-xs ${className}`}>
        <span className="text-[11px] font-supporting text-slate-500 uppercase tracking-wider font-semibold block mb-3">
          Written by {author.name}
        </span>
        <div className="flex items-center gap-3 mb-3">
          {author.image && !imageError ? (
            <img
              src={author.image}
              alt="Ajith B R, Founder of Ajith Growth"
              onError={() => setImageError(true)}
              className="w-11 h-11 rounded-xl object-cover border border-[#DCE5EE] shadow-xs"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-sm shadow-xs">
              {author.initials}
            </div>
          )}
          <div>
            <span className="font-heading font-semibold text-sm text-[#0D1B2A] block">
              {author.name}
            </span>
            <span className="text-[11px] font-supporting text-sky-800 uppercase tracking-wider font-semibold block">
              {author.role}
            </span>
          </div>
        </div>
        <p className="text-xs font-body text-[#64748B] leading-relaxed mb-4">
          {author.bio}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href={author.profileUrl}
            className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] hover:text-sky-800 flex items-center gap-1.5 transition-colors"
          >
            <span>Learn More About Ajith</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'author_card_compact' })}
            className="text-xs font-supporting font-semibold uppercase tracking-wider text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-[#DCE5EE] flex flex-col sm:flex-row items-center sm:items-start gap-6 ${className}`}>
      {author.image && !imageError ? (
        <img
          src={author.image}
          alt="Ajith B R, Founder of Ajith Growth"
          onError={() => setImageError(true)}
          className="w-18 h-18 rounded-2xl object-cover border border-[#DCE5EE] shrink-0 shadow-xs"
        />
      ) : (
        <div className="w-18 h-18 rounded-2xl bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-xl shrink-0 shadow-xs">
          {author.initials}
        </div>
      )}
      <div className="flex-1 text-center sm:text-left">
        <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
          Written by {author.name}
        </span>
        <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D1B2A] mb-1">
          {author.name} — {author.role}
        </h3>
        <p className="text-xs font-supporting text-slate-500 mb-3">
          {author.expertise} • {author.experience}
        </p>
        <p className="text-sm font-body text-[#64748B] leading-relaxed mb-4">
          {author.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <Link
            href={author.profileUrl}
            className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] hover:text-sky-800 inline-flex items-center gap-1.5"
          >
            <span>Learn More About Ajith</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <Link
            href={author.contactUrl}
            className="text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 hover:text-[#0D1B2A] inline-flex items-center gap-1.5"
          >
            <span>Book Growth Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'author_card_full' })}
            className="text-xs font-supporting font-semibold uppercase tracking-wider text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Ajith</span>
          </a>
        </div>
      </div>
    </div>
  );
}
