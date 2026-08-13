/**
 * Absolute origin for canonical URLs, OpenGraph and JSON-LD — all three need a
 * real origin, so it cannot be derived from a relative path at build time.
 */
const DEFAULT_SITE_URL = "https://clientgather.com"

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, "")

export const SITE_NAME = "ClientGather"
