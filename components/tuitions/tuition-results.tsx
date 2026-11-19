import Link from "next/link"
import { SearchX, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TuitionCard } from "@/components/shared/tuition-card"
import { StaggerGrid } from "@/components/shared/motion-reveal"
import { FilterBar } from "@/components/tuitions/filter-bar"
import { getTuitions } from "@/lib/api/tuitions"
import type { TuitionFilters } from "@/lib/types/tuition"

export const tuitionGridClass =
  "grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6"

const filterLabels: Record<keyof TuitionFilters, string> = {
  search: "Search",
  subject: "Subject",
  classLevel: "Class",
  mode: "Mode",
}

const hrefWithout = (filters: TuitionFilters, removeKey: keyof TuitionFilters) => {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value && key !== removeKey) params.set(key, value)
  })
  const query = params.toString()
  return query ? `/tuitions?${query}` : "/tuitions"
}

export const TuitionResults = async ({ filters }: { filters: TuitionFilters }) => {
  const tuitions = await getTuitions(filters)
  const activeFilters = (Object.keys(filters) as (keyof TuitionFilters)[]).filter(
    (key) => filters[key]
  )

  return (
    <div className="flex flex-col gap-6">
      <FilterBar key={JSON.stringify(filters)} filters={filters} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-muted-foreground">
          <span className="font-semibold text-foreground">{tuitions.length}</span>{" "}
          {tuitions.length === 1 ? "tuition" : "tuitions"} found
        </p>
        {activeFilters.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((key) => (
              <Link
                key={key}
                href={hrefWithout(filters, key)}
                aria-label={`Remove ${filterLabels[key]} filter`}
                className="inline-flex items-center gap-1.5 rounded-full border bg-accent px-3 py-1 text-sm font-medium text-accent-foreground transition-colors hover:border-primary"
              >
                {filterLabels[key]}: {filters[key]}
                <X aria-hidden="true" className="size-3.5" />
              </Link>
            ))}
            <Link
              href="/tuitions"
              className="px-2 text-sm font-semibold text-primary hover:underline"
            >
              Clear all
            </Link>
          </div>
        ) : null}
      </div>

      {tuitions.length > 0 ? (
        <StaggerGrid className={tuitionGridClass}>
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </StaggerGrid>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-[18px] border bg-card px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <SearchX aria-hidden="true" className="size-7" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-xl font-bold">
              No tuitions match your filters
            </h2>
            <p className="text-[15px] text-muted-foreground">
              Try a different keyword or remove some filters.
            </p>
          </div>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/tuitions" />}
            className="h-11 rounded-[10px] px-5 text-[15px] font-semibold"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
