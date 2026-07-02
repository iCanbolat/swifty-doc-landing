"use client";

import { motion } from "framer-motion";
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

const EASE = [0.22, 1, 0.36, 1] as const;

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
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-[26rem] rounded-full bg-primary/15 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-32 size-[22rem] rounded-full bg-sky-400/15 blur-3xl"
        animate={{ y: [0, -28, 0], x: [0, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-36 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-40 lg:pb-28">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[0.65rem] tracking-[0.28em] text-muted-foreground uppercase shadow-sm backdrop-blur-xl">
              <Sparkles className="size-3.5 text-primary" />
              Document collection, done right
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Collect documents
            <br />
            without the{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              back-and-forth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base"
          >
            Build a request template once, share a secure portal link, and let
            recipients fill it out with autosave — no account needed. Review
            every answer and keep all files in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
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
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            {["14-day no-card trial", ...TRUST].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Floating product preview */}
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10 backdrop-blur-xl"
      >
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
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.12, duration: 0.5 }}
                className="flex items-center gap-3 border border-border/60 bg-background/70 px-3 py-2.5"
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
              </motion.div>
            ),
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[0.65rem] font-medium text-primary-foreground">
              <Rocket className="size-3" />
              Publish version
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating status chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -bottom-4 -left-4 hidden items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[0.65rem] font-medium text-emerald-700 shadow-lg backdrop-blur-xl sm:inline-flex"
      >
        <CheckCircle2 className="size-3.5" />
        Progress saved
      </motion.div>
    </motion.div>
  );
}
