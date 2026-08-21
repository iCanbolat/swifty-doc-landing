/**
 * Mirrors the API's billable tiers. `starter` is marketed as "Solo" — the key
 * `solo` was already taken by foundation's Creem product.
 */
export type PricingPlanIntent =
  | "starter"
  | "foundation"
  | "growth"
  | "enterprise";
export type PricingBillingPeriod = "monthly" | "annual";

const DEFAULT_APP_BASE_URL = "http://localhost:5173";
const DEFAULT_LIVE_DEMO_URL = "https://demo.clientgather.com";
const DEFAULT_DEMO_URL =
  "mailto:contact@clientgather.com?subject=ClientGather%20Demo";

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

export function buildSignInUrl(): string {
  const base = resolveAppBaseUrl();

  return `${base}/auth/sign-in`;
}

/**
 * The self-serve demo: the real dashboard, filled with sample data, no sign-up.
 * A different thing from `resolveBookDemoUrl` — that one books a call with a
 * human, this one opens the product. Both belong on the page.
 */
export function resolveLiveDemoUrl(): string {
  const configured = process.env.NEXT_PUBLIC_DEMO_URL?.trim();

  if (configured && configured.length > 0) {
    return trimTrailingSlash(configured);
  }

  return DEFAULT_LIVE_DEMO_URL;
}

export function resolveBookDemoUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BOOK_DEMO_URL?.trim();

  if (configured && configured.length > 0) {
    return configured;
  }

  return DEFAULT_DEMO_URL;
}
