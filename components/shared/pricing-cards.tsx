"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SubscribeButton,
  type PricingViewer,
} from "@/components/shared/subscribe-button"
import { plans, type PlanAudience } from "@/lib/plans"
import { cn } from "@/lib/utils"

const tabs: { value: PlanAudience; label: string }[] = [
  { value: "student", label: "Students" },
  { value: "tutor", label: "Tutors" },
]

const FeatureList = ({
  features,
  checkClass,
}: {
  features: string[]
  checkClass: string
}) => (
  <ul className="flex flex-1 flex-col gap-3 text-[15px]">
    {features.map((feature) => (
      <li key={feature} className="flex items-start gap-2.5">
        <Check
          aria-hidden="true"
          strokeWidth={2.5}
          className={cn("mt-[3px] size-[18px] shrink-0", checkClass)}
        />
        {feature}
      </li>
    ))}
  </ul>
)

type PricingCardsProps = {
  viewer?: PricingViewer
  initialAudience?: PlanAudience
}

export const PricingCards = ({
  viewer,
  initialAudience = "student",
}: PricingCardsProps) => {
  const [audience, setAudience] = useState<PlanAudience>(initialAudience)
  const { free, pro } = plans[audience]

  return (
    <div className="flex flex-col items-center gap-10">
      <div
        role="tablist"
        aria-label="Plans for"
        className="inline-flex rounded-xl border bg-card p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={audience === tab.value}
            onClick={() => setAudience(tab.value)}
            className={cn(
              "h-10 rounded-[9px] px-5 text-[15px] font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              audience === tab.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid w-full max-w-[860px] gap-6 md:grid-cols-2"
          >
            <div className="flex h-full flex-col gap-6 rounded-[20px] border bg-card p-8">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-[22px] font-bold">{free.name}</h3>
                <p className="text-[15px] text-muted-foreground">{free.tagline}</p>
              </div>
              <p className="font-heading text-5xl leading-none font-extrabold tracking-[-0.03em]">
                $0
                <span className="font-sans text-base font-medium tracking-normal text-muted-foreground">
                  {" "}
                  forever
                </span>
              </p>
              <FeatureList features={free.features} checkClass="text-success" />
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/sign-up" />}
                className="h-12 rounded-[10px] text-[15px] font-semibold"
              >
                Get started free
              </Button>
            </div>

            <div className="relative flex h-full flex-col gap-6 rounded-[20px] border-2 border-primary bg-card p-8 shadow-card">
              <span className="absolute -top-3.5 left-8 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Most popular
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-[22px] font-bold">{pro.name}</h3>
                <p className="text-[15px] text-muted-foreground">{pro.tagline}</p>
              </div>
              <p className="font-heading text-5xl leading-none font-extrabold tracking-[-0.03em]">
                ${pro.price}
                <span className="font-sans text-base font-medium tracking-normal text-muted-foreground">
                  {" "}
                  one-time
                </span>
              </p>
              <FeatureList features={pro.features} checkClass="text-primary" />
              <SubscribeButton audience={audience} viewer={viewer} />
            </div>
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    </div>
  )
}
