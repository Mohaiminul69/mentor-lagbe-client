"use client"

import { useState, useTransition, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { classLevels, modes, subjects } from "@/lib/constants"
import type { TuitionFilters } from "@/lib/types/tuition"

const selectClass =
  "h-11 w-full rounded-[10px] border bg-card px-3 text-[15px] text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export const FilterBar = ({ filters }: { filters: TuitionFilters }) => {
  const router = useRouter()
  const [search, setSearch] = useState(filters.search)
  const [isPending, startTransition] = useTransition()

  const applyFilters = (next: TuitionFilters) => {
    const params = new URLSearchParams()
    Object.entries(next).forEach(([key, value]) => {
      if (value.trim()) params.set(key, value.trim())
    })
    const query = params.toString()
    startTransition(() => {
      router.push(query ? `/tuitions?${query}` : "/tuitions")
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    applyFilters({ ...filters, search })
  }

  const handleSelect = (key: keyof TuitionFilters, value: string) => {
    applyFilters({ ...filters, search, [key]: value })
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border bg-card p-3 shadow-card md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto]"
    >
      <label className="flex items-center gap-2.5 rounded-[10px] border bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
        <Search aria-hidden="true" className="size-[18px] shrink-0 text-muted-foreground" />
        <span className="sr-only">Search by title or subject</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or subject"
          className="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
        />
      </label>

      <label>
        <span className="sr-only">Subject</span>
        <select
          value={filters.subject}
          onChange={(event) => handleSelect("subject", event.target.value)}
          className={selectClass}
        >
          <option value="">All subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="sr-only">Class level</span>
        <select
          value={filters.classLevel}
          onChange={(event) => handleSelect("classLevel", event.target.value)}
          className={selectClass}
        >
          <option value="">All class levels</option>
          {classLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="sr-only">Mode</span>
        <select
          value={filters.mode}
          onChange={(event) => handleSelect("mode", event.target.value)}
          className={selectClass}
        >
          <option value="">Any mode</option>
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </label>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 rounded-[10px] px-5 text-[15px] font-semibold hover:bg-primary/90"
      >
        {isPending ? (
          <Loader2 aria-hidden="true" className="animate-spin" />
        ) : (
          <Search aria-hidden="true" />
        )}
        Search
      </Button>
    </form>
  )
}
