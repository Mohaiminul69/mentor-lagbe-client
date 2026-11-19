import { Suspense } from "react"
import type { Metadata } from "next"
import { Skeleton } from "@/components/ui/skeleton"
import { TuitionCardSkeleton } from "@/components/shared/tuition-card-skeleton"
import {
  TuitionResults,
  tuitionGridClass,
} from "@/components/tuitions/tuition-results"
import type { TuitionFilters } from "@/lib/types/tuition"

export const metadata: Metadata = {
  title: "Browse Tuitions | MentorLagbe",
}

const readParam = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? ""

const ResultsLoader = async ({
  searchParams,
}: {
  searchParams: PageProps<"/tuitions">["searchParams"]
}) => {
  const params = await searchParams
  const filters: TuitionFilters = {
    search: readParam(params.search),
    subject: readParam(params.subject),
    classLevel: readParam(params.classLevel),
    mode: readParam(params.mode),
  }

  return <TuitionResults filters={filters} />
}

const ResultsFallback = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-[68px] rounded-2xl" />
      <Skeleton className="h-5 w-40" />
      <div className={tuitionGridClass}>
        {Array.from({ length: 6 }, (_, index) => (
          <TuitionCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

const BrowseTuitionsPage = ({ searchParams }: PageProps<"/tuitions">) => {
  return (
    <>
      <section className="border-b bg-muted">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-14">
          <span className="text-[13px] font-bold tracking-[0.08em] text-primary uppercase">
            Browse tuitions
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-[-0.03em] sm:text-[44px]">
            Find the right tutor for you
          </h1>
          <p className="max-w-[620px] text-[17px] text-muted-foreground">
            Every listing is approved by our admins. Search by title or subject
            and narrow down by class level or mode.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <Suspense fallback={<ResultsFallback />}>
          <ResultsLoader searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  )
}

export default BrowseTuitionsPage
