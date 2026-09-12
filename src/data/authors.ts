import { siteConfig } from './siteConfig';

export interface Author {
  id: string;
  name: string;
  role: string;
  expertise: string;
  experience: string;
  profileUrl: string;
  contactUrl: string;
  image?: string;
  initials: string;
  bio: string;
}

export const defaultAuthor: Author = {
  id: 'ajith-b-r',
  name: siteConfig.founder.name,
  role: siteConfig.founder.role,
  expertise: siteConfig.founder.positioning,
  experience: siteConfig.founder.experience,
  profileUrl: '/about',
  contactUrl: '/contact',
  image: '/images/ajith-profile.webp',
  initials: 'AG',
  bio: siteConfig.founder.bio,
};

export const authors: Record<string, Author> = {
  'Ajith B R': defaultAuthor,
  'ajith-b-r': defaultAuthor,
  'Ajith': defaultAuthor,
};

export function getAuthor(nameOrId?: string): Author {
  if (!nameOrId) return defaultAuthor;
  return authors[nameOrId] || defaultAuthor;
}
