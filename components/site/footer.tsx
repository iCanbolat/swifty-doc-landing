import { Logo } from "@/components/brand/logo"

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Template builder", href: "#" },
      { label: "Customer portal", href: "#" },
      { label: "Review queue", href: "#" },
      { label: "Storage", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs/webhooks" },
      { label: "Status", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-xs leading-6 text-muted-foreground">
            Collect documents without the back-and-forth. Templates, portals,
            review, and storage in one workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="text-[0.65rem] tracking-[0.22em] text-foreground uppercase">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-[0.65rem] text-muted-foreground sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} SwiftyDoc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
