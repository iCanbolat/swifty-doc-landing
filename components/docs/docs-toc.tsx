"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TocItem = {
  id: string
  label: string
}

// Matches the navbar clearance used by `scroll-mt-28` on doc sections: the
// active item is the last heading that has crossed this line from below.
const ACTIVE_LINE_OFFSET = 120

export function DocsToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null
  )

  React.useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)

    if (targets.length === 0) return

    let ticking = false

    const updateActive = () => {
      ticking = false
      let current = targets[0].id
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= ACTIVE_LINE_OFFSET) {
          current = target.id
        }
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateActive)
    }

    updateActive()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [items])

  return (
    <nav aria-label="On this page">
      <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
        On this page
      </p>
      <ul className="mt-4 space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l py-1 pl-3 text-xs transition-colors",
                activeId === item.id
                  ? "border-l-primary font-medium text-foreground"
                  : "border-l-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function MobileToc({ items }: { items: TocItem[] }) {
  return (
    <details className="mb-8 border border-border/70 bg-muted/30 lg:hidden">
      <summary className="cursor-pointer px-4 py-3 text-[0.65rem] tracking-[0.32em] text-primary uppercase select-none">
        On this page
      </summary>
      <ul className="space-y-1 border-t border-border/60 px-4 py-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
