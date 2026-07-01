"use client"

import * as React from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { ButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
]

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12)
  })

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 transition-all duration-300 lg:px-8",
          scrolled
            ? "my-2 rounded-full border border-border/70 bg-background/80 py-2 shadow-[0_10px_60px_-30px_rgba(15,23,42,0.5)] backdrop-blur-xl"
            : "my-3 border border-transparent py-3"
        )}
      >
        <a href="#top" className="shrink-0">
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
          <ButtonLink href="#cta" size="lg" className="rounded-full px-4">
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
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-1 flex flex-col gap-1 rounded-[1.5rem] border border-border/70 bg-background/95 p-3 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.6)] backdrop-blur-xl md:hidden"
        >
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
            <ButtonLink href="#cta" size="lg" className="rounded-full">
              Get started
            </ButtonLink>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  )
}
