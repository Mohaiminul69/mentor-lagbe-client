import { Suspense } from "react"
import Link from "next/link"
import { ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { CancelApplicationButton } from "@/components/dashboard/cancel-application-button"
import { StatusBadge } from "@/components/shared/status-badge"
import { getMyApplications } from "@/lib/api/student"
import { formatCurrency, formatDate } from "@/lib/formatters"

const ApplicationsTable = async () => {
  const applications = await getMyApplications()

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[18px] border bg-card px-6 py-16 text-center shadow-card">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <ClipboardList aria-hidden="true" className="size-7" />
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-xl font-bold">
            You haven&apos;t applied to any tuitions yet
          </h3>
          <p className="text-[15px] text-muted-foreground">
            Find a tutor you like and send your first application.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/tuitions" />}
          className="h-11 rounded-[10px] px-5 text-[15px] font-semibold hover:bg-primary/90"
        >
          Browse tuitions
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[18px] border bg-card shadow-card">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="font-heading text-lg font-bold">All applications</h3>
        <span className="text-sm text-muted-foreground">
          {applications.length} total
        </span>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow className="bg-muted/60 hover:bg-muted/60">
              <TableHead className="h-11 px-5">Tuition</TableHead>
              <TableHead className="h-11">Tutor</TableHead>
              <TableHead className="h-11">Fee</TableHead>
              <TableHead className="h-11">Applied</TableHead>
              <TableHead className="h-11">Status</TableHead>
              <TableHead className="h-11 pr-5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application._id}>
                <TableCell className="px-5 py-4">
                  <Link
                    href={`/tuitions/${application.tuitionId}`}
                    className="font-semibold hover:text-primary"
                  >
                    {application.tuitionTitle}
                  </Link>
                  <p className="text-[13px] text-muted-foreground">
                    {application.subject}
                  </p>
                </TableCell>
                <TableCell className="py-4">
                  <p className="font-medium">{application.tutorName}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {application.tutorEmail}
                  </p>
                </TableCell>
                <TableCell className="py-4 font-semibold">
                  {formatCurrency(application.monthlyFee)}
                  <span className="text-[13px] font-normal text-muted-foreground">
                    /mo
                  </span>
                </TableCell>
                <TableCell className="py-4 text-muted-foreground">
                  {formatDate(application.appliedAt)}
                </TableCell>
                <TableCell className="py-4">
                  <StatusBadge status={application.status} />
                </TableCell>
                <TableCell className="py-4 pr-5 text-right">
                  {application.status === "pending" ? (
                    <CancelApplicationButton
                      applicationId={application._id}
                      tuitionTitle={application.tuitionTitle}
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const MyApplicationsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title="My Applications"
        description="Every tuition you have applied to and its current status."
      />
      <Suspense fallback={<Skeleton className="h-80 rounded-[18px]" />}>
        <ApplicationsTable />
      </Suspense>
    </div>
  )
}

export default MyApplicationsPage
