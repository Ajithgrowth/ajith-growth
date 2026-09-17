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
  User,
  Star,
  Image as ImageIcon,
  Copy,
  Check,
  Globe,
  EyeOff,
  Sparkles,
  Share2,
  Target,
  Link2,
  MessageSquare,
} from 'lucide-react';
import type { CMSArticle, CMSArticleFAQ, CMSArticleStatus } from '../../types/cms';
import {
  CMS_CATEGORIES,
  CMS_BUILDER_SEGMENTS,
  CMS_PRIMARY_SERVICES,
  generateSlug,
} from '../../types/cms';
import { uploadBlogImage } from '../../lib/cmsStorage';
import { siteConfig } from '../../data/siteConfig';
import { getCategoryFaqTemplates } from '../../data/categoryFaqTemplates';
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
  const [authorDesignation, setAuthorDesignation] = useState<string>(
    initialArticle?.author_designation || ''
  );
  const [authorPhoto, setAuthorPhoto] = useState<string>(
    initialArticle?.author_photo || ''
  );
  const [authorBio, setAuthorBio] = useState<string>(
    initialArticle?.author_bio || ''
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    Boolean(initialArticle?.is_featured)
  );
  const [ogImage, setOgImage] = useState<string>(
    initialArticle?.og_image || ''
  );
  const [noindex, setNoindex] = useState<boolean>(
    Boolean(initialArticle?.noindex)
  );

  // Personal Brand, Builder ICP & Authority Strategy States
  const [targetKeyword, setTargetKeyword] = useState<string>(
    initialArticle?.target_keyword || ''
  );
  const [builderSegment, setBuilderSegment] = useState<string>(
    initialArticle?.builder_segment || ''
  );
  const [strategicTakeaway, setStrategicTakeaway] = useState<string>(
    initialArticle?.strategic_takeaway || ''
  );
  const [primaryServiceCta, setPrimaryServiceCta] = useState<string>(
    initialArticle?.primary_service_cta || 'google-ads'
  );
  const [linkedinPostSummary, setLinkedinPostSummary] = useState<string>(
    initialArticle?.linkedin_post_summary || ''
  );
  const [copiedLinkedin, setCopiedLinkedin] = useState<boolean>(false);

  // Section Images 1-4
  const [sectionImage1, setSectionImage1] = useState<string>(initialArticle?.section_image_1 || '');
  const [sectionImage1Alt, setSectionImage1Alt] = useState<string>(initialArticle?.section_image_1_alt || '');
  const [sectionImage1Caption, setSectionImage1Caption] = useState<string>(initialArticle?.section_image_1_caption || '');

  const [sectionImage2, setSectionImage2] = useState<string>(initialArticle?.section_image_2 || '');
  const [sectionImage2Alt, setSectionImage2Alt] = useState<string>(initialArticle?.section_image_2_alt || '');
  const [sectionImage2Caption, setSectionImage2Caption] = useState<string>(initialArticle?.section_image_2_caption || '');

  const [sectionImage3, setSectionImage3] = useState<string>(initialArticle?.section_image_3 || '');
  const [sectionImage3Alt, setSectionImage3Alt] = useState<string>(initialArticle?.section_image_3_alt || '');
  const [sectionImage3Caption, setSectionImage3Caption] = useState<string>(initialArticle?.section_image_3_caption || '');

  const [sectionImage4, setSectionImage4] = useState<string>(initialArticle?.section_image_4 || '');
  const [sectionImage4Alt, setSectionImage4Alt] = useState<string>(initialArticle?.section_image_4_alt || '');
  const [sectionImage4Caption, setSectionImage4Caption] = useState<string>(initialArticle?.section_image_4_caption || '');

  const [uploadingSectionImage, setUploadingSectionImage] = useState<number | null>(null);
  const [sectionImageUploadError, setSectionImageUploadError] = useState<{ [key: number]: string | null }>({});

  const [faqs, setFaqs] = useState<CMSArticleFAQ[]>(() => {
    if (initialArticle?.faqs && Array.isArray(initialArticle.faqs)) {
      return initialArticle.faqs;
    }
    return [];
  });

  const [showFaqConfirmModal, setShowFaqConfirmModal] = useState<boolean>(false);
  const [faqFeedbackMessage, setFaqFeedbackMessage] = useState<string | null>(null);

  // UI States
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadingAuthorPhoto, setUploadingAuthorPhoto] = useState<boolean>(false);
  const [authorPhotoUploadError, setAuthorPhotoUploadError] = useState<string | null>(null);
  const [uploadingOgImage, setUploadingOgImage] = useState<boolean>(false);
  const [ogImageUploadError, setOgImageUploadError] = useState<string | null>(null);
  const [copiedCanonical, setCopiedCanonical] = useState<boolean>(false);
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

  // Handle Author Photo File Upload (Supabase Storage: blog-images)
  const handleAuthorPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAuthorPhoto(true);
    setAuthorPhotoUploadError(null);

    const res = await uploadBlogImage(file);
    if (res.error) {
      setAuthorPhotoUploadError(res.error);
    } else if (res.url) {
      setAuthorPhoto(res.url);
    }
    setUploadingAuthorPhoto(false);
  };

  // Handle OG Image File Upload (Supabase Storage: blog-images)
  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingOgImage(true);
    setOgImageUploadError(null);

    const res = await uploadBlogImage(file);
    if (res.error) {
      setOgImageUploadError(res.error);
    } else if (res.url) {
      setOgImage(res.url);
    }
    setUploadingOgImage(false);
  };

  // Section Image Handlers (1-4)
  const handleSectionImageUpload = async (slot: 1 | 2 | 3 | 4, file: File) => {
    setUploadingSectionImage(slot);
    setSectionImageUploadError((prev) => ({ ...prev, [slot]: null }));

    const res = await uploadBlogImage(file);
    if (res.error) {
      setSectionImageUploadError((prev) => ({ ...prev, [slot]: res.error }));
    } else if (res.url) {
      if (slot === 1) {
        setSectionImage1(res.url);
        if (!sectionImage1Alt) setSectionImage1Alt(title ? `${title} - Visual Framework 1` : file.name.replace(/\.[^/.]+$/, ''));
      } else if (slot === 2) {
        setSectionImage2(res.url);
        if (!sectionImage2Alt) setSectionImage2Alt(title ? `${title} - Tactical Breakdown 2` : file.name.replace(/\.[^/.]+$/, ''));
      } else if (slot === 3) {
        setSectionImage3(res.url);
        if (!sectionImage3Alt) setSectionImage3Alt(title ? `${title} - Metric Analysis 3` : file.name.replace(/\.[^/.]+$/, ''));
      } else if (slot === 4) {
        setSectionImage4(res.url);
        if (!sectionImage4Alt) setSectionImage4Alt(title ? `${title} - Implementation Step 4` : file.name.replace(/\.[^/.]+$/, ''));
      }
    }
    setUploadingSectionImage(null);
  };

  const handleClearSectionImage = (slot: 1 | 2 | 3 | 4) => {
    if (slot === 1) {
      setSectionImage1('');
      setSectionImage1Alt('');
      setSectionImage1Caption('');
    } else if (slot === 2) {
      setSectionImage2('');
      setSectionImage2Alt('');
      setSectionImage2Caption('');
    } else if (slot === 3) {
      setSectionImage3('');
      setSectionImage3Alt('');
      setSectionImage3Caption('');
    } else if (slot === 4) {
      setSectionImage4('');
      setSectionImage4Alt('');
      setSectionImage4Caption('');
    }
    setSectionImageUploadError((prev) => ({ ...prev, [slot]: null }));
  };

  const handleCopyCanonical = () => {
    const fullCanonical = `${siteConfig.canonicalDomain}/insights/${slug || ''}`;
    navigator.clipboard.writeText(fullCanonical);
    setCopiedCanonical(true);
    setTimeout(() => setCopiedCanonical(false), 2000);
  };

  // Category FAQ Suggestions Handlers
  const currentCategoryLabel =
    CMS_CATEGORIES.find((c) => c.value === category)?.label || category;

  const handleLoadFaqSuggestionsClick = () => {
    const templates = getCategoryFaqTemplates(category);
    if (templates.length === 0) return;

    if (faqs.length === 0) {
      // No existing FAQs -> load immediately without modal
      setFaqs(templates.map((t) => ({ question: t.question, answer: t.answer })));
      setFaqFeedbackMessage(`Loaded ${templates.length} FAQ suggestions for ${currentCategoryLabel}.`);
      setTimeout(() => setFaqFeedbackMessage(null), 4500);
    } else {
      // Prompt modal to choose between append, replace, or cancel
      setShowFaqConfirmModal(true);
    }
  };

  const handleAppendFaqSuggestions = () => {
    const templates = getCategoryFaqTemplates(category);
    const newItems = templates.map((t) => ({ question: t.question, answer: t.answer }));
    setFaqs([...faqs, ...newItems]);
    setShowFaqConfirmModal(false);
    setFaqFeedbackMessage(`Appended ${newItems.length} suggestions to existing FAQs.`);
    setTimeout(() => setFaqFeedbackMessage(null), 4500);
  };

  const handleReplaceFaqSuggestions = () => {
    const templates = getCategoryFaqTemplates(category);
    const newItems = templates.map((t) => ({ question: t.question, answer: t.answer }));
    setFaqs(newItems);
    setShowFaqConfirmModal(false);
    setFaqFeedbackMessage(`Replaced all FAQs with ${newItems.length} category suggestions.`);
    setTimeout(() => setFaqFeedbackMessage(null), 4500);
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

  // LinkedIn Post Generation & Copy Handlers
  const handleGenerateLinkedInDraft = () => {
    const segment = builderSegment ? `for ${builderSegment}` : 'for residential custom home builders';
    const draft = `Residential construction is driven by trust and craftsmanship. But attracting serious, qualified clients comes down to search intent.

Here is an operational breakdown ${segment}:

📌 The Core Challenge:
${title || 'High marketing spend yielding unqualified inquiries and price-shoppers.'}

💡 Ajith's Perspective:
${strategicTakeaway || excerpt || 'Stop bidding on low-intent generic keywords. Build high-authority search visibility that reaches homeowners when they are actively evaluating architects and builders.'}

📖 Read the complete strategic analysis:
${siteConfig.siteUrl}/insights/${slug || 'residential-construction-growth'}

#ResidentialConstruction #CustomHomeBuilders #GoogleSearch #ConstructionMarketing #AjithGrowth`;

    setLinkedinPostSummary(draft);
  };

  const handleCopyLinkedInDraft = async () => {
    if (!linkedinPostSummary.trim()) return;
    try {
      await navigator.clipboard.writeText(linkedinPostSummary);
      setCopiedLinkedin(true);
      setTimeout(() => setCopiedLinkedin(false), 2500);
    } catch {
      setCopiedLinkedin(true);
      setTimeout(() => setCopiedLinkedin(false), 2500);
    }
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
      author_designation: authorDesignation.trim() || null,
      author_photo: authorPhoto.trim() || null,
      author_bio: authorBio.trim() || null,
      is_featured: isFeatured,
      og_image: ogImage.trim() || null,
      noindex: noindex,

      // Personal Brand, Builder ICP & Authority Fields
      target_keyword: targetKeyword.trim() || null,
      builder_segment: builderSegment.trim() || null,
      strategic_takeaway: strategicTakeaway.trim() || null,
      primary_service_cta: primaryServiceCta.trim() || null,
      linkedin_post_summary: linkedinPostSummary.trim() || null,

      // Contextual Section Images (1-4)
      section_image_1: sectionImage1.trim() || null,
      section_image_1_alt: sectionImage1Alt.trim() || null,
      section_image_1_caption: sectionImage1Caption.trim() || null,
      section_image_2: sectionImage2.trim() || null,
      section_image_2_alt: sectionImage2Alt.trim() || null,
      section_image_2_caption: sectionImage2Caption.trim() || null,
      section_image_3: sectionImage3.trim() || null,
      section_image_3_alt: sectionImage3Alt.trim() || null,
      section_image_3_caption: sectionImage3Caption.trim() || null,
      section_image_4: sectionImage4.trim() || null,
      section_image_4_alt: sectionImage4Alt.trim() || null,
      section_image_4_caption: sectionImage4Caption.trim() || null,

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

    // Validate Section Image Alt texts when URLs are provided
    if (sectionImage1.trim() && !sectionImage1Alt.trim()) {
      setValidationError('Section Image 1 requires Alt Text for SEO & accessibility.');
      return;
    }
    if (sectionImage2.trim() && !sectionImage2Alt.trim()) {
      setValidationError('Section Image 2 requires Alt Text for SEO & accessibility.');
      return;
    }
    if (sectionImage3.trim() && !sectionImage3Alt.trim()) {
      setValidationError('Section Image 3 requires Alt Text for SEO & accessibility.');
      return;
    }
    if (sectionImage4.trim() && !sectionImage4Alt.trim()) {
      setValidationError('Section Image 4 requires Alt Text for SEO & accessibility.');
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

            {/* Target Builder Segment & Focus Keyword (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#DCE5EE]">
              {/* Target Builder Segment */}
              <div>
                <label htmlFor="builder-segment" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-sky-800" />
                    <span>Target Builder Segment</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">ICP</span>
                </label>
                <input
                  id="builder-segment"
                  type="text"
                  list="builder-segments-list"
                  value={builderSegment}
                  onChange={(e) => setBuilderSegment(e.target.value)}
                  placeholder="e.g. Custom Villa Builders (₹1.5 Cr – ₹5 Cr+)"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 font-body"
                />
                <datalist id="builder-segments-list">
                  {CMS_BUILDER_SEGMENTS.map((seg) => (
                    <option key={seg} value={seg} />
                  ))}
                </datalist>
                <p className="text-[11px] text-slate-400 mt-1 font-body">
                  Select a suggested builder profile or type a specific construction niche.
                </p>
              </div>

              {/* Focus Search Keyword */}
              <div>
                <label htmlFor="target-keyword" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-sky-800" />
                    <span>Focus Search Keyword</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">SEO / Ads</span>
                </label>
                <input
                  id="target-keyword"
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g. google ads for residential home builders"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 font-body"
                />
                <p className="text-[11px] text-slate-400 mt-1 font-body">
                  Primary high-intent term targeted for Google Search & Ads positioning.
                </p>
              </div>
            </div>

            {/* Founder's Strategic Takeaway / Perspective */}
            <div className="bg-[#F8FAFC] border border-sky-100 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="strategic-takeaway" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Ajith's Strategic Takeaway (Founder Perspective)</span>
                </label>
                <span className="text-[10px] font-supporting text-sky-700 font-medium bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Personal Brand Callout
                </span>
              </div>
              <textarea
                id="strategic-takeaway"
                rows={3}
                value={strategicTakeaway}
                onChange={(e) => setStrategicTakeaway(e.target.value)}
                placeholder="Direct 1-2 sentence founder insight demonstrating deep systems thinking and residential market nuance (e.g. 'Builders don't fail from low website traffic; they fail because generic broad keywords burn 40% of their ad spend on DIY searchers instead of serious plot owners.')..."
                className="w-full px-3 py-2 rounded-lg border border-[#DCE5EE] bg-white text-xs sm:text-sm font-body text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 font-body">
                Displayed in a dedicated, high-contrast dark consultation card on the live article to reinforce founder trust.
              </p>
            </div>

            {/* Connected Service CTA */}
            <div>
              <label htmlFor="primary-service-cta" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-sky-800" />
                <span>Connected Service / Consultation CTA</span>
              </label>
              <select
                id="primary-service-cta"
                value={primaryServiceCta}
                onChange={(e) => setPrimaryServiceCta(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 font-body"
              >
                {CMS_PRIMARY_SERVICES.map((srv) => (
                  <option key={srv.value} value={srv.value}>
                    {srv.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Connects this insight article directly to the relevant growth service.
              </p>
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

          {/* LINKEDIN REPURPOSING & DISTRIBUTION ENGINE */}
          <div className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-2xl border border-sky-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE5EE] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0077B5] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  in
                </div>
                <div>
                  <h2 className="text-base font-heading font-semibold text-[#0D1B2A] flex items-center gap-2">
                    <span>LinkedIn Repurposing & Distribution</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-body">
                    Personal Brand Engine: 2 blogs every week &rarr; ready-to-publish LinkedIn post copy for construction founders.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerateLinkedInDraft}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 font-body font-medium text-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-700" />
                  <span>Auto-Draft Hook</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyLinkedInDraft}
                  disabled={!linkedinPostSummary.trim()}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-body font-semibold transition-all cursor-pointer ${
                    copiedLinkedin
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#0077B5] hover:bg-[#005E93] text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs'
                  }`}
                >
                  {copiedLinkedin ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy for LinkedIn</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="linkedin-summary" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A]">
                  Ready-to-Post LinkedIn Content
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {linkedinPostSummary.length} characters
                </span>
              </div>
              <textarea
                id="linkedin-summary"
                rows={6}
                value={linkedinPostSummary}
                onChange={(e) => setLinkedinPostSummary(e.target.value)}
                placeholder="Click 'Auto-Draft Hook' above or compose your LinkedIn post hook, key builder takeaways, and article link here..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-white text-xs sm:text-sm font-body text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077B5]/20 focus:border-[#0077B5] leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 mt-1 font-body">
                Stored directly in your Supabase CMS table so you can cross-post whenever your article goes live on the site.
              </p>
            </div>
          </div>

          {/* ARTICLE SECTION IMAGES Panel (Contextual Body Images 1-4) */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-6">
            <div className="border-b border-[#DCE5EE] pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-sky-800" />
                  <h2 className="text-base font-heading font-semibold text-[#0D1B2A]">
                    Article Section Images
                  </h2>
                </div>
                <span className="text-xs font-supporting font-semibold text-slate-500 uppercase tracking-wider">
                  Up to 4 Contextual Visuals
                </span>
              </div>
              <p className="text-xs text-slate-500 font-body mt-1">
                Contextual images naturally anchored after your article&apos;s major H2 sections. Articles with 0, 1, 2, 3, or 4 images are fully supported.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  slot: 1 as const,
                  title: 'Section Image 1',
                  anchor: 'Anchored after H2 Section 1 / Intro',
                  url: sectionImage1,
                  alt: sectionImage1Alt,
                  caption: sectionImage1Caption,
                  setUrl: setSectionImage1,
                  setAlt: setSectionImage1Alt,
                  setCaption: setSectionImage1Caption,
                },
                {
                  slot: 2 as const,
                  title: 'Section Image 2',
                  anchor: 'Anchored after H2 Section 2',
                  url: sectionImage2,
                  alt: sectionImage2Alt,
                  caption: sectionImage2Caption,
                  setUrl: setSectionImage2,
                  setAlt: setSectionImage2Alt,
                  setCaption: setSectionImage2Caption,
                },
                {
                  slot: 3 as const,
                  title: 'Section Image 3',
                  anchor: 'Anchored after H2 Section 3',
                  url: sectionImage3,
                  alt: sectionImage3Alt,
                  caption: sectionImage3Caption,
                  setUrl: setSectionImage3,
                  setAlt: setSectionImage3Alt,
                  setCaption: setSectionImage3Caption,
                },
                {
                  slot: 4 as const,
                  title: 'Section Image 4',
                  anchor: 'Anchored after H2 Section 4',
                  url: sectionImage4,
                  alt: sectionImage4Alt,
                  caption: sectionImage4Caption,
                  setUrl: setSectionImage4,
                  setAlt: setSectionImage4Alt,
                  setCaption: setSectionImage4Caption,
                },
              ].map((item) => (
                <div
                  key={item.slot}
                  className="p-4 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-supporting font-bold uppercase tracking-wider text-[#0D1B2A]">
                        {item.title}
                      </span>
                      <span className="text-[11px] font-body text-slate-400 ml-2">
                        ({item.anchor})
                      </span>
                    </div>
                    {item.url && (
                      <button
                        type="button"
                        onClick={() => handleClearSectionImage(item.slot)}
                        className="inline-flex items-center gap-1 text-[11px] font-supporting font-semibold text-rose-600 hover:text-rose-800 p-1 transition-colors"
                        title="Clear image"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove Image</span>
                      </button>
                    )}
                  </div>

                  {/* Image Upload / Preview */}
                  <div className="space-y-2">
                    <input
                      type="file"
                      id={`section-image-input-${item.slot}`}
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleSectionImageUpload(item.slot, f);
                      }}
                      disabled={uploadingSectionImage === item.slot}
                      className="hidden"
                    />

                    {item.url ? (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-2 bg-white rounded-lg border border-[#DCE5EE]">
                        <img
                          src={item.url}
                          alt={item.alt || item.title}
                          className="w-24 h-16 object-cover rounded-md border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 w-full min-w-0 space-y-1">
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) => item.setUrl(e.target.value)}
                            placeholder="Image URL"
                            className="w-full px-2.5 py-1 text-xs font-mono rounded border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
                          />
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor={`section-image-input-${item.slot}`}
                              className="text-[11px] font-heading font-medium text-sky-800 hover:underline cursor-pointer inline-flex items-center gap-1"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Replace from file</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <label
                          htmlFor={`section-image-input-${item.slot}`}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#DCE5EE] bg-white hover:bg-slate-50 text-xs font-heading font-medium text-sky-800 cursor-pointer transition-colors shrink-0"
                        >
                          {uploadingSectionImage === item.slot ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Uploading to Storage...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Image</span>
                            </>
                          )}
                        </label>
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => item.setUrl(e.target.value)}
                          placeholder="Or paste direct image URL (https://...)"
                          className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#DCE5EE] bg-white text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20"
                        />
                      </div>
                    )}

                    {sectionImageUploadError[item.slot] && (
                      <p className="text-xs text-red-600 font-body">
                        {sectionImageUploadError[item.slot]}
                      </p>
                    )}
                  </div>

                  {/* Alt Text & Caption Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1">
                        ALT Text {item.url && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="text"
                        value={item.alt}
                        onChange={(e) => item.setAlt(e.target.value)}
                        placeholder="Descriptive image alt text (required if image set)"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DCE5EE] bg-white text-xs font-body text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1">
                        Caption (Optional)
                      </label>
                      <input
                        type="text"
                        value={item.caption}
                        onChange={(e) => item.setCaption(e.target.value)}
                        placeholder="Display caption shown below image"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DCE5EE] bg-white text-xs font-body text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: FAQs (JSONB) */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DCE5EE] pb-3 gap-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-800" />
                <h2 className="text-base font-heading font-semibold text-[#0D1B2A]">
                  Frequently Asked Questions (FAQ)
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadFaqSuggestionsClick}
                  className="inline-flex items-center gap-1.5 text-xs font-supporting font-semibold text-slate-700 hover:text-sky-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  title="Load 10 preloaded FAQ templates for the current category"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Load Category FAQ Suggestions</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="inline-flex items-center gap-1 text-xs font-supporting font-semibold text-sky-800 hover:text-sky-950 bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>
            </div>

            {faqFeedbackMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-body flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{faqFeedbackMessage}</span>
              </div>
            )}

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

            {/* Featured Blog Toggle (is_featured) */}
            <div className="pt-2 border-t border-[#DCE5EE]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[#DCE5EE] text-sky-800 focus:ring-sky-800/20"
                />
                <div>
                  <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Featured Blog</span>
                  </span>
                  <p className="text-[11px] text-slate-500 font-body mt-0.5">
                    Feature this article in the Insights hub hero section.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Panel 2: Author Section */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-4">
            <h2 className="text-base font-heading font-semibold text-[#0D1B2A] border-b border-[#DCE5EE] pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-800" />
              <span>Author</span>
            </h2>

            {/* Author Name */}
            <div>
              <label htmlFor="author-name" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Author Name
              </label>
              <input
                id="author-name"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ajith"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20 font-body"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Stored in &ldquo;author_name&rdquo; (TEXT).
              </p>
            </div>

            {/* Author Designation */}
            <div>
              <label htmlFor="author-designation" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Author Designation
              </label>
              <input
                id="author-designation"
                type="text"
                value={authorDesignation}
                onChange={(e) => setAuthorDesignation(e.target.value)}
                placeholder="Founder & Growth Architect"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20 font-body"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Stored in &ldquo;author_designation&rdquo; (TEXT).
              </p>
            </div>

            {/* Author Photo */}
            <div>
              <label className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Author Photo
              </label>
              <div className="flex items-center gap-3 mb-2">
                {authorPhoto ? (
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#DCE5EE] bg-slate-100 relative shrink-0">
                    <img
                      src={authorPhoto}
                      alt={authorName || 'Author'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={() => setAuthorPhoto('')}
                      className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/60 text-white hover:bg-black/80"
                      title="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-[#DCE5EE] flex items-center justify-center text-slate-400 shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    id="author-photo-input"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAuthorPhotoUpload}
                    disabled={uploadingAuthorPhoto}
                    className="hidden"
                  />
                  <label
                    htmlFor="author-photo-input"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE5EE] hover:bg-slate-50 text-xs font-heading font-medium text-sky-800 cursor-pointer transition-colors"
                  >
                    {uploadingAuthorPhoto ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <input
                type="text"
                value={authorPhoto}
                onChange={(e) => setAuthorPhoto(e.target.value)}
                placeholder="Or paste public photo URL..."
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-mono text-[#0D1B2A] focus:outline-none"
              />
              {authorPhotoUploadError && (
                <p className="text-xs text-red-600 mt-1 font-body">{authorPhotoUploadError}</p>
              )}
            </div>

            {/* Author Bio */}
            <div>
              <label htmlFor="author-bio" className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Author Bio
              </label>
              <textarea
                id="author-bio"
                rows={3}
                value={authorBio}
                onChange={(e) => setAuthorBio(e.target.value)}
                placeholder="Brief bio highlighting domain expertise..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-body text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-sky-800/20"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Stored in &ldquo;author_bio&rdquo; (TEXT).
              </p>
            </div>
          </div>

          {/* Panel 3: Featured Image & OG Image (Supabase Storage: blog-images) */}
          <div className="bg-white rounded-2xl border border-[#DCE5EE] p-6 space-y-4">
            <h2 className="text-base font-heading font-semibold text-[#0D1B2A] border-b border-[#DCE5EE] pb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-sky-800" />
              <span>Media & Images</span>
            </h2>

            {/* Upload Area */}
            <div>
              <label className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5">
                Featured Image (blog-images bucket)
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
                Featured Image URL
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
                Featured Image Alt Text
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

            {/* Open Graph (OG) Image */}
            <div className="pt-4 border-t border-[#DCE5EE] space-y-3">
              <div>
                <label className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A]">
                  Open Graph (OG) Image
                </label>
                <p className="text-[11px] text-slate-500 font-body mt-0.5">
                  Custom image for social media sharing. Fallback to Featured Image if empty.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {ogImage ? (
                  <div className="w-16 h-10 rounded-lg overflow-hidden border border-[#DCE5EE] bg-slate-100 relative shrink-0">
                    <img
                      src={ogImage}
                      alt="OG Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={() => setOgImage('')}
                      className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/60 text-white hover:bg-black/80"
                      title="Remove OG image"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ) : null}

                <div className="flex-1">
                  <input
                    type="file"
                    id="og-image-input"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleOgImageUpload}
                    disabled={uploadingOgImage}
                    className="hidden"
                  />
                  <label
                    htmlFor="og-image-input"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE5EE] hover:bg-slate-50 text-xs font-heading font-medium text-sky-800 cursor-pointer transition-colors"
                  >
                    {uploadingOgImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload OG Image</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="Or paste public OG image URL..."
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE5EE] bg-[#F8FAFC] text-xs font-mono text-[#0D1B2A] focus:outline-none"
              />
              {ogImageUploadError && (
                <p className="text-xs text-red-600 mt-1 font-body">{ogImageUploadError}</p>
              )}
            </div>
          </div>

          {/* Panel 4: SEO Configuration */}
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

            {/* Canonical URL Preview */}
            <div>
              <label className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1">
                Canonical URL Preview
              </label>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 px-3 py-2 rounded-lg border border-[#DCE5EE] bg-[#F1F5F9] text-xs font-mono text-slate-700 select-all truncate">
                  {siteConfig.canonicalDomain}/insights/{slug || '[slug]'}
                </div>
                <button
                  type="button"
                  onClick={handleCopyCanonical}
                  className="p-2 rounded-lg border border-[#DCE5EE] hover:bg-slate-100 text-slate-600 transition-colors shrink-0"
                  title="Copy Canonical URL"
                >
                  {copiedCanonical ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-body">
                Read-only self-referential canonical URL generated from domain and slug.
              </p>
            </div>

            {/* No Index Toggle */}
            <div className="pt-3 border-t border-[#DCE5EE]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noindex}
                  onChange={(e) => setNoindex(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[#DCE5EE] text-rose-600 focus:ring-rose-500/20"
                />
                <div>
                  <span className="text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] flex items-center gap-1.5">
                    <EyeOff className="w-3.5 h-3.5 text-rose-500" />
                    <span>No Index (Exclude from Search Engines)</span>
                  </span>
                  <p className="text-[11px] text-slate-500 font-body mt-0.5">
                    Sets robots meta tag to &ldquo;noindex, follow&rdquo; and excludes this article from sitemap.xml.
                  </p>
                </div>
              </label>
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

      {/* Category FAQ Confirmation Modal */}
      {showFaqConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0D1B2A]/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#DCE5EE] p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-600 border-b border-slate-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-heading font-bold text-base text-[#0D1B2A]">
                Load Category FAQ Suggestions
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#334155] font-body leading-relaxed">
              This article already has <strong>{faqs.length}</strong> FAQ(s). How would you like to apply the 10 preloaded suggestions for <strong>{currentCategoryLabel}</strong>?
            </p>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleAppendFaqSuggestions}
                className="w-full px-4 py-2.5 text-xs sm:text-sm font-heading font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-xl transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Append to Existing FAQs</span>
                <span className="text-[11px] font-normal opacity-80">+10 suggestions</span>
              </button>
              <button
                type="button"
                onClick={handleReplaceFaqSuggestions}
                className="w-full px-4 py-2.5 text-xs sm:text-sm font-heading font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Replace All Existing FAQs</span>
                <span className="text-[11px] font-normal opacity-80">Overwrites {faqs.length}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowFaqConfirmModal(false)}
                className="w-full px-4 py-2 text-xs sm:text-sm font-heading font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors text-center cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
