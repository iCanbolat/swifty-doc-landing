import type { Metadata } from "next"
import { Braces, EyeOff, GitBranch, History } from "lucide-react"

import { ConditionalLogicMock } from "@/components/mocks/conditional-logic-mock"
import { ScheduleReuseMock } from "@/components/mocks/schedule-reuse-mock"
import { TemplateBuilderMock } from "@/components/mocks/template-builder-mock"
import { VersionHistoryMock } from "@/components/mocks/version-history-mock"
import { ProductPageShell } from "@/components/product/product-page-shell"
import { FeatureSection } from "@/components/sections/feature-section"

export const metadata: Metadata = {
  title: "Template builder — ClientGather",
  description:
    "Design the exact document request once. Sections, fields, repeatable groups and conditional logic, with every change versioned behind a draft you publish when it's ready.",
  alternates: { canonical: "/product/template-builder" },
  openGraph: {
    title: "Template builder — ClientGather",
    description:
      "Design the exact document request once — sections, fields, repeatable groups and conditional logic, all versioned.",
    type: "website",
  },
}

export default function TemplateBuilderPage() {
  return (
    <ProductPageShell
      eyebrow="Template builder"
      icon={Braces}
      title="Design the exact request, once"
      description="Most practices ask for the same bundle of documents over and over, then rebuild the checklist from scratch every time. Compose it once as a template, publish a version, and send that same structure to every client."
    >
      <FeatureSection
        eyebrow="Sections & fields"
        icon={Braces}
        title="Eight field types, arranged how you need them"
        description="Build the request from sections, each holding the fields that belong together. Drag to reorder, and mark any section or field repeatable so the recipient adds as many entries as their situation calls for."
        bullets={[
          "Text, long text, number, date, single select, multi select, yes/no, and file upload",
          "Repeatable sections for directors, dependants, assets, and cost lines",
          "Nested field groups — a repeatable entry can hold its own repeatable rows",
          "Select options carry a separate label and value, so you store the code and show the description",
        ]}
        mock={<TemplateBuilderMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Versioning"
        icon={History}
        title="Draft freely, publish deliberately"
        description="Editing a template never disturbs requests already out with clients. Changes accumulate in a draft, and publishing creates a new version with a change summary you can read back later."
        bullets={[
          "Draft → Publish with a written change summary per version",
          "Full history: what changed, when, and who published it",
          "Requests already in flight keep the version they were sent with",
          "Attach a consent statement to a version and capture acceptance with the submission",
        ]}
        mock={<VersionHistoryMock />}
      />

      <FeatureSection
        eyebrow="Conditional logic"
        icon={GitBranch}
        title="One template, a short form for everyone"
        description="A complete document checklist is intimidating, and most of it never applies to any one client. Show fields and sections conditionally based on earlier answers, so each recipient works through only what's relevant to them."
        bullets={[
          "Show or hide any field or section based on a previous answer",
          "Recipients see a short, relevant form; your team maintains one template",
          "Hidden fields are never required, so validation stays honest",
        ]}
        mock={<ConditionalLogicMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Reuse"
        icon={EyeOff}
        title="Publish once, send hundreds of times"
        description="A published template is the unit of work. Send it to one client or schedule it to recur, and every submission comes back in the same shape — which is what makes reviewing at volume possible at all."
        bullets={[
          "Unlimited clients and recipients on every plan",
          "Recurring request schedules create and send the next request for you",
          "Every submission returns the same structure, ready to review or export",
        ]}
        mock={<ScheduleReuseMock />}
        href="/product/customer-portal"
        linkLabel="See how recipients fill it in"
      />
    </ProductPageShell>
  )
}
