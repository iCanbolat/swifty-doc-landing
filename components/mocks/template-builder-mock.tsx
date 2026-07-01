"use client"

import { motion } from "framer-motion"
import { Braces, GripVertical, Plus, RotateCcw, Rocket } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const EASE = [0.22, 1, 0.36, 1] as const

type Field = { label: string; type: string }
type Section = { title: string; meta: string; fields: Field[] }

const SECTIONS: Section[] = [
  {
    title: "Company details",
    meta: "3 fields",
    fields: [
      { label: "Legal entity name", type: "Text" },
      { label: "Incorporation date", type: "Date" },
      { label: "Registration doc", type: "File" },
    ],
  },
  {
    title: "Ownership & directors",
    meta: "Repeatable · 2 fields",
    fields: [
      { label: "Full name", type: "Text" },
      { label: "Role", type: "Select" },
    ],
  },
]

const TYPE_STYLES: Record<string, string> = {
  Text: "text-sky-700 border-sky-500/20 bg-sky-500/10",
  Date: "text-amber-700 border-amber-500/20 bg-amber-500/10",
  File: "text-emerald-700 border-emerald-500/20 bg-emerald-500/10",
  Select: "text-primary border-primary/20 bg-primary/10",
}

export function TemplateBuilderMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
          <Braces className="size-3" />
          Schema builder
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.65rem] text-muted-foreground">
            <RotateCcw className="size-3" />
            Cancel draft
          </span>
          <motion.span
            animate={{ boxShadow: [
              "0 0 0 0 rgba(70,50,229,0.0)",
              "0 0 0 6px rgba(70,50,229,0.12)",
              "0 0 0 0 rgba(70,50,229,0.0)",
            ] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-medium text-primary-foreground"
          >
            <Rocket className="size-3" />
            Publish version
          </motion.span>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">
            Client onboarding pack
          </p>
          <Badge variant="warning">Draft · v3</Badge>
        </div>

        {SECTIONS.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: sectionIndex * 0.12 }}
            className="border border-border/60 bg-background/60 p-3"
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                // subtle "grab" wiggle to signal drag affordance
                animate={sectionIndex === 0 ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex size-6 items-center justify-center border border-border/60 bg-card text-muted-foreground"
              >
                <GripVertical className="size-3.5" />
              </motion.span>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">
                  {section.title}
                </p>
                <p className="text-[0.65rem] text-muted-foreground">
                  {section.meta}
                </p>
              </div>
            </div>

            <div className="mt-2.5 space-y-1.5 pl-8">
              {section.fields.map((field, fieldIndex) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: sectionIndex * 0.12 + fieldIndex * 0.06,
                  }}
                  className="flex items-center justify-between gap-2 border border-border/50 bg-card/80 px-2.5 py-1.5"
                >
                  <span className="text-[0.7rem] text-foreground">
                    {field.label}
                  </span>
                  <span
                    className={`shrink-0 border px-1.5 py-0.5 text-[0.6rem] font-medium ${TYPE_STYLES[field.type]}`}
                  >
                    {field.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="flex items-center justify-center gap-1.5 border border-dashed border-border/60 bg-background/40 py-2.5 text-[0.7rem] text-muted-foreground">
          <Plus className="size-3.5" />
          Add new section
        </div>
      </div>
    </div>
  )
}
