import { describe, expect, it } from "vitest";

import en from "@/i18n/en.json";
import nl from "@/i18n/nl.json";

import { getPackageVariantData } from "./Pakketten";

describe("Pakketten package variants", () => {
  it("returns Flow packages with per-session pricing copy", () => {
    const data = getPackageVariantData(en.pakketten, "flow");

    expect(data.label).toBe("The Flow");
    expect(data.packages).toHaveLength(3);
    expect(data.packages[0]).toMatchObject({
      name: "The Flow Essential",
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
      price: "€5,238.00",
      priceNote: "for 32 sessions",
      featured: true,
    });
  });

  it("exposes both variants in Dutch translations too", () => {
    const flow = getPackageVariantData(nl.pakketten, "flow");
    const clinical = getPackageVariantData(nl.pakketten, "clinical");

    expect(flow.label).toBe("The Flow");
    expect(clinical.label).toBe("Clinical");
    expect(clinical.packages[2].priceNote).toBe("voor 32 sessies");
  });
});
