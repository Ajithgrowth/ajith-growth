import { ArrowLeft, Home, BookOpen, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';

export function NotFoundPage() {
  return (
    <main id="main-content" className="w-full min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#F8FAFC]">
      <SEO
        title="404 - Page Not Found | Ajith Growth"
        description="The requested page could not be found. Return to Ajith Growth homepage."
        noindex={true}
      />
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-[#DCE5EE] shadow-sm text-center">
        <span className="text-4xl sm:text-5xl font-heading font-bold text-[#0D1B2A] block mb-2">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-heading font-semibold text-[#0D1B2A] mb-3">
          Page Not Found
        </h1>
        <p className="text-sm font-body text-[#5F6B7A] leading-relaxed mb-8">
          The page or article you are looking for has been moved or does not exist.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-lg bg-[#0D1B2A] hover:bg-[#172A3A] text-white text-xs sm:text-sm font-body font-medium flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/insights"
            className="w-full py-2.5 px-4 rounded-lg border border-[#DCE5EE] bg-white hover:bg-slate-50 text-[#0D1B2A] text-xs font-body font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Construction Growth Insights</span>
          </Link>

          <Link
            href="/contact"
            className="w-full py-2.5 px-4 rounded-lg border border-[#DCE5EE] bg-white hover:bg-slate-50 text-[#0D1B2A] text-xs font-body font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Book a Consultation</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
