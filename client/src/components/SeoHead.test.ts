// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterAll, beforeAll, afterEach, describe, expect, it } from "vitest";

import { SeoHead } from "./SeoHead";

function renderSeoHead(
  container: HTMLDivElement,
  title: string,
  description: string,
  pathname: string,
) {
  const root = createRoot(container);

  return {
    root,
    render: async () => {
      await act(async () => {
        root.render(createElement(SeoHead, { title, description, pathname }));
      });
    },
    rerender: async (nextTitle: string, nextDescription: string, nextPathname: string) => {
      await act(async () => {
        root.render(createElement(SeoHead, {
          title: nextTitle,
          description: nextDescription,
          pathname: nextPathname,
        }));
      });
    },
    unmount: async () => {
      await act(async () => {
        root.unmount();
      });
    },
  };
}

afterEach(() => {
  document.head.querySelectorAll('[data-seo="page"]').forEach((element) => element.remove());
  document.title = "";
});

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
});

afterAll(() => {
  delete (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
    .IS_REACT_ACT_ENVIRONMENT;
});

describe("SeoHead", () => {
  it("updates title, canonical, image tags, and alternates on mount and rerender", async () => {
    document.head.innerHTML = `
      <meta name="description" content="BodyFlow Amsterdam">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="BodyFlow Amsterdam">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="robots" content="index,follow">
    `;

    const container = document.createElement("div");
    document.body.appendChild(container);

    const instance = renderSeoHead(
      container,
      "Kosten | BodyFlow Amsterdam",
      "Prijzen en trajecten bij BodyFlow Amsterdam",
      "/nl/kosten",
    );

    await instance.render();

    expect(document.title).toBe("Kosten | BodyFlow Amsterdam");
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[property="og:type"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[property="og:site_name"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="twitter:card"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      "Prijzen en trajecten bij BodyFlow Amsterdam",
    );
    expect(document.head.querySelector('meta[property="og:type"]')?.getAttribute("content")).toBe(
      "website",
    );
    expect(
      document.head.querySelector('meta[property="og:site_name"]')?.getAttribute("content"),
    ).toBe("BodyFlow Amsterdam");
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe(
      "summary_large_image",
    );
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "index,follow",
    );
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://body-flow.nl/nl/kosten",
    );
    expect(document.head.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe(
      "https://body-flow.nl/og-image.jpg",
    );
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(
      "https://body-flow.nl/og-image.jpg",
    );
    expect(
      Array.from(document.head.querySelectorAll('link[rel="alternate"]')).map((element) => ({
        hrefLang: element.getAttribute("hreflang"),
        href: element.getAttribute("href"),
      })),
    ).toEqual([
      { hrefLang: "nl", href: "https://body-flow.nl/nl/kosten" },
      { hrefLang: "en", href: "https://body-flow.nl/en/costs" },
      { hrefLang: "x-default", href: "https://body-flow.nl/nl/" },
    ]);

    await instance.rerender(
      "Costs | BodyFlow Amsterdam",
      "Pricing and treatment at BodyFlow Amsterdam",
      "/en/costs",
    );

    expect(document.title).toBe("Costs | BodyFlow Amsterdam");
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[property="og:type"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[property="og:site_name"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="twitter:card"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://body-flow.nl/en/costs",
    );
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('link[rel="alternate"]')).toHaveLength(3);
    expect(document.head.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe(
      "https://body-flow.nl/og-image.jpg",
    );
    expect(
      Array.from(document.head.querySelectorAll('link[rel="alternate"]')).map((element) => ({
        hrefLang: element.getAttribute("hreflang"),
        href: element.getAttribute("href"),
      })),
    ).toEqual([
      { hrefLang: "nl", href: "https://body-flow.nl/nl/kosten" },
      { hrefLang: "en", href: "https://body-flow.nl/en/costs" },
      { hrefLang: "x-default", href: "https://body-flow.nl/nl/" },
    ]);

    await instance.unmount();
    document.body.removeChild(container);
  });
});
