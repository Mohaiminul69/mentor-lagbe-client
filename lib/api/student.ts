import "server-only"
import { authFetch } from "@/lib/core/server"
import type { Application, StudentStats } from "@/lib/types/application"

export const getMyApplications = async (): Promise<Application[]> => {
  try {
    const res = await authFetch("/applications/me")
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const getStudentStats = async (): Promise<StudentStats> => {
  try {
    const res = await authFetch("/stats/student")
    if (!res.ok) throw new Error("Failed to load stats")
    return res.json()
  } catch {
    return { total: 0, accepted: 0, pending: 0, plan: "free" }
  }
}
