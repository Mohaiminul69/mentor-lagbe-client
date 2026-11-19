import type { Tuition } from "@/lib/types/tuition"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const getFeaturedTuitions = async (): Promise<Tuition[]> => {
  try {
    const res = await fetch(`${apiUrl}/tuitions/featured`)
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
