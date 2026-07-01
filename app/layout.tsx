import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"

import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "SwiftyDoc — Collect documents without the back-and-forth",
  description:
    "Build request templates, share secure portal links, review submissions, and keep every file in one place. SwiftyDoc streamlines document collection end to end.",
  applicationName: "SwiftyDoc",
  authors: [{ name: "SwiftyDoc" }],
  keywords: [
    "document collection",
    "client portal",
    "template builder",
    "form requests",
    "file storage",
  ],
  openGraph: {
    title: "SwiftyDoc — Collect documents without the back-and-forth",
    description:
      "Build request templates, share secure portal links, review submissions, and keep every file in one place.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="min-h-svh antialiased">{children}</body>
    </html>
  )
}
