import type { Metadata } from "next"
import { JetBrains_Mono, Outfit } from "next/font/google"

import { PauseOffscreenAnimations } from "@/components/motion/pause-offscreen"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SITE_NAME, SITE_URL } from "@/lib/site"

import "./globals.css"

// Matches the app shell (client/src/index.css): Outfit for everything, JetBrains
// Mono kept for the few code/identifier surfaces.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

// Only a handful of code/identifier surfaces use it, none of them above the
// fold, so it is not preloaded — a `<link rel=preload>` on every route would
// have it competing with Outfit for bandwidth on pages that never show it.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ClientGather — Collect documents without the back-and-forth",
  description:
    "Build request templates, share secure portal links, review submissions, and keep every file in one place. ClientGather streamlines document collection end to end.",
  applicationName: "ClientGather",
  authors: [{ name: "ClientGather" }],
  keywords: [
    "document collection",
    "client portal",
    "template builder",
    "form requests",
    "file storage",
  ],
  // Every route inherits these, so a page that sets its own `openGraph.title`
  // still gets the card image, the site name, and the locale for free.
  openGraph: {
    title: "ClientGather — Collect documents without the back-and-forth",
    description:
      "Build request templates, share secure portal links, review submissions, and keep every file in one place.",
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientGather — Collect documents without the back-and-forth",
    description:
      "Build request templates, share secure portal links, review submissions, and keep every file in one place.",
    images: ["/og.png"],
  },
  // Search Console can be verified by DNS instead, in which case this stays
  // unset and nothing is rendered.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-svh antialiased">
        {children}
        <SmoothScroll />
        <PauseOffscreenAnimations />
      </body>
    </html>
  )
}
