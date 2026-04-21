import { useEffect } from "react";

import { buildAlternates, buildCanonicalUrl, getPrimaryImageUrl } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

type SeoArgs = {
  title: string;
  description: string;
  pathname: string;
};

function upsertTag(
  document: Document,
  selector: string,
  tagName: string,
  attributes: Record<string, string>,
) {
  const existing = document.head.querySelector(selector);
  const element = existing ?? document.createElement(tagName);

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }

  if (!existing) {
    document.head.appendChild(element);
  }

  return element;
}

function upsertSingletonTag(
  document: Document,
  selector: string,
  tagName: string,
  attributes: Record<string, string>,
) {
  const existing = document.head.querySelector(selector);
  const element = existing ?? document.createElement(tagName);

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }

  if (!existing) {
    element.setAttribute("data-seo", "page");
    document.head.appendChild(element);
  }

  return element;
}

export function usePageSeo({ title, description, pathname }: SeoArgs) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const previousTitle = document.title;
    document.title = title;

    upsertTag(document, 'link[data-seo="page"][rel="canonical"]', "link", {
      "data-seo": "page",
      rel: "canonical",
      href: buildCanonicalUrl(pathname),
    });

    upsertSingletonTag(document, 'meta[name="description"]', "meta", {
      name: "description",
      content: description,
    });

    upsertSingletonTag(document, 'meta[property="og:type"]', "meta", {
      property: "og:type",
      content: "website",
    });

    upsertSingletonTag(document, 'meta[property="og:site_name"]', "meta", {
      property: "og:site_name",
      content: SITE_NAME,
    });

    upsertSingletonTag(document, 'meta[name="twitter:card"]', "meta", {
      name: "twitter:card",
      content: "summary_large_image",
    });

    upsertSingletonTag(document, 'meta[name="robots"]', "meta", {
      name: "robots",
      content: "index,follow",
    });

    upsertSingletonTag(document, 'meta[property="og:title"]', "meta", {
      property: "og:title",
      content: title,
    });

    upsertSingletonTag(document, 'meta[property="og:description"]', "meta", {
      property: "og:description",
      content: description,
    });

    upsertSingletonTag(document, 'meta[property="og:image"]', "meta", {
      property: "og:image",
      content: getPrimaryImageUrl(),
    });

    upsertSingletonTag(document, 'meta[property="og:url"]', "meta", {
      property: "og:url",
      content: buildCanonicalUrl(pathname),
    });

    upsertSingletonTag(document, 'meta[name="twitter:title"]', "meta", {
      name: "twitter:title",
      content: title,
    });

    upsertSingletonTag(document, 'meta[name="twitter:description"]', "meta", {
      name: "twitter:description",
      content: description,
    });

    upsertSingletonTag(document, 'meta[name="twitter:image"]', "meta", {
      name: "twitter:image",
      content: getPrimaryImageUrl(),
    });

    for (const alternate of buildAlternates(pathname)) {
      upsertTag(
        document,
        `link[data-seo="page"][rel="alternate"][hreflang="${alternate.hrefLang}"]`,
        "link",
        {
          "data-seo": "page",
          rel: "alternate",
          hreflang: alternate.hrefLang,
          href: alternate.href,
        },
      );
    }

    return () => {
      document.title = previousTitle;

      for (const element of Array.from(document.head.querySelectorAll('[data-seo="page"]'))) {
        element.remove();
      }
    };
  }, [description, pathname, title]);
}
