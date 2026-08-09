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

let pageLoadTimestamp = typeof window !== "undefined" ? Date.now() : 0;

export function resetPageLoadTimestamp() {
  pageLoadTimestamp = typeof window !== "undefined" ? Date.now() : 0;
}

export function getTimeOnPageSeconds(): number {
  if (!pageLoadTimestamp) return 0;
  return Math.max(0, Math.round((Date.now() - pageLoadTimestamp) / 1000));
}

export type EventCategory =
  | "cta"
  | "navigation"
  | "form"
  | "external_link"
  | "cookie_consent"
  | "content";

export type EventParams = {
  category: EventCategory;
  name: string;
  label?: string;
  location?: string;
  [key: string]: any;
};

export function trackEvent({
  category,
  name,
  label,
  location: clickLocation,
  ...extraParams
}: EventParams) {
  if (typeof window === "undefined") return;

  const timeOnPage = getTimeOnPageSeconds();
  const currentPath = window.location.pathname;

  const eventPayload = {
    event_category: category,
    event_label: label || name,
    click_location: clickLocation || currentPath,
    page_path: currentPath,
    time_on_page_seconds: timeOnPage,
    ...extraParams,
  };

  // Google Analytics 4 (GA4)
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, eventPayload);
  }

  // Umami Analytics
  if (typeof (window as any).umami?.track === "function") {
    (window as any).umami.track(name, eventPayload);
  }
}

export function setupAutoClickListener(doc: Document = typeof document === "undefined" ? (undefined as any) : document) {
  if (!doc || typeof window === "undefined" || (window as any).__ga_auto_listener_attached) {
    return;
  }
  (window as any).__ga_auto_listener_attached = true;

  doc.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>(
      "[data-ga-category], [data-ga-name]"
    );
    if (!target) return;

    const category = (target.dataset.gaCategory as EventCategory) || "cta";
    const name = target.dataset.gaName || "button_click";
    const label = target.dataset.gaLabel || target.innerText?.trim() || "";
    const location = target.dataset.gaLocation || window.location.pathname;

    trackEvent({
      category,
      name,
      label,
      location,
    });
  });
}

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
  const existing =
    doc.head.querySelector<HTMLScriptElement>('script[data-analytics="ga4"]') ||
    Array.from(doc.head.querySelectorAll<HTMLScriptElement>("script")).find(
      (s) => s.src && s.src.includes("googletagmanager.com/gtag/js")
    );

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
  resetPageLoadTimestamp();

  if (doc) {
    setupAutoClickListener(doc);
  }

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
