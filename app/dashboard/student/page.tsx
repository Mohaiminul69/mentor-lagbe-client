import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { requireRole } from "@/lib/core/server"

const StudentOverviewPage = async () => {
  const session = await requireRole("student")

  return (
    <DashboardPageHeader
      title={`Welcome back, ${session.user.name.split(" ")[0]}`}
      description="Track your tuition applications and manage your account."
    />
  )
}

export default StudentOverviewPage
