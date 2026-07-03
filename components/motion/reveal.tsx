"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Lightweight scroll-reveal primitives. One shared IntersectionObserver adds
 * `.is-visible` directly on the element (no React re-render); the actual
 * animation is pure CSS — see the motion system block in app/globals.css.
 */

let sharedObserver: IntersectionObserver | null = null
const intersectCallbacks = new WeakMap<Element, () => void>()

function observeOnce(el: Element, onIntersect: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    onIntersect()
    return () => {}
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          intersectCallbacks.get(entry.target)?.()
          intersectCallbacks.delete(entry.target)
          sharedObserver?.unobserve(entry.target)
        }
      },
      { rootMargin: "-80px 0px" }
    )
  }
  intersectCallbacks.set(el, onIntersect)
  sharedObserver.observe(el)
  return () => {
    intersectCallbacks.delete(el)
    sharedObserver?.unobserve(el)
  }
}

/** Observe an element and flip to `true` once it enters the viewport. */
export function useInViewOnce<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    return observeOnce(el, () => setInView(true))
  }, [])

  return { ref, inView }
}

/** Scroll-triggered fade + rise. Fires once when it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "section" | "li" | "span"
}) {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    return observeOnce(el, () => el.classList.add("is-visible"))
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": delay ? `${delay}s` : undefined,
          "--reveal-y": y !== 24 ? `${y}px` : undefined,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  )
}

/** Container that staggers the entrance of its <StaggerItem/> children. */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    return observeOnce(el, () => el.classList.add("is-visible"))
  }, [])

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        const item = child as React.ReactElement<{ style?: React.CSSProperties }>
        return React.cloneElement(item, {
          style: {
            "--reveal-delay": `${0.05 + index * 0.08}s`,
            ...item.props.style,
          } as React.CSSProperties,
        })
      })}
    </div>
  )
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={cn("reveal-item", className)} style={style}>
      {children}
    </div>
  )
}
