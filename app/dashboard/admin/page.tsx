import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { requireRole } from "@/lib/core/server"

const AdminOverviewPage = async () => {
  const session = await requireRole("admin")

  return (
    <DashboardPageHeader
      title={`Welcome back, ${session.user.name.split(" ")[0]}`}
      description="Moderate tuition posts, manage users and track revenue."
    />
  )
}

export default AdminOverviewPage
