import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/legal-document";
import { TERMS_DOCUMENT } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms & Conditions — SwiftyDoc",
  description:
    "The agreement that governs your use of SwiftyDoc: accounts, plans, your content, acceptable use, billing and termination.",
};

export default function TermsPage() {
  return <LegalDocumentPage document={TERMS_DOCUMENT} />;
}
