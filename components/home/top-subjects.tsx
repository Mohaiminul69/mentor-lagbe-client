import { Suspense } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Atom,
  BookOpen,
  Calculator,
  CodeXml,
  Dna,
  FlaskConical,
  Languages,
  Sigma,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { FadeIn, StaggerGrid } from "@/components/shared/motion-reveal"
import { Skeleton } from "@/components/ui/skeleton"
import { getPlatformStats } from "@/lib/api/stats"
import { subjects } from "@/lib/constants"

const subjectIcons: Record<string, LucideIcon> = {
  Math: Sigma,
  Physics: Atom,
  Chemistry: FlaskConical,
  Biology: Dna,
  English: BookOpen,
  Programming: CodeXml,
  IELTS: Languages,
  Accounting: Calculator,
}

const gridClass =
  "grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-5"

const SubjectGrid = async () => {
  const stats = await getPlatformStats()

  const countFor = (subject: string) =>
    stats.subjects.find((item) => item.subject === subject)?.count ?? 0

  return (
    <StaggerGrid className={gridClass}>
      {subjects.map((subject) => {
        const Icon = subjectIcons[subject] ?? BookOpen
        const count = countFor(subject)

        return (
          <Link
            key={subject}
            href={`/tuitions?subject=${subject}`}
            className="group flex h-full items-center gap-4 rounded-2xl border bg-card p-[18px] shadow-card transition-all duration-150 hover:-translate-y-1 hover:border-primary/50"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-heading text-[17px] font-bold">{subject}</span>
              <span className="text-sm text-muted-foreground">
                {count} {count === 1 ? "tuition" : "tuitions"}
              </span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </Link>
        )
      })}
    </StaggerGrid>
  )
}

const SubjectGridFallback = () => {
  return (
    <div className={gridClass}>
      {subjects.map((subject) => (
        <Skeleton key={subject} className="h-[86px] rounded-2xl" />
      ))}
    </div>
  )
}

export const TopSubjects = () => {
  return (
    <section className="border-y bg-muted">
      <div className="mx-auto max-w-[1200px] px-6 py-24">
        <FadeIn className="mb-10">
          <SectionHeading
            eyebrow="Top subjects"
            title="Explore by subject"
            subtitle="Pick a subject to see every approved tuition for it."
          />
        </FadeIn>
        <Suspense fallback={<SubjectGridFallback />}>
          <SubjectGrid />
        </Suspense>
      </div>
    </section>
  )
}
