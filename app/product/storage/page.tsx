import type { Metadata } from "next"
import { FileArchive, HardDrive, Lock, ShieldCheck } from "lucide-react"

import { DataResidencyMock } from "@/components/mocks/data-residency-mock"
import { ExportZipMock } from "@/components/mocks/export-zip-mock"
import { StorageMock } from "@/components/mocks/storage-mock"
import { UploadSecurityMock } from "@/components/mocks/upload-security-mock"
import { ProductPageShell } from "@/components/product/product-page-shell"
import { FeatureSection } from "@/components/sections/feature-section"

export const metadata: Metadata = {
  title: "Storage — ClientGather",
  description:
    "Uploads land in a folder per request, grouped by recipient. Export the whole request as a ZIP with an archive PDF per submission, scanned for malware and encrypted at rest on UK servers.",
  alternates: { canonical: "/product/storage" },
  openGraph: {
    title: "Storage — ClientGather",
    description:
      "Every file organized automatically — foldered per request, scanned, encrypted, and hosted in the UK.",
    type: "website",
  },
}

export default function StoragePage() {
  return (
    <ProductPageShell
      eyebrow="Storage"
      icon={HardDrive}
      title="Every file, organized automatically"
      description="Files that arrive as email attachments end up wherever the person who opened them put them. Uploads here land in a folder per request, grouped by recipient, with the metadata you need to find them again."
    >
      <FeatureSection
        eyebrow="Organization"
        icon={HardDrive}
        title="Foldered as it arrives, not filed afterwards"
        description="There is no filing step. A file uploaded against a request is already in that request's folder, under the recipient who provided it, with its name, size, type, and upload date recorded."
        bullets={[
          "Auto-organized folders per request",
          "Grouped by recipient with full file metadata",
          "Uploads capped at 10 MB per file",
          "Accepted types: PDF, ZIP, XLSX, DOCX, JPEG, PNG, WebP, CSV, and TXT",
        ]}
        mock={<StorageMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Export"
        icon={FileArchive}
        title="A bundle someone else can open"
        description="Exporting a request produces a ZIP with a folder per recipient. Each folder holds that recipient's uploaded files plus a generated archive PDF of their completed form, so the answers and the evidence travel together."
        bullets={[
          "One folder per recipient, with an archive PDF of the completed form",
          "Self-describing months later: what was asked, answered, and supplied",
          "Google Drive integration on every plan",
          "Webhooks with delivery logs and Zapier on Growth and Scale",
        ]}
        mock={<ExportZipMock />}
      />

      <FeatureSection
        eyebrow="Security"
        icon={ShieldCheck}
        title="Scanned before it is stored, encrypted once it is"
        description="Every uploaded file is scanned for malware before it reaches storage, using an antivirus engine running on our own infrastructure — the file itself is never sent to a third-party scanning service. A file that fails is rejected at upload."
        bullets={[
          "Malware scanning on our own infrastructure, fail-closed at upload",
          "AES-256-GCM encryption at rest for files and sensitive answers",
          "Scanning detects known malware and is not a guarantee that a file is safe",
        ]}
        mock={<UploadSecurityMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Where it lives"
        icon={Lock}
        title="Hosted in the UK, or in your own bucket"
        description="Your requests, answers and uploaded files are stored on our own servers in Erith, United Kingdom — not replicated to other regions and not handed to a third-party storage provider."
        bullets={[
          "UK hosting on every plan",
          "Bring your own S3 bucket on the Scale plan",
          "Storage quota scales with your plan, with 25 GB packs available on any plan",
        ]}
        mock={<DataResidencyMock />}
        href="/#pricing"
        linkLabel="Compare plans"
      />
    </ProductPageShell>
  )
}
