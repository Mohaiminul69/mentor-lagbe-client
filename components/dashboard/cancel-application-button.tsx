"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cancelApplication } from "@/lib/actions/applications"

type CancelApplicationButtonProps = {
  applicationId: string
  tuitionTitle: string
}

export const CancelApplicationButton = ({
  applicationId,
  tuitionTitle,
}: CancelApplicationButtonProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCancel = async () => {
    setLoading(true)
    const result = await cancelApplication(applicationId)
    setLoading(false)

    if (!result.ok) {
      toast.error(result.message)
      return
    }

    toast.success(result.message)
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-9 rounded-[10px] border-destructive/40 px-3 font-semibold text-destructive hover:bg-destructive-soft hover:text-destructive"
      >
        Cancel
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-lg font-bold">
              Cancel this application?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your application for &quot;{tuitionTitle}&quot; will be removed. You
              can apply again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Keep it</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={loading}
              className="font-semibold"
            >
              {loading ? "Cancelling..." : "Yes, cancel"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
