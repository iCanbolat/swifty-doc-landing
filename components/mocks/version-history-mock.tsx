import { GitCommitVertical, Minus, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type Change = { kind: "added" | "removed"; label: string }
type Version = {
  version: string
  state: "Draft" | "Published" | "Superseded"
  date: string
  summary: string
  changes?: Change[]
}

const VERSIONS: Version[] = [
  {
    version: "v3",
    state: "Draft",
    date: "Jul 4",
    summary: "Added director ownership split, dropped the fax field.",
    changes: [
      { kind: "added", label: "Ownership %" },
      { kind: "added", label: "Proof of address" },
      { kind: "removed", label: "Fax number" },
    ],
  },
  {
    version: "v2",
    state: "Published",
    date: "May 19",
    summary: "Made the directors section repeatable.",
  },
  {
    version: "v1",
    state: "Superseded",
    date: "Feb 2",
    summary: "First published version.",
  },
]

const STATE_VARIANT = {
  Draft: "warning",
  Published: "success",
  Superseded: "outline",
} as const

const CHANGE_STYLE = {
  added: "text-emerald-700 border-emerald-500/20 bg-emerald-500/10",
  removed: "text-rose-600 border-rose-500/20 bg-rose-500/10",
} as const

export function VersionHistoryMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <GitCommitVertical className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Version history
            </p>
            <p className="text-[0.65rem] text-muted-foreground">
              Client onboarding pack
            </p>
          </div>
        </div>
        <Badge variant="outline">3 versions</Badge>
      </div>

      <div className="space-y-2.5 p-5">
        {VERSIONS.map((version, versionIndex) => (
          <div
            key={version.version}
            className="reveal-item border border-border/60 bg-background/60 p-3 [--reveal-from:translateY(14px)]"
            style={
              {
                "--reveal-delay": `${versionIndex * 0.12}s`,
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.7rem] font-medium text-foreground">
                  {version.version}
                </span>
                <Badge variant={STATE_VARIANT[version.state]}>
                  {version.state}
                </Badge>
              </div>
              <span className="text-[0.65rem] text-muted-foreground">
                {version.date}
              </span>
            </div>

            <p className="mt-2 text-[0.7rem] leading-5 text-muted-foreground">
              {version.summary}
            </p>

            {version.changes ? (
              <div className="mt-2.5 space-y-1.5">
                {version.changes.map((change, changeIndex) => (
                  <div
                    key={change.label}
                    className="reveal-item flex items-center gap-2 border border-border/50 bg-card/80 px-2.5 py-1.5 [--reveal-from:translateX(10px)]"
                    style={
                      {
                        "--reveal-delay": `${
                          versionIndex * 0.12 + changeIndex * 0.06
                        }s`,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className={`flex size-4 shrink-0 items-center justify-center border ${CHANGE_STYLE[change.kind]}`}
                    >
                      {change.kind === "added" ? (
                        <Plus className="size-2.5" />
                      ) : (
                        <Minus className="size-2.5" />
                      )}
                    </span>
                    <span className="text-[0.7rem] text-foreground">
                      {change.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
