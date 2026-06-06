import { describe, expect, it } from "vitest";

import { getAlternateLanguagePath } from "@/lib/routes";

import {
  BLOG_POSTS,
  getAllBlogPaths,
  getBlogFromPath,
  getBlogPostPath,
} from "./registry";

const LANGS = ["nl", "en"] as const;

describe("blog registry", () => {
  it("has unique slugs per language", () => {
    for (const lang of LANGS) {
      const slugs = BLOG_POSTS.map((post) => post.locales[lang].slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("uses kebab-case slugs", () => {
    for (const post of BLOG_POSTS) {
      for (const lang of LANGS) {
        expect(post.locales[lang].slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      }
    }
  });

  it("uses valid ISO publish dates", () => {
    for (const post of BLOG_POSTS) {
      expect(post.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(post.datePublished).getTime())).toBe(false);
    }
  });

  it("keeps SEO titles and descriptions within limits", () => {
    for (const post of BLOG_POSTS) {
      for (const lang of LANGS) {
        const locale = post.locales[lang];
        expect(locale.seoTitle.length).toBeLessThanOrEqual(60);
        expect(locale.seoDescription.length).toBeLessThanOrEqual(155);
        expect(locale.title.length).toBeGreaterThan(0);
        expect(locale.intro.length).toBeGreaterThan(0);
        expect(locale.sections.length).toBeGreaterThan(0);
      }
    }
  });

  it("resolves post paths back to the same post", () => {
    for (const post of BLOG_POSTS) {
      for (const lang of LANGS) {
        const location = getBlogFromPath(getBlogPostPath(lang, post));
        expect(location).toMatchObject({ kind: "post", lang });
        expect(location?.kind === "post" && location.post.key).toBe(post.key);
      }
    }
  });

  it("exposes the blog index and every post in the sitemap paths", () => {
    const paths = getAllBlogPaths();
    expect(paths).toHaveLength(1 + BLOG_POSTS.length);
    expect(paths[0].paths.nl).toBe("/nl/blog");
    expect(paths[0].paths.en).toBe("/en/blog");
  });

  it("switches language between translated post slugs", () => {
    for (const post of BLOG_POSTS) {
      expect(getAlternateLanguagePath(getBlogPostPath("nl", post), "en")).toBe(
        getBlogPostPath("en", post),
      );
      expect(getAlternateLanguagePath(getBlogPostPath("en", post), "nl")).toBe(
        getBlogPostPath("nl", post),
      );
    }
    expect(getAlternateLanguagePath("/nl/blog", "en")).toBe("/en/blog");
  });
});
