import "server-only"
import { authFetch } from "@/lib/core/server"
import type { Application } from "@/lib/types/application"
import type { Tuition, TutorStats } from "@/lib/types/tuition"

export const getMyTuitions = async (): Promise<Tuition[]> => {
  try {
    const res = await authFetch("/tuitions/mine")
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const getTutorApplicants = async (): Promise<Application[]> => {
  try {
    const res = await authFetch("/applications/tutor")
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const getTutorStats = async (): Promise<TutorStats> => {
  try {
    const res = await authFetch("/stats/tutor")
    if (!res.ok) throw new Error("Failed to load stats")
    return res.json()
  } catch {
    return { total: 0, approvedActive: 0, applicants: 0, plan: "free", limit: 2 }
  }
}
