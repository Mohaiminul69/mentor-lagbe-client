import type {
  Tuition,
  TuitionDetails,
  TuitionFilters,
} from "@/lib/types/tuition"

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

export const getTuitionById = async (
  id: string
): Promise<TuitionDetails | null> => {
  try {
    const res = await fetch(`${apiUrl}/tuitions/${encodeURIComponent(id)}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export const getTuitions = async (
  filters: TuitionFilters
): Promise<Tuition[]> => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })

  try {
    const res = await fetch(`${apiUrl}/tuitions?${params.toString()}`)
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
