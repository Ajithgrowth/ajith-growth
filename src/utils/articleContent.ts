import { TableOfContentsItem, ArticleSectionImage } from '../types';
import { createHeadingSlugger } from './slugify';

export interface ArticleContentBlock {
  markdown: string;
  imageAfter?: ArticleSectionImage;
}

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

/**
 * Distributes contextual section images naturally through markdown content.
 * Anchors images to H2 sections (Section Image 1 after H2 #1, Section Image 2 after H2 #2, etc.).
 * If fewer H2 sections exist than images, places remaining images between paragraph blocks
 * without breaking paragraphs, lists, tables, code blocks, or headings.
 */
export function buildArticleSectionsWithImages(
  body: string = '',
  rawImages?: ArticleSectionImage[]
): ArticleContentBlock[] {
  const content = body || '';
  const validImages = (rawImages || []).filter((img) => Boolean(img?.url?.trim()));

  if (validImages.length === 0 || !content.trim()) {
    return [{ markdown: content }];
  }

  // 1. Parse markdown line by line to locate H2 headings outside of code blocks
  const lines = content.split('\n');
  const sections: string[] = [];
  let currentSectionLines: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }

    // Detect H2 heading: line starts with "## " (and not "### ") outside code fences
    const isH2 = !inCodeBlock && trimmed.startsWith('## ') && !trimmed.startsWith('### ');

    if (isH2 && (sections.length > 0 || currentSectionLines.length > 0)) {
      sections.push(currentSectionLines.join('\n'));
      currentSectionLines = [line];
    } else {
      currentSectionLines.push(line);
    }
  }

  if (currentSectionLines.length > 0) {
    sections.push(currentSectionLines.join('\n'));
  }

  const h2Count = Math.max(0, sections.length - 1);

  // Case 1: We have at least as many H2 sections as valid images
  if (h2Count >= validImages.length) {
    const blocks: ArticleContentBlock[] = [];
    sections.forEach((sectionMarkdown, idx) => {
      // sections[0] is Intro (before 1st H2) -> no image after it
      // sections[1] is H2 #1 -> gets validImages[0]
      // sections[2] is H2 #2 -> gets validImages[1], etc.
      const imageIndex = idx - 1;
      const imageAfter = imageIndex >= 0 && imageIndex < validImages.length ? validImages[imageIndex] : undefined;
      blocks.push({
        markdown: sectionMarkdown,
        imageAfter,
      });
    });
    return blocks;
  }

  // Case 2: We have some H2 sections (1 to 3), but more images than H2 sections
  if (h2Count > 0) {
    const blocks: ArticleContentBlock[] = [];
    const remainingImages = [...validImages];

    // Assign 1 image per H2 section first
    for (let i = 0; i < sections.length; i++) {
      const sectionMarkdown = sections[i];
      if (i === 0) {
        // Intro section
        blocks.push({ markdown: sectionMarkdown });
      } else {
        const img = remainingImages.shift();
        blocks.push({
          markdown: sectionMarkdown,
          imageAfter: img,
        });
      }
    }

    // If there are still images left, distribute them into the last block by paragraph split
    if (remainingImages.length > 0 && blocks.length > 0) {
      const lastBlock = blocks[blocks.length - 1];
      const paragraphs = lastBlock.markdown.split(/\n\n+/);

      if (paragraphs.length > remainingImages.length + 1) {
        // We can split the last block between paragraphs
        const subBlocks: ArticleContentBlock[] = [];
        const step = Math.floor(paragraphs.length / (remainingImages.length + 1));
        let pIndex = 0;

        for (let imgIdx = 0; imgIdx < remainingImages.length; imgIdx++) {
          const nextPIndex = Math.min(paragraphs.length, pIndex + step);
          const chunk = paragraphs.slice(pIndex, nextPIndex).join('\n\n');
          subBlocks.push({
            markdown: chunk,
            imageAfter: remainingImages[imgIdx],
          });
          pIndex = nextPIndex;
        }

        if (pIndex < paragraphs.length) {
          subBlocks.push({
            markdown: paragraphs.slice(pIndex).join('\n\n'),
            imageAfter: lastBlock.imageAfter,
          });
        }

        // Replace the last block with subBlocks
        blocks.splice(blocks.length - 1, 1, ...subBlocks);
      } else {
        // If not enough paragraphs to safely split, place image at the end
        blocks.push({
          markdown: '',
          imageAfter: remainingImages.shift(),
        });
      }
    }

    return blocks;
  }

  // Case 3: No H2 headings at all in the article
  // Split content by paragraphs and distribute images between them
  const paragraphs = content.split(/\n\n+/);
  if (paragraphs.length <= validImages.length) {
    // Fewer or equal paragraphs than images
    return paragraphs.map((p, idx) => ({
      markdown: p,
      imageAfter: validImages[idx],
    }));
  }

  const blocks: ArticleContentBlock[] = [];
  const step = Math.floor(paragraphs.length / (validImages.length + 1));
  let pIndex = 0;

  for (let imgIdx = 0; imgIdx < validImages.length; imgIdx++) {
    const nextPIndex = Math.min(paragraphs.length, pIndex + step);
    const chunk = paragraphs.slice(pIndex, nextPIndex).join('\n\n');
    blocks.push({
      markdown: chunk,
      imageAfter: validImages[imgIdx],
    });
    pIndex = nextPIndex;
  }

  if (pIndex < paragraphs.length) {
    blocks.push({
      markdown: paragraphs.slice(pIndex).join('\n\n'),
    });
  }

  return blocks;
}
