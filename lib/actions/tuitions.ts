"use server"

import { unstable_rethrow } from "next/navigation"
import { authFetch } from "@/lib/core/server"
import type { TuitionInput } from "@/lib/types/tuition"

export type ActionResult = {
  ok: boolean
  message: string
}

const send = async (
  path: string,
  method: string,
  successMessage: string,
  data?: unknown
): Promise<ActionResult> => {
  try {
    const res = await authFetch(path, method, data)
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

export const createTuition = async (input: TuitionInput) =>
  send("/tuitions", "POST", "Tuition submitted for admin approval", input)

export const updateTuition = async (id: string, input: TuitionInput) =>
  send(
    `/tuitions/${encodeURIComponent(id)}`,
    "PATCH",
    "Tuition updated and sent for re-approval",
    input
  )

export const setTuitionActive = async (id: string, isActive: boolean) =>
  send(
    `/tuitions/${encodeURIComponent(id)}/status`,
    "PATCH",
    isActive ? "Tuition is now active" : "Tuition closed",
    { isActive }
  )

export const deleteTuition = async (id: string) =>
  send(`/tuitions/${encodeURIComponent(id)}`, "DELETE", "Tuition deleted")
