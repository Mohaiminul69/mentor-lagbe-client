import "server-only"
import jwt from "jsonwebtoken"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export const getSession = async () => {
  return auth.api.getSession({ headers: await headers() })
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
