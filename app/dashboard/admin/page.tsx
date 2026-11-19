import { Suspense } from "react"
import Link from "next/link"
import { CircleDollarSign, ClipboardCheck, GraduationCap, Users } from "lucide-react"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import {
  StatCard,
  StatCardsSkeleton,
  statGridClass,
} from "@/components/dashboard/stat-card"
import { getAdminStats } from "@/lib/api/admin"
import { requireRole } from "@/lib/core/server"
import { formatCurrency } from "@/lib/formatters"

const AdminStatsGrid = async () => {
  const stats = await getAdminStats()

  return (
    <div className="flex flex-col gap-4">
      <div className={statGridClass}>
        <StatCard
          label="Total users"
          value={stats.totalUsers}
          hint={`${stats.students} students on the platform`}
          icon={Users}
        />
        <StatCard
          label="Total tutors"
          value={stats.tutors}
          hint="Registered tutor accounts"
          icon={GraduationCap}
        />
        <StatCard
          label="Pending vs approved"
          value={`${stats.pendingTuitions} / ${stats.approvedTuitions}`}
          hint={`${stats.rejectedTuitions} rejected tuitions`}
          icon={ClipboardCheck}
        />
        <StatCard
          label="Total revenue"
          value={formatCurrency(stats.revenue)}
          hint={`${stats.transactions} Stripe payments`}
          icon={CircleDollarSign}
        />
      </div>
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        <Link
          href="/dashboard/admin/tuitions?status=pending"
          className="text-primary hover:underline"
        >
          Review pending tuitions →
        </Link>
        <Link href="/dashboard/admin/users" className="text-primary hover:underline">
          Manage users →
        </Link>
      </div>
    </div>
  )
}

const AdminOverviewPage = async () => {
  const session = await requireRole("admin")

  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title={`Welcome back, ${session.user.name.split(" ")[0]}`}
        description="Moderate tuition posts, manage users and track revenue."
      />
      <Suspense fallback={<StatCardsSkeleton />}>
        <AdminStatsGrid />
      </Suspense>
    </div>
  )
}

export default AdminOverviewPage
