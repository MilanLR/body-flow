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
    const nlContactHtml = renderApp("/nl/contact");
    const costsHtml = renderApp("/nl/kosten");

    expect(contactHtml).toContain("Get in touch with BodyFlow Amsterdam");
    expect(contactHtml).toContain("Want to know more or schedule an intake directly?");
    expect(nlContactHtml).toContain("Meer weten of direct een intake plannen?");
    expect(
      nlContactHtml.indexOf("Meer weten of direct een intake plannen?"),
    ).toBeLessThan(nlContactHtml.indexOf("Openingstijden"));
    expect(
      contactHtml.indexOf("Want to know more or schedule an intake directly?"),
    ).toBeLessThan(contactHtml.indexOf("Opening hours"));
    expect(costsHtml).toContain("Wat kost EECP-therapie bij BodyFlow Amsterdam?");
    expect(costsHtml).toContain('href="/nl/contact"');
    expect(contactHtml).not.toContain("View more information");
    expect(contactHtml).not.toContain('href="#contact"');
    expect(contactHtml).not.toContain("This localized page is a placeholder");
    expect(costsHtml).not.toContain("This localized page is a placeholder");
  });

  it("removes the old treatment narrative section from the focused treatment page", () => {
    const html = renderApp("/en/eecp-therapy");

    expect(html).toContain("What is EECP?");
    expect(html).not.toContain("A treatment that combines rest with circulatory activation");
  });

  it("renders the science page with study evidence in both languages", () => {
    const nlHtml = renderApp("/nl/wetenschap");
    const enHtml = renderApp("/en/science");

    expect(nlHtml).toContain("Klinische studies per indicatie");
    expect(nlHtml).toContain("Sinvhal");
    expect(nlHtml).toContain("Werkingsmechanismen");
    expect(enHtml).toContain("Clinical studies by indication");
    expect(enHtml).toContain("Mechanisms of action");
  });

  it("renders the privacy policy page in Dutch and English with GDPR details", () => {
    const nlHtml = renderApp("/nl/privacyverklaring");
    const enHtml = renderApp("/en/privacy-policy");

    expect(nlHtml).toContain("Privacyverklaring - Contactformulier &amp; Intakes");
    expect(nlHtml).toContain("Welke gegevens verzamelen wij?");
    expect(nlHtml).toContain("Bewaartermijn");
    expect(enHtml).toContain("Privacy Statement - Contact Form &amp; Intakes");
    expect(enHtml).toContain("What personal data do we collect?");
    expect(enHtml).toContain("Retention period");
  });

  it("renders the English 404 copy for an unknown English route", () => {
    const html = renderApp("/en/not-a-real-page");

    expect(html).toContain("Page Not Found");
    expect(html).toContain("It may have been moved or deleted.");
    expect(html).not.toContain("Pagina niet gevonden");
  });

  it("records the root redirect to the Dutch home page", () => {
    const ssrContext: { redirectTo?: string } = {};

    renderApp("/", ssrContext);

    expect(ssrContext.redirectTo).toBe("/nl/");
  });
});
