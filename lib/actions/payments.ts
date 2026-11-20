"use server"

import { unstable_rethrow } from "next/navigation"
import { authFetch } from "@/lib/core/server"
import type { Payment } from "@/lib/types/admin"

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; message: string }

export type VerifyResult =
  | { ok: true; payment: Payment }
  | { ok: false; message: string }

export const startCheckout = async (): Promise<CheckoutResult> => {
  try {
    const res = await authFetch("/payments/create-checkout-session", "POST")
    const data = await res.json().catch(() => ({}))

    if (!res.ok || !data.url) {
      return { ok: false, message: data.message ?? "Could not start checkout" }
    }

    return { ok: true, url: data.url }
  } catch (error) {
    unstable_rethrow(error)
    return { ok: false, message: "Could not reach the server. Please try again." }
  }
}

export const verifyPayment = async (sessionId: string): Promise<VerifyResult> => {
  try {
    const res = await authFetch("/payments/verify", "POST", { sessionId })
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return { ok: false, message: data.message ?? "Could not verify the payment" }
    }

    return { ok: true, payment: data }
  } catch (error) {
    unstable_rethrow(error)
    return { ok: false, message: "Could not reach the server. Please try again." }
  }
}
