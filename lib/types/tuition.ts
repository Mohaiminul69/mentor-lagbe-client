export type Tuition = {
  _id: string
  title: string
  subject: string
  classLevel: string
  mode: "Online" | "Offline"
  location: string
  monthlyFee: number
  daysPerWeek: number
  bannerImage: string
  description: string
  tutorName: string
  tutorEmail: string
  approvalStatus: "pending" | "approved" | "rejected"
  isActive: boolean
  createdAt: string
}

export type TuitionInput = {
  title: string
  subject: string
  classLevel: string
  mode: string
  location: string
  monthlyFee: number
  daysPerWeek: number
  description: string
  bannerImage: string
}

export type TutorStats = {
  total: number
  approvedActive: number
  applicants: number
  plan: string
  limit: number | null
}

export type TutorSummary = {
  name: string
  email: string
  image?: string | null
  bio?: string
  phone?: string
  plan?: "free" | "pro"
}

export type TuitionDetails = Tuition & {
  tutor: TutorSummary | null
}

export type TuitionFilters = {
  search: string
  subject: string
  classLevel: string
  mode: string
}
