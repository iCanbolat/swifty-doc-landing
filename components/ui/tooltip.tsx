"use client"

import * as React from "react"
import { Info } from "lucide-react"

const OPEN_DELAY_MS = 250

/**
 * Small hover/focus-triggered info popover, styled with the same popover
 * tokens as the rest of the app (rounded-none, ring-1 ring-foreground/10).
 */
export function InfoTooltip({ label }: { label: string }) {
  const [open, setOpen] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  function show() {
    timeoutRef.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS)
  }

  function hide() {
    clearTimeout(timeoutRef.current)
    setOpen(false)
  }

  React.useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <button
        type="button"
        aria-label="More info"
        className="flex size-4 items-center justify-center text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground"
      >
        <Info className="size-3.5" />
      </button>

      {open ? (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 animate-pop border border-border/70 bg-popover px-3 py-2 text-left text-[0.7rem] leading-5 font-normal text-popover-foreground normal-case shadow-[0_20px_60px_-30px_rgba(15,23,42,0.5)] ring-1 ring-foreground/10"
        >
          {label}
          <span className="absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-border/70 bg-popover" />
        </span>
      ) : null}
    </span>
  )
}
