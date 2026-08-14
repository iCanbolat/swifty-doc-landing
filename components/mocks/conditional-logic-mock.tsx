import { CornerDownRight, Eye, EyeOff, GitBranch } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type PreviewField = { label: string; type: string; hidden?: boolean }

const PREVIEW: PreviewField[] = [
  { label: "Do you rent or own the premises?", type: "Select" },
  { label: "Landlord name", type: "Text" },
  { label: "Tenancy agreement", type: "File" },
  { label: "Title deed", type: "File", hidden: true },
  { label: "Mortgage statement", type: "File", hidden: true },
]

const TYPE_STYLES: Record<string, string> = {
  Text: "text-sky-700 border-sky-500/20 bg-sky-500/10",
  File: "text-emerald-700 border-emerald-500/20 bg-emerald-500/10",
  Select: "text-primary border-primary/20 bg-primary/10",
}

export function ConditionalLogicMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
          <GitBranch className="size-3" />
          Visibility rule
        </div>
        <Badge variant="info">2 fields hidden</Badge>
      </div>

      <div className="space-y-4 p-5">
        {/* The rule itself */}
        <div className="border border-border/60 bg-background/60 p-3">
          <p className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
            Show when
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.7rem]">
            <span className="border border-border/60 bg-card px-2 py-1 text-foreground">
              Premises
            </span>
            <span className="text-muted-foreground">is</span>
            <span className="border border-primary/20 bg-primary/10 px-2 py-1 font-medium text-primary">
              Rented
            </span>
          </div>
        </div>

        {/* Resulting form preview */}
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
            <CornerDownRight className="size-3" />
            Recipient sees
          </p>

          {PREVIEW.map((field, index) => (
            <div
              key={field.label}
              className={`reveal-item flex items-center justify-between gap-2 border px-2.5 py-2 [--reveal-from:translateY(10px)] ${
                field.hidden
                  ? "border-dashed border-border/50 bg-background/30"
                  : "border-border/60 bg-background/60"
              }`}
              style={
                { "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties
              }
            >
              <span className="flex min-w-0 items-center gap-2">
                {field.hidden ? (
                  <EyeOff className="size-3 shrink-0 text-muted-foreground/60" />
                ) : (
                  <Eye className="size-3 shrink-0 text-emerald-600" />
                )}
                <span
                  className={`truncate text-[0.7rem] ${
                    field.hidden
                      ? "text-muted-foreground/60 line-through"
                      : "text-foreground"
                  }`}
                >
                  {field.label}
                </span>
              </span>
              <span
                className={`shrink-0 border px-1.5 py-0.5 text-[0.6rem] font-medium ${
                  field.hidden
                    ? "border-border/50 bg-muted text-muted-foreground/60"
                    : TYPE_STYLES[field.type]
                }`}
              >
                {field.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
