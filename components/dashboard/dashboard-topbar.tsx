"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { UserMenu } from "@/components/layout/user-menu"
import { getNavItems, isNavItemActive } from "@/lib/dashboard-nav"
import { signOut } from "@/lib/auth-client"
import type { DashboardUser } from "@/lib/types/user"

export const DashboardTopbar = ({ user }: { user: DashboardUser }) => {
  const pathname = usePathname()
  const router = useRouter()
  const title =
    getNavItems(user.role).find((item) => isNavItemActive(pathname, item.href))
      ?.title ?? "Dashboard"

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error(error.message ?? "Could not sign out")
      return
    }
    toast.success("Signed out successfully")
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-20 flex h-[72px] shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <SidebarTrigger
        aria-label="Toggle sidebar"
        className="size-11 rounded-[10px] border"
      />
      <h1 className="min-w-0 flex-1 truncate font-heading text-lg font-bold sm:text-xl">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/" />}
          aria-label="Back to site"
          className="h-11 rounded-[10px] px-3 text-[15px] font-semibold"
        >
          <ArrowLeft aria-hidden="true" />
          <span className="hidden md:inline">Back to site</span>
        </Button>
        <ThemeToggle />
        <div className="hidden sm:block">
          <UserMenu
            name={user.name}
            email={user.email}
            image={user.image}
            role={user.role}
            onSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  )
}
