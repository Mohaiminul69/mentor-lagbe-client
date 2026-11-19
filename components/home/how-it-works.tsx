"use client"

import { useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { SectionHeading } from "@/components/shared/section-heading"
import { FadeIn } from "@/components/shared/motion-reveal"
import { cn } from "@/lib/utils"

const steps = {
  student: [
    {
      title: "Create your account",
      body: "Sign up in seconds and choose the Student role.",
    },
    {
      title: "Search and filter",
      body: "Filter tuitions by subject, class level and online or offline mode.",
    },
    {
      title: "Apply in minutes",
      body: "Send your phone, preferred schedule and a short learning note.",
    },
    {
      title: "Track your status",
      body: "See each application move from pending to accepted on your dashboard.",
    },
  ],
  tutor: [
    {
      title: "Sign up as a tutor",
      body: "Create your profile with a photo, bio and contact number.",
    },
    {
      title: "Post a tuition",
      body: "Add a banner, subject, class level, schedule and monthly fee.",
    },
    {
      title: "Get approved",
      body: "Our admins review each post before it goes live to students.",
    },
    {
      title: "Manage applicants",
      body: "Accept or reject students from your dashboard. Go Pro for unlimited posts.",
    },
  ],
}

type Audience = keyof typeof steps

const tabs: { value: Audience; label: string }[] = [
  { value: "student", label: "For students" },
  { value: "tutor", label: "For tutors" },
]

export const HowItWorks = () => {
  const [audience, setAudience] = useState<Audience>("student")

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-24"
    >
      <FadeIn className="mb-10 flex flex-col items-center gap-6 text-center">
        <SectionHeading
          eyebrow="How MentorLagbe works"
          title="Four steps from search to first class"
          className="items-center"
        />
        <div
          role="tablist"
          aria-label="Choose your role"
          className="inline-flex rounded-xl border bg-muted p-1"
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
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <motion.ol
            key={audience}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6"
          >
            {steps[audience].map((step, index) => (
              <li
                key={step.title}
                className="flex h-full flex-col gap-3.5 rounded-[18px] border bg-card p-7 shadow-card"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary font-heading text-lg font-extrabold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="font-heading text-[19px] font-bold">
                  {step.title}
                </h3>
                <p className="text-[15px] text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </MotionConfig>
    </section>
  )
}
