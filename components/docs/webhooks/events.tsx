/**
 * Event names and `data` payload fields are hand-copied from swiftydoc-api.
 * Source of truth: src/common/webhooks/webhook-events.ts (names) and the
 * emitEvent() call sites in src/modules (per-event payload fields).
 */
import { CodeBlock } from "@/components/docs/code-block";
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section";
import { DocsTable, InlineCode } from "@/components/docs/docs-table";
import { Badge } from "@/components/ui/badge";

const REQUEST_COMPLETED_EXAMPLE = `{
  "id": "evt_9f6f2c9a1a7b4c1e",
  "type": "request.completed",
  "occurred_at": "2026-07-03T09:41:00.000Z",
  "organization_id": "org_123",
  "data": {
    "requestId": "req_123",
    "requestCode": "RQ-2041",
    "status": "completed",
    "workspaceId": "ws_123",
    "totalSubmissions": 3,
    "completedSubmissions": 3
  }
}`;

const FILE_UPLOADED_EXAMPLE = `{
  "id": "evt_5b2d8e4a6c7d9f1a",
  "type": "file.uploaded",
  "occurred_at": "2026-07-03T09:38:12.000Z",
  "organization_id": "org_123",
  "data": {
    "fileId": "file_123",
    "requestId": "req_123",
    "submissionId": "sub_123",
    "submissionItemId": "item_123",
    "storageKey": "org_123/req_123/passport.pdf",
    "contentType": "application/pdf",
    "sizeBytes": 482133
  }
}`;

const EVENT_CATALOG: Array<{
  event: string;
  group: string;
  description: string;
}> = [
  {
    event: "request.created",
    group: "Requests",
    description: "A document request was created (in draft).",
  },
  {
    event: "request.sent",
    group: "Requests",
    description: "A request was sent to its recipients.",
  },
  {
    event: "request.viewed",
    group: "Requests",
    description: "A recipient opened a request through their portal link.",
  },
  {
    event: "request.reminder_sent",
    group: "Requests",
    description: "A reminder was delivered to a recipient.",
  },
  {
    event: "request.completed",
    group: "Requests",
    description: "All submissions on a request were completed.",
  },
  {
    event: "request.overdue",
    group: "Requests",
    description: "A request passed its due date without completion.",
  },
  {
    event: "request.closed",
    group: "Requests",
    description: "A request was manually closed as a terminal state.",
  },
  {
    event: "request.cancelled",
    group: "Requests",
    description: "A request was cancelled and marked terminal.",
  },
  {
    event: "submission.updated",
    group: "Submissions",
    description: "A submission's progress or status changed (incl. reopen).",
  },
  {
    event: "submission.submitted",
    group: "Submissions",
    description: "A submission was explicitly finalized/submitted.",
  },
  {
    event: "submission.changes_requested",
    group: "Submissions",
    description: "A review batch rejected one or more items.",
  },
  {
    event: "file.uploaded",
    group: "Files",
    description: "A recipient uploaded a file to a submission item.",
  },
  {
    event: "item.approved",
    group: "Reviews",
    description: "A reviewer approved a submission item.",
  },
  {
    event: "item.rejected",
    group: "Reviews",
    description: "A reviewer rejected a submission item.",
  },
  {
    event: "comment.created",
    group: "Comments",
    description: "A recipient left a comment on a submission item.",
  },
  {
    event: "integration.sync.completed",
    group: "Integrations",
    description: "An integration sync job finished successfully.",
  },
  {
    event: "integration.sync.failed",
    group: "Integrations",
    description: "An integration sync job failed.",
  },
  {
    event: "template.published",
    group: "Templates",
    description: "A template draft was published as a version.",
  },
  {
    event: "workspace.created",
    group: "Workspaces",
    description: "A workspace was created for the organization.",
  },
  {
    event: "user.invited",
    group: "Users",
    description: "An internal user invite was dispatched.",
  },
  {
    event: "user.joined",
    group: "Users",
    description: "An invited internal user completed onboarding.",
  },
  {
    event: "webhook.delivery_failed",
    group: "Webhooks",
    description: "A delivery reached terminal failure state.",
  },
];

