"use client"

import { useState } from "react"
import Link from "next/link"
import { BadgeCheck, Loader2, Lock, LogIn } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { startCheckout } from "@/lib/actions/payments"
import type { PlanAudience } from "@/lib/plans"

export type PricingViewer = {
  role: string
  plan: string
} | null

type SubscribeButtonProps = {
  audience: PlanAudience
  viewer?: PricingViewer
}

const buttonClass = "h-12 w-full rounded-[10px] text-[15px] font-semibold"

export const SubscribeButton = ({ audience, viewer }: SubscribeButtonProps) => {
  const [loading, setLoading] = useState(false)

  if (viewer === undefined) {
    return (
      <Button
        nativeButton={false}
        render={<Link href="/pricing" />}
        className={`${buttonClass} hover:bg-primary/90`}
      >
        <Lock aria-hidden="true" />
        Subscribe with Stripe
      </Button>
    )
  }

  if (viewer === null) {
    return (
      <Button
        nativeButton={false}
        render={<Link href="/sign-in?redirect=/pricing" />}
        className={`${buttonClass} hover:bg-primary/90`}
      >
        <LogIn aria-hidden="true" />
        Sign in to subscribe
      </Button>
    )
  }

  if (viewer.role === "admin") {
    return (
      <Button disabled className={buttonClass}>
        Not available for admins
      </Button>
    )
  }

  if (viewer.role !== audience) {
    return (
      <Button disabled className={buttonClass}>
        Available for {audience}s only
      </Button>
    )
  }

  if (viewer.plan === "pro") {
    return (
      <Button disabled className={`${buttonClass} disabled:opacity-100`}>
        <BadgeCheck aria-hidden="true" />
        You&apos;re on Pro
      </Button>
    )
  }

  const handleCheckout = async () => {
    setLoading(true)
    const result = await startCheckout()

    if (!result.ok) {
      setLoading(false)
      toast.error(result.message)
      return
    }

    toast.loading("Redirecting to Stripe...")
    window.location.href = result.url
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={`${buttonClass} hover:bg-primary/90`}
    >
      {loading ? (
        <Loader2 aria-hidden="true" className="animate-spin" />
      ) : (
        <Lock aria-hidden="true" />
      )}
      {loading ? "Starting checkout..." : "Subscribe with Stripe"}
    </Button>
  )
}
