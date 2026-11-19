import "server-only"
import { authFetch } from "@/lib/core/server"
import type { AdminStats, AdminUser, Payment } from "@/lib/types/admin"
import type { Tuition } from "@/lib/types/tuition"

const getList = async <T>(path: string): Promise<T[]> => {
  try {
    const res = await authFetch(path)
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const getAllUsers = () => getList<AdminUser>("/users")

export const getAllPayments = () => getList<Payment>("/admin/payments")

export const getAdminTuitions = (status: string) =>
  getList<Tuition>(
    status ? `/admin/tuitions?status=${encodeURIComponent(status)}` : "/admin/tuitions"
  )

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    const res = await authFetch("/stats/admin")
    if (!res.ok) throw new Error("Failed to load stats")
    return res.json()
  } catch {
    return {
      totalUsers: 0,
      tutors: 0,
      students: 0,
      pendingTuitions: 0,
      approvedTuitions: 0,
      rejectedTuitions: 0,
      revenue: 0,
      transactions: 0,
    }
  }
}
