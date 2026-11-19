import { Skeleton } from "@/components/ui/skeleton"
import { StatCardsSkeleton } from "@/components/dashboard/stat-card"

const DashboardLoading = () => {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-8">
      <span className="sr-only">Loading...</span>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>
      <StatCardsSkeleton />
      <Skeleton className="h-72 rounded-[18px]" />
    </div>
  )
}

export default DashboardLoading
