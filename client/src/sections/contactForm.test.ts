import { describe, expect, it } from "vitest";

import { buildContactPayload, WEB3FORMS_ACCESS_KEY } from "./contactForm";

describe("contact form payload", () => {
  it("uses the inline Web3Forms access key", () => {
    const payload = buildContactPayload({
      voornaam: "Milan",
      achternaam: "Tester",
      telefoon: "0612345678",
      email: "milan@example.com",
      contactvoorkeur: "email",
      opmerkingen: "Hoi",
    });

    expect(WEB3FORMS_ACCESS_KEY).toBe("4369b581-fd4a-4dbc-88a7-9d9a3a921854");
    expect(payload.access_key).toBe(WEB3FORMS_ACCESS_KEY);
  });
});
