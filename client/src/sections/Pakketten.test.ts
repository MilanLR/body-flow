import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createElement } from "react";

import en from "@/i18n/en.json";
import { LangProvider, createLangContextValue } from "@/i18n/LangContext";
import nl from "@/i18n/nl.json";

import { getPackageVariantData, Pakketten } from "./Pakketten";

describe("Pakketten package variants", () => {
  it("returns Flow packages with per-session pricing copy", () => {
    const data = getPackageVariantData(en.pakketten, "flow");

    expect(data.label).toBe("The Flow");
    expect(data.packages).toHaveLength(3);
    expect(data.packages[0]).toMatchObject({
      name: "Flow Essential",
      price: "€159",
      priceNote: "per session",
    });
  });

  it("returns Clinical packages with package-level pricing copy", () => {
    const data = getPackageVariantData(en.pakketten, "clinical");

    expect(data.label).toBe("Clinical");
    expect(data.packages).toHaveLength(3);
    expect(data.packages[1]).toMatchObject({
      name: "Clinical Advanced",
      price: "€5.715,00",
      priceNote: "for 35 sessions",
      featured: true,
    });
  });

  it("exposes both variants in Dutch translations too", () => {
    const flow = getPackageVariantData(nl.pakketten, "flow");
    const clinical = getPackageVariantData(nl.pakketten, "clinical");

    expect(flow.label).toBe("The Flow");
    expect(clinical.label).toBe("Clinical");
    expect(clinical.packages[2].priceNote).toBe("voor 35 sessies");
  });

  it("renders the intake block before the flow clinical toggle and package cards", () => {
    const html = renderToStaticMarkup(
      createElement(
        LangProvider,
        { value: createLangContextValue("nl", "home", () => {}) },
        createElement(Pakketten),
      ),
    );

    const intakeIndex = html.indexOf(nl.pakketten.intakeText);
    const toggleIndex = html.indexOf(`aria-label="${nl.pakketten.variantLabel}"`);
    const firstPackageIndex = html.indexOf(
      nl.pakketten.packageVariants.flow.packages[0].name,
    );

    expect(intakeIndex).toBeGreaterThan(-1);
    expect(toggleIndex).toBeGreaterThan(-1);
    expect(firstPackageIndex).toBeGreaterThan(-1);
    expect(intakeIndex).toBeLessThan(toggleIndex);
    expect(toggleIndex).toBeLessThan(firstPackageIndex);
  });
});
