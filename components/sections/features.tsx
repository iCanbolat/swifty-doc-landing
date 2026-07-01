import { Braces, ClipboardCheck, HardDrive, Link2 } from "lucide-react"

import { PortalMock } from "@/components/mocks/portal-mock"
import { ReviewMock } from "@/components/mocks/review-mock"
import { StorageMock } from "@/components/mocks/storage-mock"
import { TemplateBuilderMock } from "@/components/mocks/template-builder-mock"
import { Reveal } from "@/components/motion/reveal"
import { FeatureSection } from "@/components/sections/feature-section"

export function Features() {
  return (
    <div id="features" className="relative">
      {/* Section intro */}
      <div className="mx-auto max-w-6xl px-6 pt-20 text-center lg:px-8 lg:pt-28">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
            Everything in one flow
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From template to signed-off documents
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Four connected building blocks replace the email threads,
            spreadsheets, and shared drives you use today.
          </p>
        </Reveal>
      </div>

      <FeatureSection
        eyebrow="Template builder"
        icon={Braces}
        title="Design the exact request, once"
        description="Compose templates from sections and fields — text, dates, selects, files, and repeatable groups. Every change is versioned, so you publish a draft when it's ready and keep a full history."
        bullets={[
          "Drag-and-drop sections and fields",
          "Repeatable sections for directors, assets, and more",
          "Draft → Publish with change summaries and version diffs",
        ]}
        mock={<TemplateBuilderMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Customer portal"
        icon={Link2}
        title="Send a secure link — no account required"
        description="Recipients open a private portal, answer at their own pace, and everything autosaves. Progress is tracked per section, and the form validates before it can be submitted."
        bullets={[
          "Token-verified access, expiring links",
          "Autosave with live progress tracking",
          "Individual or collaborative submission modes",
        ]}
        mock={<PortalMock />}
      />

      <FeatureSection
        eyebrow="Review queue"
        icon={ClipboardCheck}
        title="Approve, reject, and resolve in one place"
        description="Your team reviews each submitted answer, approves what's right, and requests changes with a comment thread the recipient can respond to — no more chasing over email."
        bullets={[
          "Per-item approve / reject decisions",
          "Threaded comments between reviewer and recipient",
          "Filter by status, client, and open questions",
        ]}
        mock={<ReviewMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Storage"
        icon={HardDrive}
        title="Every file, organized automatically"
        description="Uploads land in a folder per request, grouped by recipient, with names, sizes, and types you can browse or export. Bring your own storage driver as you scale."
        bullets={[
          "Auto-organized folders per request",
          "Grouped by recipient with full file metadata",
          "Local or CDN storage drivers with usage quotas",
        ]}
        mock={<StorageMock />}
      />
    </div>
  )
}
