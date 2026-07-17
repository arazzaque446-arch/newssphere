export interface Article {
  id: string;

  slug: string | null;

  title: string;

  excerpt: string;

  content: string;

  category: string;

  author: string;

  location: string;

  publishedAt: string;

  createdAt: string;

  updatedAt: string;

  readTime: number;

  imageUrl: string;

  imageAlt: string;

  featured: boolean;

  trending: boolean;

  breaking: boolean;

  published: boolean;

  views: number;

  seoTitle: string;

  seoDescription: string;

  tags: string[];
}

export interface CategoryCard {
  category: string;

  description: string;

  articleCount: number;

  imageUrl: string;
}

export interface NavItem {
  label: string;

  href: string;
}

export interface FooterLink {
  label: string;

  href: string;
}

export interface SocialLink {
  name: string;

  href: string;

  icon?: string;
}

export interface NewsletterForm {
  email: string;
}