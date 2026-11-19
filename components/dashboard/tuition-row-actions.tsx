"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TuitionForm } from "@/components/dashboard/tuition-form"
import { deleteTuition, setTuitionActive } from "@/lib/actions/tuitions"
import type { Tuition } from "@/lib/types/tuition"

export const TuitionActiveSwitch = ({ tuition }: { tuition: Tuition }) => {
  const router = useRouter()
  const [checked, setChecked] = useState(tuition.isActive)
  const [saving, setSaving] = useState(false)

  const handleChange = async (next: boolean) => {
    setChecked(next)
    setSaving(true)
    const result = await setTuitionActive(tuition._id, next)
    setSaving(false)

    if (!result.ok) {
      setChecked(!next)
      toast.error(result.message)
      return
    }

    toast.success(result.message)
    router.refresh()
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5">
      <Switch
        checked={checked}
        disabled={saving}
        onCheckedChange={handleChange}
        aria-label={checked ? "Close this tuition" : "Activate this tuition"}
      />
      <span className="text-sm font-medium">{checked ? "Active" : "Closed"}</span>
    </label>
  )
}

export const TuitionRowActions = ({ tuition }: { tuition: Tuition }) => {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    const result = await deleteTuition(tuition._id)
    setDeleting(false)

    if (!result.ok) {
      toast.error(result.message)
      return
    }

    toast.success(result.message)
    setDeleteOpen(false)
    router.refresh()
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label={`Edit ${tuition.title}`}
        onClick={() => setEditOpen(true)}
        className="size-9 rounded-[10px]"
      >
        <Pencil aria-hidden="true" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label={`Delete ${tuition.title}`}
        onClick={() => setDeleteOpen(true)}
        className="size-9 rounded-[10px] border-destructive/40 text-destructive hover:bg-destructive-soft hover:text-destructive"
      >
        <Trash2 aria-hidden="true" />
      </Button>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-bold">
              Edit tuition
            </DialogTitle>
            <DialogDescription>
              Saving changes sends the post back to admin approval.
            </DialogDescription>
          </DialogHeader>
          <TuitionForm tuition={tuition} onSaved={() => setEditOpen(false)} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-lg font-bold">
              Delete this tuition?
            </AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{tuition.title}&quot; and all of its applications will be
              removed permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Keep it</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="font-semibold"
            >
              {deleting ? "Deleting..." : "Yes, delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
