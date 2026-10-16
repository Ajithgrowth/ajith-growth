import { lazy, Suspense, useEffect } from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { isCategorySlug } from './data/insightCategories';
import { initAnalytics } from './utils/analytics';

const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then((module) => ({ default: module.InsightsPage })));
const InsightCategoryPage = lazy(() => import('./pages/InsightCategoryPage').then((module) => ({ default: module.InsightCategoryPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((module) => ({ default: module.ArticlePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((module) => ({ default: module.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));
const ConstructionIndustryPage = lazy(() => import('./pages/ConstructionIndustryPage').then((module) => ({ default: module.ConstructionIndustryPage })));
const BoutiquesIndustryPage = lazy(() => import('./pages/BoutiquesIndustryPage').then((module) => ({ default: module.BoutiquesIndustryPage })));

function AdminRedirect() {
  useEffect(() => { window.location.replace('/admin/index.html'); }, []);
  return <main className="min-h-screen flex items-center justify-center text-sm text-slate-600">Opening the content manager…</main>;
}

function PageLoader() {
  return <main className="min-h-[60vh] flex items-center justify-center text-sm text-slate-600" role="status">Loading page…</main>;
}

function AppContent() {
  const { currentPath } = useRouter();

  // Initialize analytics safely if configured
  useEffect(() => {
    initAnalytics();
  }, []);

  // Scroll handling on navigation
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash;
      const el = document.querySelector(hashId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  // Route matching
  const renderRoute = () => {
    // Normalize path by stripping query params and trailing slashes
    const path = currentPath.split('?')[0].split('#')[0];
    const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');

    if (normalized === '' || normalized === '/') {
      return <HomePage />;
    }
    if (normalized === '/about') {
      return <AboutPage />;
    }
    if (normalized === '/services') {
      return <ServicesPage />;
    }
    if (normalized === '/industries/construction') {
      return <ConstructionIndustryPage />;
    }
    if (normalized === '/industries/boutiques') {
      return <BoutiquesIndustryPage />;
    }
    if (normalized === '/insights') {
      return <InsightsPage />;
    }
    if (normalized.startsWith('/insights/')) {
      const slug = normalized.replace('/insights/', '');
      if (isCategorySlug(slug)) {
        return <InsightCategoryPage categorySlug={slug} />;
      }
      return <ArticlePage slug={slug} />;
    }
    if (normalized === '/contact') {
      return <ContactPage />;
    }
    if (normalized === '/privacy') {
      return <PrivacyPage />;
    }
    if (normalized === '/terms') {
      return <TermsPage />;
    }
    if (normalized === '/admin' || normalized.startsWith('/admin/')) {
      return <AdminRedirect />;
    }

    return <NotFoundPage />;
  };

  const path = currentPath.split('?')[0].split('#')[0];
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
  const isAdmin = normalized === '/admin' || normalized.startsWith('/admin/');

  if (isAdmin) {
    return <AdminRedirect />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0D1B2A] selection:bg-sky-100 selection:text-sky-900">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0D1B2A] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none text-xs font-semibold"
      >
        Skip to main content
      </a>

      <Header />
      <div className="flex-1 w-full">
        <Suspense fallback={<PageLoader />}>
          {renderRoute()}
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