const EVENT_FIELDS: Array<{ event: string; fields: string[] }> = [
  {
    event: "request.created",
    fields: [
      "requestId",
      "requestCode",
      "mode",
      "status",
      "workspaceId",
      "clientId",
    ],
  },
  {
    event: "request.sent",
    fields: ["requestId", "requestCode", "status", "workspaceId"],
  },
  {
    event: "request.viewed",
    fields: ["requestId", "submissionId", "recipientId", "portalLinkId"],
  },
  {
    event: "request.reminder_sent",
    fields: [
      "requestId",
      "requestCode",
      "workspaceId",
      "status",
      "channel",
      "provider",
      "externalMessageId",
    ],
  },
  {
    event: "request.completed",
    fields: [
      "requestId",
      "requestCode",
      "status",
      "workspaceId",
      "totalSubmissions",
      "completedSubmissions",
    ],
  },
  {
    event: "request.overdue",
    fields: ["requestId", "requestCode", "status", "dueAt"],
  },
  {
    event: "request.closed",
    fields: ["requestId", "requestCode", "status", "workspaceId", "closedAt"],
  },
  {
    event: "request.cancelled",
    fields: [
      "requestId",
      "requestCode",
      "status",
      "workspaceId",
      "cancelledAt",
    ],
  },
  {
    event: "submission.updated",
    fields: ["submissionId", "requestId", "progressPercent", "status"],
  },
  {
    event: "submission.submitted",
    fields: [
      "submissionId",
      "requestId",
      "status",
      "progressPercent",
      "submittedAt",
    ],
  },
  {
    event: "submission.changes_requested",
    fields: [
      "requestId",
      "submissionId",
      "rejectedItemCount",
      "reviewedItemCount",
      "submissionStatus",
      "progressPercent",
    ],
  },
  {
    event: "file.uploaded",
    fields: [
      "fileId",
      "requestId",
      "submissionId",
      "submissionItemId",
      "storageKey",
      "contentType",
      "sizeBytes",
    ],
  },
  {
    event: "item.approved / item.rejected",
    fields: [
      "reviewDecisionId",
      "requestId",
      "submissionId",
      "submissionItemId",
      "status",
      "submissionStatus",
      "progressPercent",
    ],
  },
  {
    event: "comment.created",
    fields: [
      "commentId",
      "requestId",
      "submissionId",
      "submissionItemId",
      "authorType",
    ],
  },
  {
    event: "integration.sync.completed",
    fields: [
      "connectionId",
      "externalId",
      "externalObjectType",
      "providerKey",
      "syncJobId",
      "status",
      "mode",
    ],
  },
  {
    event: "integration.sync.failed",
    fields: ["connectionId", "providerKey", "syncJobId", "status", "error"],
  },
  {
    event: "template.published",
    fields: [
      "templateId",
      "workspaceId",
      "status",
      "versionId",
      "versionNumber",
      "fieldCount",
      "changeSummary",
      "schemaChecksum",
    ],
  },
  {
    event: "workspace.created",
    fields: ["workspaceId", "code", "name", "status"],
  },
  {
    event: "user.invited",
    fields: [
      "userId",
      "email",
      "fullName",
      "status",
      "expiresAt",
      "invitedByUserId",
      "membershipCount",
    ],
  },
  {
    event: "user.joined",
    fields: ["userId", "email", "fullName", "status", "joinedAt"],
  },
  {
    event: "webhook.delivery_failed",
    fields: [
      "deliveryId",
      "eventId",
      "eventType",
      "endpointId",
      "endpointUrl",
      "attemptCount",
      "maxAttempts",
      "responseCode",
      "error",
      "reason",
    ],
  },
];

export function WebhooksEvents() {
  return (
    <DocSection id="events" title="Event catalog">
      <DocParagraph>
        Endpoints receive only the events they subscribe to. Subscribe to the
        wildcard <InlineCode>*</InlineCode> to receive everything — that is also
        the default when <InlineCode>subscribedEvents</InlineCode> is omitted at
        registration.
      </DocParagraph>
      <DocsTable
        head={["Event", "Group", "Fired when"]}
        rows={EVENT_CATALOG.map((item) => [
          <InlineCode key="event">{item.event}</InlineCode>,
          <Badge key="group" variant="outline">
            {item.group}
          </Badge>,
          item.description,
        ])}
      />

      <DocSubheading id="event-payloads">Example payloads</DocSubheading>
      <DocParagraph>
        The envelope is identical for every event; only{" "}
        <InlineCode>data</InlineCode> changes. Two complete examples:
      </DocParagraph>
      <CodeBlock label="request.completed" code={REQUEST_COMPLETED_EXAMPLE} />
      <CodeBlock label="file.uploaded" code={FILE_UPLOADED_EXAMPLE} />

      <DocSubheading id="event-fields">
        <InlineCode className="text-sm">data</InlineCode> fields by event
      </DocSubheading>
      <DocsTable
        head={["Event", "data fields"]}
        rows={EVENT_FIELDS.map((item) => [
          <InlineCode key="event">{item.event}</InlineCode>,
          <span
            key="fields"
            className="inline-flex flex-wrap gap-x-1.5 gap-y-1"
          >
            {item.fields.map((field) => (
              <InlineCode key={field}>{field}</InlineCode>
            ))}
          </span>,
        ])}
      />
    </DocSection>
  );
}
