import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  /** Show the full wordmark lockup instead of just the icon mark. */
  withWordmark?: boolean
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return withWordmark ? (
    <img
      src="/logo.svg"
      alt="Client Gather"
      className={cn("h-8 w-auto", className)}
    />
  ) : (
    <img
      src="/favicon.ico"
      alt="Client Gather"
      className={cn("size-8 rounded", className)}
    />
  )
}
