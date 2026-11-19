import {
  BookOpenCheck,
  ClipboardList,
  CreditCard,
  FilePlus2,
  LayoutDashboard,
  ListChecks,
  UserPen,
  Users,
  type LucideIcon,
} from "lucide-react"

export type DashboardNavItem = {
  title: string
  href: string
  icon: LucideIcon
}

const profileItem: DashboardNavItem = {
  title: "Update Profile",
  href: "/dashboard/profile",
  icon: UserPen,
}

export const dashboardNav: Record<string, DashboardNavItem[]> = {
  student: [
    { title: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
    {
      title: "My Applications",
      href: "/dashboard/student/my-applications",
      icon: ClipboardList,
    },
    profileItem,
  ],
  tutor: [
    { title: "Overview", href: "/dashboard/tutor", icon: LayoutDashboard },
    {
      title: "Post a Tuition",
      href: "/dashboard/tutor/post-tuition",
      icon: FilePlus2,
    },
    {
      title: "My Tuitions",
      href: "/dashboard/tutor/my-tuitions",
      icon: BookOpenCheck,
    },
    {
      title: "Applicants",
      href: "/dashboard/tutor/applicants",
      icon: ListChecks,
    },
    profileItem,
  ],
  admin: [
    { title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Tuitions", href: "/dashboard/admin/tuitions", icon: BookOpenCheck },
    {
      title: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
    profileItem,
  ],
}

export const getNavItems = (role: string) =>
  dashboardNav[role] ?? dashboardNav.student

export const isNavItemActive = (pathname: string, href: string) =>
  href.split("/").length <= 3 ? pathname === href : pathname.startsWith(href)
