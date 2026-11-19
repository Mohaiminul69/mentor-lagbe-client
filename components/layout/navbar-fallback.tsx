import { Logo } from "@/components/shared/logo"

export const NavbarFallback = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3.5">
        <Logo />
        <div className="h-11 w-44 animate-pulse rounded-full bg-muted" />
      </div>
    </header>
  )
}
