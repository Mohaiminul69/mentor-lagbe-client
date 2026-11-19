"use client"

import Link from "next/link"
import { ChevronDown, LayoutDashboard, LogOut, UserPen } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/shared/user-avatar"
import { RoleBadge } from "@/components/shared/role-badge"

type UserMenuProps = {
  name: string
  email: string
  image?: string | null
  role: string
  onSignOut: () => void
}

export const UserMenu = ({
  name,
  email,
  image,
  role,
  onSignOut,
}: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="flex h-11 items-center gap-2.5 rounded-full border bg-card py-1 pr-3 pl-1 transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <UserAvatar name={name} image={image} />
        <span className="max-w-[140px] truncate text-sm font-semibold">
          {name}
        </span>
        <RoleBadge role={role} />
        <ChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-1.5">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 px-2 py-1.5">
            <span className="truncate text-sm font-semibold text-foreground">
              {name}
            </span>
            <span className="truncate text-xs">{email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={<Link href={`/dashboard/${role}`} />}
          className="h-10 px-2"
        >
          <LayoutDashboard aria-hidden="true" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/dashboard/profile" />}
          className="h-10 px-2"
        >
          <UserPen aria-hidden="true" />
          Update Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={onSignOut}
          className="h-10 px-2"
        >
          <LogOut aria-hidden="true" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
