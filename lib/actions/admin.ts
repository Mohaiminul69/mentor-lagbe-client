"use server"

import { unstable_rethrow } from "next/navigation"
import { authFetch } from "@/lib/core/server"

export type ActionResult = {
  ok: boolean
  message: string
}

const send = async (
  path: string,
  data: unknown,
  successMessage: string
): Promise<ActionResult> => {
  try {
    const res = await authFetch(path, "PATCH", data)
    const body = await res.json().catch(() => ({}))

    if (!res.ok) {
      return { ok: false, message: body.message ?? "Something went wrong" }
    }

    return { ok: true, message: successMessage }
  } catch (error) {
    unstable_rethrow(error)
    return { ok: false, message: "Could not reach the server. Please try again." }
  }
}

export const changeUserRole = async (id: string, role: string) =>
  send(`/users/${encodeURIComponent(id)}/role`, { role }, `Role changed to ${role}`)

export const setTuitionApproval = async (
  id: string,
  approvalStatus: "approved" | "rejected"
) =>
  send(
    `/admin/tuitions/${encodeURIComponent(id)}/approval`,
    { approvalStatus },
    approvalStatus === "approved" ? "Tuition approved" : "Tuition rejected"
  )
