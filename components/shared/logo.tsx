import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  accentClassName?: string
}

export const Logo = ({
  className,
  accentClassName = "text-primary",
}: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="MentorLagbe home"
      className={cn(
        "flex items-center gap-2.5 font-heading text-[22px] font-extrabold tracking-[-0.02em]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-[34px] items-center justify-center rounded-[10px] bg-primary text-lg text-primary-foreground"
      >
        M
      </span>
      <span>
        Mentor<span className={accentClassName}>Lagbe</span>
      </span>
    </Link>
  )
}
