import {
  CheckCircle2,
  Lock,
  Paperclip,
  Plus,
  ShieldCheck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

const PRESENCE = {
  maya: { name: "Maya", initials: "MK", color: "#8b5cf6" },
  deniz: { name: "Deniz", initials: "DR", color: "#f59e0b" },
} as const

export function PortalMock() {
  return (
    <div className="relative overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      {/* Floating collaborator cursor (live presence) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[58%] left-[62%] z-20 animate-cursor-drift will-change-transform motion-reduce:animate-none"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 1.5L13.5 8.5L8 9.5L5.5 14.5L2 1.5Z"
            fill={PRESENCE.maya.color}
            stroke="white"
            strokeWidth="1"
          />
        </svg>
        <span
          className="absolute top-3.5 left-3 rounded-full px-2 py-0.5 text-[0.6rem] font-medium whitespace-nowrap text-white shadow-sm"
          style={{ backgroundColor: PRESENCE.maya.color }}
        >
          {PRESENCE.maya.name}
        </span>
      </div>

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
        <div className="reveal-item flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[0.7rem] font-medium text-emerald-700 [--reveal-from:translateY(-8px)]">
          <span className="reveal-item [--reveal-delay:0.4s] [--reveal-ease:var(--ease-spring)] [--reveal-from:scale(0)]">
            <CheckCircle2 className="size-3.5" />
          </span>
          Progress saved automatically
        </div>

        {/* Live presence strip — collaborative mode */}
        <div className="reveal-item flex items-center justify-between gap-2 border border-violet-500/20 bg-violet-500/10 px-3 py-2 [--reveal-delay:0.15s] [--reveal-from:translateY(-8px)]">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <PresenceAvatar
                initials={PRESENCE.maya.initials}
                color={PRESENCE.maya.color}
              />
              <PresenceAvatar
                initials={PRESENCE.deniz.initials}
                color={PRESENCE.deniz.color}
              />
            </div>
            <span className="text-[0.7rem] font-medium text-violet-700">
              2 collaborators online
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[0.62rem] font-medium tracking-wide text-violet-700/80 uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-500 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-violet-500" />
            </span>
            Live
          </span>
        </div>

        {/* Progress */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[0.7rem] text-muted-foreground">
            <span>Company details · 2/5 items</span>
            <span className="font-medium text-foreground">40%</span>
          </div>
          <div className="h-2 w-full overflow-hidden bg-muted">
            <div className="reveal-bar h-full w-[40%] bg-linear-to-r from-primary to-sky-500 [--reveal-delay:0.2s]" />
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-2.5">
          <Field label="Legal entity name" value="Acme Holdings Ltd." filled />
          <Field
            label="Incorporation date"
            value="12 Mar 2019"
            editingBy={PRESENCE.maya}
          />
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

function PresenceAvatar({
  initials,
  color,
}: {
  initials: string
  color: string
}) {
  return (
    <span
      className="relative flex size-5 items-center justify-center rounded-full border border-white/80 text-[0.55rem] font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
      <span className="absolute -right-px -bottom-px size-1.5 rounded-full border border-white bg-emerald-500" />
    </span>
  )
}

function Field({
  label,
  value,
  filled,
  editingBy,
}: {
  label: string
  value: string
  filled?: boolean
  editingBy?: { name: string; color: string }
}) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
        {label}
        {editingBy ? (
          <span
            className="inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[0.6rem] font-medium"
            style={{
              borderColor: `${editingBy.color}55`,
              backgroundColor: `${editingBy.color}1a`,
              color: editingBy.color,
            }}
          >
            <span className="relative flex size-1">
              <span
                className="absolute inline-flex size-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: editingBy.color }}
              />
              <span
                className="relative inline-flex size-1 rounded-full"
                style={{ backgroundColor: editingBy.color }}
              />
            </span>
            {editingBy.name} is editing
          </span>
        ) : null}
      </p>
      <div
        className="flex items-center justify-between border border-border/60 bg-background/70 px-3 py-2 text-xs text-foreground"
        style={
          editingBy
            ? { boxShadow: `0 0 0 1.5px ${editingBy.color}` }
            : undefined
        }
      >
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
