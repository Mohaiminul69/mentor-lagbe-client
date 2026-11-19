import { Skeleton } from "@/components/ui/skeleton"

export const TuitionCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] border bg-card shadow-card">
      <Skeleton className="h-[168px] rounded-none" />
      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-auto flex items-center justify-between border-t pt-3.5">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-11 w-full rounded-[10px]" />
      </div>
    </div>
  )
}
