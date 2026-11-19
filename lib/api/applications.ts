import "server-only"
import { authFetch } from "@/lib/core/server"

export type ApplicationStatus = {
  applied: boolean
  status: "pending" | "accepted" | "rejected" | null
  appliedAt: string | null
}

export const getApplicationStatus = async (
  tuitionId: string
): Promise<ApplicationStatus> => {
  try {
    const res = await authFetch(
      `/applications/check/${encodeURIComponent(tuitionId)}`
    )
    if (!res.ok) return { applied: false, status: null, appliedAt: null }
    return res.json()
  } catch {
    return { applied: false, status: null, appliedAt: null }
  }
}
