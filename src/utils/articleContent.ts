import { TableOfContentsItem } from '../types';
import { createHeadingSlugger } from './slugify';

/**
 * Calculates reading time based on ~220 words per minute, minimum 1 min.
 */
export function calculateReadingTime(body: string = ''): string {
  if (!body) return '1 min read';
  const cleanText = body
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/#+\s+/g, '') // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[^\w\s]/g, ' '); // special characters

  const words = cleanText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));
  return `${minutes} min read`;
}

/**
 * Extracts Table of Contents from H2 and H3 markdown headings.
 */
export function extractTableOfContents(body: string = ''): TableOfContentsItem[] {
  if (!body) return [];
  const lines = body.split('\n');
  const toc: TableOfContentsItem[] = [];
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
      // Clean up markdown formatting from heading title (e.g. bold, links, code)
      const cleanTitle = headingText
        .replace(/\*\*|__/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      const id = getHeadingId(cleanTitle);

      toc.push({ id, title: cleanTitle, level });
    }
  }

  return toc;
}

/**
 * Parses quick_summary TEXT into individual takeaway bullet points.
 * Handles bullet prefixes (-, *, •, numbers), multiline strings, or single sentences.
 */
export function parseQuickSummary(quickSummary?: string): string[] {
  if (!quickSummary || !quickSummary.trim()) return [];

  const raw = quickSummary.trim();

  // If contains newlines, split by line
  if (raw.includes('\n')) {
    const lines = raw
      .split('\n')
      .map((l) => l.replace(/^(\s*[-*•]|\s*\d+\.)\s*/, '').trim())
      .filter((l) => l.length > 0);

    if (lines.length > 0) return lines;
  }

  // If starts with bullet or single paragraph
  const cleaned = raw.replace(/^(\s*[-*•]|\s*\d+\.)\s*/, '').trim();
  return cleaned ? [cleaned] : [];
}
