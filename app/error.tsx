"use client"

import { Logo } from "@/components/shared/logo"
import { ErrorCard } from "@/components/shared/error-card"

const ErrorPage = ({ retry }: { error: unknown; retry: () => void }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-8 bg-muted px-6 py-16">
      <Logo />
      <ErrorCard retry={retry} />
    </main>
  )
}

export default ErrorPage
