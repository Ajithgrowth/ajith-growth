import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Calendar, Tag, UserCheck, HelpCircle, CheckCircle } from 'lucide-react';
import type { CMSArticle } from '../../types/cms';
import { CMS_CATEGORIES } from '../../types/cms';

interface ArticlePreviewModalProps {
  article: Partial<CMSArticle>;
  onClose: () => void;
}

export const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({
  article,
  onClose,
}) => {
  const categoryLabel =
    CMS_CATEGORIES.find((c) => c.value === article.category)?.label || article.category;

  const quickSummaryItems =
    typeof article.quick_summary === 'string' && article.quick_summary.trim()
      ? article.quick_summary
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const displayDate = article.published_at
    ? article.published_at.split('T')[0]
    : article.status === 'published'
    ? new Date().toISOString().split('T')[0]
    : 'Draft (Not published)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0D1B2A]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8"
    >
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#DCE5EE] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-[#0D1B2A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-supporting font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {article.status === 'published' ? 'Preview (Published)' : 'Preview (Private Draft)'}
            </span>
            <span className="text-xs text-slate-400 font-body hidden sm:inline">
              Not accessible publicly
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4 border-b border-[#DCE5EE] pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-supporting">
              <span className="inline-flex items-center gap-1.5 font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                <Tag className="w-3.5 h-3.5" />
                {categoryLabel || 'Uncategorized'}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {displayDate}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                {article.author_name || 'Ajith'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[#0D1B2A] tracking-tight leading-tight">
              {article.title || 'Untitled Article'}
            </h1>

            {article.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <div className="text-xs text-slate-400 font-mono">
              Slug: /insights/{article.slug || 'url-slug'}
            </div>
          </div>

          {/* Featured Image */}
          {article.featured_image && (
            <div className="rounded-xl overflow-hidden border border-[#DCE5EE] bg-slate-100 max-h-[420px]">
              <img
                src={article.featured_image}
                alt={article.featured_image_alt || article.title || 'Featured Image'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Quick Summary Box */}
          {quickSummaryItems.length > 0 && (
            <div className="p-6 rounded-xl bg-sky-50/80 border border-sky-100 space-y-3">
              <h2 className="text-xs font-supporting font-bold uppercase tracking-wider text-sky-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sky-800" />
                Quick Summary & Key Takeaways
              </h2>
              <ul className="space-y-2">
                {quickSummaryItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#0D1B2A] font-body leading-relaxed">
                    <span className="text-sky-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Content */}
          <div className="article-preview-content prose prose-slate max-w-none text-slate-800 font-body leading-relaxed">
            {article.content ? (
              <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
            ) : (
              <p className="text-slate-400 italic">No content written yet.</p>
            )}
          </div>

          {/* FAQs Preview */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="pt-8 border-t border-[#DCE5EE] space-y-4">
              <h2 className="text-xl font-heading font-bold text-[#0D1B2A] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-800" />
                Frequently Asked Questions ({article.faqs.length})
              </h2>
              <div className="space-y-3">
                {article.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC]">
                    <h3 className="font-heading font-semibold text-sm text-[#0D1B2A] mb-1">
                      {faq.question || 'Empty Question'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                      {faq.answer || 'Empty Answer'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Metadata Box */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE5EE] space-y-2">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-slate-500">
              SEO Preview
            </span>
            <div className="text-sm font-semibold text-[#0D1B2A]">
              {article.seo_title || article.title || 'Page Title'}
            </div>
            <div className="text-xs text-emerald-700 font-mono">
              https://ajithgrowth.com/insights/{article.slug || 'slug'}
            </div>
            <p className="text-xs text-[#64748B]">
              {article.meta_description || article.excerpt || 'Meta description preview...'}
            </p>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-[#F8FAFC] border-t border-[#DCE5EE] px-6 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0D1B2A] hover:bg-slate-800 text-white font-heading font-semibold text-xs transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
