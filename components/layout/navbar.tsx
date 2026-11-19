"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, LogOut, Menu, UserPen } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"
import { UserAvatar } from "@/components/shared/user-avatar"
import { RoleBadge } from "@/components/shared/role-badge"
import { UserMenu } from "@/components/layout/user-menu"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { signOut, useSession } from "@/lib/auth-client"
import { navLinks } from "@/lib/nav-links"
import { cn } from "@/lib/utils"

export const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data: session, isPending } = useSession()
  const user = session?.user
  const role = user?.role ?? "student"

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const closeMenu = () => setOpen(false)

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error(error.message ?? "Could not sign out")
      return
    }
    setOpen(false)
    toast.success("Signed out successfully")
    router.push("/")
    router.refresh()
  }

  const linkClass = (href: string) =>
    cn(
      "transition-colors hover:text-foreground",
      isActive(href) ? "bg-muted text-foreground" : "text-muted-foreground",
    )

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3.5"
      >
        <Logo />

        <ul className="hidden items-center gap-1 text-[15px] font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn("rounded-lg px-3.5 py-2", linkClass(link.href))}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          {isPending ? (
            <div className="h-11 w-44 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href={`/dashboard/${role}`} />}
                className="hidden h-11 rounded-[10px] px-4 text-[15px] font-semibold lg:inline-flex"
              >
                Dashboard
              </Button>
              <UserMenu
                name={user.name}
                email={user.email}
                image={user.image}
                role={role}
                onSignOut={handleSignOut}
              />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className="h-11 rounded-[10px] px-4 text-[15px] font-semibold"
              >
                Sign In
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/sign-up" />}
                className="h-11 rounded-[10px] px-[18px] text-[15px] font-semibold hover:bg-primary/90"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="size-11 rounded-[10px] md:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="border-b px-6 py-5">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo className="text-xl" />
              </SheetHeader>

              {user ? (
                <div className="mx-4 flex items-center gap-3 rounded-xl border bg-muted p-3">
                  <UserAvatar
                    name={user.name}
                    image={user.image}
                    className="size-10"
                  />
                  <div className="flex min-w-0 flex-col items-start gap-1">
                    <span className="max-w-full truncate text-sm font-semibold">
                      {user.name}
                    </span>
                    <RoleBadge role={role} />
                  </div>
                </div>
              ) : null}

              <ul className="flex flex-col gap-1 px-4 text-[15px] font-medium">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "flex h-11 items-center rounded-lg px-3.5",
                        linkClass(link.href),
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {user ? (
                  <>
                    <li>
                      <Link
                        href={`/dashboard/${role}`}
                        onClick={closeMenu}
                        className="flex h-11 items-center gap-2.5 rounded-lg px-3.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <LayoutDashboard
                          aria-hidden="true"
                          className="size-4"
                        />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/profile"
                        onClick={closeMenu}
                        className="flex h-11 items-center gap-2.5 rounded-lg px-3.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <UserPen aria-hidden="true" className="size-4" />
                        Update Profile
                      </Link>
                    </li>
                  </>
                ) : null}
              </ul>

              <div className="mt-auto flex flex-col gap-2.5 border-t p-4">
                {user ? (
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="h-11 rounded-[10px] border-destructive/30 text-[15px] font-semibold text-destructive hover:bg-destructive-soft hover:text-destructive"
                  >
                    <LogOut aria-hidden="true" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      nativeButton={false}
                      render={<Link href="/sign-in" onClick={closeMenu} />}
                      className="h-11 rounded-[10px] text-[15px] font-semibold"
                    >
                      Sign In
                    </Button>
                    <Button
                      nativeButton={false}
                      render={<Link href="/sign-up" onClick={closeMenu} />}
                      className="h-11 rounded-[10px] text-[15px] font-semibold hover:bg-primary/90"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
