import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Article } from '../types';
import { Link } from '../utils/router';
import { trackEvent } from '../utils/analytics';
import { getCategoryLabel } from '../data/insightCategories';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  key?: string | number;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const categoryLabel = getCategoryLabel(article.category);
  const imageAlt = article.featuredImageAlt || article.imageAlt || article.title;
  const dateStr = article.publishedDate || article.publishDate;
  const readingTimeStr = article.readingTime || article.readTime || '5 min read';

  const handleClick = () => {
    trackEvent('article_click', {
      slug: article.slug,
      title: article.title,
      category: categoryLabel,
    });
  };

  if (featured) {
    return (
      <article className="bg-white rounded-2xl border border-[#DCE5EE] overflow-hidden shadow-sm hover:shadow-md transition-shadow group grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-slate-900">
          <img
            src={article.featuredImage}
            alt={imageAlt}
            width={800}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-md bg-[#0D1B2A]/90 backdrop-blur-sm text-sky-300 text-xs font-supporting font-semibold uppercase tracking-wider border border-slate-700">
              Featured Insight
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#5F6B7A] font-supporting mb-3">
              <Link
                href={`/insights/${article.category}`}
                className="text-[#0D1B2A] hover:text-sky-800 font-semibold transition-colors"
              >
                {categoryLabel}
              </Link>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readingTimeStr}
              </span>
            </div>


            <h3 className="text-xl sm:text-2xl font-heading font-semibold text-[#0D1B2A] group-hover:text-sky-800 transition-colors mb-3 leading-snug">
              <Link href={`/insights/${article.slug}`} onClick={handleClick}>
                {article.title}
              </Link>
            </h3>

            <p className="text-[#5F6B7A] font-body text-sm leading-relaxed mb-6">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-[#DCE5EE] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#5F6B7A] font-supporting">
              <Calendar className="w-3.5 h-3.5" />
              <span>{dateStr}</span>
            </div>

            <Link
              href={`/insights/${article.slug}`}
              onClick={handleClick}
              className="inline-flex items-center gap-1.5 text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] group-hover:text-sky-700 transition-colors"
            >
              <span>Read Analysis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl border border-[#DCE5EE] overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between h-full">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={article.featuredImage}
            alt={imageAlt}
            width={600}
            height={380}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Link
              href={`/insights/${article.category}`}
              className="px-2.5 py-0.5 rounded bg-white/95 hover:bg-white text-[#0D1B2A] hover:text-sky-800 text-[11px] font-supporting font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              {categoryLabel}
            </Link>
          </div>

        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[11px] text-[#5F6B7A] font-supporting mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {dateStr}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTimeStr}
            </span>
          </div>

          <h3 className="font-heading font-semibold text-base sm:text-lg text-[#0D1B2A] group-hover:text-sky-800 transition-colors mb-2.5 leading-snug line-clamp-2">
            <Link href={`/insights/${article.slug}`} onClick={handleClick}>
              {article.title}
            </Link>
          </h3>

          <p className="text-[#5F6B7A] font-body text-xs sm:text-sm leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 mt-auto">
        <div className="pt-4 border-t border-[#DCE5EE] flex items-center justify-between">
          <Link
            href={`/insights/${article.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold font-supporting uppercase tracking-wider text-[#0D1B2A] group-hover:text-sky-800 transition-colors"
          >
            <span>Read Strategy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
