import { CornerUpLeft, MessageSquare, Paperclip } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type Message = {
  author: string
  role: "Reviewer" | "Recipient"
  time: string
  body: string
  attachment?: string
}

const THREAD: Message[] = [
  {
    author: "Priya Raman",
    role: "Reviewer",
    time: "09:14",
    body: "This covers March but the request asks for Q1. Could you add January and February?",
  },
  {
    author: "Liam Chen",
    role: "Recipient",
    time: "11:02",
    body: "Apologies — uploading the full quarter now.",
    attachment: "bank-statements-q1.pdf",
  },
  {
    author: "Priya Raman",
    role: "Reviewer",
    time: "11:20",
    body: "That's the one. Approving it now.",
  },
]

const ROLE_STYLE = {
  Reviewer: "text-primary border-primary/20 bg-primary/10",
  Recipient: "text-sky-700 border-sky-500/20 bg-sky-500/10",
} as const

export function CommentThreadMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <MessageSquare className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Bank statements · Q1
            </p>
            <p className="text-[0.65rem] text-muted-foreground">
              3 comments on this item
            </p>
          </div>
        </div>
        <Badge variant="warning">Changes requested</Badge>
      </div>

      <div className="space-y-2.5 p-5">
        {THREAD.map((message, index) => (
          <div
            key={message.time}
            className={`reveal-item border border-border/60 bg-background/60 p-3 [--reveal-from:translateY(12px)] ${
              message.role === "Recipient" ? "ml-5" : ""
            }`}
            style={
              { "--reveal-delay": `${index * 0.12}s` } as React.CSSProperties
            }
          >
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[0.6rem] font-semibold text-primary">
                {message.author
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <p className="text-[0.7rem] font-medium text-foreground">
                {message.author}
              </p>
              <span
                className={`border px-1.5 py-0.5 text-[0.55rem] font-medium ${ROLE_STYLE[message.role]}`}
              >
                {message.role}
              </span>
              <span className="ml-auto text-[0.6rem] text-muted-foreground">
                {message.time}
              </span>
            </div>

            <p className="mt-2 text-[0.7rem] leading-5 text-muted-foreground">
              {message.body}
            </p>

            {message.attachment ? (
              <div className="mt-2 flex items-center gap-2 border border-border/50 bg-card/80 px-2.5 py-1.5">
                <Paperclip className="size-3 shrink-0 text-muted-foreground" />
                <span className="truncate text-[0.68rem] text-foreground">
                  {message.attachment}
                </span>
              </div>
            ) : null}
          </div>
        ))}

        <div className="flex items-center gap-2 border border-dashed border-border/60 bg-background/40 px-3 py-2.5 text-[0.7rem] text-muted-foreground">
          <CornerUpLeft className="size-3.5" />
          Reply to this thread…
        </div>
      </div>
    </div>
  )
}
