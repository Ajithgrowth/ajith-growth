import { FileText, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumb } from '../components/Breadcrumb';
import { Link } from '../utils/router';
import { staticPagesSeo } from '../data/seoData';
import { siteConfig } from '../data/siteConfig';

export function TermsPage() {
  const seo = staticPagesSeo['/terms'];

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
              { label: 'Terms of Service' }
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-supporting font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>TERMS OF ENGAGEMENT & USAGE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-300 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            Guidelines and legal framework governing the use of Ajith Growth website resources and consulting services.
          </p>
          <div className="mt-4 text-xs font-supporting text-slate-400">
            Last Updated: June 1, 2026
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none font-body text-slate-700 space-y-10 leading-relaxed text-sm sm:text-base">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website, reading published insights, or submitting a consultation request to Ajith Growth, you agree to comply with and be bound by these Terms of Service. If you do not agree with any portion of these terms, please do not use this site or engage our advisory services.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                2. Scope of Services
              </h2>
              <p>
                Ajith Growth provides professional strategic consulting, search engine marketing advisory, and growth architecture exclusively for residential construction companies, custom home builders, turnkey contractors, and luxury remodelers. Services include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mt-2">
                <li>Google Ads campaign strategy, architecture, and management</li>
                <li>Local SEO and Google Business Profile optimization</li>
                <li>Conversion-focused landing page architecture and copy advisory</li>
                <li>Closed-loop CRM offline attribution and measurement setup</li>
                <li>Generative Engine Optimization (GEO) and AI search readiness</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                3. Professional Advisory & Realistic Outcomes
              </h2>
              <p>
                Ajith Growth operates with engineering rigor and absolute data transparency. However, digital search systems—including Google Ads bidding auctions, organic algorithm ranking updates, local map pack calculations, and third-party AI summaries—are operated independently by Google and external platforms.
              </p>
              <p className="mt-2">
                While our systems are engineered to target qualified high-intent homeowners and reduce advertising waste, we do not make false guarantees, promises of specific signed contract revenues, or guaranteed ranking placements. Commercial success also relies on client-side factors, including estimating speed, sales consultation execution, local construction market conditions, and competitive pricing.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                4. Intellectual Property & Content
              </h2>
              <p>
                All original insights, frameworks, diagrams, copywriting, and technical articles published on this website are the intellectual property of Ajith Growth. You may reference excerpts for educational or non-commercial purposes provided clear attribution and a direct link to the original article on ajithgrowth.com are provided. Systematic scraping or republication of whole articles without written authorization is prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                5. Client Responsibilities
              </h2>
              <p>
                Clients engaging in consulting arrangements agree to provide timely communication, accurate project portfolio materials, verifiable business licensing information, and necessary administrative access to designated Google and CRM properties to facilitate campaign execution.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, Ajith Growth shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to access this website, or from third-party platform changes (including Google Ads policy updates or algorithm adjustments) beyond our direct control.
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCE5EE]">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] mb-3">
                7. Questions & Communications
              </h2>
              <p className="mb-4">
                If you have questions regarding these Terms of Service, please reach out directly:
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
              href="/privacy"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-sky-800 hover:text-[#0D1B2A] transition-colors"
            >
              <span>View Privacy Policy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
