import { Suspense, type CSSProperties, type ReactNode } from "react"
import type { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar"
import { requireUser } from "@/lib/core/server"
import type { DashboardUser } from "@/lib/types/user"

export const metadata: Metadata = {
  title: "Dashboard | MentorLagbe",
}

const DashboardShell = async ({ children }: { children: ReactNode }) => {
  const session = await requireUser()

  const user: DashboardUser = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    role: session.user.role ?? "student",
    plan: session.user.plan ?? "free",
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        style={{ "--sidebar-width": "16.25rem" } as CSSProperties}
      >
        <DashboardSidebar user={user} />
        <SidebarInset className="min-w-0 bg-muted">
          <DashboardTopbar user={user} />
          <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

const DashboardFallback = () => {
  return (
    <div className="flex min-h-svh w-full">
      <div className="hidden w-[260px] flex-col gap-4 border-r bg-card p-4 md:flex">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-24 rounded-xl" />
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-10" />
        ))}
      </div>
      <div className="flex flex-1 flex-col bg-muted">
        <div className="h-[72px] border-b bg-background" />
        <div className="flex flex-col gap-4 p-6 lg:p-8">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
      </div>
    </div>
  )
}

const DashboardLayout = ({ children }: LayoutProps<"/dashboard">) => {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  )
}

export default DashboardLayout
