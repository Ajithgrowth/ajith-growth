import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { slugify, createHeadingSlugger } from '../src/utils/slugify';

export { slugify, createHeadingSlugger };

// Calculate reading time based on approx 220 wpm, minimum 1 min
export function calculateReadingTime(body: string): string {
  const cleanText = body
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/#+\s+/g, '') // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[^\w\s]/g, ' '); // special chars

  const words = cleanText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));
  return `${minutes} min read`;
}

// Extract Table of Contents from H2 and H3 markdown headings
export function extractTableOfContents(body: string): { id: string; title: string; level: number }[] {
  const lines = body.split('\n');
  const toc: { id: string; title: string; level: number }[] = [];
  const getHeadingId = createHeadingSlugger();

  for (const line of lines) {
    const trimmed = line.trim();
    let level = 0;
    let headingText = '';

    if (trimmed.startsWith('## ')) {
      level = 2;
      headingText = trimmed.slice(3).trim();
    } else if (trimmed.startsWith('### ')) {
      level = 3;
      headingText = trimmed.slice(4).trim();
    }

    if (level > 0 && headingText) {
      // Clean up markdown formatting from heading title (e.g. bold or links)
      const cleanTitle = headingText.replace(/\*\*|__/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      const id = getHeadingId(cleanTitle);

      toc.push({ id, title: cleanTitle, level });
    }
  }

  return toc;
}


function generateInsights() {
  const contentDir = path.resolve(process.cwd(), 'content/insights');
  const outputDir = path.resolve(process.cwd(), 'src/generated');
  const outputFile = path.join(outputDir, 'insights.ts');

  if (!fs.existsSync(contentDir)) {
    console.warn(`[generate-insights] Directory not found: ${contentDir}`);
    fs.mkdirSync(contentDir, { recursive: true });
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));
  console.log(`[generate-insights] Found ${files.length} article files.`);

  const articles: any[] = [];
  const seenSlugs = new Set<string>();
  const isProduction = process.env.NODE_ENV === 'production';

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(rawContent);

    // Slug validation
    const slug = frontmatter.slug || path.basename(file, '.md');
    if (seenSlugs.has(slug)) {
      throw new Error(`[generate-insights] Duplicate slug detected: "${slug}" in file ${file}`);
    }
    seenSlugs.add(slug);

    // Required fields check
    const required = [
      'title',
      'category',
      'excerpt',
      'featuredImage',
      'featuredImageAlt',
      'author',
      'publishedDate',
      'updatedDate',
      'seoTitle',
      'metaDescription',
    ];

    for (const field of required) {
      if (!frontmatter[field]) {
        console.warn(`[generate-insights] Warning: Missing required field "${field}" in ${file}`);
      }
    }

    const isDraft = Boolean(frontmatter.draft);
    if (isProduction && isDraft) {
      console.log(`[generate-insights] Skipping draft in production: ${slug}`);
      continue;
    }

    const readingTime = calculateReadingTime(body);
    const tableOfContents = extractTableOfContents(body);
    const canonicalUrl = `https://ajithgrowth.com/insights/${slug}`;

    const articleData = {
      title: frontmatter.title || '',
      slug,
      category: frontmatter.category || 'google-ads',
      excerpt: frontmatter.excerpt || '',
      featuredImage: frontmatter.featuredImage || '/images/og-default.jpg',
      featuredImageAlt: frontmatter.featuredImageAlt || frontmatter.title || '',
      author: frontmatter.author || 'Ajith B R',
      publishedDate: frontmatter.publishedDate ? String(frontmatter.publishedDate) : '',
      updatedDate: frontmatter.updatedDate ? String(frontmatter.updatedDate) : (frontmatter.publishedDate ? String(frontmatter.publishedDate) : ''),
      featured: Boolean(frontmatter.featured),
      draft: isDraft,
      keywords: Array.isArray(frontmatter.keywords) ? frontmatter.keywords : [],
      seoTitle: frontmatter.seoTitle || frontmatter.title || '',
      metaDescription: frontmatter.metaDescription || frontmatter.excerpt || '',
      summary: Array.isArray(frontmatter.summary) ? frontmatter.summary : [],
      faqs: Array.isArray(frontmatter.faqs) ? frontmatter.faqs : [],
      body: body.trim(),
      readingTime,
      tableOfContents,
      canonicalUrl,

      // Compatibility aliases
      publishDate: frontmatter.publishedDate ? String(frontmatter.publishedDate) : '',
      modifiedDate: frontmatter.updatedDate ? String(frontmatter.updatedDate) : (frontmatter.publishedDate ? String(frontmatter.publishedDate) : ''),
      readTime: readingTime,
      imageAlt: frontmatter.featuredImageAlt || frontmatter.title || '',
      keyTakeaways: Array.isArray(frontmatter.summary) ? frontmatter.summary : [],
      relatedSlugs: [],
    };

    articles.push(articleData);
  }

  // Sort articles by publishedDate descending (newest first)
  articles.sort((a, b) => {
    const timeA = new Date(a.publishedDate).getTime() || 0;
    const timeB = new Date(b.publishedDate).getTime() || 0;
    return timeB - timeA;
  });

  const generatedTs = `// AUTO-GENERATED FILE BY scripts/generate-insights.ts
// DO NOT EDIT DIRECTLY. CMS content is stored in content/insights/*.md

import { Article } from '../types';

export const publishedArticles: Article[] = ${JSON.stringify(articles, null, 2)};

export function getAllArticles(): Article[] {
  return publishedArticles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return publishedArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return publishedArticles.filter((a) => a.category === categorySlug);
}

export function getFeaturedArticle(): Article | undefined {
  const marked = publishedArticles.find((a) => a.featured);
  return marked || publishedArticles[0];
}

export function getRelatedArticles(currentSlug: string, count: number = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  const others = publishedArticles.filter((a) => a.slug !== currentSlug && !a.draft);
  if (!current) return others.slice(0, count);

  // 1. Same category first
  const sameCategory = others.filter((a) => a.category === current.category);
  
  // 2. Different categories
  const otherCategories = others.filter((a) => a.category !== current.category);

  const combined = [...sameCategory, ...otherCategories];
  return combined.slice(0, count);
}
`;

  fs.writeFileSync(outputFile, generatedTs, 'utf-8');
  console.log(`[generate-insights] Generated ${articles.length} articles into ${outputFile}`);
}

generateInsights();
