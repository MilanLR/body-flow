import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";

import App from "./App";

function renderApp(path: string, ssrContext: { redirectTo?: string } = {}) {
  return renderToStaticMarkup(
    <Router ssrPath={path} ssrContext={ssrContext}>
      <App />
    </Router>,
  );
}

describe("App routing integration", () => {
  it("renders the localized home page for a route", () => {
    const html = renderApp("/en/");

    expect(html).toContain("Redefine your vitality");
    expect(html).not.toContain("This localized page is a placeholder");
  });

  it("renders the focused localized pages instead of placeholders", () => {
    const contactHtml = renderApp("/en/contact");
    const costsHtml = renderApp("/nl/kosten");

    expect(contactHtml).toContain("Get in touch with BodyFlow Amsterdam");
    expect(costsHtml).toContain("Wat kost EECP-therapie bij BodyFlow Amsterdam?");
    expect(costsHtml).toContain('href="/nl/contact"');
    expect(contactHtml).not.toContain("This localized page is a placeholder");
    expect(costsHtml).not.toContain("This localized page is a placeholder");
  });

  it("records the root redirect to the Dutch home page", () => {
    const ssrContext: { redirectTo?: string } = {};

    renderApp("/", ssrContext);

    expect(ssrContext.redirectTo).toBe("/nl/");
  });
});
