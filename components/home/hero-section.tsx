"use client"

import Image from "next/image"
import Link from "next/link"
import Form from "next/form"
import { BadgeCheck, Check, Search } from "lucide-react"
import { MotionConfig, motion, type Variants } from "motion/react"
import { Button } from "@/components/ui/button"
import heroImage from "@/public/images/hero.jpg"

const popularSubjects = ["Math", "Physics", "Programming", "IELTS"]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const bob = (delay: number) => ({
  animate: { y: [0, -6, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay },
})

export const HeroSection = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section className="border-b bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[22px_22px]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 pt-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-[88px] lg:pb-24"
        >
          <div className="flex min-w-0 flex-col gap-6">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground"
            >
              <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
              Online and in-person tuition, worldwide
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              Find your ideal tutor or{" "}
              <span className="text-primary">mentorship batch</span> today
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-[540px] text-lg text-muted-foreground sm:text-[19px]"
            >
              Search verified tutors by subject, class level, mode and monthly
              budget. Apply in minutes and track every application in one place.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Form
                action="/tuitions"
                role="search"
                className="flex max-w-[600px] flex-wrap gap-2 rounded-2xl border bg-card p-2 shadow-card"
              >
                <label className="flex min-w-0 flex-[1_1_240px] items-center gap-2.5 px-3 text-muted-foreground">
                  <Search aria-hidden="true" className="size-[18px] shrink-0" />
                  <span className="sr-only">Search by title or subject</span>
                  <input
                    type="text"
                    name="search"
                    placeholder="Subject or title, e.g. IELTS"
                    className="h-11 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </label>
                <label className="flex items-center">
                  <span className="sr-only">Mode</span>
                  <select
                    name="mode"
                    defaultValue=""
                    className="h-11 rounded-[10px] border bg-muted px-3 text-[15px] text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="">Any mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </label>
                <Button
                  type="submit"
                  className="h-11 rounded-[10px] px-5 text-[15px] font-semibold hover:bg-primary/90"
                >
                  Browse tuitions
                </Button>
              </Form>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <span>Popular:</span>
              {popularSubjects.map((subject) => (
                <Link
                  key={subject}
                  href={`/tuitions?subject=${subject}`}
                  className="rounded-full border bg-card px-3 py-1 transition-colors hover:border-primary hover:text-primary"
                >
                  {subject}
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative h-[360px] min-w-0 sm:h-[440px] lg:h-[480px]"
          >
            <div className="absolute inset-y-0 right-0 left-0 overflow-hidden rounded-[20px] border shadow-card sm:left-10 sm:bottom-6">
              <Image
                src={heroImage}
                alt="Students learning together with laptops"
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>

            <motion.div
              {...bob(0)}
              className="absolute bottom-10 left-3 flex items-center gap-3 rounded-[14px] border bg-card px-[18px] py-3.5 shadow-card sm:left-0"
            >
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-success-soft text-success">
                <Check aria-hidden="true" className="size-[18px]" strokeWidth={2.5} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Application accepted</p>
                <p className="text-[13px] text-muted-foreground">
                  SAT Math Intensive Batch
                </p>
              </div>
            </motion.div>

            <motion.div
              {...bob(1.2)}
              className="absolute right-4 bottom-0 flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card"
            >
              <BadgeCheck aria-hidden="true" className="size-4" strokeWidth={2.5} />
              Verified Pro tutor
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}
