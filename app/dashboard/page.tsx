import { redirect } from "next/navigation"
import { requireUser } from "@/lib/core/server"

const DashboardIndexPage = async () => {
  const session = await requireUser()
  redirect(`/dashboard/${session.user.role ?? "student"}`)
}

export default DashboardIndexPage
