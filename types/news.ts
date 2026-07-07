export type NewsCategory =
  | "Local"
  | "India"
  | "World"
  | "Politics"
  | "Business"
  | "Technology"
  | "Sports"
  | "Health"
  | "Entertainment"
  | "Events";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  author: string;
  publishedAt: string;
  readTime: number;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CategoryCard {
  category: NewsCategory;
  description: string;
  articleCount: number;
  imageUrl: string;
}
