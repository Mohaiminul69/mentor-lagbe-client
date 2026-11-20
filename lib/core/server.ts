import "server-only"
import { cache } from "react"
import jwt from "jsonwebtoken"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth, withAuthDb } from "@/lib/auth"

export const getSession = cache(async () => {
  const requestHeaders = await headers()
  return withAuthDb(() => auth.api.getSession({ headers: requestHeaders }))
})

export const requireUser = async (redirectTo = "/dashboard") => {
  const session = await getSession()

  if (!session) {
    redirect(`/sign-in?redirect=${redirectTo}`)
  }

  return session
}

export const requireRole = async (role: "student" | "tutor" | "admin") => {
  const session = await requireUser(`/dashboard/${role}`)

  if (session.user.role !== role) {
    redirect(`/dashboard/${session.user.role ?? "student"}`)
  }

  return session
}

export const getToken = async () => {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  return jwt.sign(
    { email: session.user.email, role: session.user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  )
}

export const authFetch = async (
  path: string,
  method = "GET",
  data?: unknown
) => {
  const token = await getToken()

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
}
