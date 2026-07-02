import { ArrowRight, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { buildBootstrapOwnerUrl, resolveBookDemoUrl } from "@/lib/app-links";

const BOOK_DEMO_URL = resolveBookDemoUrl();

export function CTA() {
  return (
    <section id="cta" className="scroll-mt-24 px-6 py-20 lg:px-8 lg:py-28">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(70,50,229,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_48%),linear-gradient(180deg,#ffffff,#eef2ff)] px-8 py-14 text-center shadow-[0_40px_120px_-50px_rgba(15,23,42,0.5)] ring-1 ring-foreground/10 lg:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase backdrop-blur-xl">
              <Sparkles className="size-3.5 text-primary" />
              Start collecting today
            </div>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Turn document chaos into a clean, tracked workflow
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
              Spin up your first template in minutes. Every organization owner
              starts with a 14-day no-card trial with strict anti-abuse limits.
            </p>
            <p className="mx-auto mt-3 max-w-lg text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Trial includes up to 3 users, 10 active requests, 1 GB storage,
              and 50 emails / month.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink
                href={buildBootstrapOwnerUrl("foundation")}
                size="hero"
                className="rounded-full"
              >
                Get started free
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href={BOOK_DEMO_URL}
                size="hero"
                variant="outline"
                className="rounded-full bg-background/70"
              >
                Book a demo
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
