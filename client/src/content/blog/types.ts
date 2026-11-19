import type { Lang } from "@/i18n/LangContext";
import type { PageKey } from "@/lib/routes";

export type BlogSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: boolean;
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
  sources?: string[];
};

export type BlogImage = {
  src: string;
  alt: Record<Lang, string>;
};

export type BlogPost = {
  key: string;
  datePublished: string; // YYYY-MM-DD
  image?: BlogImage;
  locales: {
    nl: BlogPostLocale;
    en: BlogPostLocale;
  };
};
