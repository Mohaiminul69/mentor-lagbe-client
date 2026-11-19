export type AdminStats = {
  totalUsers: number
  tutors: number
  students: number
  pendingTuitions: number
  approvedTuitions: number
  rejectedTuitions: number
  revenue: number
  transactions: number
}

export type AdminUser = {
  _id: string
  name: string
  email: string
  image?: string | null
  role: "student" | "tutor" | "admin"
  plan?: "free" | "pro"
  createdAt: string
}

export type Payment = {
  _id: string
  userEmail: string
  userName: string
  userRole: string
  planName: string
  amount: number
  currency: string
  transactionId: string
  stripeSessionId: string
  paymentStatus: string
  paidAt: string
}
