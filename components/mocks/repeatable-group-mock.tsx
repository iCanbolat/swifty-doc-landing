import { Copy, Plus, Trash2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type Entry = {
  title: string
  fields: { label: string; value: string }[]
  /** A nested repeatable group inside this entry. */
  nested?: { label: string; rows: string[] }
}

const ENTRIES: Entry[] = [
  {
    title: "Director 1",
    fields: [
      { label: "Full name", value: "Nadia Okafor" },
      { label: "Role", value: "Managing director" },
    ],
    nested: {
      label: "Previous addresses",
      rows: ["14 Bridge St, Leeds", "8 Carlton Rd, Leeds"],
    },
  },
  {
    title: "Director 2",
    fields: [
      { label: "Full name", value: "Liam Chen" },
      { label: "Role", value: "Finance director" },
    ],
  },
]

export function RepeatableGroupMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <Users className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Ownership &amp; directors
            </p>
            <p className="text-[0.65rem] text-muted-foreground">
              Repeatable section
            </p>
          </div>
        </div>
        <Badge variant="outline">
          <Copy className="size-3" />2 entries
        </Badge>
      </div>

      <div className="space-y-3 p-5">
        {ENTRIES.map((entry, entryIndex) => (
          <div
            key={entry.title}
            className="reveal-item border border-border/60 bg-background/60 p-3 [--reveal-from:translateY(14px)]"
            style={
              {
                "--reveal-delay": `${entryIndex * 0.12}s`,
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-between">
              <p className="text-[0.7rem] font-medium text-foreground">
                {entry.title}
              </p>
              <span className="flex size-5 items-center justify-center border border-border/60 bg-card text-muted-foreground">
                <Trash2 className="size-3" />
              </span>
            </div>

            <div className="mt-2 space-y-1.5">
              {entry.fields.map((field, fieldIndex) => (
                <div
                  key={field.label}
                  className="reveal-item flex items-center justify-between gap-2 border border-border/50 bg-card/80 px-2.5 py-1.5 [--reveal-from:translateX(10px)]"
                  style={
                    {
                      "--reveal-delay": `${
                        entryIndex * 0.12 + fieldIndex * 0.06
                      }s`,
                    } as React.CSSProperties
                  }
                >
                  <span className="text-[0.65rem] text-muted-foreground">
                    {field.label}
                  </span>
                  <span className="text-[0.7rem] text-foreground">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            {entry.nested ? (
              <div className="mt-2.5 border-l border-border/60 pl-3">
                <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {entry.nested.label}
                </p>
                <div className="mt-1.5 space-y-1.5">
                  {entry.nested.rows.map((row, rowIndex) => (
                    <div
                      key={row}
                      className="reveal-item border border-border/50 bg-card/80 px-2.5 py-1.5 text-[0.68rem] text-foreground [--reveal-from:translateX(10px)]"
                      style={
                        {
                          "--reveal-delay": `${0.2 + rowIndex * 0.06}s`,
                        } as React.CSSProperties
                      }
                    >
                      {row}
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 border border-dashed border-border/60 bg-background/40 px-2.5 py-1.5 text-[0.65rem] text-muted-foreground">
                    <Plus className="size-3" />
                    Add address
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}

        <div className="flex items-center justify-center gap-1.5 border border-dashed border-border/60 bg-background/40 py-2.5 text-[0.7rem] text-muted-foreground">
          <Plus className="size-3.5" />
          Add another director
        </div>
      </div>
    </div>
  )
}
