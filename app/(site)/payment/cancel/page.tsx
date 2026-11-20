import type { Metadata } from "next"
import Link from "next/link"
import { CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Payment Cancelled | MentorLagbe",
}

const PaymentCancelPage = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-muted px-6 py-16">
      <div className="flex w-full max-w-[480px] flex-col items-center gap-6 rounded-[18px] border bg-card px-8 py-10 text-center shadow-card">
        <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <CircleX aria-hidden="true" className="size-9" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-bold">Payment cancelled</h1>
          <p className="text-[15px] text-muted-foreground">
            You have not been charged. You can upgrade to Pro any time.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/pricing" />}
            className="h-12 rounded-[10px] text-[15px] font-semibold hover:bg-primary/90"
          >
            Back to pricing
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/" />}
            className="h-12 rounded-[10px] text-[15px] font-semibold"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PaymentCancelPage
