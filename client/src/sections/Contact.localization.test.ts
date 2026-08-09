import { describe, expect, it } from "vitest";

import { createContactSchema, getContactSubmitErrorMessage } from "./Contact";

describe("Contact localization", () => {
  it("uses English validation and submit error copy on English routes", () => {
    const schema = createContactSchema("en");
    const result = schema.safeParse({
      voornaam: "",
      achternaam: "",
      telefoon: "",
      email: "not-an-email",
      opmerkingen: "",
      privacyConsent: false,
    });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error("Expected English contact validation to fail");
    }

    expect(result.error.flatten().fieldErrors.voornaam).toContain("Required");
    expect(result.error.flatten().fieldErrors.email).toContain("Invalid email address");
    expect(result.error.flatten().fieldErrors.privacyConsent).toContain(
      "You must agree to the privacy notice to submit the form."
    );
    expect(getContactSubmitErrorMessage("en")).toBe("Something went wrong. Please try again.");
  });

  it("requires explicit privacy consent in Dutch schema", () => {
    const schema = createContactSchema("nl");
    const result = schema.safeParse({
      voornaam: "Jan",
      achternaam: "Jansen",
      email: "jan@example.com",
      contactvoorkeur: "email",
      privacyConsent: false,
    });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error("Expected Dutch contact validation to fail without privacy consent");
    }

    expect(result.error.flatten().fieldErrors.privacyConsent).toContain(
      "U dient akkoord te gaan met de privacyverklaring om het formulier te versturen."
    );
  });
});
