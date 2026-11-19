import { Suspense } from "react"
import Link from "next/link"
import { BookOpenCheck } from "lucide-react"
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
import { EmptyState, TableCard } from "@/components/dashboard/table-card"
import {
  TuitionActiveSwitch,
  TuitionRowActions,
} from "@/components/dashboard/tuition-row-actions"
import { StatusBadge } from "@/components/shared/status-badge"
import { getMyTuitions } from "@/lib/api/tutor"
import { formatCurrency, formatDate } from "@/lib/formatters"

const MyTuitionsTable = async () => {
  const tuitions = await getMyTuitions()

  if (tuitions.length === 0) {
    return (
      <EmptyState
        icon={BookOpenCheck}
        title="You haven't posted any tuitions yet"
        description="Create your first tuition post to start receiving students."
        action={
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/tutor/post-tuition" />}
            className="h-11 rounded-[10px] px-5 text-[15px] font-semibold hover:bg-primary/90"
          >
            Post a tuition
          </Button>
        }
      />
    )
  }

  return (
    <TableCard title="Your tuition posts" count={tuitions.length}>
      <Table className="min-w-[860px]">
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="h-11 px-5">Tuition</TableHead>
            <TableHead className="h-11">Mode</TableHead>
            <TableHead className="h-11">Fee</TableHead>
            <TableHead className="h-11">Approval</TableHead>
            <TableHead className="h-11">Status</TableHead>
            <TableHead className="h-11 pr-5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tuitions.map((tuition) => (
            <TableRow key={tuition._id}>
              <TableCell className="max-w-[320px] px-5 py-4 whitespace-normal">
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
                  {tuition.subject} · {tuition.classLevel} · Posted{" "}
                  {formatDate(tuition.createdAt)}
                </p>
              </TableCell>
              <TableCell className="py-4">{tuition.mode}</TableCell>
              <TableCell className="py-4 font-semibold">
                {formatCurrency(tuition.monthlyFee)}
                <span className="text-[13px] font-normal text-muted-foreground">
                  /mo
                </span>
              </TableCell>
              <TableCell className="py-4">
                <StatusBadge status={tuition.approvalStatus} />
              </TableCell>
              <TableCell className="py-4">
                <TuitionActiveSwitch tuition={tuition} />
              </TableCell>
              <TableCell className="py-4 pr-5">
                <TuitionRowActions tuition={tuition} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  )
}

const MyTuitionsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <DashboardPageHeader
          title="My Tuitions"
          description="Edit, close or delete your posts. Only approved and active posts appear publicly."
        />
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/tutor/post-tuition" />}
          className="h-11 rounded-[10px] px-5 text-[15px] font-semibold hover:bg-primary/90"
        >
          Post a tuition
        </Button>
      </div>
      <Suspense fallback={<Skeleton className="h-80 rounded-[18px]" />}>
        <MyTuitionsTable />
      </Suspense>
    </div>
  )
}

export default MyTuitionsPage
