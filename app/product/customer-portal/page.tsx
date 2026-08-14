import type { Metadata } from "next"
import { BellRing, Link2, Users, Wifi } from "lucide-react"

import { PortalMock } from "@/components/mocks/portal-mock"
import { RecipientsMock } from "@/components/mocks/recipients-mock"
import { ReminderScheduleMock } from "@/components/mocks/reminder-schedule-mock"
import { RepeatableGroupMock } from "@/components/mocks/repeatable-group-mock"
import { ProductPageShell } from "@/components/product/product-page-shell"
import { FeatureSection } from "@/components/sections/feature-section"

export const metadata: Metadata = {
  title: "Customer portal — ClientGather",
  description:
    "Send a secure, expiring portal link. Recipients answer at their own pace with autosave and no account, and reminders chase the due date without anyone remembering to send them.",
  alternates: { canonical: "/product/customer-portal" },
  openGraph: {
    title: "Customer portal — ClientGather",
    description:
      "Send a secure, expiring portal link — no recipient account, autosave built in.",
    type: "website",
  },
}

export default function CustomerPortalPage() {
  return (
    <ProductPageShell
      eyebrow="Customer portal"
      icon={Link2}
      title="Send a secure link — no account required"
      description="The fastest way to lose a client halfway through onboarding is to ask them to create an account first. Recipients open a private portal from an emailed link, answer at their own pace, and everything saves as they go."
    >
      <FeatureSection
        eyebrow="Access"
        icon={Link2}
        title="A private link, not a login"
        description="Each recipient gets their own token-verified link that expires. There is no password to choose, no app to install, and nothing to remember if they come back to it three days later."
        bullets={[
          "Token-verified access with expiring links",
          "No recipient account, password, or install",
          "Autosave with progress tracked per section",
          "The form validates before it can be submitted, so incomplete bundles never arrive",
        ]}
        mock={<PortalMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Repeatable groups"
        icon={Users}
        title="However many directors, dependants, or assets there are"
        description="The recipient decides how many entries a section needs, not you. Define the fields for one director, and they add an entry per person — each one captured against the same fields, so the result is uniform across every client."
        bullets={[
          "Add and remove entries without you reissuing the request",
          "Nested groups: an entry can contain its own repeatable rows",
          "Every entry returns the same fields, which is what makes review fast",
        ]}
        mock={<RepeatableGroupMock />}
      />

      <FeatureSection
        eyebrow="Reminders"
        icon={BellRing}
        title="The chasing happens without you"
        description="Set a due date and pick a reminder cadence when you send the request. Reminder emails then go out on that schedule whether or not anyone remembers to check. Unlimited emails and reminders on every plan."
        bullets={[
          "Five strategies: none, 3 days before, 5 days before, weekly, or every 3 days",
          "Recurring schedules create and send the next request automatically",
          "Reminders are email only",
        ]}
        mock={<ReminderScheduleMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Collaboration"
        icon={Wifi}
        title="When more than one person has to answer"
        description="Some requests belong to one person; others need a client, their accountant, and a solicitor. Choose individual or collaborative submission per request, and send the same request to as many recipients as it needs."
        bullets={[
          "Individual or collaborative submission modes",
          "Multiple recipients per request, each with their own link",
          "Live presence and cursors in collaborative forms (Growth and Scale)",
        ]}
        mock={<RecipientsMock />}
        href="/product/review-queue"
        linkLabel="See what happens after they submit"
      />
    </ProductPageShell>
  )
}
