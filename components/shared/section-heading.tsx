import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <span className="text-[13px] font-bold tracking-[0.08em] text-primary uppercase">
        {eyebrow}
      </span>
      <h2 className="font-heading text-3xl leading-tight font-bold tracking-[-0.025em] sm:text-[40px]">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-[17px] text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  )
}
