import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { TuitionCard } from "@/components/shared/tuition-card"
import { TuitionCardSkeleton } from "@/components/shared/tuition-card-skeleton"
import { FadeIn, StaggerGrid } from "@/components/shared/motion-reveal"
import { getFeaturedTuitions } from "@/lib/api/tuitions"

const gridClass =
  "grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6"

const FeaturedTuitionGrid = async () => {
  const tuitions = await getFeaturedTuitions()

  if (tuitions.length === 0) {
    return (
      <div className="rounded-[18px] border bg-card p-10 text-center text-muted-foreground">
        No tuitions are available right now. Please check back soon.
      </div>
    )
  }

  return (
    <StaggerGrid className={gridClass}>
      {tuitions.map((tuition) => (
        <TuitionCard key={tuition._id} tuition={tuition} />
      ))}
    </StaggerGrid>
  )
}

const FeaturedTuitionsFallback = () => {
  return (
    <div className={gridClass}>
      {Array.from({ length: 6 }, (_, index) => (
        <TuitionCardSkeleton key={index} />
      ))}
    </div>
  )
}

export const FeaturedTuitions = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <FadeIn className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Featured tuitions"
          title="Latest batches and 1-on-1 mentors"
          subtitle="The six newest approved tuitions, updated as tutors post."
        />
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/tuitions" />}
          className="h-11 rounded-[10px] bg-card px-[18px] text-[15px] font-semibold"
        >
          View all tuitions
          <ArrowRight aria-hidden="true" />
        </Button>
      </FadeIn>

      <Suspense fallback={<FeaturedTuitionsFallback />}>
        <FeaturedTuitionGrid />
      </Suspense>
    </section>
  )
}
