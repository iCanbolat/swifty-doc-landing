"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

type CodeBlockProps = {
  code: string
  label?: string
  className?: string
}

export function CodeBlock({ code, label, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("border border-border/70 bg-muted/50", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-background/60 px-4 py-2">
        <span className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
          {label ?? "code"}
        </span>
        <button
          type="button"
          aria-label="Copy code"
          onClick={handleCopy}
          className="flex size-6 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-600" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[0.7rem] leading-6 text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}
