"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"
import { navLinks } from "@/lib/nav-links"
import { cn } from "@/lib/utils"

export const Navbar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const closeMenu = () => setOpen(false)

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
                className={cn(
                  "rounded-lg px-3.5 py-2 transition-colors hover:text-foreground",
                  isActive(link.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
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
        </div>

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
            <ul className="flex flex-col gap-1 px-4 text-[15px] font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center rounded-lg px-3.5 transition-colors hover:text-foreground",
                      isActive(link.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-2.5 border-t p-4">
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
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
