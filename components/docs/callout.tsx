import * as React from "react"
import { Info, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"

type CalloutProps = {
  variant?: "note" | "warning"
  title?: string
  children: React.ReactNode
  className?: string
}

export function Callout({
  variant = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const Icon = variant === "warning" ? TriangleAlert : Info

  return (
    <div
      className={cn(
        "border border-border/70 border-l-2 p-4",
        variant === "warning"
          ? "border-l-amber-500 bg-amber-500/5"
          : "border-l-primary bg-primary/5",
        className
      )}
    >
      <div className="flex gap-3">
        <Icon
          className={cn(
            "mt-1 size-3.5 shrink-0",
            variant === "warning" ? "text-amber-600" : "text-primary"
          )}
        />
        <div className="text-xs leading-6 text-muted-foreground">
          {title ? (
            <p className="mb-1 font-semibold text-foreground">{title}</p>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  )
}
