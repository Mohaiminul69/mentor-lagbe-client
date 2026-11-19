import { Suspense } from "react"
import { Users } from "lucide-react"
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
import { ApplicantActions } from "@/components/dashboard/applicant-actions"
import { StatusBadge } from "@/components/shared/status-badge"
import { getTutorApplicants } from "@/lib/api/tutor"
import { formatDate } from "@/lib/formatters"

const ApplicantsTable = async () => {
  const applicants = await getTutorApplicants()

  if (applicants.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No applicants yet"
        description="When students apply to your tuitions, they will appear here."
      />
    )
  }

  return (
    <TableCard title="Student applications" count={applicants.length}>
      <Table className="min-w-[1040px]">
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="h-11 px-5">Student</TableHead>
            <TableHead className="h-11">Phone</TableHead>
            <TableHead className="h-11">Preferred schedule</TableHead>
            <TableHead className="h-11">Note</TableHead>
            <TableHead className="h-11">Tuition</TableHead>
            <TableHead className="h-11">Status</TableHead>
            <TableHead className="h-11 pr-5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow key={applicant._id}>
              <TableCell className="px-5 py-4">
                <p className="font-semibold">{applicant.studentName}</p>
                <p className="text-[13px] text-muted-foreground">
                  {applicant.studentEmail}
                </p>
              </TableCell>
              <TableCell className="py-4">{applicant.studentPhone}</TableCell>
              <TableCell className="max-w-[180px] py-4 whitespace-normal">
                {applicant.preferredSchedule}
              </TableCell>
              <TableCell className="max-w-[220px] py-4 whitespace-normal">
                <p
                  title={applicant.studentNote}
                  className="line-clamp-2 text-muted-foreground"
                >
                  {applicant.studentNote}
                </p>
              </TableCell>
              <TableCell className="max-w-[220px] py-4 whitespace-normal">
                <p className="font-medium">{applicant.tuitionTitle}</p>
                <p className="text-[13px] text-muted-foreground">
                  Applied {formatDate(applicant.appliedAt)}
                </p>
              </TableCell>
              <TableCell className="py-4">
                <StatusBadge status={applicant.status} />
              </TableCell>
              <TableCell className="py-4 pr-5">
                {applicant.status === "pending" ? (
                  <ApplicantActions applicationId={applicant._id} />
                ) : (
                  <p className="text-right text-sm text-muted-foreground">-</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  )
}

const ApplicantsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title="Applicants"
        description="Students who applied to your tuitions. Accept or reject pending requests."
      />
      <Suspense fallback={<Skeleton className="h-80 rounded-[18px]" />}>
        <ApplicantsTable />
      </Suspense>
    </div>
  )
}

export default ApplicantsPage
