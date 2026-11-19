import { requireRole } from "@/lib/core/server"

const StudentDashboardLayout = async ({ children }: LayoutProps<"/dashboard/student">) => {
  await requireRole("student")
  return children
}

export default StudentDashboardLayout
