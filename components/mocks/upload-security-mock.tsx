import { Ban, Check, HardDrive, Lock, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type Stage = { label: string; detail: string; icon: typeof ShieldCheck }

const STAGES: Stage[] = [
  {
    label: "Scanned",
    detail: "Checked for malware on our own infrastructure",
    icon: ShieldCheck,
  },
  {
    label: "Encrypted",
    detail: "AES-256-GCM before it touches disk",
    icon: Lock,
  },
  {
    label: "Stored",
    detail: "Bunny.net's London zone, encrypted with our key",
    icon: HardDrive,
  },
]

export function UploadSecurityMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <ShieldCheck className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Upload pipeline
            </p>
            <p className="text-[0.65rem] text-muted-foreground">
              Every file, every time
            </p>
          </div>
        </div>
        <Badge variant="success">2 stored</Badge>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          {STAGES.map((stage, index) => (
            <div
              key={stage.label}
              className="reveal-item flex items-center gap-3 border border-border/60 bg-background/60 px-3 py-2.5 [--reveal-from:translateX(12px)]"
              style={
                { "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties
              }
            >
              <span className="flex size-7 shrink-0 items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-700">
                <stage.icon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.7rem] font-medium text-foreground">
                  {stage.label}
                </p>
                <p className="truncate text-[0.65rem] text-muted-foreground">
                  {stage.detail}
                </p>
              </div>
              <Check className="size-3.5 shrink-0 text-emerald-600" />
            </div>
          ))}
        </div>

        {/* Fail-closed: a blocked file never reaches storage. */}
        <div
          className="reveal-item border border-rose-500/20 bg-rose-500/5 px-3 py-2.5 [--reveal-from:translateY(12px)]"
          style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center border border-rose-500/20 bg-rose-500/10 text-rose-600">
              <Ban className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.7rem] font-medium text-foreground">
                invoice-final.pdf
              </p>
              <p className="text-[0.65rem] text-rose-600">
                Refused at upload — never reached storage
              </p>
            </div>
          </div>
        </div>

        <p className="text-[0.65rem] leading-5 text-muted-foreground">
          Files are never sent to an outside scanning service. Anything that
          fails is refused at upload.
        </p>
      </div>
    </div>
  )
}
