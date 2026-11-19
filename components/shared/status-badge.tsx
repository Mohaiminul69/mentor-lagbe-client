import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  pending: "bg-warning-soft text-warning",
  accepted: "bg-success-soft text-success",
  approved: "bg-success-soft text-success",
  paid: "bg-success-soft text-success",
  rejected: "bg-destructive-soft text-destructive",
}

export const StatusBadge = ({
  status,
  className,
}: {
  status: string
  className?: string
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold capitalize",
        statusStyles[status] ?? "bg-muted text-muted-foreground",
        className
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
