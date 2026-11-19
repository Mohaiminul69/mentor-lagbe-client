import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { requireRole } from "@/lib/core/server"

const TutorOverviewPage = async () => {
  const session = await requireRole("tutor")

  return (
    <DashboardPageHeader
      title={`Welcome back, ${session.user.name.split(" ")[0]}`}
      description="Manage your tuition posts and student applicants."
    />
  )
}

export default TutorOverviewPage
