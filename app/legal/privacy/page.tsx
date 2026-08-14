import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/legal-document";
import { PRIVACY_DOCUMENT } from "@/components/legal/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — ClientGather",
  description:
    "What personal data ClientGather handles and why: customer accounts, portal recipients, retention periods, subprocessors, security and your rights.",
};

export default function PrivacyPage() {
  return <LegalDocumentPage document={PRIVACY_DOCUMENT} />;
}
