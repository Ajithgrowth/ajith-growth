-- ==============================================================================
-- Migration: 20260917000001_restructure_cms_growth_system.sql
-- Restructure CMS to align with Ajith's Personal Brand & 50+ Blog Publishing Strategy
-- Safe, idempotent script for Supabase SQL Editor
-- ==============================================================================

-- 1. Add Personal Brand, ICP & SEO Strategy Columns to public.articles table
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS target_keyword TEXT,
  ADD COLUMN IF NOT EXISTS builder_segment TEXT,
  ADD COLUMN IF NOT EXISTS strategic_takeaway TEXT,
  ADD COLUMN IF NOT EXISTS primary_service_cta TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_post_summary TEXT;

-- 2. Add helpful column documentation
COMMENT ON COLUMN public.articles.target_keyword IS 'Primary Google Search keyword targeted by this article';
COMMENT ON COLUMN public.articles.builder_segment IS 'Target builder segment / ICP (e.g., Custom Villa Builders, Turnkey Contractors)';
COMMENT ON COLUMN public.articles.strategic_takeaway IS 'Ajith personal founder perspective / strategic insight callout';
COMMENT ON COLUMN public.articles.primary_service_cta IS 'Target service connected to this insight article (e.g., google-ads, local-seo)';
COMMENT ON COLUMN public.articles.linkedin_post_summary IS 'Ready-to-publish LinkedIn post copy for social distribution';

-- 3. Create high-performance indexes for scaling to 50+ published articles
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON public.articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_target_keyword ON public.articles(target_keyword);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON public.articles(is_featured);

-- 4. Verify RLS (Row Level Security) policies allow authorized updates
-- (Ensures ajith@ajithgrowth.com can read, insert, update, and delete all columns)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'articles' AND policyname = 'Allow public read of published articles'
  ) THEN
    CREATE POLICY "Allow public read of published articles"
      ON public.articles FOR SELECT
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'articles' AND policyname = 'Allow authorized CMS manager full access'
  ) THEN
    CREATE POLICY "Allow authorized CMS manager full access"
      ON public.articles FOR ALL
      TO authenticated
      USING (auth.jwt() ->> 'email' = 'ajith@ajithgrowth.com')
      WITH CHECK (auth.jwt() ->> 'email' = 'ajith@ajithgrowth.com');
  END IF;
END $$;
