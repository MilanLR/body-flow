export type ContactPayloadInput = {
  voornaam: string;
  achternaam: string;
  telefoon?: string;
  email: string;
  contactvoorkeur: "telefoon" | "email";
  opmerkingen?: string;
};

export const WEB3FORMS_ACCESS_KEY =
  "4369b581-fd4a-4dbc-88a7-9d9a3a921854";

export function buildContactPayload(data: ContactPayloadInput) {
  return {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: "Nieuwe sessie aanvraag - BodyFlow Amsterdam",
    from_name: `${data.voornaam} ${data.achternaam}`,
    ...data,
  };
}
