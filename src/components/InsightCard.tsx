import { ArticleCard } from './ArticleCard';
import { Article } from '../types';

export interface InsightCardProps {
  article: Article;
  featured?: boolean;
}

export function InsightCard({ article, featured = false }: InsightCardProps) {
  return <ArticleCard article={article} featured={featured} />;
}
