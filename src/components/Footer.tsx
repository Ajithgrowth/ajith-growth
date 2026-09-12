import { ArrowUpRight, Mail, Phone, MapPin, Shield, MessageSquare } from 'lucide-react';
import { Link } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B2A] text-white border-t border-slate-800" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-lg bg-white text-[#0D1B2A] flex items-center justify-center font-heading font-bold text-lg tracking-wider">
                AG
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-white block">
                  {siteConfig.brandName}
                </span>
                <span className="font-supporting text-xs text-sky-400 font-semibold tracking-wider uppercase block">
                  Google Growth Consultant
                </span>
              </div>
            </Link>

            <p className="text-sm font-body text-slate-300 leading-relaxed max-w-sm pt-2">
              Building Growth Systems That Deliver Qualified Leads and Measurable Results for residential construction companies, custom home builders, and luxury remodelers.
            </p>

            <div className="pt-2 text-xs font-supporting text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>16+ Years Enterprise Technology & Systems Rigor</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a
                  href={siteConfig.phoneTel}
                  onClick={() => trackEvent('phone_click', { location: 'footer_brand' })}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer_brand' })}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a
                  href={siteConfig.emailMailto}
                  onClick={() => trackEvent('email_click', { location: 'footer_brand' })}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address.formatted}</span>
              </div>
            </div>
          </div>


          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-heading font-semibold text-sm text-white tracking-wider uppercase block">
              Navigation
            </span>
            <ul className="space-y-2 text-sm font-body text-slate-300" role="list">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Growth Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-heading font-semibold text-sm text-white tracking-wider uppercase block">
              Growth Services
            </span>
            <ul className="space-y-2 text-sm font-body text-slate-300" role="list">
              {siteConfig.serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Consultation */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-heading font-semibold text-sm text-white tracking-wider uppercase block">
              Connect Directly
            </span>
            <div className="space-y-3">
              <Link
                href="/contact"
                onClick={() => trackEvent('consultation_cta_click', { location: 'footer_cta' })}
                className="w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0D1B2A] font-body font-semibold text-xs sm:text-sm text-center block transition-all shadow-xs"
              >
                Book a Growth Consultation
              </Link>

              <div className="pt-2 text-xs text-slate-400 font-supporting space-y-2">
                <a
                  href={siteConfig.phoneTel}
                  onClick={() => trackEvent('phone_click', { location: 'footer_connect' })}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer_connect' })}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp: {siteConfig.phone}</span>
                </a>
                <a
                  href={siteConfig.emailMailto}
                  onClick={() => trackEvent('email_click', { location: 'footer_connect' })}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
                {siteConfig.socialProfiles.linkedin ? (
                  <a
                    href={siteConfig.socialProfiles.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>LinkedIn Profile</span>
                  </a>
                ) : null}
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-supporting text-slate-400">
          <div>
            © {currentYear} {siteConfig.brandName}. All rights reserved. Helping Residential Construction Companies Grow Through Google.
          </div>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
