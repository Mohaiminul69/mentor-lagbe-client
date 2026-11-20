import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { CircleAlert, CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageLoader } from "@/components/shared/page-loader"
import { verifyPayment } from "@/lib/actions/payments"
import { requireUser } from "@/lib/core/server"
import { formatCurrency, formatDate } from "@/lib/formatters"

export const metadata: Metadata = {
  title: "Payment Successful | MentorLagbe",
}

const cardClass =
  "flex w-full max-w-[480px] flex-col items-center gap-6 rounded-[18px] border bg-card px-8 py-10 text-center shadow-card"

const PaymentResult = async ({
  searchParams,
}: {
  searchParams: PageProps<"/payment/success">["searchParams"]
}) => {
  const params = await searchParams
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id

  const session = await requireUser(
    sessionId ? `/payment/success?session_id=${sessionId}` : "/pricing"
  )

  const result = sessionId
    ? await verifyPayment(sessionId)
    : { ok: false as const, message: "No payment session was found." }

  if (!result.ok) {
    return (
      <div className={cardClass}>
        <span className="flex size-16 items-center justify-center rounded-full bg-destructive-soft text-destructive">
          <CircleAlert aria-hidden="true" className="size-8" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-bold">
            We couldn&apos;t confirm your payment
          </h1>
          <p className="text-[15px] text-muted-foreground">{result.message}</p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/pricing" />}
          className="h-12 w-full rounded-[10px] text-[15px] font-semibold hover:bg-primary/90"
        >
          Back to pricing
        </Button>
      </div>
    )
  }

  const { payment } = result
  const rows = [
    { label: "Plan", value: payment.planName },
    {
      label: "Amount paid",
      value: `${formatCurrency(payment.amount)} ${payment.currency.toUpperCase()}`,
    },
    { label: "Date", value: formatDate(payment.paidAt) },
    { label: "Transaction ID", value: payment.transactionId, mono: true },
  ]

  return (
    <div className={cardClass}>
      <span className="flex size-16 items-center justify-center rounded-full bg-success-soft text-success">
        <CircleCheck aria-hidden="true" className="size-9" />
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-bold">You&apos;re now Pro!</h1>
        <p className="text-[15px] text-muted-foreground">
          Thank you, {session.user.name.split(" ")[0]}. Your Pro features are
          unlocked.
        </p>
      </div>
      <dl className="flex w-full flex-col gap-3 rounded-[14px] bg-muted p-4 text-left text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <dt className="shrink-0 text-muted-foreground">{row.label}</dt>
            <dd
              title={row.value}
              className={
                row.mono
                  ? "truncate font-mono text-xs font-semibold"
                  : "truncate font-semibold"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <Button
        nativeButton={false}
        render={<Link href="/dashboard" />}
        className="h-12 w-full rounded-[10px] text-[15px] font-semibold hover:bg-primary/90"
      >
        Go to dashboard
      </Button>
    </div>
  )
}

const PaymentSuccessPage = ({ searchParams }: PageProps<"/payment/success">) => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-muted px-6 py-16">
      <Suspense fallback={<PageLoader />}>
        <PaymentResult searchParams={searchParams} />
      </Suspense>
    </section>
  )
}

export default PaymentSuccessPage
