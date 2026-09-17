-- Migration: Add 4 Contextual Section Images to articles table
-- Database: Supabase PostgreSQL
-- Safe and idempotent

ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS section_image_1 TEXT,
  ADD COLUMN IF NOT EXISTS section_image_1_alt TEXT,
  ADD COLUMN IF NOT EXISTS section_image_1_caption TEXT,
  ADD COLUMN IF NOT EXISTS section_image_2 TEXT,
  ADD COLUMN IF NOT EXISTS section_image_2_alt TEXT,
  ADD COLUMN IF NOT EXISTS section_image_2_caption TEXT,
  ADD COLUMN IF NOT EXISTS section_image_3 TEXT,
  ADD COLUMN IF NOT EXISTS section_image_3_alt TEXT,
  ADD COLUMN IF NOT EXISTS section_image_3_caption TEXT,
  ADD COLUMN IF NOT EXISTS section_image_4 TEXT,
  ADD COLUMN IF NOT EXISTS section_image_4_alt TEXT,
  ADD COLUMN IF NOT EXISTS section_image_4_caption TEXT;

-- Verify columns and ensure RLS policies permit authenticated/service_role reads & writes
COMMENT ON COLUMN public.articles.section_image_1 IS 'Contextual body image 1 (anchored after H2 Section 1 / Intro)';
COMMENT ON COLUMN public.articles.section_image_1_alt IS 'Descriptive alt text for section image 1';
COMMENT ON COLUMN public.articles.section_image_1_caption IS 'Optional caption for section image 1';

COMMENT ON COLUMN public.articles.section_image_2 IS 'Contextual body image 2 (anchored after H2 Section 2)';
COMMENT ON COLUMN public.articles.section_image_2_alt IS 'Descriptive alt text for section image 2';
COMMENT ON COLUMN public.articles.section_image_2_caption IS 'Optional caption for section image 2';

COMMENT ON COLUMN public.articles.section_image_3 IS 'Contextual body image 3 (anchored after H2 Section 3)';
COMMENT ON COLUMN public.articles.section_image_3_alt IS 'Descriptive alt text for section image 3';
COMMENT ON COLUMN public.articles.section_image_3_caption IS 'Optional caption for section image 3';

COMMENT ON COLUMN public.articles.section_image_4 IS 'Contextual body image 4 (anchored after H2 Section 4)';
COMMENT ON COLUMN public.articles.section_image_4_alt IS 'Descriptive alt text for section image 4';
COMMENT ON COLUMN public.articles.section_image_4_caption IS 'Optional caption for section image 4';
