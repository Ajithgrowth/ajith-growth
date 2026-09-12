import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2, BookOpen, MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumb } from '../components/Breadcrumb';
import { AuthorCard } from '../components/AuthorCard';
import { FAQSection } from '../components/FAQSection';
import { ArticleCard } from '../components/ArticleCard';
import { CTASection } from '../components/CTASection';
import { Link, useRouter } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { defaultAuthor } from '../data/authors';
import { getCategoryBySlug, getCategoryLabel } from '../data/insightCategories';
import { useArticle } from '../lib/cmsArticles';
import { slugify, createHeadingSlugger } from '../utils/slugify';
import { trackEvent } from '../utils/analytics';

interface ArticlePageProps {
  slug: string;
}

// Extract string text from React children tree for heading slugify
function getNodeText(node: any): string {
  if (!node) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (node.props && node.props.children) return getNodeText(node.props.children);
  return '';
}

export function ArticlePage({ slug }: ArticlePageProps) {
  const { navigate } = useRouter();
  const { article, loading, relatedArticles } = useArticle(slug);

  if (loading) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D1B2A] mb-4"></div>
        <p className="text-[#64748B] font-body text-sm">Loading insight...</p>
      </main>
    );
  }

  if (!article) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-24 text-center">
        <SEO
          title="Article Not Found | Ajith Growth"
          description="The requested growth insight article could not be located."
          noindex={true}
        />
        <h1 className="text-3xl font-heading font-bold text-[#0D1B2A] mb-4">
          Article Not Found
        </h1>
        <p className="text-[#64748B] font-body mb-8">
          The insight you are searching for may have been updated, relocated, or unpublished.
        </p>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0D1B2A] text-white font-body text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights Hub</span>
        </Link>
      </main>
    );
  }

  const categorySlug = article.category;
  const categoryLabel = getCategoryLabel(categorySlug);
  const categoryData = getCategoryBySlug(categorySlug);
  const canonicalUrl = `${siteConfig.canonicalDomain}/insights/${article.slug}`;
  const categoryUrl = `${siteConfig.canonicalDomain}/insights/${categorySlug}`;

  const authorName = article.author_name || article.author || defaultAuthor.name;
  const authorInitials = authorName
    .split(' ')
    .map((n: string) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || defaultAuthor.initials;

  // Check for verified WhatsApp URL from centralized siteConfig
  const verifiedWhatsAppUrl = siteConfig.whatsappUrl;

  // Heading slugger for duplicate-safe IDs matching extractTableOfContents exactly
  const headingSlugger = createHeadingSlugger();

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.canonicalDomain },
    { name: 'Insights', url: `${siteConfig.canonicalDomain}/insights` },
    { name: categoryLabel, url: categoryUrl },
    { name: article.title, url: canonicalUrl },
  ];

  return (
    <main id="main-content" className="w-full bg-[#F8FAFC]">
      <SEO
        title={article.seoTitle || `${article.title} | Ajith Growth`}
        description={article.metaDescription || article.excerpt}
        canonicalUrl={canonicalUrl}
        ogImage={article.featuredImage}
        ogType="article"
        publishedTime={article.publishedDate}
        modifiedTime={article.updatedDate || article.publishedDate}
        author={authorName}
        breadcrumbs={breadcrumbs}
        faqs={article.faqs && article.faqs.length > 0 ? article.faqs : undefined}
        keywords={article.keywords}
        articleSection={categoryLabel}
        imageAlt={article.featuredImageAlt}
      />

      {/* Breadcrumb Navigation: Home -> Insights -> Category -> Article Title */}
      <div className="bg-white border-b border-[#DCE5EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Insights', href: '/insights' },
              { label: categoryLabel, href: `/insights/${categorySlug}` },
              { label: article.title },
            ]}
          />
        </div>
      </div>

      {/* 1. Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 mb-8">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DCE5EE] bg-slate-900">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            width={1200}
            height={700}
            fetchPriority="high"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
        {article.featuredImageAlt && (
          <p className="text-[11px] font-supporting text-[#64748B] text-center mt-2 italic">
            {article.featuredImageAlt}
          </p>
        )}
      </div>

      {/* Article Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* 2. Category + Published Date + Reading Time */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-supporting">
          <Link
            href={`/insights/${categorySlug}`}
            className="px-3 py-1 rounded-md bg-[#0D1B2A] text-white font-semibold uppercase tracking-wider hover:bg-sky-900 transition-colors"
          >
            {categoryLabel}
          </Link>
          <span className="flex items-center gap-1.5 text-[#64748B]">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Published: {article.publishedDate}</span>
          </span>
          {article.updatedDate && article.updatedDate !== article.publishedDate && (
            <span className="text-[#64748B]">
              • Updated: {article.updatedDate}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[#64748B]">
            •
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{article.readingTime}</span>
          </span>
        </div>

        {/* 3. H1 Article Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#0D1B2A] tracking-tight leading-[1.18] mb-6">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed mb-6">
          {article.excerpt}
        </p>

        {/* Author Line */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#DCE5EE]">
          <div className="w-10 h-10 rounded-full bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-sm shadow-xs">
            {authorInitials}
          </div>
          <div>
            <span className="font-heading font-semibold text-sm text-[#0D1B2A] block">
              {authorName}
            </span>
            <span className="font-supporting text-xs text-[#64748B]">
              {defaultAuthor.role}
            </span>
          </div>
        </div>
      </header>

      {/* Article Content Layout: Main Body + Sidebar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Column */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-[#DCE5EE] shadow-xs">
            {/* 4. Quick Summary (Populated from summary[] or quick_summary) */}
            {((article.summary && article.summary.length > 0) || article.quick_summary) && (
              <div className="bg-[#F3F7FB] border border-[#DCE5EE] rounded-xl p-6 mb-8">
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-900 block mb-3">
                  Quick Summary
                </span>
                {article.summary && article.summary.length > 0 ? (
                  <ul className="space-y-2.5 text-xs sm:text-sm font-body text-[#0D1B2A]" role="list">
                    {article.summary.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-sky-800 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm font-body text-[#0D1B2A] leading-relaxed">
                    {article.quick_summary}
                  </p>
                )}
              </div>
            )}

            {/* 5. Mobile Collapsible Table of Contents */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <div className="lg:hidden bg-[#F8FAFC] border border-[#DCE5EE] rounded-xl p-4 mb-8">
                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between text-xs font-supporting font-bold uppercase tracking-wider text-[#0D1B2A]">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-800" />
                      <span>Table of Contents ({article.tableOfContents.length} Sections)</span>
                    </span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                  </summary>
                  <nav aria-label="Mobile table of contents" className="mt-3 pt-3 border-t border-slate-200">
                    <ul className="space-y-2 text-xs font-body text-[#64748B]">
                      {article.tableOfContents.map((item) => (
                        <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                          <a
                            href={`#${item.id}`}
                            className="hover:text-[#0D1B2A] transition-colors block py-1 border-l-2 border-slate-300 hover:border-[#0D1B2A] pl-2.5"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </details>
              </div>
            )}

            {/* 6. Main Article Content (ReactMarkdown + remark-gfm) */}
            <div className="font-body text-[#334155] text-base leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => {
                    const text = getNodeText(children);
                    const id = headingSlugger(text);
                    return (
                      <h2
                        id={id}
                        className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A] tracking-tight pt-8 pb-2 border-t border-slate-100 scroll-mt-28 sm:scroll-mt-32 first:border-t-0 first:pt-0"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const text = getNodeText(children);
                    const id = headingSlugger(text);
                    return (
                      <h3
                        id={id}
                        className="text-lg sm:text-xl font-heading font-semibold text-[#0D1B2A] tracking-tight pt-5 pb-1 scroll-mt-28 sm:scroll-mt-32"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ children, ...props }) => {
                    const text = getNodeText(children);
                    const id = headingSlugger(text);
                    return (
                      <h4
                        id={id}
                        className="text-base sm:text-lg font-heading font-semibold text-[#0D1B2A] tracking-tight pt-4 pb-1 scroll-mt-28 sm:scroll-mt-32"
                        {...props}
                      >
                        {children}
                      </h4>
                    );
                  },

                  p: ({ children, ...props }) => (
                    <p className="text-[#334155] leading-relaxed mb-6" {...props}>
                      {children}
                    </p>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className="space-y-2 list-disc list-outside ml-5 text-[#334155] mb-6" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className="space-y-2 list-decimal list-outside ml-5 text-[#334155] mb-6" {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li className="leading-relaxed pl-1" {...props}>
                      {children}
                    </li>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      className="p-4 my-6 rounded-lg bg-[#F8FAFC] border-l-4 border-[#0D1B2A] text-sm italic text-[#0D1B2A]"
                      {...props}
                    >
                      {children}
                    </blockquote>
                  ),
                  table: ({ children, ...props }) => (
                    <div className="overflow-x-auto my-6 border border-[#DCE5EE] rounded-xl">
                      <table className="min-w-full divide-y divide-[#DCE5EE] text-sm" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children, ...props }) => (
                    <th className="bg-slate-50 px-4 py-3 font-heading font-semibold text-left text-[#0D1B2A]" {...props}>
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td className="px-4 py-3 border-t border-[#DCE5EE] text-[#334155]" {...props}>
                      {children}
                    </td>
                  ),
                  img: ({ src, alt, ...props }) => (
                    <div className="my-6 rounded-xl overflow-hidden border border-[#DCE5EE]">
                      <img src={src} alt={alt || ''} className="w-full h-auto object-cover" {...props} />
                      {alt && <p className="text-[11px] font-supporting text-[#64748B] text-center mt-2 italic">{alt}</p>}
                    </div>
                  ),
                  a: ({ href, children, ...props }) => {
                    if (!href) return <span {...props}>{children}</span>;
                    const isInternal = href.startsWith('/') || href.startsWith('#');
                    if (isInternal) {
                      return (
                        <Link
                          href={href}
                          className="text-sky-800 font-medium underline decoration-sky-300 underline-offset-2 hover:text-[#0D1B2A] transition-colors"
                          {...props}
                        >
                          {children}
                        </Link>
                      );
                    }
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-800 font-medium underline decoration-sky-300 underline-offset-2 hover:text-[#0D1B2A] transition-colors"
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {article.body}
              </ReactMarkdown>
            </div>

            {/* Inline Consultation Banner */}
            <div className="mt-12 pt-8 border-t border-[#DCE5EE] bg-[#F8FAFC] -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-8 rounded-b-2xl">
              <span className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-800 block mb-1">
                EXECUTIVE CONSULTATION
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D1B2A] mb-2">
                Evaluate Your Growth System with Ajith
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] font-body mb-5 leading-relaxed">
                Ready to engineer these principles into your residential construction business? Book a confidential growth consultation to assess your specific metro territory and qualified homeowner pipeline.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact"
                  onClick={() => trackEvent('consultation_cta_click', { location: 'article_inline', article: article.slug })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D1B2A] hover:bg-[#172A3A] text-white font-body text-xs sm:text-sm font-medium transition-all shadow-xs"
                >
                  <span>Book a Growth Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                </Link>

                {verifiedWhatsAppUrl && (
                  <a
                    href={verifiedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'article_inline' })}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-600 bg-emerald-50 text-emerald-900 font-body text-xs font-medium hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Chat on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* Sticky Sidebar: Desktop Table of Contents + Compact Author Box */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24 hidden lg:block">
            {/* 5. Desktop Table of Contents */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-[#DCE5EE] shadow-xs">
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#0D1B2A] block mb-3">
                  Table of Contents
                </span>
                <nav aria-label="Table of contents">
                  <ul className="space-y-2 text-xs font-body text-[#64748B]" role="list">
                    {article.tableOfContents.map((item) => (
                      <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                        <a
                          href={`#${item.id}`}
                          className="hover:text-[#0D1B2A] transition-colors line-clamp-1 block py-1 border-l-2 border-transparent hover:border-[#0D1B2A] pl-2.5 -ml-2.5"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Author Box Component */}
            <AuthorCard compact />
          </aside>
        </div>

        {/* 7. FAQ Section (rendered only if article has faqs) */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-16">
            <FAQSection
              items={article.faqs}
              title={`Frequently Asked Questions on ${article.title}`}
              eyebrow="EXPERT CLARITY"
              description="Direct, technical answers addressing the most common questions surrounding this strategy."
            />
          </div>
        )}

        {/* 8. Full Author Section */}
        <section className="mt-16 bg-[#F8FAFC]">
          <AuthorCard />
        </section>

        {/* 9. Related Articles (Exactly 3, same category first, no drafts) */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#DCE5EE]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                  CONTINUE READING
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A]">
                  Related Strategic Analyses
                </h2>
              </div>
              <Link
                href={`/insights/${categorySlug}`}
                className="text-xs font-supporting font-semibold uppercase tracking-wider text-sky-800 hover:text-[#0D1B2A] transition-colors"
              >
                More in {categoryLabel} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 10. Book Consultation CTA */}
      <CTASection
        eyebrow="GROWTH ARCHITECTURE"
        title="Transform Your Search Inquiries Into High-Value Contracts"
        description="Schedule a private consultation with Ajith to build an engineered search client acquisition system designed for residential builders."
        primaryButtonText="Book a Growth Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore All Services"
        secondaryButtonHref="/services"
      />

      {/* Mobile Spacer to avoid sticky bar collision */}
      <div className="lg:hidden h-20" aria-hidden="true" />

      {/* Mobile Sticky Bottom Bar */}
      <aside aria-label="Quick Actions" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCE5EE] p-3 shadow-lg pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <Link
            href="/contact"
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0D1B2A] text-white text-xs font-supporting font-semibold uppercase tracking-wider text-center shadow-xs hover:bg-sky-900 transition-colors"
          >
            Book Free Consultation
          </Link>
          {verifiedWhatsAppUrl && (
            <a
              href={verifiedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'article_sticky_bar', article: article.slug })}
              className="py-2.5 px-3 rounded-xl border border-[#DCE5EE] text-[#0D1B2A] text-xs font-supporting font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-slate-50 transition-colors shrink-0"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          )}
        </div>
      </aside>
    </main>
  );
}
