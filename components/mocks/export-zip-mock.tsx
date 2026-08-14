import { FileArchive, FileText, Folder, Paperclip } from "lucide-react"

import { Badge } from "@/components/ui/badge"

/**
 * Mirrors the real export layout:
 * [<REQ-CODE>/]<Recipient>/<Recipient>_form.pdf + assets/
 */
type Node = {
  label: string
  kind: "root" | "folder" | "pdf" | "assets" | "file"
  depth: number
  meta?: string
}

const TREE: Node[] = [
  { label: "DOC-2024-014.zip", kind: "root", depth: 0, meta: "4.6 MB" },
  { label: "Nadia Okafor", kind: "folder", depth: 1 },
  { label: "Nadia_Okafor_form.pdf", kind: "pdf", depth: 2, meta: "Archive PDF" },
  { label: "assets", kind: "assets", depth: 2, meta: "2 files" },
  { label: "Liam Chen", kind: "folder", depth: 1 },
  { label: "Liam_Chen_form.pdf", kind: "pdf", depth: 2, meta: "Archive PDF" },
  { label: "assets", kind: "assets", depth: 2, meta: "2 files" },
]

const KIND_ICON = {
  root: FileArchive,
  folder: Folder,
  pdf: FileText,
  assets: Paperclip,
  file: FileText,
} as const

const KIND_STYLE = {
  root: "text-primary border-primary/20 bg-primary/10",
  folder: "text-amber-700 border-amber-500/20 bg-amber-500/10",
  pdf: "text-rose-600 border-rose-500/20 bg-rose-500/10",
  assets: "text-sky-600 border-sky-500/20 bg-sky-500/10",
  file: "text-muted-foreground border-border/60 bg-muted",
} as const

const INDENT = ["pl-0", "pl-4", "pl-9"] as const

export function ExportZipMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
          <FileArchive className="size-3" />
          Export
        </div>
        <Badge variant="success">Ready to download</Badge>
      </div>

      <div className="space-y-1.5 p-5">
        {TREE.map((node, index) => {
          const Icon = KIND_ICON[node.kind]
          return (
            <div
              key={`${node.label}-${index}`}
              className={`reveal-item ${INDENT[node.depth]} [--reveal-from:translateX(10px)]`}
              style={
                { "--reveal-delay": `${index * 0.07}s` } as React.CSSProperties
              }
            >
              <div
                className={`flex items-center gap-2.5 border px-3 py-2 ${
                  node.kind === "root"
                    ? "border-border/70 bg-card"
                    : "border-border/60 bg-background/60"
                }`}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center border ${KIND_STYLE[node.kind]}`}
                >
                  <Icon className="size-3" />
                </span>
                <span className="min-w-0 flex-1 truncate font-mono text-[0.68rem] text-foreground">
                  {node.label}
                </span>
                {node.meta ? (
                  <span className="shrink-0 text-[0.6rem] text-muted-foreground">
                    {node.meta}
                  </span>
                ) : null}
              </div>
            </div>
          )
        })}

        <p className="pt-1 text-[0.65rem] leading-5 text-muted-foreground">
          One folder per recipient, each with their uploaded files and a
          generated archive PDF of the completed form.
        </p>
      </div>
    </div>
  )
}
