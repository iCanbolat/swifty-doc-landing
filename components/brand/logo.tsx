import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  /** Show the "SwiftyDoc" wordmark next to the mark. */
  withWordmark?: boolean
}

/**
 * Brand mark mirroring the client's auth-shell pill: a Sparkles glyph in a
 * bordered box with the uppercase, wide-tracked "SwiftyDoc" wordmark.
 */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-8 items-center justify-center rounded-none border border-border/70 bg-primary/10 text-primary">
        <Sparkles className="size-4" />
      </span>
      {withWordmark ? (
        <span className="text-xs font-semibold tracking-[0.28em] text-foreground uppercase">
          SwiftyDoc
        </span>
      ) : null}
    </span>
  )
}
