import type { LucideIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type StatCardProps = {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
}

export const StatCard = ({ label, value, hint, icon: Icon }: StatCardProps) => {
  return (
    <div className="flex h-full flex-col gap-3 rounded-[18px] border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      <p className="font-heading text-3xl font-extrabold tracking-[-0.02em] capitalize">
        {value}
      </p>
      <p className="text-[13px] text-muted-foreground">{hint}</p>
    </div>
  )
}

export const statGridClass = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4"

export const StatCardsSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className={statGridClass}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-[138px] rounded-[18px]" />
      ))}
    </div>
  )
}
