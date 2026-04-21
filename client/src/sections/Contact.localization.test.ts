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
    });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error("Expected English contact validation to fail");
    }

    expect(result.error.flatten().fieldErrors.voornaam).toContain("Required");
    expect(result.error.flatten().fieldErrors.email).toContain("Invalid email address");
    expect(getContactSubmitErrorMessage("en")).toBe("Something went wrong. Please try again.");
  });
});
