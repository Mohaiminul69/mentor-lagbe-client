"use client"

import { ErrorCard } from "@/components/shared/error-card"

const DashboardError = ({ retry }: { error: unknown; retry: () => void }) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <ErrorCard retry={retry} />
    </div>
  )
}

export default DashboardError
