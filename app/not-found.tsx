import type { Metadata } from "next"
import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"

export const metadata: Metadata = {
  title: "Page Not Found | MentorLagbe",
}

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-8 bg-muted px-6 py-16">
      <Logo />
      <div className="flex w-full max-w-[480px] flex-col items-center gap-5 rounded-[18px] border bg-card px-8 py-12 text-center shadow-card">
        <p className="font-heading text-8xl leading-none font-extrabold tracking-[-0.04em] text-primary">
          404
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-bold">Page not found</h1>
          <p className="text-[15px] text-muted-foreground">
            The page you are looking for does not exist or may have been moved.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            className="h-12 rounded-[10px] px-6 text-[15px] font-semibold hover:bg-primary/90"
          >
            <Home aria-hidden="true" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/tuitions" />}
            className="h-12 rounded-[10px] px-6 text-[15px] font-semibold"
          >
            <Search aria-hidden="true" />
            Browse tuitions
          </Button>
        </div>
      </div>
    </main>
  )
}

export default NotFound
