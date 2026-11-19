export type ApplicationStatusValue = "pending" | "accepted" | "rejected"

export type Application = {
  _id: string
  tuitionId: string
  tuitionTitle: string
  subject: string
  monthlyFee: number
  tutorName: string
  tutorEmail: string
  studentName: string
  studentEmail: string
  studentPhone: string
  preferredSchedule: string
  studentNote: string
  status: ApplicationStatusValue
  appliedAt: string
}

export type StudentStats = {
  total: number
  accepted: number
  pending: number
  plan: string
}
