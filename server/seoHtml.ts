import { getRouteSeo } from "../client/src/lib/routeSeo";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMetaTag(html: string, selector: RegExp, replacement: string) {
  return html.match(selector) ? html.replace(selector, replacement) : html;
}

export function injectSeoIntoHtml(html: string, pathname: string) {
  const seo = getRouteSeo(pathname);
  const alternateTags = seo.alternates
    .map(
      (alternate) =>
        `<link data-seo="page" rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.href}" />`,
    )
    .join("\n    ");

  let nextHtml = html.replace(/<html lang="[^"]*">/, `<html lang="${seo.lang}">`);
  nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  nextHtml = replaceMetaTag(
    nextHtml,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  );
  nextHtml = replaceMetaTag(
    nextHtml,
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="website" />`,
  );
  nextHtml = replaceMetaTag(
    nextHtml,
    /<meta property="og:site_name" content="[^"]*" \/>/,
    `<meta property="og:site_name" content="${escapeHtml(seo.siteName)}" />`,
  );
  nextHtml = replaceMetaTag(
    nextHtml,
    /<meta name="twitter:card" content="[^"]*" \/>/,
    `<meta name="twitter:card" content="summary_large_image" />`,
  );
  nextHtml = replaceMetaTag(
    nextHtml,
    /<meta name="robots" content="[^"]*" \/>/,
    `<meta name="robots" content="${seo.robots}" />`,
  );

  const pageTags = [
    `<link data-seo="page" rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:image" content="${seo.ogImage}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.ogImage}" />`,
    alternateTags,
  ].join("\n    ");

  return nextHtml.replace("</head>", `    ${pageTags}\n  </head>`);
}
