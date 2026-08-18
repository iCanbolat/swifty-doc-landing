import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/legal-document";
import { TERMS_DOCUMENT } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms & Conditions — ClientGather",
  description:
    "The agreement that governs your use of ClientGather: accounts, plans, your content, acceptable use, billing and termination.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return <LegalDocumentPage document={TERMS_DOCUMENT} />;
}
