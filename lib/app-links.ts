export type PricingPlanIntent = "foundation" | "growth" | "enterprise";
export type PricingBillingPeriod = "monthly" | "annual";

const DEFAULT_APP_BASE_URL = "http://localhost:5173";
const DEFAULT_DEMO_URL = "mailto:sales@swiftydoc.io?subject=SwiftyDoc%20Demo";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function resolveAppBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_BASE_URL?.trim();

  if (configured && configured.length > 0) {
    return trimTrailingSlash(configured);
  }

  return DEFAULT_APP_BASE_URL;
}

export function buildBootstrapOwnerUrl(
  plan: PricingPlanIntent = "foundation",
  period: PricingBillingPeriod = "annual",
): string {
  const base = resolveAppBaseUrl();
  const search = new URLSearchParams({
    plan,
    period,
    source: "landing",
  });

  return `${base}/auth/bootstrap-owner?${search.toString()}`;
}

export function resolveBookDemoUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BOOK_DEMO_URL?.trim();

  if (configured && configured.length > 0) {
    return configured;
  }

  return DEFAULT_DEMO_URL;
}
