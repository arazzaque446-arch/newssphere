export interface Article {
  id: string;

  title: string;

  slug: string;

  summary: string;

  content: string;

  image_url: string;

  category: string;

  location: string;

  author: string;

  source: string;

  published: boolean;

  featured: boolean;

  breaking: boolean;

  created_at: string;

  updated_at: string;

  published_at: string;

  seo_title: string;

  seo_description: string;

  tags: string[];

  views: number;

  read_time: number;
}