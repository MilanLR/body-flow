type AnalyticsEnv = Partial<
  Record<
    | "VITE_ANALYTICS_ENDPOINT"
    | "VITE_ANALYTICS_WEBSITE_ID"
    | "VITE_GA_MEASUREMENT_ID",
    string
  >
>;

type UmamiConfig = {
  endpoint: string;
  websiteId: string;
};

type AnalyticsConfig = {
  umami: UmamiConfig | null;
  gaMeasurementId: string | null;
};

function normalizeValue(value?: string) {
  return value?.trim() ?? "";
}

export function getAnalyticsConfig(env: AnalyticsEnv): AnalyticsConfig | null {
  const endpoint = normalizeValue(env.VITE_ANALYTICS_ENDPOINT).replace(
    /\/+$/,
    ""
  );
  const websiteId = normalizeValue(env.VITE_ANALYTICS_WEBSITE_ID);
  const gaMeasurementId = normalizeValue(env.VITE_GA_MEASUREMENT_ID);

  const umami = endpoint && websiteId ? { endpoint, websiteId } : null;

  if (!umami && !gaMeasurementId) {
    return null;
  }

  return {
    umami,
    gaMeasurementId: gaMeasurementId || null,
  };
}

export function injectUmamiScript(doc: Document, config: UmamiConfig) {
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

export function injectGoogleAnalyticsScript(
  doc: Document,
  measurementId: string
) {
  const selector = 'script[data-analytics="ga4"]';
  const existing = doc.head.querySelector<HTMLScriptElement>(selector);

  if (existing) {
    return existing;
  }

  const script = doc.createElement("script");
  script.async = true;
  script.dataset.analytics = "ga4";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    measurementId
  )}`;
  doc.head.appendChild(script);

  const inlineScript = doc.createElement("script");
  inlineScript.dataset.analytics = "ga4-init";
  inlineScript.textContent = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', ${JSON.stringify(
    measurementId
  )});`;
  doc.head.appendChild(inlineScript);

  return script;
}

export function initAnalytics(
  env: AnalyticsEnv,
  doc: Document | undefined = typeof document === "undefined"
    ? undefined
    : document
) {
  const config = getAnalyticsConfig(env);

  if (!config || !doc) {
    return null;
  }

  const scripts: HTMLScriptElement[] = [];

  if (config.umami) {
    scripts.push(injectUmamiScript(doc, config.umami));
  }

  if (config.gaMeasurementId) {
    scripts.push(injectGoogleAnalyticsScript(doc, config.gaMeasurementId));
  }

  return scripts.length === 1 ? scripts[0] : scripts;
}
