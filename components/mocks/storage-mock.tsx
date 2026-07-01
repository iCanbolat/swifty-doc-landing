"use client"

import { motion } from "framer-motion"
import {
  FileText,
  FolderOpen,
  HardDrive,
  ImageIcon,
  Sheet,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

const EASE = [0.22, 1, 0.36, 1] as const

type FileRow = {
  name: string
  size: string
  date: string
  kind: "pdf" | "image" | "sheet"
  uploading?: boolean
}

type Group = { recipient: string; email: string; files: FileRow[] }

const GROUPS: Group[] = [
  {
    recipient: "Nadia Okafor",
    email: "nadia@acme.co",
    files: [
      { name: "incorporation.pdf", size: "1.2 MB", date: "Jul 1", kind: "pdf" },
      { name: "ownership-chart.png", size: "684 KB", date: "Jul 1", kind: "image" },
    ],
  },
  {
    recipient: "Liam Chen",
    email: "liam@acme.co",
    files: [
      { name: "bank-statement-q1.pdf", size: "2.4 MB", date: "Jul 2", kind: "pdf" },
      { name: "revenue-2024.xlsx", size: "312 KB", date: "Jul 2", kind: "sheet", uploading: true },
    ],
  },
]

const KIND_ICON = {
  pdf: FileText,
  image: ImageIcon,
  sheet: Sheet,
} as const

const KIND_STYLE = {
  pdf: "text-rose-600 border-rose-500/20 bg-rose-500/10",
  image: "text-sky-600 border-sky-500/20 bg-sky-500/10",
  sheet: "text-emerald-600 border-emerald-500/20 bg-emerald-500/10",
} as const

export function StorageMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10 backdrop-blur-xl">
      {/* Folder header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <FolderOpen className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">DOC-2024-014</p>
            <p className="text-[0.65rem] text-muted-foreground">
              Acme Holdings · 4 files
            </p>
          </div>
        </div>
        <Badge variant="outline">
          <HardDrive className="size-3" />
          4.6 MB
        </Badge>
      </div>

      <div className="space-y-4 p-5">
        {GROUPS.map((group, groupIndex) => (
          <div key={group.email} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[0.6rem] font-semibold text-primary">
                {group.recipient
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <p className="text-[0.7rem] font-medium text-foreground">
                {group.recipient}
              </p>
              <p className="text-[0.65rem] text-muted-foreground">
                {group.email}
              </p>
            </div>

            {group.files.map((file, fileIndex) => {
              const Icon = KIND_ICON[file.kind]
              return (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: EASE,
                    delay: groupIndex * 0.15 + fileIndex * 0.08,
                  }}
                  className="flex items-center gap-3 border border-border/60 bg-background/60 px-3 py-2.5"
                >
                  <span
                    className={`flex size-7 items-center justify-center border ${KIND_STYLE[file.kind]}`}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground">
                      {file.name}
                    </p>
                    {file.uploading ? (
                      <div className="mt-1 h-1 w-full overflow-hidden bg-muted">
                        <motion.div
                          initial={{ width: "10%" }}
                          whileInView={{ width: "78%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
                          className="h-full bg-gradient-to-r from-primary to-sky-500"
                        />
                      </div>
                    ) : (
                      <p className="text-[0.65rem] text-muted-foreground">
                        {file.date} · uploaded
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-[0.65rem] text-muted-foreground">
                    {file.uploading ? "Uploading…" : file.size}
                  </span>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
