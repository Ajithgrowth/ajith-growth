import { Shield, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumb } from '../components/Breadcrumb';
import { Link } from '../utils/router';
import { staticPagesSeo } from '../data/seoData';
import { siteConfig } from '../data/siteConfig';

export function PrivacyPage() {
  const seo = staticPagesSeo['/privacy'];

  return (
    <main id="main-content" className="w-full bg-white">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImage={seo.ogImage}
        ogType={seo.ogType}
        breadcrumbs={seo.breadcrumbs}
      />

      {/* Header Section */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-14 bg-[#0D1B2A] text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Privacy Policy' }
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-supporting font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>CONFIDENTIALITY & DATA STEWARDSHIP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            How Ajith Growth respects, protects, and handles confidential client inquiries and business information.
          </p>
          <div className="mt-4 text-xs font-supporting text-slate-400">
            Last Updated: June 1, 2026
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none font-body text-slate-700 space-y-10 leading-relaxed text-sm sm:text-base">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                1. Commitment to Client Confidentiality
              </h2>
              <p>
                At Ajith Growth, we provide strategic Google growth consulting exclusively to residential construction companies, turnkey builders, villa developers, and luxury remodelers. We recognize that project pipelines, architectural scopes, estimating structures, and sales metrics represent proprietary business assets. We maintain the highest standards of data security and confidentiality.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                We only collect information that you voluntarily provide to us when requesting a consultation, submitting an inquiry form, or corresponding via email:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Contact Information:</strong> Name, company name, business email address, website URL, and geographic service location.</li>
                <li><strong>Consultation Data:</strong> Details regarding your primary growth challenges, target build categories, and local residential service territories.</li>
                <li><strong>Technical Usage Data:</strong> Standard server logs, approximate geographic location by IP address, and anonymized user interaction telemetry to maintain site performance.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">
                The information provided is utilized strictly for professional consulting operations:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Evaluating your company&apos;s local market search presence prior to scheduled strategy discussions.</li>
                <li>Responding directly to consultation requests and professional inquiries.</li>
                <li>Delivering agreed-upon Google Ads, Local SEO, and conversion consulting engagements.</li>
                <li>Fulfilling legal obligations and maintaining accounting records.</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, trade, or distribute your personal or commercial business data to any third-party marketing brokers or data exchanges.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                4. Confidentiality of Client Metrics
              </h2>
              <p>
                When clients grant access to Google Ads accounts, Google Business Profiles, or CRM systems for closed-loop attribution, all proprietary data—including lead values, conversion numbers, contract amounts, and customer identities—is treated as strictly confidential under non-disclosure standards. Case studies or insights published on this website use anonymized or generalized data unless explicit written authorization has been granted.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                5. Analytics & Cookies
              </h2>
              <p>
                This website uses privacy-conscious, first-party analytics tools to understand site traffic patterns, monitor system health, and improve page readability. We do not deploy invasive third-party ad retargeting pixels that follow you across the web.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                6. Data Security
              </h2>
              <p>
                We employ industry-standard encryption protocols (HTTPS/TLS) across all communications and maintain secure access controls. While no digital transmission is guaranteed to be 100% impenetrable, we take extensive measures to safeguard all digital interactions.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                7. Your Rights
              </h2>
              <p>
                You may request a copy of the contact data we have on file for you, or request that your contact details and preliminary inquiry submissions be completely deleted from our internal systems at any time.
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCE5EE]">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                8. Contact for Privacy Questions
              </h2>
              <p className="mb-4">
                If you have questions regarding this Privacy Policy or wish to request data updates, please contact Ajith directly:
              </p>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE5EE] inline-flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-800" />
                <a
                  href={siteConfig.emailMailto}
                  className="font-medium text-[#0D1B2A] hover:text-sky-800 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-[#DCE5EE] flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-slate-600 hover:text-[#0D1B2A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/terms"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-sky-800 hover:text-[#0D1B2A] transition-colors"
            >
              <span>View Terms of Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
