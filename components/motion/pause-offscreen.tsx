"use client"

import * as React from "react"

/**
 * Parks the page's looping decorations when they scroll out of view.
 *
 * The blobs, the floating hero card and the mock cursors run `infinite`
 * animations. A composited animation that nobody can see still keeps its layer
 * alive and the compositor ticking for the whole session, which on the home
 * page means four of them running while you read the pricing table.
 *
 * Elements opt in with `data-pause-offscreen`; the class flips
 * `animation-play-state` (see the motion block in app/globals.css). Only
 * looping decorations should carry it — pausing a one-shot entrance mid-flight
 * would freeze it half-faded.
 */
export function PauseOffscreenAnimations() {
  React.useEffect(() => {
    const targets = document.querySelectorAll("[data-pause-offscreen]")
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("motion-paused", !entry.isIntersecting)
        }
      },
      // Resume slightly before they scroll back in, so the loop is already
      // running by the time it is visible.
      { rootMargin: "160px 0px" }
    )

    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return null
}
