import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Edit3,
  Trash2,
  Plus,
  Search,
  ExternalLink,
  Tag,
  AlertCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';
import type { CMSArticle, CMSArticleStatus } from '../../types/cms';
import { CMS_CATEGORIES } from '../../types/cms';

interface ArticleListDashboardProps {
  articles: CMSArticle[];
  isLoading: boolean;
  filter: 'all' | 'draft' | 'published';
  onFilterChange: (filter: 'all' | 'draft' | 'published') => void;
  onNewArticle: () => void;
  onEditArticle: (article: CMSArticle) => void;
  onDeleteArticle: (id?: string) => void;
  onRefresh: () => void;
  onPreviewArticle: (article: CMSArticle) => void;
}

export const ArticleListDashboard: React.FC<ArticleListDashboardProps> = ({
  articles,
  isLoading,
  filter,
  onFilterChange,
  onNewArticle,
  onEditArticle,
  onDeleteArticle,
  onRefresh,
  onPreviewArticle,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  // Calculate dashboard counts
  const totalCount = articles.length;
  const draftsCount = articles.filter(
    (a) => (a.status as string) === 'draft' || (a as any).draft === true
  ).length;
  const publishedCount = articles.filter(
    (a) =>
      (a.status as string) === 'published' ||
      ((a as any).draft === false && (a as any).status !== 'draft')
  ).length;

  // Filter and search
  const filteredArticles = articles.filter((article) => {
    const isDraft =
      (article.status as string) === 'draft' || (article as any).draft === true;
    const isPublished =
      (article.status as string) === 'published' ||
      ((article as any).draft === false && (article as any).status !== 'draft');

    if (filter === 'draft' && !isDraft) return false;
    if (filter === 'published' && !isPublished) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = (article.title || '').toLowerCase().includes(q);
      const matchSlug = (article.slug || '').toLowerCase().includes(q);
      const matchCategory = (article.category || '').toLowerCase().includes(q);
      return matchTitle || matchSlug || matchCategory;
    }

    return true;
  });

  const getCategoryLabel = (catVal?: string) => {
    if (!catVal) return 'Uncategorized';
    const found = CMS_CATEGORIES.find((c) => c.value === catVal);
    return found ? found.label : catVal;
  };

  return (
    <div className="space-y-8">
      {/* 1. Dashboard Metrics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Articles */}
        <div
          onClick={() => onFilterChange('all')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-white border-sky-800 ring-2 ring-sky-800/10 shadow-xs'
              : 'bg-white border-[#DCE5EE] hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-slate-500">
              Total Articles
            </span>
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-heading font-bold text-[#0D1B2A]">
            {totalCount}
          </div>
          <p className="text-xs text-[#64748B] font-body mt-1">
            All stored articles in Supabase
          </p>
        </div>

        {/* Published Articles */}
        <div
          onClick={() => onFilterChange('published')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer ${
            filter === 'published'
              ? 'bg-white border-emerald-700 ring-2 ring-emerald-700/10 shadow-xs'
              : 'bg-white border-[#DCE5EE] hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-slate-500">
              Published
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-heading font-bold text-[#0D1B2A]">
            {publishedCount}
          </div>
          <p className="text-xs text-[#64748B] font-body mt-1">
            Active and publicly marked content
          </p>
        </div>

        {/* Drafts */}
        <div
          onClick={() => onFilterChange('draft')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer ${
            filter === 'draft'
              ? 'bg-white border-amber-600 ring-2 ring-amber-600/10 shadow-xs'
              : 'bg-white border-[#DCE5EE] hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-supporting font-bold uppercase tracking-wider text-slate-500">
              Drafts
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-heading font-bold text-[#0D1B2A]">
            {draftsCount}
          </div>
          <p className="text-xs text-[#64748B] font-body mt-1">
            Unpublished and private drafts
          </p>
        </div>
      </section>

      {/* 2. Management Toolbar & Table Container */}
      <section className="bg-white rounded-2xl border border-[#DCE5EE] shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-6 border-b border-[#DCE5EE] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Search input & Filter pills */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-body text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20"
              />
            </div>

            {/* Filter Pills: All / Drafts / Published */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl text-xs font-supporting">
              <button
                type="button"
                onClick={() => onFilterChange('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  filter === 'all'
                    ? 'bg-white text-[#0D1B2A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0D1B2A]'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('draft')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  filter === 'draft'
                    ? 'bg-white text-[#0D1B2A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0D1B2A]'
                }`}
              >
                Drafts ({draftsCount})
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('published')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  filter === 'published'
                    ? 'bg-white text-[#0D1B2A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0D1B2A]'
                }`}
              >
                Published ({publishedCount})
              </button>
            </div>
          </div>

          {/* Right: Refresh & New Article Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              className="p-2.5 rounded-xl border border-[#DCE5EE] hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Refresh articles"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-800' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onNewArticle}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-heading font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </button>
          </div>
        </div>

        {/* Articles Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#DCE5EE] text-slate-500 font-supporting font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Article Title & Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5EE]">
              {isLoading && articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading articles from Supabase...
                  </td>
                </tr>
              ) : filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 text-slate-300" />
                      <p className="font-medium text-slate-700">No articles found</p>
                      <p className="text-xs text-slate-400">
                        {filter !== 'all'
                          ? `No articles match the current filter "${filter}".`
                          : 'Get started by creating your first residential construction article.'}
                      </p>
                      <button
                        type="button"
                        onClick={onNewArticle}
                        className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-800 text-white font-heading font-semibold text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create New Article</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => {
                  const isDraft =
                    (article.status as string) === 'draft' || (article as any).draft === true;
                  const pubDate = article.published_at
                    ? article.published_at.split('T')[0]
                    : isDraft
                    ? 'Draft'
                    : '-';
                  const updatedDate =
                    article.updated_at ||
                    article.created_at ||
                    '-';
                  const displayUpdated =
                    updatedDate !== '-' ? updatedDate.split('T')[0] : '-';

                  return (
                    <tr
                      key={article.id || article.slug}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Title & Slug */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-heading font-semibold text-sm text-[#0D1B2A] line-clamp-1">
                          {article.title || 'Untitled Article'}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          /insights/{article.slug}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-supporting font-semibold bg-sky-50 text-sky-800 border border-sky-100">
                          <Tag className="w-3 h-3 text-sky-700" />
                          {getCategoryLabel(article.category)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isDraft ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-supporting font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-700" />
                            Draft
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-supporting font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            Published
                          </span>
                        )}
                      </td>

                      {/* Published Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-600 font-supporting">
                        {pubDate}
                      </td>

                      {/* Last Updated */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-500 font-supporting">
                        {displayUpdated}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Preview button */}
                          <button
                            type="button"
                            onClick={() => onPreviewArticle(article)}
                            className="p-1.5 rounded-lg border border-[#DCE5EE] hover:bg-slate-100 text-slate-600 transition-colors"
                            title="Preview Article (Private)"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit button */}
                          <button
                            type="button"
                            onClick={() => onEditArticle(article)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] font-supporting font-semibold text-xs transition-colors"
                            title="Edit Article"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={() => onDeleteArticle(article.id || article.slug)}
                            className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
