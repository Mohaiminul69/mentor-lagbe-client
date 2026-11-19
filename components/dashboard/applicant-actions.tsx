"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { updateApplicationStatus } from "@/lib/actions/applications"

export const ApplicantActions = ({ applicationId }: { applicationId: string }) => {
  const router = useRouter()
  const [saving, setSaving] = useState<"accepted" | "rejected" | null>(null)

  const handleUpdate = async (status: "accepted" | "rejected") => {
    setSaving(status)
    const result = await updateApplicationStatus(applicationId, status)
    setSaving(null)

    if (!result.ok) {
      toast.error(result.message)
      return
    }

    toast.success(result.message)
    router.refresh()
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        onClick={() => handleUpdate("accepted")}
        disabled={saving !== null}
        className="h-9 rounded-[10px] px-3 font-semibold hover:bg-primary/90"
      >
        <Check aria-hidden="true" />
        {saving === "accepted" ? "Accepting..." : "Accept"}
      </Button>
      <Button
        variant="outline"
        onClick={() => handleUpdate("rejected")}
        disabled={saving !== null}
        className="h-9 rounded-[10px] border-destructive/40 px-3 font-semibold text-destructive hover:bg-destructive-soft hover:text-destructive"
      >
        <X aria-hidden="true" />
        {saving === "rejected" ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  )
}
