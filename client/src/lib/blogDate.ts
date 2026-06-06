import type { Lang } from "@/i18n/LangContext";

export function formatBlogDate(isoDate: string, lang: Lang) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(lang === "nl" ? "nl-NL" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
