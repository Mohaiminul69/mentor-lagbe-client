import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const SiteLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

export default SiteLayout
