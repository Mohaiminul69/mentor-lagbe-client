import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/shared/user-avatar"
import type { Tuition } from "@/lib/types/tuition"
import { cn } from "@/lib/utils"

export const TuitionCard = ({ tuition }: { tuition: Tuition }) => {
  const isOnline = tuition.mode === "Online"

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] border bg-card shadow-card transition-all duration-150 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-[168px] bg-accent">
        <Image
          src={tuition.bannerImage}
          alt={tuition.title}
          fill
          sizes="(min-width: 1200px) 384px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-semibold">
          <span
            aria-hidden="true"
            className={cn(
              "size-[7px] rounded-full",
              isOnline ? "bg-success" : "bg-warning"
            )}
          />
          {tuition.mode}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
            {tuition.subject}
          </span>
          <span className="rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
            {tuition.classLevel}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[50px] font-heading text-[19px] leading-[1.3] font-bold">
          {tuition.title}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="size-[15px]" />
            {tuition.daysPerWeek} days/week
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-[15px]" />
            {tuition.location}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3.5">
          <div className="flex min-w-0 items-center gap-2.5 text-sm font-medium">
            <UserAvatar name={tuition.tutorName} className="size-8" />
            <span className="truncate">{tuition.tutorName}</span>
          </div>
          <p className="text-lg font-bold whitespace-nowrap">
            ${tuition.monthlyFee}
            <span className="text-[13px] font-medium text-muted-foreground">
              {" "}
              /month
            </span>
          </p>
        </div>

        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={`/tuitions/${tuition._id}`} />}
          className="h-11 rounded-[10px] bg-muted text-[15px] font-semibold hover:border-primary hover:text-primary"
        >
          View details
        </Button>
      </div>
    </article>
  )
}
