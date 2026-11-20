import { Suspense } from "react"
import type { Metadata } from "next"
import { CreditCard, ShieldCheck, Zap } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { PricingCards } from "@/components/shared/pricing-cards"
import { getSession } from "@/lib/core/server"

export const metadata: Metadata = {
  title: "Pricing | MentorLagbe",
}

const highlights = [
  { icon: CreditCard, text: "Secure checkout powered by Stripe" },
  { icon: Zap, text: "Pro unlocks instantly after payment" },
  { icon: ShieldCheck, text: "One-time payment, no subscription renewals" },
]

const PricingContent = async () => {
  const session = await getSession()
  const viewer = session
    ? { role: session.user.role ?? "student", plan: session.user.plan ?? "free" }
    : null

  return (
    <PricingCards
      viewer={viewer}
      initialAudience={viewer?.role === "tutor" ? "tutor" : "student"}
    />
  )
}

const PricingPage = () => {
  return (
    <>
      <section className="border-b bg-muted">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 px-6 py-14 text-center">
          <span className="text-[13px] font-bold tracking-[0.08em] text-primary uppercase">
            Pricing / Pro plans
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-[-0.03em] sm:text-[44px]">
            Start free, upgrade when you&apos;re ready
          </h1>
          <p className="max-w-[620px] text-[17px] text-muted-foreground">
            Students get priority booking for $10. Tutors get unlimited posts and a
            verified badge for $15.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-16">
        <Suspense fallback={<Skeleton className="mx-auto h-[520px] w-full max-w-[860px] rounded-[20px]" />}>
          <PricingContent />
        </Suspense>

        <ul className="mx-auto grid w-full max-w-[860px] gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-2xl border bg-card p-4 text-sm font-medium shadow-card"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PricingPage
