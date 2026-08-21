import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  /** Show the full wordmark lockup instead of just the icon mark. */
  withWordmark?: boolean
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return withWordmark ? (
    // The intrinsic size is what stops the navbar reflowing around it once the
    // SVG lands — `h-8 w-auto` alone leaves the width unknown until then.
    <img
      src="/logo.svg"
      alt="ClientGather"
      width={1280}
      height={260}
      decoding="async"
      className={cn("h-8 w-auto", className)}
    />
  ) : (
    <img
      src="/favicon.ico"
      alt="ClientGather"
      width={32}
      height={32}
      decoding="async"
      className={cn("size-8 rounded", className)}
    />
  )
}
