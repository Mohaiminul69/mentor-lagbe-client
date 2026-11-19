import { Suspense } from "react"
import { Navbar } from "@/components/layout/navbar"
import { NavbarFallback } from "@/components/layout/navbar-fallback"
import { Footer } from "@/components/layout/footer"

const SiteLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

export default SiteLayout
