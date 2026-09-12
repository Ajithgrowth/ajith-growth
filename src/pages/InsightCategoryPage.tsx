import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumb } from '../components/Breadcrumb';
import { ArticleCard } from '../components/ArticleCard';
import { CTASection } from '../components/CTASection';
import { AuthorCard } from '../components/AuthorCard';
import { Link, useRouter } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { getCategoryBySlug, InsightCategorySlug } from '../data/insightCategories';
import { useArticles, getArticlesByCategory } from '../lib/cmsArticles';

interface InsightCategoryPageProps {
  categorySlug: InsightCategorySlug | string;
}

const ARTICLES_PER_PAGE = 12;

export function InsightCategoryPage({ categorySlug }: InsightCategoryPageProps) {
  const { search, navigate } = useRouter();
  const category = getCategoryBySlug(categorySlug);
  const { articles } = useArticles();

  // Read page from search query (?page=2)
  const currentPage = useMemo(() => {
    const params = new URLSearchParams(search);
    const p = parseInt(params.get('page') || '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  }, [search]);

  const categoryArticles = useMemo(() => {
    return getArticlesByCategory(articles, categorySlug);
  }, [articles, categorySlug]);

  const totalPages = Math.ceil(categoryArticles.length / ARTICLES_PER_PAGE) || 1;

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return categoryArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [categoryArticles, currentPage]);

  if (!category) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-24 text-center">
        <SEO
          title="Category Not Found | Ajith Growth"
          description="The requested insights category could not be located."
          noindex={true}
        />
        <h1 className="text-3xl font-heading font-bold text-[#0D1B2A] mb-4">
          Category Not Found
        </h1>
        <p className="text-[#64748B] font-body mb-8">
          The topic cluster you are searching for does not exist or has been relocated.
        </p>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0D1B2A] text-white font-body text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Insights</span>
        </Link>
      </main>
    );
  }

  const baseCategoryUrl = `${siteConfig.canonicalDomain}/insights/${category.slug}`;
  const canonicalUrl = currentPage > 1 ? `${baseCategoryUrl}?page=${currentPage}` : baseCategoryUrl;
  const pageTitle = currentPage > 1 ? `${category.seoTitle || `${category.label} | Ajith Growth`} | Page ${currentPage}` : (category.seoTitle || `${category.label} | Ajith Growth`);

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.canonicalDomain },
    { name: 'Insights', url: `${siteConfig.canonicalDomain}/insights` },
    { name: category.label, url: baseCategoryUrl },
  ];

  return (
    <main id="main-content" className="w-full bg-[#F8FAFC]">
      <SEO
        title={pageTitle}
        description={category.metaDescription || category.description}
        canonicalUrl={canonicalUrl}
        breadcrumbs={breadcrumbs}
        noindex={categoryArticles.length === 0}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Insights', href: '/insights' },
              { label: category.label },
            ]}
          />
        </div>
      </div>

      {/* Category Hero Section */}
      <section className="bg-[#0D1B2A] text-white pt-8 pb-14 sm:pt-12 sm:pb-18 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-950 text-sky-300 text-xs font-supporting font-semibold uppercase tracking-wider border border-sky-800/40 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>CATEGORY CLUSTER</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
              {category.label}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-3xl">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                TOPICAL ARCHIVE
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] tracking-tight">
                {categoryArticles.length} {categoryArticles.length === 1 ? 'Strategic Article' : 'Strategic Articles'}
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 hover:text-[#0D1B2A] transition-colors self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View All Categories</span>
            </Link>
          </div>

          {categoryArticles.length === 0 ? (
            <div className="text-center py-20 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#DCE5EE]">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-heading font-semibold text-[#0D1B2A] mb-2">
                New Research Under Preparation
              </h3>
              <p className="text-sm text-[#64748B] font-body max-w-md mx-auto mb-6">
                Strategic research and editorial analyses for {category.label} are currently being finalized.
              </p>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D1B2A] text-white text-xs font-supporting font-semibold uppercase tracking-wider hover:bg-[#172A3A] transition-all"
              >
                <span>Explore Other Insights</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t border-[#DCE5EE] flex items-center justify-between">
              <button
                disabled={currentPage <= 1}
                onClick={() => {
                  const targetPage = currentPage - 1;
                  const url = targetPage <= 1 ? `/insights/${category.slug}` : `/insights/${category.slug}?page=${targetPage}`;
                  navigate(url);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-supporting font-semibold uppercase tracking-wider transition-all border ${
                  currentPage <= 1
                    ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                    : 'border-[#DCE5EE] bg-white text-[#0D1B2A] hover:bg-slate-100'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      const url = num === 1 ? `/insights/${category.slug}` : `/insights/${category.slug}?page=${num}`;
                      navigate(url);
                    }}
                    className={`w-9 h-9 rounded-lg text-xs font-supporting font-semibold transition-all ${
                      currentPage === num
                        ? 'bg-[#0D1B2A] text-white'
                        : 'bg-white border border-[#DCE5EE] text-[#0D1B2A] hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => {
                  const targetPage = currentPage + 1;
                  navigate(`/insights/${category.slug}?page=${targetPage}`);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-supporting font-semibold uppercase tracking-wider transition-all border ${
                  currentPage >= totalPages
                    ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                    : 'border-[#DCE5EE] bg-white text-[#0D1B2A] hover:bg-slate-100'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Author Section */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthorCard />
        </div>
      </section>

      {/* Final Call to Action */}
      <CTASection
        eyebrow="STRATEGIC CONSULTATION"
        title={`Accelerate Your Growth in ${category.label}`}
        description={`Schedule a high-level consultation with Ajith to build a predictable, high-value client acquisition system customized for your residential construction territory.`}
        primaryButtonText="Book a Growth Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore All Services"
        secondaryButtonHref="/services"
      />
    </main>
  );
}
