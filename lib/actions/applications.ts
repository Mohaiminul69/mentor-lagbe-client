"use server"

import { unstable_rethrow } from "next/navigation"
import { authFetch } from "@/lib/core/server"

export type ApplyInput = {
  tuitionId: string
  studentPhone: string
  preferredSchedule: string
  studentNote: string
}

export type ActionResult = {
  ok: boolean
  message: string
}

export const applyForTuition = async (
  input: ApplyInput
): Promise<ActionResult> => {
  try {
    const res = await authFetch("/applications", "POST", input)
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return { ok: false, message: data.message ?? "Could not submit your application" }
    }

    return { ok: true, message: "Application submitted successfully" }
  } catch (error) {
    unstable_rethrow(error)
    return { ok: false, message: "Could not reach the server. Please try again." }
  }
}
