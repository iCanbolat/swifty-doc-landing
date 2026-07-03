import * as React from "react"

import { cn } from "@/lib/utils"

type DocsTableProps = {
  head: string[]
  rows: React.ReactNode[][]
  className?: string
}

export function DocsTable({ head, rows, className }: DocsTableProps) {
  return (
    <div className={cn("overflow-x-auto border border-border/70", className)}>
      <table className="w-full text-left text-xs">
        <thead className="border-b border-border/70 bg-muted/40">
          <tr>
            {head.map((heading) => (
              <th
                key={heading}
                className="px-4 py-2.5 text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground uppercase"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border/50 last:border-0"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2.5 leading-6 text-muted-foreground"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function InlineCode({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <code
      className={cn(
        "bg-muted px-1 py-0.5 text-[0.7rem] whitespace-nowrap text-primary",
        className
      )}
    >
      {children}
    </code>
  )
}
