import { useEffect, useRef } from 'react';
import { X, ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileNavigation({
  isOpen,
  onClose,
  currentPath,
}: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Background scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Focus close button on open
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  // Escape key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-[#0D1B2A]/70 backdrop-blur-xs flex flex-col justify-start"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="bg-white border-b border-[#DCE5EE] px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top duration-200"
      >
        {/* Top bar inside drawer */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DCE5EE]">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 min-h-[44px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-sm">
              AG
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-[#0D1B2A] leading-tight">
                {siteConfig.brandName}
              </span>
              <span className="font-supporting text-[10px] text-[#64748B] tracking-wider uppercase font-semibold">
                Google Growth Consultant
              </span>
            </div>
          </Link>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#0D1B2A] rounded-lg hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-sky-600"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="py-4 space-y-1" aria-label="Mobile Navigation">
          {siteConfig.navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-body font-medium min-h-[44px] transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-[#0D1B2A] font-semibold'
                    : 'text-[#64748B] hover:text-[#0D1B2A] hover:bg-slate-50'
                }`}
              >
                <span>{item.name}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />}
              </Link>
            );
          })}
        </nav>

        {/* CTA section separated visually */}
        <div className="pt-4 border-t border-[#DCE5EE] space-y-2.5">
          <Link
            href="/contact"
            onClick={() => {
              onClose();
              trackEvent('consultation_cta_click', { location: 'mobile_nav' });
            }}
            className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#0D1B2A] hover:bg-[#172A3A] text-white font-body font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            <span>Book a Growth Consultation</span>
            <ArrowRight className="w-4 h-4 text-sky-400" />
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={siteConfig.phoneTel}
              onClick={() => {
                onClose();
                trackEvent('phone_click', { location: 'mobile_nav' });
              }}
              className="min-h-[44px] px-3 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-[#0D1B2A] font-body font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <Phone className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span className="truncate">Call</span>
            </a>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onClose();
                trackEvent('whatsapp_click', { location: 'mobile_nav' });
              }}
              className="min-h-[44px] px-3 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 font-body font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
          </div>

          <a
            href={siteConfig.emailMailto}
            onClick={() => {
              onClose();
              trackEvent('email_click', { location: 'mobile_nav' });
            }}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-[#0D1B2A] font-body font-medium text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            <Mail className="w-3.5 h-3.5 text-sky-700" />
            <span className="truncate">Email {siteConfig.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
