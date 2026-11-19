import { Suspense } from "react"
import { CountUp } from "@/components/shared/count-up"
import { getPlatformStats } from "@/lib/api/stats"

const StatsBandContent = async () => {
  const stats = await getPlatformStats()

  const items = [
    { label: "Verified tutors", value: stats.tutors },
    { label: "Active students", value: stats.students },
    { label: "Approved tuitions", value: stats.tuitions },
    { label: "Subjects covered", value: stats.subjects.length },
  ]

  return (
    <>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <p className="font-heading text-[44px] leading-[1.1] font-extrabold tracking-[-0.03em]">
            <CountUp value={item.value} />
            <span className="text-indigo-300">+</span>
          </p>
          <p className="text-[15px] text-band-muted">{item.label}</p>
        </div>
      ))}
    </>
  )
}

const StatsBandFallback = () => {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="h-12 w-24 animate-pulse rounded-lg bg-white/10" />
          <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
        </div>
      ))}
    </>
  )
}

export const StatsBand = () => {
  return (
    <section aria-label="Platform statistics" className="bg-band text-band-foreground">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
        <Suspense fallback={<StatsBandFallback />}>
          <StatsBandContent />
        </Suspense>
      </div>
    </section>
  )
}
