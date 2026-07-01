"use client"

import { motion } from "framer-motion"
import {
  CheckCircle2,
  Lock,
  Paperclip,
  Plus,
  ShieldCheck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

const EASE = [0.22, 1, 0.36, 1] as const

export function PortalMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10 backdrop-blur-xl">
      {/* Portal header — recipient view */}
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
          <span className="flex size-6 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <ShieldCheck className="size-3.5" />
          </span>
          Secure portal
        </div>
        <Badge variant="info">
          <Lock className="size-3" />
          Verified access
        </Badge>
      </div>

      <div className="space-y-4 p-5">
        {/* Autosave banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[0.7rem] font-medium text-emerald-700"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          >
            <CheckCircle2 className="size-3.5" />
          </motion.span>
          Progress saved automatically
        </motion.div>

        {/* Progress */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[0.7rem] text-muted-foreground">
            <span>Company details · 2/5 items</span>
            <span className="font-medium text-foreground">40%</span>
          </div>
          <div className="h-2 w-full overflow-hidden bg-muted">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-sky-500"
            />
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-2.5">
          <Field label="Legal entity name" value="Acme Holdings Ltd." filled />
          <Field label="Incorporation date" value="12 Mar 2019" filled />
          <FileField label="Certificate of incorporation" />
        </div>

        {/* Repeatable instance control */}
        <div className="flex items-center justify-between border border-dashed border-border/60 bg-background/40 px-3 py-2.5">
          <span className="text-[0.7rem] text-muted-foreground">
            Directors · Instance 1 of 2
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-[0.65rem] text-foreground">
            <Plus className="size-3" />
            Add instance
          </span>
        </div>

        {/* Submit */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 bg-primary py-2.5 text-xs font-medium text-primary-foreground"
        >
          Submit response
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  filled,
}: {
  label: string
  value: string
  filled?: boolean
}) {
  return (
    <div>
      <p className="mb-1 text-[0.7rem] text-muted-foreground">{label}</p>
      <div className="flex items-center justify-between border border-border/60 bg-background/70 px-3 py-2 text-xs text-foreground">
        <span>{value}</span>
        {filled ? (
          <CheckCircle2 className="size-3.5 text-emerald-600" />
        ) : null}
      </div>
    </div>
  )
}

function FileField({ label }: { label: string }) {
  return (
    <div>
      <p className="mb-1 text-[0.7rem] text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2 border border-border/60 bg-background/70 px-3 py-2 text-xs">
        <Paperclip className="size-3.5 text-muted-foreground" />
        <span className="flex-1 text-foreground">incorporation.pdf</span>
        <span className="text-[0.65rem] text-muted-foreground">1.2 MB</span>
        <CheckCircle2 className="size-3.5 text-emerald-600" />
      </div>
    </div>
  )
}
