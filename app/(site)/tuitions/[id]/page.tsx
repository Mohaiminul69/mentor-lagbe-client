import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { TuitionDetailsView } from "@/components/tuitions/tuition-details-view"
import { getTuitionById } from "@/lib/api/tuitions"

export const metadata: Metadata = {
  title: "Tuition Details | MentorLagbe",
}

const DetailsLoader = async ({
  params,
}: {
  params: PageProps<"/tuitions/[id]">["params"]
}) => {
  const { id } = await params
  const tuition = await getTuitionById(id)

  if (!tuition) {
    notFound()
  }

  return <TuitionDetailsView tuition={tuition} />
}

const DetailsFallback = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-[220px] rounded-[18px] sm:h-[320px]" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-12 w-3/4" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-[78px] rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-48 rounded-[18px]" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-56 rounded-[18px]" />
          <Skeleton className="h-64 rounded-[18px]" />
        </div>
      </div>
    </div>
  )
}

const TuitionDetailsPage = ({ params }: PageProps<"/tuitions/[id]">) => {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10">
      <Suspense fallback={<DetailsFallback />}>
        <DetailsLoader params={params} />
      </Suspense>
    </section>
  )
}

export default TuitionDetailsPage
