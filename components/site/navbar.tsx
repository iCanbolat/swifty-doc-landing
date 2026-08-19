"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Braces,
  ChevronDown,
  ClipboardCheck,
  HardDrive,
  Link2,
  Menu,
  X,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { buildBootstrapOwnerUrl, buildSignInUrl } from "@/lib/app-links";
import { cn } from "@/lib/utils";

type ProductLink = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type NavItem =
  | { href: string; label: string }
  | { label: string; items: ProductLink[] };

const PRODUCT_LINKS: ProductLink[] = [
  {
    href: "/product/template-builder",
    label: "Template builder",
    description: "Design the exact request once, and version every change.",
    icon: Braces,
  },
  {
    href: "/product/customer-portal",
    label: "Customer portal",
    description: "A secure link recipients fill in without an account.",
    icon: Link2,
  },
  {
    href: "/product/review-queue",
    label: "Review queue",
    description: "Approve, reject, and resolve each item in one place.",
    icon: ClipboardCheck,
  },
  {
    href: "/product/storage",
    label: "Storage",
    description: "Files foldered per request, scanned and encrypted.",
    icon: HardDrive,
  },
];

const NAV_ITEMS: NavItem[] = [
  { href: "/#features", label: "Features" },
  { label: "Product", items: PRODUCT_LINKS },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/docs/webhooks", label: "Docs" },
];

const SIGN_IN_URL = buildSignInUrl();
const GET_STARTED_URL = buildBootstrapOwnerUrl();

/** Grace period so a diagonal pointer move from trigger to panel doesn't close it. */
const CLOSE_DELAY_MS = 120;

const NAV_LINK_CLASS =
  "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

function ProductMenu({ items }: { items: ProductLink[] }) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  function cancelClose() {
    clearTimeout(closeTimer.current);
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }

  React.useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      // Only cancels a pending close — deliberately does NOT open. Opening on focus
      // would fight the Escape handler, which returns focus to the trigger and would
      // immediately reopen the panel. Keyboard users open it with Enter or Space.
      onFocusCapture={cancelClose}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        // Touch devices have no hover, so the trigger must also toggle.
        onClick={() => setOpen((value) => !value)}
        className={cn(NAV_LINK_CLASS, "inline-flex items-center gap-1")}
      >
        Product
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute top-full left-0 z-50 mt-2 w-[22rem] animate-menu-in border border-border/70 bg-popover p-2 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.5)] ring-1 ring-foreground/10 motion-reduce:animate-none">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 p-2.5 transition-colors hover:bg-muted"
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center border border-border/70 bg-primary/10 text-primary">
                <item.icon className="size-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-sm leading-5 text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 animate-fade-down">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 transition-all duration-300 lg:px-8",
          scrolled
            ? "my-2 rounded-full border border-border/70 bg-background/80 py-2 shadow-[0_10px_60px_-30px_rgba(15,23,42,0.5)] backdrop-blur-md"
            : "my-3 border border-transparent py-3",
        )}
      >
        <a href="/" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) =>
            "items" in item ? (
              <ProductMenu key={item.label} items={item.items} />
            ) : (
              <a key={item.href} href={item.href} className={NAV_LINK_CLASS}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink
            href={SIGN_IN_URL}
            variant="ghost"
            size="lg"
            className="rounded-full"
          >
            Sign in
          </ButtonLink>
          <ButtonLink href={GET_STARTED_URL} size="lg" className="rounded-full px-4">
            Get started
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="mx-4 mt-1 flex animate-menu-in flex-col gap-1 rounded-[1.5rem] border border-border/70 bg-background/95 p-3 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.6)] md:hidden">
          {NAV_ITEMS.map((item) =>
            "items" in item ? (
              // Four links don't need a nested disclosure — render them as a labelled group.
              <div key={item.label} className="px-1 py-1">
                <p className="px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
                  {item.label}
                </p>
                {item.items.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-full px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <link.icon className="size-3.5 shrink-0 text-primary" />
                    {link.label}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-full px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ),
          )}
          <div className="mt-1 grid grid-cols-2 gap-2 px-1">
            <ButtonLink
              href={SIGN_IN_URL}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              Sign in
            </ButtonLink>
            <ButtonLink href={GET_STARTED_URL} size="lg" className="rounded-full">
              Get started
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
