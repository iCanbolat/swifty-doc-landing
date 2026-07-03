"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { ButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs/webhooks", label: "Docs" },
]

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 animate-fade-down">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 transition-all duration-300 lg:px-8",
          scrolled
            ? "my-2 rounded-full border border-border/70 bg-background/80 py-2 shadow-[0_10px_60px_-30px_rgba(15,23,42,0.5)] backdrop-blur-md"
            : "my-3 border border-transparent py-3"
        )}
      >
        <a href="/" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="#" variant="ghost" size="lg" className="rounded-full">
            Sign in
          </ButtonLink>
          <ButtonLink href="/#cta" size="lg" className="rounded-full px-4">
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-full px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-1 grid grid-cols-2 gap-2 px-1">
            <ButtonLink href="#" variant="outline" size="lg" className="rounded-full">
              Sign in
            </ButtonLink>
            <ButtonLink href="/#cta" size="lg" className="rounded-full">
              Get started
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  )
}
