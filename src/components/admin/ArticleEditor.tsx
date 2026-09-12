import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Trash2,
  Upload,
  Plus,
  X,
  HelpCircle,
  FileText,
  Search,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import type { CMSArticle, CMSArticleFAQ, CMSArticleStatus } from '../../types/cms';
import { CMS_CATEGORIES, generateSlug } from '../../types/cms';
import { uploadBlogImage } from '../../lib/cmsStorage';
import { MarkdownEditor } from './MarkdownEditor';
import { ArticlePreviewModal } from './ArticlePreviewModal';

interface ArticleEditorProps {
  initialArticle?: CMSArticle | null;
  existingSlugs?: string[];
  onSave: (articleData: Partial<CMSArticle>, publish: boolean) => Promise<{ success: boolean; error?: string }>;
  onDelete?: (id?: string) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  initialArticle,
  existingSlugs = [],
  onSave,
  onDelete,
  onCancel,
  isSaving,
}) => {
  const isEditMode = Boolean(initialArticle && (initialArticle.id || initialArticle.slug));

  // Form State
  const [title, setTitle] = useState<string>(initialArticle?.title || '');
  const [slug, setSlug] = useState<string>(initialArticle?.slug || '');
  const [isSlugManual, setIsSlugManual] = useState<boolean>(Boolean(initialArticle?.slug));
  const [category, setCategory] = useState<string>(
    initialArticle?.category || CMS_CATEGORIES[0].value
  );
  const [featuredImage, setFeaturedImage] = useState<string>(
    initialArticle?.featured_image || ''
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState<string>(
    initialArticle?.featured_image_alt || ''
  );
  const [excerpt, setExcerpt] = useState<string>(initialArticle?.excerpt || '');
  const [quickSummary, setQuickSummary] = useState<string>(
    initialArticle?.quick_summary || ''
  );
  const [content, setContent] = useState<string>(initialArticle?.content || '');
  const [seoTitle, setSeoTitle] = useState<string>(initialArticle?.seo_title || '');
  const [metaDescription, setMetaDescription] = useState<string>(
    initialArticle?.meta_description || ''
  );
  const [status, setStatus] = useState<CMSArticleStatus>(
    (initialArticle?.status as CMSArticleStatus) || 'draft'
  );
  const [publishDateInput, setPublishDateInput] = useState<string>(() => {
    if (initialArticle?.published_at) {
      return initialArticle.published_at.split('T')[0];
    }
    return '';
  });
  const [authorName, setAuthorName] = useState<string>(
    initialArticle?.author_name || 'Ajith'
  );
  const [faqs, setFaqs] = useState<CMSArticleFAQ[]>(() => {
    if (initialArticle?.faqs && Array.isArray(initialArticle.faqs)) {
      return initialArticle.faqs;
    }
    return [];
  });

  // UI States
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // Auto-generate slug from title unless manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugManual) {
      const generated = generateSlug(newTitle);
      setSlug(generated);
      validateSlug(generated);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlug(val);
    setIsSlugManual(true);
    validateSlug(val);
  };

  const handleRegenerateSlug = () => {
    const generated = generateSlug(title);
    setSlug(generated);
    setIsSlugManual(false);
    validateSlug(generated);
  };

  const validateSlug = (slugToTest: string) => {
    if (!slugToTest.trim()) {
      setSlugError('Slug is required.');
      return false;
    }
    // Check collision against other articles
    const otherSlugs = isEditMode
      ? existingSlugs.filter((s) => s !== initialArticle?.slug)
      : existingSlugs;

    if (otherSlugs.includes(slugToTest.trim().toLowerCase())) {
      setSlugError('This slug already exists. Please choose a unique slug.');
      return false;
    }

    setSlugError(null);
    return true;
  };

  // Handle Featured Image File Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError(null);

    const res = await uploadBlogImage(file);
    if (res.error) {
      setUploadError(res.error);
    } else if (res.url) {
      setFeaturedImage(res.url);
      if (!featuredImageAlt) {
        setFeaturedImageAlt(title || file.name.replace(/\.[^/.]+$/, ''));
      }
    }
    setUploadingImage(false);
  };

  // FAQ Dynamic Handlers
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Construct payload with exact database schema fields
  const buildArticlePayload = (targetStatus?: CMSArticleStatus): Partial<CMSArticle> => {
    const nowIso = new Date().toISOString();
    const finalStatus = targetStatus || status;

    // Calculate published_at (TIMESTAMPTZ)
    let finalPublishedAt: string | null = null;
    if (finalStatus === 'published') {
      if (publishDateInput) {
        finalPublishedAt = new Date(publishDateInput).toISOString();
      } else if (initialArticle?.published_at) {
        finalPublishedAt = initialArticle.published_at;
      } else {
        finalPublishedAt = nowIso;
      }
    } else {
      finalPublishedAt = publishDateInput
        ? new Date(publishDateInput).toISOString()
        : initialArticle?.published_at || null;
    }

    return {
      ...(initialArticle?.id ? { id: initialArticle.id } : {}),
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      category: category.trim(),
      featured_image: featuredImage.trim(),
      featured_image_alt: featuredImageAlt.trim(),
      excerpt: excerpt.trim(),
      quick_summary: quickSummary.trim(), // Stored as plain TEXT
      content: content.trim(),
      seo_title: (seoTitle.trim() || `${title.trim()} | Ajith Growth`),
      meta_description: (metaDescription.trim() || excerpt.trim()),
      faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()), // JSONB
      status: finalStatus,
      published_at: finalPublishedAt, // TIMESTAMPTZ
      author_name: (authorName.trim() || 'Ajith'), // Plain TEXT
      updated_at: nowIso,
    };
  };

  // Submit Handler
  const handleSubmit = async (targetStatus: CMSArticleStatus) => {
    setValidationError(null);

    if (!title.trim()) {
      setValidationError('Article Title is required.');
      return;
    }

    if (!slug.trim()) {
      setValidationError('URL Slug is required.');
      return;
    }

    if (!validateSlug(slug)) {
      setValidationError('Please resolve the slug collision error.');
      return;
    }

    if (!content.trim()) {
      setValidationError('Article Content is required.');
      return;
    }

    setStatus(targetStatus);
    const payload = buildArticlePayload(targetStatus);
    const result = await onSave(payload, targetStatus === 'published');
    if (!result.success && result.error) {
      setValidationError(result.error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editor Header / Top Actions */}
      <div className="bg-white rounded-2xl border border-[#DCE5EE] p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl border border-[#DCE5EE] hover:bg-slate-100 text-slate-600 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-[#0D1B2A]">
              {isEditMode ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-xs text-[#64748B] font-body">
              {isEditMode ? `Editing slug: /insights/${slug}` : 'Drafting new residential construction insight'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DCE5EE] hover:bg-slate-100 text-slate-700 font-heading font-medium text-xs transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Preview</span>
          </button>

          {/* Delete (if editing) */}
          {isEditMode && onDelete && (
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                if (window.confirm('Are you sure you want to permanently delete this article?')) {
                  onDelete(initialArticle?.id);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-heading font-medium text-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}

          {/* Save Draft */}
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSubmit('draft')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-[#0D1B2A] font-heading font-semibold text-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
            ) : (
              <Save className="w-4 h-4 text-slate-600" />
            )}
            <span>Save Draft</span>
          </button>

          {/* Publish / Update Button */}
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSubmit('published')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-heading font-semibold text-xs shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin text-sky-200" />
            ) : (
              <Send className="w-4 h-4 text-sky-200" />
            )}
            <span>{isEditMode ? 'Update Article' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {/* Validation Banner */}
      {validationError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-sm font-body"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">{validationError}</div>
        </div>
      )}

      {/* Main 2-Column Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Article Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Main Content */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-5">
            <h2 className="text-base font-heading font-semibold text-[#0D1B2A] border-b border-[#DCE5EE] pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-800" />
              <span>Main Content</span>
            </h2>

            {/* Title */}
            <div>
              <label htmlFor="article-title" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                id="article-title"
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Why Residential Builders Waste Google Ads Budget and How to Reduce It"
                className="w-full px-4 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-base font-heading font-semibold text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 transition-colors"
              />
            </div>

            {/* URL Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="article-slug" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A]">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                {isSlugManual && (
                  <button
                    type="button"
                    onClick={handleRegenerateSlug}
                    className="text-[11px] text-sky-800 hover:underline flex items-center gap-1 font-body"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset to auto-slug
                  </button>
                )}
              </div>
              <div className="flex items-center rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] px-3.5 focus-within:ring-2 focus-within:ring-sky-800/20 focus-within:border-sky-800">
                <span className="text-xs text-slate-400 font-mono select-none">
                  /insights/
                </span>
                <input
                  id="article-slug"
                  type="text"
                  required
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="google-ads-residential-construction"
                  className="w-full py-2.5 px-1 bg-transparent text-xs sm:text-sm font-mono text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              {slugError ? (
                <p className="text-xs text-red-600 mt-1 font-body">{slugError}</p>
              ) : (
                <p className="text-[11px] text-slate-400 mt-1 font-body">
                  Unique canonical URL path. Automatically generated from title, fully editable.
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="article-category" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="article-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 font-body"
              >
                {CMS_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label} ({cat.value})
                  </option>
                ))}
              </select>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="article-excerpt" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Excerpt / Short Description
              </label>
              <textarea
                id="article-excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise, high-impact 1–2 sentence overview of the article shown on cards and previews..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 font-body leading-relaxed"
              />
            </div>

            {/* Quick Summary (plain TEXT field) */}
            <div>
              <label htmlFor="article-summary" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Quick Summary (Stored as plain text)
              </label>
              <textarea
                id="article-summary"
                rows={4}
                value={quickSummary}
                onChange={(e) => setQuickSummary(e.target.value)}
                placeholder="Residential builders do not need more clicks; they need higher intent density.
Significant budget leakage stems from DIY, commercial repair, and low-intent search queries.
Targeting specific territories with customized project portfolios improves consultation quality."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-xs sm:text-sm font-body text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Stored as plain TEXT in the database. Enter key summary lines or bullets.
              </p>
            </div>

            {/* Main Article Content */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A]">
                  Main Article Content (Markdown) <span className="text-red-500">*</span>
                </label>
              </div>
              <MarkdownEditor value={content} onChange={setContent} />
            </div>
          </div>

          {/* Section 2: FAQs (JSONB) */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#DCE5EE] pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-800" />
                <h2 className="text-base font-heading font-semibold text-[#0D1B2A]">
                  Frequently Asked Questions (FAQ)
                </h2>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1 text-xs font-supporting font-semibold text-sky-800 hover:text-sky-950 bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            {faqs.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-[#DCE5EE] rounded-xl text-slate-400 text-xs font-body">
                No FAQs added yet. Click &ldquo;Add FAQ&rdquo; to add structured QA pairs for SEO and schema markup.
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-supporting font-bold uppercase text-slate-500">
                        FAQ #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Remove this FAQ"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                        placeholder="Question (e.g. Why do generic Google Ads campaigns fail for builders?)"
                        className="w-full px-3 py-2 rounded-lg border border-[#DCE5EE] bg-white text-xs sm:text-sm font-heading font-semibold text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                        placeholder="Answer (thorough, direct answer addressing high-intent builder searchers)..."
                        className="w-full px-3 py-2 rounded-lg border border-[#DCE5EE] bg-white text-xs sm:text-sm font-body text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Publishing, Media & SEO Controls */}
        <div className="space-y-6">
          {/* Panel 1: Publishing Settings */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-4">
            <h2 className="text-base font-heading font-semibold text-[#0D1B2A] border-b border-[#DCE5EE] pb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-800" />
              <span>Publishing</span>
            </h2>

            {/* Status Selector */}
            <div>
              <label htmlFor="article-status" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Publication Status
              </label>
              <select
                id="article-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as CMSArticleStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm font-medium text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20"
              >
                <option value="draft">Draft (Private, not public)</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Publish Date (sets published_at TIMESTAMPTZ) */}
            <div>
              <label htmlFor="publish-date" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Publish Date
              </label>
              <input
                id="publish-date"
                type="date"
                value={publishDateInput}
                onChange={(e) => setPublishDateInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Stored in &ldquo;published_at&rdquo; (TIMESTAMPTZ). Automatically assigned on first publish.
              </p>
            </div>

            {/* Author Name */}
            <div>
              <label htmlFor="author-name" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Author
              </label>
              <input
                id="author-name"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ajith"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20 font-body"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Stored in &ldquo;author_name&rdquo; (TEXT). Defaults to &ldquo;Ajith&rdquo;.
              </p>
            </div>
          </div>

          {/* Panel 2: Featured Image (Supabase Storage: blog-images) */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-4">
            <h2 className="text-base font-heading font-semibold text-[#0D1B2A] border-b border-[#DCE5EE] pb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-sky-800" />
              <span>Featured Image</span>
            </h2>

            {/* Upload Area */}
            <div>
              <label className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Upload Image (Supabase Bucket: blog-images)
              </label>
              <div className="border-2 border-dashed border-[#DCE5EE] rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                <input
                  type="file"
                  id="image-upload-input"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageFileChange}
                  disabled={uploadingImage}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload-input"
                  className="cursor-pointer flex flex-col items-center gap-2 text-slate-600 hover:text-sky-800"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin text-sky-700" />
                      <span className="text-xs font-medium">Uploading to Supabase Storage...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-semibold text-sky-800">
                        Click to select image
                      </span>
                      <span className="text-[11px] text-slate-400">
                        JPEG, PNG, WebP • Max 5 MB
                      </span>
                    </>
                  )}
                </label>
              </div>

              {uploadError && (
                <p className="text-xs text-red-600 mt-1 font-body">{uploadError}</p>
              )}
            </div>

            {/* Direct URL input fallback */}
            <div>
              <label htmlFor="featured-image-url" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1">
                Image Public URL
              </label>
              <input
                id="featured-image-url"
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://iiquspioabbsclltqjme.supabase.co/storage/v1/..."
                className="w-full px-3 py-2 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-mono text-[#0D1B2A] focus:outline-none"
              />
            </div>

            {/* Alt Text */}
            <div>
              <label htmlFor="featured-image-alt" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1">
                Image Alt Text
              </label>
              <input
                id="featured-image-alt"
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Descriptive architectural alt text for accessibility and SEO"
                className="w-full px-3 py-2 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-body text-[#0D1B2A] focus:outline-none"
              />
            </div>

            {/* Image Preview */}
            {featuredImage && (
              <div className="rounded-xl overflow-hidden border border-[#DCE5EE] bg-slate-100 max-h-48 relative group">
                <img
                  src={featuredImage}
                  alt={featuredImageAlt || 'Preview'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFeaturedImage('');
                    setFeaturedImageAlt('');
                  }}
                  className="absolute top-2 right-2 p-1 rounded-md bg-black/60 text-white hover:bg-black/80 transition-colors"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Panel 3: SEO Configuration */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-4">
            <h2 className="text-base font-heading font-semibold text-[#0D1B2A] border-b border-[#DCE5EE] pb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-800" />
              <span>SEO Optimization</span>
            </h2>

            {/* SEO Title */}
            <div>
              <label htmlFor="seo-title" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1">
                SEO Title
              </label>
              <input
                id="seo-title"
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title ? `${title} | Ajith Growth` : 'Page Title for Search Engines'}
                className="w-full px-3 py-2 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-body text-[#0D1B2A] focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Recommended: 50–60 characters</span>
                <span className={(seoTitle || title).length > 60 ? 'text-amber-600' : ''}>
                  {(seoTitle || title).length} chars
                </span>
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label htmlFor="meta-description" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1">
                Meta Description
              </label>
              <textarea
                id="meta-description"
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt || 'Search engine snippet summary...'}
                className="w-full px-3 py-2 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-body text-[#0D1B2A] focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Recommended: 140–160 characters</span>
                <span className={(metaDescription || excerpt).length > 160 ? 'text-amber-600' : ''}>
                  {(metaDescription || excerpt).length} chars
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <ArticlePreviewModal
          article={buildArticlePayload()}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
};
