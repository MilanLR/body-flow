import type { Lang } from "@/i18n/LangContext";

import { eecpTherapieBijLongcovid } from "./posts/eecp-therapie-bij-longcovid";
import type { BlogPost } from "./types";

export const BLOG_POSTS: ReadonlyArray<BlogPost> = [
  eecpTherapieBijLongcovid,
];

export function getBlogIndexPath(lang: Lang) {
  return `/${lang}/blog`;
}

export function getBlogPostPath(lang: Lang, post: BlogPost) {
  return `${getBlogIndexPath(lang)}/${post.locales[lang].slug}`;
}

export function getBlogPostBySlug(lang: Lang, slug: string) {
  return BLOG_POSTS.find(post => post.locales[lang].slug === slug);
}

export type BlogLocation =
  | { kind: "index"; lang: Lang }
  | { kind: "post"; lang: Lang; post: BlogPost };

export function getBlogFromPath(pathname: string): BlogLocation | null {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const match = normalized.match(/^\/(nl|en)\/blog(?:\/([^/]+))?$/);

  if (!match) {
    return null;
  }

  const lang = match[1] as Lang;

  if (!match[2]) {
    return { kind: "index", lang };
  }

  const post = getBlogPostBySlug(lang, match[2]);
  return post ? { kind: "post", lang, post } : null;
}

export function getAllBlogPaths(): ReadonlyArray<{
  paths: Record<Lang, string>;
}> {
  return [
    { paths: { nl: getBlogIndexPath("nl"), en: getBlogIndexPath("en") } },
    ...BLOG_POSTS.map(post => ({
      paths: {
        nl: getBlogPostPath("nl", post),
        en: getBlogPostPath("en", post),
      },
    })),
  ];
}

export function getSortedBlogPosts() {
  return [...BLOG_POSTS].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  );
}
