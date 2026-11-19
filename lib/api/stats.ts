export type PlatformStats = {
  tutors: number
  students: number
  tuitions: number
  subjects: { subject: string; count: number }[]
}

const emptyStats: PlatformStats = {
  tutors: 0,
  students: 0,
  tuitions: 0,
  subjects: [],
}

export const getPlatformStats = async (): Promise<PlatformStats> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`)
    if (!res.ok) return emptyStats
    return res.json()
  } catch {
    return emptyStats
  }
}
