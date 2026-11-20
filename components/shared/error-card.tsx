"use client"

import Link from "next/link"
import { Home, RotateCcw, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ErrorCard = ({ retry }: { retry: () => void }) => {
  return (
    <div
      role="alert"
      className="flex w-full max-w-[480px] flex-col items-center gap-5 rounded-[18px] border bg-card px-8 py-12 text-center shadow-card"
    >
      <span className="flex size-16 items-center justify-center rounded-2xl bg-destructive-soft text-destructive">
        <TriangleAlert aria-hidden="true" className="size-8" />
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-bold">Something went wrong</h1>
        <p className="text-[15px] text-muted-foreground">
          We could not load this page right now. Please try again, or go back to
          the home page.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          onClick={retry}
          className="h-12 rounded-[10px] px-6 text-[15px] font-semibold hover:bg-primary/90"
        >
          <RotateCcw aria-hidden="true" />
          Try again
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/" />}
          className="h-12 rounded-[10px] px-6 text-[15px] font-semibold"
        >
          <Home aria-hidden="true" />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
