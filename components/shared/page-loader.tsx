import { cn } from "@/lib/utils"

export const PageLoader = ({ className }: { className?: string }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div className="relative flex size-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-accent border-t-primary" />
        <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary font-heading text-lg font-extrabold text-primary-foreground">
          M
        </span>
      </div>
      <p className="text-sm font-medium text-muted-foreground">Loading...</p>
    </div>
  )
}
