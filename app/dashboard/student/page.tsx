import { Suspense } from "react"
import Link from "next/link"
import { CheckCircle2, ClipboardList, Crown, Hourglass } from "lucide-react"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import {
  StatCard,
  StatCardsSkeleton,
  statGridClass,
} from "@/components/dashboard/stat-card"
import { getStudentStats } from "@/lib/api/student"
import { requireRole } from "@/lib/core/server"

const StudentStatsGrid = async () => {
  const stats = await getStudentStats()

  return (
    <div className="flex flex-col gap-4">
      <div className={statGridClass}>
        <StatCard
          label="Total applied"
          value={stats.total}
          hint="Tuitions you have applied to"
          icon={ClipboardList}
        />
        <StatCard
          label="Accepted"
          value={stats.accepted}
          hint="Tutors who accepted you"
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          hint="Waiting for the tutor's reply"
          icon={Hourglass}
        />
        <StatCard
          label="Current plan"
          value={stats.plan}
          hint={stats.plan === "pro" ? "Priority booking unlocked" : "Upgrade for priority booking"}
          icon={Crown}
        />
      </div>
      <Link
        href="/dashboard/student/my-applications"
        className="self-start text-sm font-semibold text-primary hover:underline"
      >
        View my applications →
      </Link>
    </div>
  )
}

const StudentOverviewPage = async () => {
  const session = await requireRole("student")

  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title={`Welcome back, ${session.user.name.split(" ")[0]}`}
        description="Track your tuition applications and manage your account."
      />
      <Suspense fallback={<StatCardsSkeleton />}>
        <StudentStatsGrid />
      </Suspense>
    </div>
  )
}

export default StudentOverviewPage
