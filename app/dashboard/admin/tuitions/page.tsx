import { Suspense } from "react"
import Link from "next/link"
import { ClipboardCheck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { EmptyState, TableCard } from "@/components/dashboard/table-card"
import { ApprovalActions } from "@/components/dashboard/admin-controls"
import { StatusBadge } from "@/components/shared/status-badge"
import { getAdminTuitions } from "@/lib/api/admin"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { cn } from "@/lib/utils"

const tabs = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

const StatusTabs = ({ active }: { active: string }) => (
  <nav aria-label="Filter by status" className="inline-flex flex-wrap gap-1 rounded-xl border bg-card p-1">
    {tabs.map((tab) => (
      <Link
        key={tab.label}
        href={tab.value ? `/dashboard/admin/tuitions?status=${tab.value}` : "/dashboard/admin/tuitions"}
        aria-current={active === tab.value ? "page" : undefined}
        className={cn(
          "flex h-9 items-center rounded-[9px] px-4 text-sm font-semibold transition-colors",
          active === tab.value
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {tab.label}
      </Link>
    ))}
  </nav>
)

const TuitionsTable = async ({ status }: { status: string }) => {
  const tuitions = await getAdminTuitions(status)

  if (tuitions.length === 0) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        title={status ? `No ${status} tuitions` : "No tuitions yet"}
        description="Tuition posts submitted by tutors will appear here."
      />
    )
  }

  return (
    <TableCard title="Tuition posts" count={tuitions.length}>
      <Table className="min-w-[920px]">
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="h-11 px-5">Tuition</TableHead>
            <TableHead className="h-11">Tutor</TableHead>
            <TableHead className="h-11">Fee</TableHead>
            <TableHead className="h-11">Submitted</TableHead>
            <TableHead className="h-11">Status</TableHead>
            <TableHead className="h-11 pr-5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tuitions.map((tuition) => (
            <TableRow key={tuition._id}>
              <TableCell className="max-w-[300px] px-5 py-4 whitespace-normal">
                {tuition.approvalStatus === "approved" ? (
                  <Link
                    href={`/tuitions/${tuition._id}`}
                    className="font-semibold hover:text-primary"
                  >
                    {tuition.title}
                  </Link>
                ) : (
                  <p className="font-semibold">{tuition.title}</p>
                )}
                <p className="text-[13px] text-muted-foreground">
                  {tuition.subject} · {tuition.classLevel} · {tuition.mode}
                </p>
              </TableCell>
              <TableCell className="py-4">
                <p className="font-medium">{tuition.tutorName}</p>
                <p className="text-[13px] text-muted-foreground">{tuition.tutorEmail}</p>
              </TableCell>
              <TableCell className="py-4 font-semibold">
                {formatCurrency(tuition.monthlyFee)}
                <span className="text-[13px] font-normal text-muted-foreground">/mo</span>
              </TableCell>
              <TableCell className="py-4 text-muted-foreground">
                {formatDate(tuition.createdAt)}
              </TableCell>
              <TableCell className="py-4">
                <StatusBadge status={tuition.approvalStatus} />
              </TableCell>
              <TableCell className="py-4 pr-5">
                <ApprovalActions tuitionId={tuition._id} status={tuition.approvalStatus} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  )
}

const TuitionsLoader = async ({
  searchParams,
}: {
  searchParams: PageProps<"/dashboard/admin/tuitions">["searchParams"]
}) => {
  const params = await searchParams
  const raw = Array.isArray(params.status) ? params.status[0] : params.status
  const status = ["pending", "approved", "rejected"].includes(raw ?? "") ? (raw as string) : ""

  return (
    <div className="flex flex-col gap-5">
      <StatusTabs active={status} />
      <TuitionsTable status={status} />
    </div>
  )
}

const AdminTuitionsPage = ({ searchParams }: PageProps<"/dashboard/admin/tuitions">) => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title="Tuition Approvals"
        description="Approve posts to publish them on Browse Tuitions, or reject them."
      />
      <Suspense fallback={<Skeleton className="h-96 rounded-[18px]" />}>
        <TuitionsLoader searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default AdminTuitionsPage
