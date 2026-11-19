import { Suspense } from "react"
import { CircleDollarSign, Receipt } from "lucide-react"
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
import { StatCard } from "@/components/dashboard/stat-card"
import { EmptyState, TableCard } from "@/components/dashboard/table-card"
import { CopyButton } from "@/components/dashboard/admin-controls"
import { RoleBadge } from "@/components/shared/role-badge"
import { getAllPayments } from "@/lib/api/admin"
import { formatCurrency, formatDate } from "@/lib/formatters"

const TransactionsContent = async () => {
  const payments = await getAllPayments()
  const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-sm">
        <StatCard
          label="Total revenue"
          value={formatCurrency(revenue)}
          hint={`${payments.length} successful Stripe payments`}
          icon={CircleDollarSign}
        />
      </div>

      {payments.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No transactions yet"
          description="Pro plan payments made through Stripe will appear here."
        />
      ) : (
        <TableCard title="Payment records" count={payments.length}>
          <Table className="min-w-[960px]">
            <TableHeader>
              <TableRow className="bg-muted/60 hover:bg-muted/60">
                <TableHead className="h-11 px-5">User</TableHead>
                <TableHead className="h-11">Email</TableHead>
                <TableHead className="h-11">Role</TableHead>
                <TableHead className="h-11">Plan</TableHead>
                <TableHead className="h-11">Amount</TableHead>
                <TableHead className="h-11">Transaction ID</TableHead>
                <TableHead className="h-11 pr-5">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell className="px-5 py-4 font-semibold">{payment.userName}</TableCell>
                  <TableCell className="py-4 text-muted-foreground">{payment.userEmail}</TableCell>
                  <TableCell className="py-4">
                    <RoleBadge role={payment.userRole} />
                  </TableCell>
                  <TableCell className="py-4">{payment.planName}</TableCell>
                  <TableCell className="py-4 font-semibold">
                    {formatCurrency(payment.amount)}
                    <span className="ml-1 text-xs font-normal text-muted-foreground uppercase">
                      {payment.currency}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1">
                      <code
                        title={payment.transactionId}
                        className="max-w-[160px] truncate rounded-md bg-muted px-2 py-1 font-mono text-xs"
                      >
                        {payment.transactionId}
                      </code>
                      <CopyButton value={payment.transactionId} />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 pr-5 text-muted-foreground">
                    {formatDate(payment.paidAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCard>
      )}
    </div>
  )
}

const TransactionsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title="Transactions"
        description="Every Pro plan payment made through Stripe."
      />
      <Suspense fallback={<Skeleton className="h-96 rounded-[18px]" />}>
        <TransactionsContent />
      </Suspense>
    </div>
  )
}

export default TransactionsPage
