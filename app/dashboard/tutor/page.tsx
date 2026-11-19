import { Suspense } from "react"
import Link from "next/link"
import { BookOpenCheck, CheckCircle2, Crown, Users } from "lucide-react"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import {
  StatCard,
  StatCardsSkeleton,
  statGridClass,
} from "@/components/dashboard/stat-card"
import { getTutorStats } from "@/lib/api/tutor"
import { requireRole } from "@/lib/core/server"

const TutorStatsGrid = async () => {
  const stats = await getTutorStats()

  return (
    <div className="flex flex-col gap-4">
      <div className={statGridClass}>
        <StatCard
          label="Tuitions posted"
          value={stats.total}
          hint={
            stats.limit === null
              ? "Unlimited posts on Pro"
              : `${Math.max(stats.limit - stats.total, 0)} free posts left`
          }
          icon={BookOpenCheck}
        />
        <StatCard
          label="Active & approved"
          value={stats.approvedActive}
          hint="Visible on Browse Tuitions"
          icon={CheckCircle2}
        />
        <StatCard
          label="Applicants received"
          value={stats.applicants}
          hint="Across all your posts"
          icon={Users}
        />
        <StatCard
          label="Current plan"
          value={stats.plan}
          hint={stats.plan === "pro" ? "Verified tutor badge active" : "Upgrade for unlimited posts"}
          icon={Crown}
        />
      </div>
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        <Link href="/dashboard/tutor/my-tuitions" className="text-primary hover:underline">
          Manage my tuitions →
        </Link>
        <Link href="/dashboard/tutor/applicants" className="text-primary hover:underline">
          Review applicants →
        </Link>
      </div>
    </div>
  )
}

const TutorOverviewPage = async () => {
  const session = await requireRole("tutor")

  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title={`Welcome back, ${session.user.name.split(" ")[0]}`}
        description="Manage your tuition posts and student applicants."
      />
      <Suspense fallback={<StatCardsSkeleton />}>
        <TutorStatsGrid />
      </Suspense>
    </div>
  )
}

export default TutorOverviewPage
