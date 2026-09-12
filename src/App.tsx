import { useEffect } from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightCategoryPage } from './pages/InsightCategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { isCategorySlug } from './data/insightCategories';
import { initAnalytics } from './utils/analytics';

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
      return <AdminPage />;
    }

    return <NotFoundPage />;
  };

  const path = currentPath.split('?')[0].split('#')[0];
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
  const isAdmin = normalized === '/admin' || normalized.startsWith('/admin/');

  if (isAdmin) {
    return <AdminPage />;
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
        {renderRoute()}
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
