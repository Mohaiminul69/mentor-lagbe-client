import { cn } from "@/lib/utils"

const roleStyles: Record<string, string> = {
  student: "bg-accent text-accent-foreground",
  tutor: "bg-success-soft text-success",
  admin: "bg-warning-soft text-warning",
}

export const RoleBadge = ({ role }: { role: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase",
        roleStyles[role] ?? roleStyles.student
      )}
    >
      {role}
    </span>
  )
}
