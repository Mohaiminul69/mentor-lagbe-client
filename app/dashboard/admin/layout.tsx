import { requireRole } from "@/lib/core/server"

const AdminDashboardLayout = async ({ children }: LayoutProps<"/dashboard/admin">) => {
  await requireRole("admin")
  return children
}

export default AdminDashboardLayout
