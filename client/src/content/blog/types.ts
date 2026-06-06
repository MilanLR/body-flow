import type { PageKey } from "@/lib/routes";

export type BlogSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogInternalLink = {
  label: string;
  page: PageKey;
};

export type BlogPostLocale = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  sections: BlogSection[];
  faq?: BlogFaqItem[];
  internalLinks?: BlogInternalLink[];
};

export type BlogPost = {
  key: string;
  datePublished: string; // YYYY-MM-DD
  locales: {
    nl: BlogPostLocale;
    en: BlogPostLocale;
  };
};
