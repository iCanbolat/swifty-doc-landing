import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Every page on this site is prerendered at build time — there is no ISR and
 * nothing revalidates — so the incremental cache only ever needs to be read.
 * `staticAssetsIncrementalCache` backs it with the Worker's own static assets,
 * which means no R2 or KV binding to provision.
 *
 * This config is not optional. Without an incremental cache, routes built by
 * `generateStaticParams` (/blog/[slug], /compare/[competitor], /for/[niche])
 * are looked up in a cache that does not exist and the Worker answers 404,
 * while plain static routes keep serving fine — which is exactly how the
 * breakage presented in production.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Serves a prerendered page straight from the cache without booting the full
  // Next server on each request.
  enableCacheInterception: true,
});
