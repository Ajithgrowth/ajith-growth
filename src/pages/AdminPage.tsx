import React, { useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  Lock,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Eye,
  EyeOff,
  UserCheck,
  ArrowLeft,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { supabase, AUTHORIZED_CMS_EMAIL, isAuthorizedEmail } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { useRouter } from '../utils/router';
import type { CMSArticle, CMSArticleStatus } from '../types/cms';
import { ArticleListDashboard } from '../components/admin/ArticleListDashboard';
import { ArticleEditor } from '../components/admin/ArticleEditor';
import { ArticlePreviewModal } from '../components/admin/ArticlePreviewModal';

type AdminViewMode = 'list' | 'editor';

export function AdminPage() {
  const { navigate } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // CMS View State
  const [viewMode, setViewMode] = useState<AdminViewMode>('list');
  const [editingArticle, setEditingArticle] = useState<CMSArticle | null>(null);
  const [previewArticle, setPreviewArticle] = useState<CMSArticle | null>(null);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');

  // Articles Data State
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);
  const [isSavingArticle, setIsSavingArticle] = useState<boolean>(false);
  const [dbNotice, setDbNotice] = useState<string | null>(null);

  // Check auth session
  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      setIsLoading(true);
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        if (!isMounted) return;

        if (session?.user) {
          if (isAuthorizedEmail(session.user.email)) {
            setUser(session.user);
            setErrorMessage(null);
          } else {
            // Unauthorized authenticated user: immediately sign out and deny access
            await supabase.auth.signOut();
            setUser(null);
            setErrorMessage(
              `Access denied. Account (${session.user.email}) is not authorized for CMS access. Only ${AUTHORIZED_CMS_EMAIL} is permitted.`
            );
          }
        } else {
          setUser(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Session check error:', err);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkSession();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (session?.user) {
        if (isAuthorizedEmail(session.user.email)) {
          setUser(session.user);
          setErrorMessage(null);
        } else {
          await supabase.auth.signOut();
          setUser(null);
          setErrorMessage(
            `Access denied. Only ${AUTHORIZED_CMS_EMAIL} is authorized to access the CMS.`
          );
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch articles from Supabase 'articles' table using authenticated session
  const fetchArticles = useCallback(async () => {
    if (!user) return;
    setIsLoadingArticles(true);
    setDbNotice(null);

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Provide helpful feedback if RLS or schema needs attention
        console.warn('Supabase articles fetch notice:', error.message);
        setDbNotice(
          `Supabase note: ${error.message}. Ensure authenticated SELECT policy on public.articles is active for ${AUTHORIZED_CMS_EMAIL}.`
        );
        return;
      }

      if (data) {
        setArticles(data as CMSArticle[]);
      }
    } catch (err: any) {
      console.error('Failed to fetch articles:', err);
      setDbNotice(err?.message || 'Could not communicate with Supabase articles table.');
    } finally {
      setIsLoadingArticles(false);
    }
  }, [user]);

  // Trigger articles fetch once user is authenticated
  useEffect(() => {
    if (user && isAuthorizedEmail(user.email)) {
      fetchArticles();
    }
  }, [user, fetchArticles]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    // Guard check against unauthorized emails prior to auth request
    if (cleanEmail !== AUTHORIZED_CMS_EMAIL.toLowerCase()) {
      setErrorMessage(
        `Access denied. Only ${AUTHORIZED_CMS_EMAIL} is authorized for CMS access.`
      );
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid email or password.');
        return;
      }

      if (data?.user) {
        if (!isAuthorizedEmail(data.user.email)) {
          await supabase.auth.signOut();
          setUser(null);
          setErrorMessage(
            `Access denied. Only ${AUTHORIZED_CMS_EMAIL} is authorized to access the CMS.`
          );
          return;
        }
        setUser(data.user);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'An unexpected error occurred during authentication.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setPassword('');
      setErrorMessage(null);
      setViewMode('list');
      setEditingArticle(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Save / Update Article in Supabase
  const handleSaveArticle = async (
    articleData: Partial<CMSArticle>,
    publish: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'User session expired. Please log in again.' };
    }

    setIsSavingArticle(true);
    try {
      const now = new Date().toISOString();
      const status: CMSArticleStatus = publish ? 'published' : 'draft';

      // Calculate published_at: when published for the first time, set appropriately
      let published_at = articleData.published_at;
      if (status === 'published' && !published_at) {
        published_at = now;
      }

      // Payload strictly aligned with existing Supabase articles table
      const payload: any = {
        title: articleData.title,
        slug: articleData.slug,
        category: articleData.category,
        featured_image: articleData.featured_image || null,
        featured_image_alt: articleData.featured_image_alt || null,
        excerpt: articleData.excerpt || null,
        quick_summary: articleData.quick_summary || null, // TEXT
        content: articleData.content || null,
        seo_title: articleData.seo_title || null,
        meta_description: articleData.meta_description || null,
        faqs: articleData.faqs || [], // JSONB
        status,
        published_at: published_at || null, // TIMESTAMPTZ
        author_name: articleData.author_name || 'Ajith', // TEXT
        author_designation: articleData.author_designation || null, // TEXT
        author_photo: articleData.author_photo || null, // TEXT
        author_bio: articleData.author_bio || null, // TEXT
        is_featured: Boolean(articleData.is_featured), // BOOLEAN
        og_image: articleData.og_image || null, // TEXT
        noindex: Boolean(articleData.noindex), // BOOLEAN
        updated_at: now,
      };

      if (articleData.id) {
        // Update existing record
        const { data, error } = await supabase
          .from('articles')
          .update(payload)
          .eq('id', articleData.id)
          .select()
          .single();

        if (error) {
          // If update by ID fails because of schema column mismatch, attempt slug update
          const slugUpdate = await supabase
            .from('articles')
            .update(payload)
            .eq('slug', articleData.slug)
            .select()
            .single();

          if (slugUpdate.error) {
            return { success: false, error: slugUpdate.error.message };
          }
        }
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('articles')
          .insert([payload])
          .select()
          .single();

        if (error) {
          return { success: false, error: error.message };
        }
      }

      // Success: refresh list and return to dashboard
      await fetchArticles();
      setViewMode('list');
      setEditingArticle(null);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to save article to Supabase.',
      };
    } finally {
      setIsSavingArticle(false);
    }
  };

  // Delete Article from Supabase
  const handleDeleteArticle = async (identifier?: string) => {
    if (!identifier || !user) return;

    if (!window.confirm('Are you sure you want to permanently delete this article?')) {
      return;
    }

    try {
      // Attempt delete by id first, or fallback to slug
      const { error } = await supabase
        .from('articles')
        .delete()
        .or(`id.eq.${identifier},slug.eq.${identifier}`);

      if (error) {
        alert(`Failed to delete: ${error.message}`);
        return;
      }

      // Refresh list
      await fetchArticles();
      if (viewMode === 'editor') {
        setViewMode('list');
        setEditingArticle(null);
      }
    } catch (err: any) {
      alert(`Error deleting article: ${err?.message || 'Unknown error'}`);
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex flex-col items-center justify-center p-4">
        <SEO title="Ajith Growth CMS" description="CMS Admin Portal" noindex={true} />
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-800/40 flex items-center justify-center text-sky-400">
            <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-heading font-semibold text-white">Ajith Growth CMS</h2>
            <p className="text-xs text-slate-400 font-body">Verifying secure admin session...</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State: Clean Login Screen
  if (!user || !isAuthorizedEmail(user.email)) {
    return (
      <div className="min-h-screen bg-[#F3F7FB] text-[#0D1B2A] flex flex-col justify-between selection:bg-sky-100 selection:text-sky-900">
        <SEO
          title="Ajith Growth CMS — Login"
          description="Restricted Admin Access"
          noindex={true}
        />

        {/* Top bar with back to site link */}
        <header className="w-full border-b border-[#DCE5EE] bg-white px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] text-white flex items-center justify-center font-heading font-bold text-sm">
              AG
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-[#0D1B2A] tracking-tight block">
                Ajith Growth CMS
              </span>
              <span className="text-[10px] font-supporting font-semibold uppercase tracking-wider text-slate-500">
                Administration Portal
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-supporting font-medium text-slate-600 hover:text-[#0D1B2A] transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </button>
        </header>

        {/* Center Login Container */}
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl border border-[#DCE5EE] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 text-sky-800 border border-sky-100 mb-1">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-heading font-bold text-[#0D1B2A] tracking-tight">
                  Ajith Growth CMS
                </h1>
                <p className="text-xs sm:text-sm text-[#64748B] font-body">
                  Sign in with authorized administrator credentials.
                </p>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2.5 text-xs font-body leading-relaxed"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="cms-email"
                    className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5"
                  >
                    Administrator Email
                  </label>
                  <input
                    id="cms-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ajithgrowth.consulting@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 transition-colors font-body"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cms-password"
                    className="block text-xs font-supporting font-semibold uppercase tracking-wider text-[#0D1B2A] mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="cms-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] text-sm text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-800/20 focus:border-sky-800 transition-colors font-body"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0D1B2A] hover:bg-slate-800 text-white font-heading font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-sky-400" />
                      <span>Sign In to CMS</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-[#DCE5EE] flex items-start gap-2.5 text-[11px] text-[#64748B] font-body leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  Protected administrative environment powered by Supabase. Public self-registration is permanently disabled.
                </span>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full py-4 px-4 text-center text-xs text-slate-400 font-body border-t border-[#DCE5EE] bg-white">
          &copy; {new Date().getFullYear()} Ajith Growth. All administrative rights reserved.
        </footer>
      </div>
    );
  }

  // 3. Authenticated State: Protected CMS Dashboard
  return (
    <div className="min-h-screen bg-[#F3F7FB] text-[#0D1B2A] flex flex-col selection:bg-sky-100 selection:text-sky-900">
      <SEO
        title="Ajith Growth CMS — Dashboard"
        description="Ajith Growth CMS Management Dashboard"
        noindex={true}
      />

      {/* Top CMS Header */}
      <header className="sticky top-0 z-30 bg-[#0D1B2A] border-b border-slate-800 text-white px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 border border-sky-800/50 flex items-center justify-center font-heading font-bold text-sm">
              AG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-white tracking-tight">
                  Ajith Growth CMS
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-supporting font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Authenticated
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-body hidden sm:block">
                Supabase Articles & Media Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="text-slate-300 font-mono text-[11px] truncate max-w-[200px]">
                {user.email}
              </span>
            </div>

            <button
              onClick={() => navigate('/')}
              title="View Public Website"
              className="inline-flex items-center gap-1.5 text-xs font-supporting font-medium text-slate-300 hover:text-white py-1.5 px-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 text-xs font-supporting font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/50 py-1.5 px-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Supabase Notice Banner if table or RLS needs attention */}
        {dbNotice && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs font-body">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-semibold">Database Notice: </strong>
              <span>{dbNotice}</span>
            </div>
          </div>
        )}

        {/* View Switcher: List Dashboard OR Editor */}
        {viewMode === 'list' ? (
          <ArticleListDashboard
            articles={articles}
            isLoading={isLoadingArticles}
            filter={filter}
            onFilterChange={setFilter}
            onNewArticle={() => {
              setEditingArticle(null);
              setViewMode('editor');
            }}
            onEditArticle={(art) => {
              setEditingArticle(art);
              setViewMode('editor');
            }}
            onDeleteArticle={handleDeleteArticle}
            onRefresh={fetchArticles}
            onPreviewArticle={(art) => setPreviewArticle(art)}
          />
        ) : (
          <ArticleEditor
            initialArticle={editingArticle}
            existingSlugs={articles.map((a) => a.slug)}
            onSave={handleSaveArticle}
            onDelete={editingArticle?.id ? () => handleDeleteArticle(editingArticle.id) : undefined}
            onCancel={() => {
              setViewMode('list');
              setEditingArticle(null);
            }}
            isSaving={isSavingArticle}
          />
        )}
      </main>

      {/* Global Preview Modal */}
      {previewArticle && (
        <ArticlePreviewModal
          article={previewArticle}
          onClose={() => setPreviewArticle(null)}
        />
      )}

      {/* Admin Footer */}
      <footer className="w-full py-4 px-4 sm:px-8 border-t border-[#DCE5EE] bg-white text-xs text-slate-500 font-body flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Ajith Growth CMS • Version 2.0 (Article Management & Storage)</span>
        <div className="flex items-center gap-4 text-slate-500">
          <span>Authorized: {AUTHORIZED_CMS_EMAIL}</span>
        </div>
      </footer>
    </div>
  );
}
