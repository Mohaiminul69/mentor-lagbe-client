"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BadgeCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/shared/logo"
import { RoleBadge } from "@/components/shared/role-badge"
import { UserAvatar } from "@/components/shared/user-avatar"
import { getNavItems, isNavItemActive } from "@/lib/dashboard-nav"
import type { DashboardUser } from "@/lib/types/user"

const hideWhenCollapsed = "group-data-[collapsible=icon]:hidden"

export const DashboardSidebar = ({ user }: { user: DashboardUser }) => {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const navItems = getNavItems(user.role)

  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="gap-4 p-4 group-data-[collapsible=icon]:px-2">
        <Logo textClassName={hideWhenCollapsed} />
        <div className="flex items-center gap-3 rounded-xl border bg-muted p-3 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
          <UserAvatar name={user.name} image={user.image} className="size-10 group-data-[collapsible=icon]:size-8" />
          <div className={`flex min-w-0 flex-col items-start gap-1 ${hideWhenCollapsed}`}>
            <span className="max-w-full truncate text-sm font-semibold">
              {user.name}
            </span>
            <span className="max-w-full truncate text-xs text-muted-foreground">
              {user.email}
            </span>
            <RoleBadge role={user.role} />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isNavItemActive(pathname, item.href)}
                    tooltip={item.title}
                    render={<Link href={item.href} onClick={closeOnMobile} />}
                    className="h-10 text-[15px] data-active:bg-accent data-active:text-accent-foreground"
                  >
                    <item.icon aria-hidden="true" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user.role !== "admin" ? (
        <SidebarFooter className={`p-4 ${hideWhenCollapsed}`}>
          {user.plan === "pro" ? (
            <div className="flex items-center gap-3 rounded-xl border bg-accent p-4 text-accent-foreground">
              <BadgeCheck aria-hidden="true" className="size-5 shrink-0" />
              <div>
                <p className="text-sm font-bold">Pro plan</p>
                <p className="text-xs">All Pro features unlocked</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 rounded-xl border bg-muted p-4">
              <div className="flex items-center gap-2">
                <Sparkles aria-hidden="true" className="size-4 text-primary" />
                <p className="text-sm font-bold">Free plan</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {user.role === "tutor"
                  ? "Upgrade to post unlimited tuitions and get a verified badge."
                  : "Upgrade for priority booking and a Pro badge."}
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/pricing" onClick={closeOnMobile} />}
                className="h-10 rounded-[10px] font-semibold hover:bg-primary/90"
              >
                Upgrade to Pro
              </Button>
            </div>
          )}
        </SidebarFooter>
      ) : null}
    </Sidebar>
  )
}
