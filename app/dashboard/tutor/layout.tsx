import { requireRole } from "@/lib/core/server"

const TutorDashboardLayout = async ({ children }: LayoutProps<"/dashboard/tutor">) => {
  await requireRole("tutor")
  return children
}

export default TutorDashboardLayout
