import { Building2, Database, Globe2, Server } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const USED_GB = 62
const QUOTA_GB = 100

export function DataResidencyMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
          <Globe2 className="size-3" />
          Data location
        </div>
        <Badge variant="success">United Kingdom</Badge>
      </div>

      <div className="space-y-4 p-5">
        <div
          className="reveal-item flex items-center gap-3 border border-border/60 bg-background/60 px-3 py-3 [--reveal-from:translateY(12px)]"
          style={{ "--reveal-delay": "0s" } as React.CSSProperties}
        >
          <span className="flex size-8 shrink-0 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <Server className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.7rem] font-medium text-foreground">
              Erith, United Kingdom
            </p>
            <p className="text-[0.65rem] leading-5 text-muted-foreground">
              Our servers — files in Bunny.net's London zone
            </p>
          </div>
        </div>

        <div
          className="reveal-item border border-border/60 bg-background/60 px-3 py-3 [--reveal-from:translateY(12px)]"
          style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
              <Database className="size-3.5" />
              Storage used
            </span>
            <span className="text-[0.7rem] font-medium text-foreground">
              {USED_GB} GB of {QUOTA_GB} GB
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden bg-muted">
            <div
              className="reveal-bar h-full bg-gradient-to-r from-primary to-sky-500 [--reveal-delay:0.4s]"
              style={{ width: `${(USED_GB / QUOTA_GB) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-[0.6rem] text-muted-foreground">
            Add 25 GB packs on any plan
          </p>
        </div>

        <div
          className="reveal-item flex items-center gap-3 border border-dashed border-border/60 bg-background/40 px-3 py-3 [--reveal-from:translateY(12px)]"
          style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
        >
          <span className="flex size-8 shrink-0 items-center justify-center border border-border/70 bg-muted text-muted-foreground">
            <Building2 className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.7rem] font-medium text-foreground">
              Your own S3 bucket
            </p>
            <p className="text-[0.65rem] text-muted-foreground">
              Point ClientGather at storage you control
            </p>
          </div>
          <Badge variant="outline">Scale</Badge>
        </div>
      </div>
    </div>
  )
}
