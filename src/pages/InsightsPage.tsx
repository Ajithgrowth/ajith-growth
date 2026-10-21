import { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import type { Article } from '../types';
import { SEO } from '../components/SEO';
import { ArticleCard } from '../components/ArticleCard';
import { Link } from '../utils/router';
import { staticPagesSeo } from '../data/seoData';
import { INSIGHT_CATEGORIES, getCategoryLabel } from '../data/insightCategories';
import { fetchFeaturedArticles, fetchPublishedArticles } from '../lib/publicArticles';
import { trackEvent } from '../utils/analytics';

const PAGE_SIZE = 12;

export function InsightsPage() {
  const seo = staticPagesSeo['/insights'];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    Promise.all([
      fetchPublishedArticles({
        category: selectedCategory,
        search: debouncedSearch,
        limit: PAGE_SIZE,
      }),
      fetchFeaturedArticles(selectedCategory, debouncedSearch),
    ]).then(([listing, featuredArticles]) => {
      if (cancelled) return;
      setArticles(listing.articles);
      setHasMore(listing.hasMore);
      setFeatured(featuredArticles);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [selectedCategory, debouncedSearch]);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    trackEvent('category_filter_click', { category, location: 'insights_topics' });
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    const next = await fetchPublishedArticles({
      category: selectedCategory,
      search: debouncedSearch,
      offset: articles.length,
      limit: PAGE_SIZE,
    });
    setArticles((current) => [...current, ...next.articles]);
    setHasMore(next.hasMore);
    setIsLoadingMore(false);
  };

  return <main id="main-content" className="bg-[#F8FAFC]">
    <SEO title={seo.title} description={seo.description} canonicalUrl={seo.canonicalUrl} ogImage={seo.ogImage} breadcrumbs={seo.breadcrumbs} />
    <section className="bg-[#0D1B2A] text-white py-20 sm:py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl"><nav className="text-xs text-slate-400 mb-6"><Link href="/">Home</Link> / Insights</nav><span className="text-xs font-semibold tracking-wider text-sky-400">AJITH GROWTH INSIGHTS</span><h1 className="mt-3 text-4xl sm:text-5xl font-heading font-bold">Ideas, Strategies & Insights for Construction Growth</h1><p className="mt-6 text-lg text-slate-300 leading-relaxed">Practical insights on Google Ads, SEO, local search, AI Search and digital growth—created specifically for residential construction companies looking to attract better-qualified homeowner opportunities.</p><p className="mt-3 text-base text-slate-300 leading-relaxed">Selected insights also cover Google marketing and business growth for premium bridal and designer boutiques.</p><p className="mt-5 text-sm font-semibold text-sky-400">No generic marketing advice. Just practical ideas, observations and strategies designed around the realities of residential construction growth.</p></div></div></section>

    <section className="py-16 sm:py-20 bg-white border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-heading font-semibold text-[#0D1B2A]">Featured Insights</h2><p className="mt-3 max-w-3xl text-[#64748B]">Explore selected ideas and practical strategies to help residential construction companies attract better-qualified enquiries, improve search visibility and build a stronger growth system.</p>{isLoading ? <div className="mt-10 flex items-center gap-2 text-sm text-[#64748B]" role="status"><Loader2 className="h-4 w-4 animate-spin" /> Loading featured insights…</div> : featured.length > 0 ? <div className="mt-10 grid md:grid-cols-3 gap-8">{featured.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <p className="mt-10 text-sm text-[#64748B]">No featured articles match this selection.</p>}<a href="#latest-insights" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-800">Explore All Insights <ArrowRight className="w-4 h-4" /></a></div></section>

    <section className="py-16 sm:py-20 bg-[#F3F7FB] border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-heading font-semibold text-[#0D1B2A]">Explore by Topic</h2><p className="mt-3 max-w-3xl text-[#64748B]">Explore practical insights by topic to find ideas, strategies and guidance relevant to your business and growth goals.</p><div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"><button type="button" onClick={() => selectCategory('all')} aria-pressed={selectedCategory === 'all'} className={`text-left rounded-2xl border p-6 transition-colors ${selectedCategory === 'all' ? 'bg-[#0D1B2A] border-[#0D1B2A] text-white' : 'bg-white border-[#DCE5EE] text-[#0D1B2A] hover:border-sky-600'}`}><h3 className="font-heading font-semibold">All Articles</h3><p className={`mt-2 text-sm leading-relaxed ${selectedCategory === 'all' ? 'text-slate-300' : 'text-[#64748B]'}`}>Reset the topic filter and browse every published insight.</p></button>{INSIGHT_CATEGORIES.map((category) => <button type="button" key={category.slug} onClick={() => selectCategory(category.slug)} aria-pressed={selectedCategory === category.slug} className={`text-left rounded-2xl border p-6 transition-colors ${selectedCategory === category.slug ? 'bg-[#0D1B2A] border-[#0D1B2A] text-white' : 'bg-white border-[#DCE5EE] text-[#0D1B2A] hover:border-sky-600'}`}><h3 className="font-heading font-semibold">{category.label}</h3><p className={`mt-2 text-sm leading-relaxed ${selectedCategory === category.slug ? 'text-slate-300' : 'text-[#64748B]'}`}>{category.description}</p></button>)}</div><div className="mt-8 rounded-2xl border border-[#DCE5EE] bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-6"><div><h3 className="font-heading font-semibold text-[#0D1B2A]">Boutique Growth</h3><p className="mt-2 text-sm text-[#64748B]">Explore the dedicated Boutique Growth page and Ajith's hands-on business experience through Shrusara Fashion Boutique.</p></div><Link href="/industries/boutiques" className="mt-5 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-sky-800">Explore Boutique Growth <ArrowRight className="w-4 h-4" /></Link></div></div></section>

    <section id="latest-insights" className="py-16 sm:py-20 bg-white border-b border-[#DCE5EE] scroll-mt-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5"><div><h2 className="text-3xl font-heading font-semibold text-[#0D1B2A]">{selectedCategory === 'all' ? 'Latest Insights' : getCategoryLabel(selectedCategory)}</h2><p className="mt-3 max-w-3xl text-[#64748B]">Discover the latest ideas, practical guidance and growth strategies from Ajith Growth, covering search marketing, residential construction growth and selected boutique-growth topics.</p></div><label className="relative block w-full lg:w-80"><span className="sr-only">Search insights</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by title or summary" className="w-full rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#0D1B2A] outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-700/15" /></label></div>{selectedCategory !== 'all' && <button type="button" onClick={() => selectCategory('all')} className="mt-5 text-sm font-semibold text-sky-800">View all topics</button>}{isLoading ? <div className="mt-10 flex items-center gap-2 text-sm text-[#64748B]" role="status"><Loader2 className="h-4 w-4 animate-spin" /> Loading published articles…</div> : articles.length > 0 ? <><div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>{hasMore && <button type="button" disabled={isLoadingMore} onClick={loadMore} className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#0D1B2A] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{isLoadingMore && <Loader2 className="h-4 w-4 animate-spin" />}Load More</button>}</> : <div className="mt-10 rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-8 text-center"><h3 className="font-heading font-semibold text-[#0D1B2A]">No matching insights</h3><p className="mt-2 text-sm text-[#64748B]">Try another search or reset the topic filter.</p></div>}</div></section>

    <section className="py-16 sm:py-20 bg-[#F8FAFC]"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div className="rounded-2xl border border-[#DCE5EE] bg-white p-8 sm:p-10"><span className="text-xs font-semibold tracking-wider text-sky-800">ABOUT THE AUTHOR</span><div className="mt-4 flex flex-col sm:flex-row gap-6"><div className="h-20 w-20 shrink-0 rounded-2xl bg-[#0D1B2A] text-white flex items-center justify-center text-xl font-bold">AG</div><div><h2 className="text-2xl font-heading font-semibold text-[#0D1B2A]">Written by Ajith</h2><p className="mt-3 text-[#64748B] leading-relaxed">Ajith is a technology and business professional focused on helping residential construction companies build measurable growth systems through Google.</p><p className="mt-3 text-[#64748B] leading-relaxed">His insights cover Google Ads, SEO, local search, conversion strategy, GEO, AI Search and the evolving digital landscape for residential construction businesses.</p><p className="mt-3 text-[#64748B] leading-relaxed">He also shares selected insights on Google marketing and business growth for premium bridal and designer boutiques.</p><Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-800">Learn More About Ajith <ArrowRight className="w-4 h-4" /></Link></div></div></div></div></section>
  </main>;
}
