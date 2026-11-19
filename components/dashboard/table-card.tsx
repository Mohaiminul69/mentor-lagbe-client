import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

type TableCardProps = {
  title: string
  count: number
  children: ReactNode
}

export const TableCard = ({ title, count, children }: TableCardProps) => {
  return (
    <div className="overflow-hidden rounded-[18px] border bg-card shadow-card">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="font-heading text-lg font-bold">{title}</h3>
        <span className="text-sm text-muted-foreground">{count} total</span>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[18px] border bg-card px-6 py-16 text-center shadow-card">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <Icon aria-hidden="true" className="size-7" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-xl font-bold">{title}</h3>
        <p className="text-[15px] text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}
