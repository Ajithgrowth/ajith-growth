import { useState, useMemo, useEffect } from 'react';
import { Search, Layers, BookOpen, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ArticleCard } from '../components/ArticleCard';
import { AuthorCard } from '../components/AuthorCard';
import { CTASection } from '../components/CTASection';
import { Link, useRouter } from '../utils/router';
import { staticPagesSeo } from '../data/seoData';
import { siteConfig } from '../data/siteConfig';
import { INSIGHT_CATEGORIES, getCategoryLabel, isValidCategorySlug, normalizeCategorySlug } from '../data/insightCategories';
import { useArticles } from '../lib/cmsArticles';
import { trackEvent } from '../utils/analytics';

const ARTICLES_PER_PAGE = 12;

export function InsightsPage() {
  const seo = staticPagesSeo['/insights'];
  const { search, navigate } = useRouter();

  // Read initial category/search from query parameters if present
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const params = new URLSearchParams(search);
    const cat = params.get('category');
    if (cat && isValidCategorySlug(cat)) {
      return normalizeCategorySlug(cat);
    }
    return 'all';
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(search);
    return params.get('search') || params.get('q') || '';
  });

  // Sync state if URL query params change
  useEffect(() => {
    const params = new URLSearchParams(search);
    const cat = params.get('category');
    if (cat && isValidCategorySlug(cat)) {
      setSelectedCategory(normalizeCategorySlug(cat));
    } else if (!cat && selectedCategory !== 'all' && !params.get('search') && !params.get('q')) {
      // Keep state unless explicitly cleared
    }
    const q = params.get('search') || params.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [search]);

  // Read current page from URL query
  const currentPage = useMemo(() => {
    const params = new URLSearchParams(search);
    const p = parseInt(params.get('page') || '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  }, [search]);

  // Reset page when category or search changes
  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    trackEvent('category_filter_click', { category: catSlug });
    if (currentPage !== 1) {
      navigate('/insights');
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (currentPage !== 1) {
      navigate('/insights');
    }
  };

  const { articles: allArticles } = useArticles();

  // Featured article: newest marked featured: true; fallback to newest published article
  const featuredArticle = useMemo(() => {
    const featured = allArticles.find((a) => a.featured || a.is_featured);
    return featured || allArticles[0];
  }, [allArticles]);

  // Filtered articles based on search & category
  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allArticles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'all' || art.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const titleMatch = art.title.toLowerCase().includes(query);
      const excerptMatch = art.excerpt.toLowerCase().includes(query);
      const categoryMatch = getCategoryLabel(art.category).toLowerCase().includes(query);
      const keywordsMatch =
        Array.isArray(art.keywords) &&
        art.keywords.some((k) => k.toLowerCase().includes(query));

      return titleMatch || excerptMatch || categoryMatch || keywordsMatch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  // For the latest list when no search/filter is active, avoid repeating featured article
  const listArticles = useMemo(() => {
    if (selectedCategory === 'all' && searchQuery.trim() === '' && featuredArticle) {
      return filteredArticles.filter((a) => a.slug !== featuredArticle.slug);
    }
    return filteredArticles;
  }, [filteredArticles, selectedCategory, searchQuery, featuredArticle]);

  const totalPages = Math.ceil(listArticles.length / ARTICLES_PER_PAGE) || 1;

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return listArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [listArticles, currentPage]);

  const handlePageChange = (newPage: number) => {
    const url = newPage <= 1 ? '/insights' : `/insights?page=${newPage}`;
    navigate(url);
  };

  const isFilteredOrSearched = selectedCategory !== 'all' || searchQuery.trim() !== '';
  const canonicalUrl = currentPage > 1 ? `${siteConfig.canonicalDomain}/insights?page=${currentPage}` : (seo.canonicalUrl || `${siteConfig.canonicalDomain}/insights`);
  const pageTitle = currentPage > 1 ? `${seo.title} | Page ${currentPage}` : seo.title;

  return (
    <main id="main-content" className="w-full bg-[#F8FAFC]">
      <SEO
        title={pageTitle}
        description={seo.description}
        canonicalUrl={canonicalUrl}
        ogImage={seo.ogImage}
        breadcrumbs={seo.breadcrumbs}
        noindex={isFilteredOrSearched}
      />

      {/* 1. Hero Section */}
      <section className="bg-[#0D1B2A] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-supporting uppercase tracking-wider text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-sky-400">Insights</span>
            </nav>

            <span className="inline-block text-xs font-semibold tracking-wider text-sky-400 font-supporting uppercase mb-3">
              AJITH GROWTH INSIGHTS & RESEARCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
              Ideas, Strategies & Insights for Construction Growth
            </h1>

            {/* 2. 100–150 Word Introduction */}
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-3xl">
              Welcome to the Ajith Growth Research & Insights archive. We engineer growth frameworks designed specifically for residential construction companies, custom home builders, and turnkey residential contractors. Rather than relying on speculative marketing theories or generic consumer playbooks, our published analyses focus on the technical realities of client acquisition: negative keyword architectures that protect marketing capital, hyper-local SEO hubs that secure prime service area territories, structured entity graphs that enhance Google Maps and AI Overviews, and closed-loop CRM tracking that connects initial search impressions directly to qualified homeowner inquiries and measurable business results. Each strategy is developed to help residential construction leaders eliminate advertising waste, cultivate high-intent homeowner relationships, and build sustainable search visibility across competitive metropolitan markets.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Search & 4. Category Filters */}
      <section className="bg-white border-b border-[#DCE5EE] sticky top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-supporting font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#0D1B2A] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0D1B2A] hover:bg-slate-200 border border-[#DCE5EE]'
                }`}
              >
                All Categories
              </button>
              {INSIGHT_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-supporting font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-[#0D1B2A] text-white'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0D1B2A] hover:bg-slate-200 border border-[#DCE5EE]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative min-w-[240px] md:w-72">
              <input
                type="text"
                placeholder="Search by title, excerpt, keyword..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs font-body rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-[#0D1B2A] placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                aria-label="Search articles by title, category, keywords, or excerpt"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Blog (shown when no filter or search is active) */}
      {selectedCategory === 'all' && searchQuery.trim() === '' && currentPage === 1 && featuredArticle && (
        <section className="py-14 bg-[#F8FAFC] border-b border-[#DCE5EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-2">
              FEATURED STRATEGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#0D1B2A] tracking-tight mb-8">
              Featured Insight
            </h2>
            <div className="max-w-5xl">
              <ArticleCard article={featuredArticle} featured />
            </div>
          </div>
        </section>
      )}

      {/* 6. Latest Articles Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                {selectedCategory === 'all' ? 'STRATEGIC ARCHIVE' : `TOPIC CLUSTER: ${getCategoryLabel(selectedCategory).toUpperCase()}`}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#0D1B2A] tracking-tight">
                {selectedCategory === 'all' ? 'Latest Insights' : `${getCategoryLabel(selectedCategory)}`}
              </h2>
            </div>
            {selectedCategory !== 'all' && (
              <Link
                href={`/insights/${selectedCategory}`}
                className="inline-flex items-center gap-1.5 text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 hover:text-[#0D1B2A] transition-colors"
              >
                <span>View Dedicated {getCategoryLabel(selectedCategory)} Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>


          {paginatedArticles.length === 0 ? (
            <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#DCE5EE]">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-base text-[#64748B] font-body mb-4">
                No insights found matching "{searchQuery}" in {getCategoryLabel(selectedCategory)}.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  navigate('/insights');
                }}
                className="text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 hover:text-[#0D1B2A] underline"
              >
                Reset all search filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {/* 7. Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t border-[#DCE5EE] flex items-center justify-between">
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
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
                    onClick={() => handlePageChange(num)}
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
                onClick={() => handlePageChange(currentPage + 1)}
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

      {/* 8. Final CTA */}
      <CTASection
        eyebrow="TAILORED GROWTH CONSULTATION"
        title="Apply These Search Systems to Your Building Business"
        description="Book a strategic consultation with Ajith to evaluate how these Google Ads, Local SEO, and tracking methodologies translate to your specific residential construction territory."
        primaryButtonText="Book a Growth Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Our Services"
        secondaryButtonHref="/services"
      />
    </main>
  );
}

