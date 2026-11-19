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
import { RoleSelect } from "@/components/dashboard/admin-controls"
import { UserAvatar } from "@/components/shared/user-avatar"
import { getAllUsers } from "@/lib/api/admin"
import { getSession } from "@/lib/core/server"
import { formatDate } from "@/lib/formatters"
import { cn } from "@/lib/utils"

const UsersTable = async () => {
  const [users, session] = await Promise.all([getAllUsers(), getSession()])

  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No users found"
        description="Registered users will appear here."
      />
    )
  }

  return (
    <TableCard title="All users" count={users.length}>
      <Table className="min-w-[720px]">
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="h-11 px-5">User</TableHead>
            <TableHead className="h-11">Role</TableHead>
            <TableHead className="h-11">Plan</TableHead>
            <TableHead className="h-11 pr-5">Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const isSelf = user.email === session?.user.email

            return (
              <TableRow key={user._id}>
                <TableCell className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} image={user.image} />
                    <div className="min-w-0">
                      <p className="font-semibold">
                        {user.name}
                        {isSelf ? (
                          <span className="ml-2 text-xs font-medium text-muted-foreground">
                            (you)
                          </span>
                        ) : null}
                      </p>
                      <p className="text-[13px] text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3.5">
                  <RoleSelect
                    userId={user._id}
                    userName={user.name}
                    role={user.role}
                    disabled={isSelf}
                  />
                </TableCell>
                <TableCell className="py-3.5">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
                      user.plan === "pro"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {user.plan ?? "free"}
                  </span>
                </TableCell>
                <TableCell className="py-3.5 pr-5 text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableCard>
  )
}

const AdminUsersPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardPageHeader
        title="Users"
        description="Everyone registered on MentorLagbe. Change a role from the dropdown."
      />
      <Suspense fallback={<Skeleton className="h-96 rounded-[18px]" />}>
        <UsersTable />
      </Suspense>
    </div>
  )
}

export default AdminUsersPage
