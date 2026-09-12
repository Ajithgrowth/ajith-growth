import { useState, useEffect } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';
import { MobileNavigation } from './MobileNavigation';

export function Header() {
  const { currentPath } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#DCE5EE]'
            : 'bg-white border-b border-[#DCE5EE]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo - Always links to / */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none min-h-[44px]"
            aria-label="Ajith Growth - Home"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] flex items-center justify-center text-white font-heading font-bold text-lg tracking-wider shadow-xs group-hover:bg-[#172A3A] transition-colors">
              AG
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-[#0D1B2A] tracking-tight leading-tight">
                {siteConfig.brandName}
              </span>
              <span className="font-supporting text-[11px] font-semibold tracking-wider text-[#64748B] uppercase leading-none mt-0.5">
                Google Growth Consultant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {siteConfig.navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-body transition-colors relative ${
                    isActive
                      ? 'text-[#0D1B2A] font-semibold bg-slate-100'
                      : 'text-[#64748B] hover:text-[#0D1B2A] hover:bg-slate-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              onClick={() => trackEvent('consultation_cta_click', { location: 'header_desktop' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D1B2A] hover:bg-[#172A3A] text-white font-body font-medium text-[12px] transition-all shadow-xs active:scale-[0.99]"
            >
              <span>Book a Growth Consultation</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </Link>
          </div>

          {/* Mobile Hamburger Trigger - min 44px touch target */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#0D1B2A] rounded-lg hover:bg-slate-100 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={currentPath}
      />
    </>
  );
}
