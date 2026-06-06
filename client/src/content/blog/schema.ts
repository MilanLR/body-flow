import type { Lang } from "@/i18n/LangContext";
import { buildCanonicalUrl } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

import { getBlogIndexPath, getBlogPostPath } from "./registry";
import type { BlogPost } from "./types";

export function buildArticleSchema(post: BlogPost, lang: Lang) {
  const locale = post.locales[lang];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale.title,
    description: locale.seoDescription,
    datePublished: post.datePublished,
    inLanguage: lang,
    mainEntityOfPage: buildCanonicalUrl(getBlogPostPath(lang, post)),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: `${SITE_URL}/bodyflow-logo.png`,
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function buildBreadcrumbSchema(
  post: BlogPost,
  lang: Lang,
  labels: { home: string; blog: string }
) {
  const locale = post.locales[lang];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: labels.home,
        item: buildCanonicalUrl(`/${lang}/`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: labels.blog,
        item: buildCanonicalUrl(getBlogIndexPath(lang)),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: locale.title,
        item: buildCanonicalUrl(getBlogPostPath(lang, post)),
      },
    ],
  };
}

export function buildFaqSchema(post: BlogPost, lang: Lang) {
  const locale = post.locales[lang];

  if (!locale.faq || locale.faq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: locale.faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
