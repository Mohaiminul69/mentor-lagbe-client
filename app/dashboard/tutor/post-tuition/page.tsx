import { Suspense } from "react"
import Link from "next/link"
import { Crown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { TuitionForm } from "@/components/dashboard/tuition-form"
import { getTutorStats } from "@/lib/api/tutor"

const PostTuitionContent = async () => {
  const stats = await getTutorStats()
  const limitReached = stats.limit !== null && stats.total >= stats.limit

  return (
    <div className="flex flex-col gap-6">
      {stats.limit !== null ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border bg-accent px-5 py-4 text-accent-foreground">
          <p className="flex items-center gap-2 text-[15px]">
            <Info aria-hidden="true" className="size-5 shrink-0" />
            <span>
              <strong>
                {Math.min(stats.total, stats.limit)} of {stats.limit}
              </strong>{" "}
              free posts used. Upgrade to Pro for unlimited posts.
            </span>
          </p>
          <Link href="/pricing" className="text-sm font-semibold underline">
            See Pro plan
          </Link>
        </div>
      ) : null}

      {limitReached ? (
        <div className="flex flex-col items-center gap-4 rounded-[18px] border-2 border-primary bg-card px-6 py-12 text-center shadow-card">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Crown aria-hidden="true" className="size-7" />
          </span>
          <div className="flex max-w-md flex-col gap-1">
            <h3 className="font-heading text-xl font-bold">
              You have reached the free limit
            </h3>
            <p className="text-[15px] text-muted-foreground">
              Free tutors can post up to {stats.limit} tuitions. Upgrade to Tutor
              Pro for unlimited posts and a verified badge.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/pricing" />}
            className="h-12 rounded-[10px] px-6 text-[15px] font-semibold hover:bg-primary/90"
          >
            Upgrade to Pro
          </Button>
        </div>
      ) : (
        <div className="rounded-[18px] border bg-card p-6 shadow-card sm:p-8">
          <TuitionForm />
        </div>
      )}
    </div>
  )
}

const PostTuitionPage = () => {
  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <DashboardPageHeader
        title="Post a Tuition"
        description="Your post goes live on Browse Tuitions after an admin approves it."
      />
      <Suspense fallback={<Skeleton className="h-[640px] rounded-[18px]" />}>
        <PostTuitionContent />
      </Suspense>
    </div>
  )
}

export default PostTuitionPage
