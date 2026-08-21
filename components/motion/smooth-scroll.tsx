"use client"

import * as React from "react"
import type Lenis from "lenis"

/**
 * Lenis smooth scrolling, mounted once from the root layout.
 *
 * Three deliberate constraints keep it off the critical path:
 *
 * 1. The library is imported dynamically when the browser goes idle, so it is
 *    a separate chunk that never lands in the first-load bundle.
 * 2. It only runs where it does something: `syncTouch` is off (Lenis's own
 *    default — smoothing touch scroll fights the platform), so on a touch
 *    device the instance would cost listeners and a rAF loop to smooth wheel
 *    events that never arrive. `(pointer: fine)` gates it to those devices.
 * 3. The rAF loop is parked whenever nothing is moving instead of ticking
 *    forever, and woken by the events that can start a scroll.
 */

/** Still frames tolerated before the rAF loop parks itself. */
const IDLE_FRAMES_BEFORE_PARK = 10

/** Anchors we scroll to ourselves, rather than letting the browser jump. */
function resolveAnchorTarget(event: MouseEvent): string | null {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null
  }

  const anchor = (event.target as Element | null)?.closest?.("a")
  if (
    !(anchor instanceof HTMLAnchorElement) ||
    anchor.target === "_blank" ||
    anchor.hasAttribute("download")
  ) {
    return null
  }

  const href = anchor.getAttribute("href")
  if (!href || !href.includes("#")) return null

  const url = new URL(anchor.href)
  const current = window.location
  // A hash on another page is a navigation, not a scroll.
  if (url.origin !== current.origin || url.pathname !== current.pathname) {
    return null
  }
  return url.hash && url.hash !== "#" ? url.hash : null
}

/**
 * `getElementById`, not `querySelector`: the legal pages number their sections,
 * and `#12-cookies` is a valid id but not a valid CSS selector.
 */
function findAnchorTarget(hash: string): HTMLElement | null {
  return document.getElementById(decodeURIComponent(hash.slice(1)))
}

export function SmoothScroll() {
  React.useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    let lenis: Lenis | null = null
    let disposed = false
    let rafId = 0
    let idleFrames = 0

    const loop = (time: number) => {
      if (!lenis) return
      lenis.raf(time)
      if (lenis.isScrolling) {
        idleFrames = 0
      } else if (++idleFrames > IDLE_FRAMES_BEFORE_PARK) {
        rafId = 0
        return
      }
      rafId = requestAnimationFrame(loop)
    }

    /** Restart the loop if it parked. Cheap enough to call on every event. */
    const wake = () => {
      idleFrames = 0
      if (rafId) return
      // Lenis advances by the gap since its last frame, and the loop may have
      // been parked for minutes. Clearing the clock makes that first frame a
      // zero-length one, instead of one long enough to finish the whole
      // animation in a single jump.
      if (lenis) lenis.time = 0
      rafId = requestAnimationFrame(loop)
    }

    const onClick = (event: MouseEvent) => {
      const hash = resolveAnchorTarget(event)
      if (!hash || !lenis) return
      const target = findAnchorTarget(hash)
      if (!target) return

      event.preventDefault()
      // No offset: Lenis subtracts the target's `scroll-margin-top` and the
      // document's `scroll-padding-top` itself, so an anchor lands in exactly
      // the same place here as it does on the browser's own jump.
      lenis.scrollTo(target)
      wake()
      // Keep the URL (and the back button) in step with the scroll, without
      // the jump `location.hash = …` would cause.
      window.history.pushState(null, "", hash)
    }

    const start = async () => {
      const { default: LenisClass } = await import("lenis")
      if (disposed) return

      lenis = new LenisClass({
        lerp: 0.18,
        // Wheel only. Touch keeps the platform's own scrolling and inertia.
        smoothWheel: true,
        syncTouch: false,
        // Lets the wheel scroll nested containers (the docs sidebar, code
        // blocks) instead of dragging the page under them.
        allowNestedScroll: true,
        // Handled above instead: Lenis' own `anchors` option scrolls without
        // preventing the click, so the browser jumps to the target at the same
        // time and the animation starts from the wrong place.
        anchors: false,
        autoRaf: false,
      })

      lenis.on("virtual-scroll", wake)
      lenis.on("scroll", wake)
      document.addEventListener("click", onClick)
      wake()
    }

    // Nothing here is needed for first paint, so let the browser finish
    // loading before spending anything on it. Safari only got
    // `requestIdleCallback` in 17.4, hence the timeout fallback.
    const canIdle = typeof window.requestIdleCallback === "function"
    const idleId = canIdle
      ? window.requestIdleCallback(() => void start(), { timeout: 2000 })
      : window.setTimeout(() => void start(), 300)

    return () => {
      disposed = true
      if (canIdle) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
      if (rafId) cancelAnimationFrame(rafId)
      document.removeEventListener("click", onClick)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return null
}
