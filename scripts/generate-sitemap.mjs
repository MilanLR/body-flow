import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { LOCALIZED_ROUTES } from "../client/src/lib/routes.ts";
import { buildAlternates, buildCanonicalUrl } from "../client/src/lib/seo.ts";

const OUTPUT_PATHS = [
  resolve("client/public/sitemap.xml"),
  resolve("dist/public/sitemap.xml"),
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const pages = LOCALIZED_ROUTES.flatMap(({ paths }) =>
  Object.values(paths).map((pathname) => ({
    loc: buildCanonicalUrl(pathname),
    alternates: buildAlternates(pathname),
  })),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    ({ loc, alternates }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternates
  .map(
    (alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hrefLang)}" href="${escapeXml(alternate.href)}" />`,
  )
  .join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

for (const outputPath of OUTPUT_PATHS) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, xml);
}
