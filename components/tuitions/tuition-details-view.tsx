import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
} from "lucide-react"
import { UserAvatar } from "@/components/shared/user-avatar"
import type { TuitionDetails } from "@/lib/types/tuition"
import { cn } from "@/lib/utils"

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

type TuitionDetailsViewProps = {
  tuition: TuitionDetails
  applyPanel: ReactNode
}

export const TuitionDetailsView = ({
  tuition,
  applyPanel,
}: TuitionDetailsViewProps) => {
  const isOnline = tuition.mode === "Online"
  const tutorName = tuition.tutor?.name ?? tuition.tutorName
  const isProTutor = tuition.tutor?.plan === "pro"

  const facts = [
    { label: "Schedule", value: `${tuition.daysPerWeek} days/week`, Icon: CalendarDays },
    { label: "Class level", value: tuition.classLevel, Icon: GraduationCap },
    { label: "Mode", value: tuition.mode, Icon: MonitorSmartphone },
    { label: "Location", value: tuition.location, Icon: MapPin },
  ]

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/tuitions"
        className="inline-flex items-center gap-2 self-start text-[15px] font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to tuitions
      </Link>

      <div className="relative h-[220px] overflow-hidden rounded-[18px] border bg-accent sm:h-[320px]">
        <Image
          src={tuition.bannerImage}
          alt={tuition.title}
          fill
          preload
          sizes="(min-width: 1200px) 1152px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-accent px-3 py-1 text-[13px] font-semibold text-accent-foreground">
                {tuition.subject}
              </span>
              <span className="rounded-full border px-3 py-1 text-[13px] font-semibold text-muted-foreground">
                {tuition.classLevel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-semibold">
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
            <h1 className="font-heading text-3xl leading-tight font-extrabold tracking-[-0.03em] sm:text-[44px]">
              {tuition.title}
            </h1>
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Clock aria-hidden="true" className="size-4" />
              Posted on {formatDate(tuition.createdAt)}
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {facts.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 rounded-2xl border bg-card p-4 shadow-card"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[13px] text-muted-foreground">{label}</dt>
                  <dd className="truncate font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <section className="flex flex-col gap-3 rounded-[18px] border bg-card p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-xl font-bold">About this tuition</h2>
            <p className="text-[16px] leading-relaxed whitespace-pre-line text-muted-foreground">
              {tuition.description}
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex flex-col gap-5 rounded-[18px] border bg-card p-6 shadow-card">
            <div>
              <p className="text-sm text-muted-foreground">Monthly fee</p>
              <p className="font-heading text-4xl font-extrabold tracking-[-0.03em]">
                ${tuition.monthlyFee}
                <span className="font-sans text-base font-medium tracking-normal text-muted-foreground">
                  {" "}
                  /month
                </span>
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 border-t pt-4 text-[15px]">
              <li className="flex justify-between gap-3">
                <span className="text-muted-foreground">Schedule</span>
                <span className="font-medium">{tuition.daysPerWeek} days/week</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium">{tuition.mode}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="shrink-0 text-muted-foreground">Location</span>
                <span className="truncate text-right font-medium">{tuition.location}</span>
              </li>
            </ul>
            {applyPanel}
          </div>

          <div className="flex flex-col gap-4 rounded-[18px] border bg-card p-6 shadow-card">
            <h2 className="font-heading text-lg font-bold">About the tutor</h2>
            <div className="flex items-center gap-3.5">
              <UserAvatar
                name={tutorName}
                image={tuition.tutor?.image}
                className="size-14"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <p className="truncate font-semibold">{tutorName}</p>
                {isProTutor ? (
                  <span className="inline-flex items-center gap-1 self-start rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                    <BadgeCheck aria-hidden="true" className="size-3.5" />
                    Verified Pro tutor
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">Tutor</span>
                )}
              </div>
            </div>
            {tuition.tutor?.bio ? (
              <p className="text-[15px] text-muted-foreground">{tuition.tutor.bio}</p>
            ) : null}
            <ul className="flex flex-col gap-2 border-t pt-4 text-sm">
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{tuition.tutorEmail}</span>
              </li>
              {tuition.tutor?.phone ? (
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  {tuition.tutor.phone}
                </li>
              ) : null}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
