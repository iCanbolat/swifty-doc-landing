import {
  ArrowRight,
  Braces,
  CheckCircle2,
  GripVertical,
  Rocket,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { buildBootstrapOwnerUrl } from "@/lib/app-links";

const TRUST = [
  "No login for recipients",
  "Autosave built in",
  "Version-controlled templates",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16)_0,transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16)_0,transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]"
    >
      {/* Faint grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Animated soft blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-[26rem] animate-blob-a rounded-full bg-primary/15 blur-3xl will-change-transform motion-reduce:animate-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-32 size-[22rem] animate-blob-b rounded-full bg-sky-400/15 blur-3xl will-change-transform motion-reduce:animate-none"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-36 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-40 lg:pb-28">
        {/* Copy */}
        <div>
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[0.65rem] tracking-[0.28em] text-muted-foreground uppercase shadow-sm">
              <Sparkles className="size-3.5 text-primary" />
              Document collection, done right
            </div>
          </div>

          <h1 className="mt-6 animate-rise text-4xl leading-[1.08] font-semibold tracking-tight text-foreground [animation-delay:80ms] sm:text-5xl lg:text-6xl">
            Collect documents
            <br />
            without the{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              back-and-forth
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-rise text-sm leading-7 text-muted-foreground [animation-delay:160ms] sm:text-base">
            Build a request template once, share a secure portal link, and let
            recipients fill it out with autosave — no account needed. Review
            every answer and keep all files in one place.
          </p>

          <div className="mt-8 flex animate-rise flex-wrap items-center gap-3 [animation-delay:240ms]">
            <ButtonLink
              href={buildBootstrapOwnerUrl("foundation")}
              size="hero"
              className="rounded-full"
            >
              Start 14-day trial
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink
              href="#features"
              size="hero"
              variant="outline"
              className="rounded-full"
            >
              See how it works
            </ButtonLink>
          </div>

          <ul className="mt-8 flex animate-rise flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground [animation-delay:320ms]">
            {["14-day no-card trial", ...TRUST].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Floating product preview */}
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative animate-hero-card">
      <div className="animate-float overflow-hidden border border-border/70 bg-card/90 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10 will-change-transform motion-reduce:animate-none">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border/60 bg-background/70 px-4 py-3">
          <span className="size-2.5 rounded-full bg-rose-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 truncate text-[0.65rem] text-muted-foreground">
            app.swiftydoc.io/w/acme/templates/onboarding
          </span>
        </div>

        {/* mini schema builder */}
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
              <Braces className="size-3" />
              Schema builder
            </div>
            <Badge variant="warning">Draft · v3</Badge>
          </div>

          <p className="text-sm font-semibold text-foreground">
            Client onboarding pack
          </p>

          {["Company details", "Ownership & directors", "Bank statements"].map(
            (title, index) => (
              <div
                key={title}
                className="flex animate-rise-x items-center gap-3 border border-border/60 bg-background/70 px-3 py-2.5"
                style={{ animationDelay: `${0.5 + index * 0.12}s` }}
              >
                <GripVertical className="size-3.5 text-muted-foreground/70" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{title}</p>
                  <p className="text-[0.65rem] text-muted-foreground">
                    {index === 2
                      ? "Repeatable · 3 fields"
                      : `${index + 2} fields`}
                  </p>
                </div>
                <span className="text-[0.6rem] text-muted-foreground">
                  {index === 2 ? "File" : index === 1 ? "Multi-select" : "Text"}
                </span>
              </div>
            ),
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[0.65rem] font-medium text-primary-foreground">
              <Rocket className="size-3" />
              Publish version
            </span>
          </div>
        </div>
      </div>

      {/* Floating status chip */}
      <div className="absolute -bottom-4 -left-4 hidden animate-pop items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[0.65rem] font-medium text-emerald-700 shadow-lg [animation-delay:1s] sm:inline-flex">
        <CheckCircle2 className="size-3.5" />
        Progress saved
      </div>
    </div>
  );
}
