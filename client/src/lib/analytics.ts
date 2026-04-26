type AnalyticsEnv = Partial<Record<"VITE_ANALYTICS_ENDPOINT" | "VITE_ANALYTICS_WEBSITE_ID", string>>;

type AnalyticsConfig = {
  endpoint: string;
  websiteId: string;
};

function normalizeValue(value?: string) {
  return value?.trim() ?? "";
}

export function getAnalyticsConfig(env: AnalyticsEnv): AnalyticsConfig | null {
  const endpoint = normalizeValue(env.VITE_ANALYTICS_ENDPOINT).replace(/\/+$/, "");
  const websiteId = normalizeValue(env.VITE_ANALYTICS_WEBSITE_ID);

  if (!endpoint || !websiteId) {
    return null;
  }

  return { endpoint, websiteId };
}

export function injectAnalyticsScript(
  doc: Document,
  config: AnalyticsConfig,
) {
  const selector = 'script[data-analytics="umami"]';
  const existing = doc.head.querySelector<HTMLScriptElement>(selector);

  if (existing) {
    return existing;
  }

  const script = doc.createElement("script");
  script.defer = true;
  script.dataset.analytics = "umami";
  script.dataset.websiteId = config.websiteId;
  script.src = `${config.endpoint}/umami`;
  doc.head.appendChild(script);

  return script;
}

export function initAnalytics(
  env: AnalyticsEnv,
  doc: Document | undefined = typeof document === "undefined" ? undefined : document,
) {
  const config = getAnalyticsConfig(env);

  if (!config || !doc) {
    return null;
  }

  return injectAnalyticsScript(doc, config);
}
