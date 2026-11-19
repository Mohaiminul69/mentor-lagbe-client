"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Info, LogIn, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/shared/status-badge"
import { applyForTuition } from "@/lib/actions/applications"

export type ApplyViewer = {
  role: string
  name: string
  email: string
} | null

export type ExistingApplication = {
  status: string
  appliedOn: string
} | null

type ApplyPanelProps = {
  tuitionId: string
  tuitionTitle: string
  viewer: ApplyViewer
  application: ExistingApplication
}

type Errors = {
  studentPhone?: string
  preferredSchedule?: string
  studentNote?: string
}

const phonePattern = /^\+?[0-9\s-]{7,20}$/

const buttonClass = "h-12 w-full rounded-[10px] text-[15px] font-semibold"

export const ApplyPanel = ({
  tuitionId,
  tuitionTitle,
  viewer,
  application,
}: ApplyPanelProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [studentPhone, setStudentPhone] = useState("")
  const [preferredSchedule, setPreferredSchedule] = useState("")
  const [studentNote, setStudentNote] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  if (!viewer) {
    return (
      <Button
        nativeButton={false}
        render={<Link href={`/sign-in?redirect=/tuitions/${tuitionId}`} />}
        className={`${buttonClass} hover:bg-primary/90`}
      >
        <LogIn aria-hidden="true" />
        Sign in to apply
      </Button>
    )
  }

  if (viewer.role !== "student") {
    return (
      <div className="flex flex-col gap-3">
        <Button disabled className={buttonClass}>
          Apply Now
        </Button>
        <p className="flex items-start gap-2 rounded-[10px] bg-muted p-3 text-sm text-muted-foreground">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          Only students can apply for tuitions. You are signed in as a{" "}
          {viewer.role}.
        </p>
      </div>
    )
  }

  if (application) {
    return (
      <div className="flex flex-col gap-2 rounded-[10px] border bg-muted p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">Your application</span>
          <StatusBadge status={application.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          You applied on {application.appliedOn}. Track it from your dashboard.
        </p>
      </div>
    )
  }

  const validate = () => {
    const nextErrors: Errors = {
      studentPhone: !studentPhone.trim()
        ? "Phone number is required"
        : phonePattern.test(studentPhone.trim())
          ? ""
          : "Enter a valid phone number",
      preferredSchedule: preferredSchedule.trim()
        ? ""
        : "Preferred schedule is required",
      studentNote: studentNote.trim() ? "" : "Please add a short learning note",
    }
    setErrors(nextErrors)
    return Object.values(nextErrors).every((message) => !message)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) {
      toast.error("Please fix the highlighted fields")
      return
    }

    setSubmitting(true)
    const result = await applyForTuition({
      tuitionId,
      studentPhone,
      preferredSchedule,
      studentNote,
    })
    setSubmitting(false)

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
        onClick={() => setOpen(true)}
        className={`${buttonClass} hover:bg-primary/90`}
      >
        <Send aria-hidden="true" />
        Apply Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-bold">
              Apply for this tuition
            </DialogTitle>
            <DialogDescription>{tuitionTitle}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="grid gap-3 rounded-[10px] bg-muted p-3 text-sm sm:grid-cols-2">
              <div className="min-w-0">
                <p className="text-muted-foreground">Name</p>
                <p className="truncate font-medium">{viewer.name}</p>
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground">Email</p>
                <p className="truncate font-medium">{viewer.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="studentPhone" className="font-semibold">
                Phone number
              </Label>
              <Input
                id="studentPhone"
                type="tel"
                value={studentPhone}
                placeholder="+880 1XXX-XXXXXX"
                aria-invalid={Boolean(errors.studentPhone)}
                onChange={(event) => setStudentPhone(event.target.value)}
                className="h-11 rounded-[10px] px-3.5 text-[15px]"
              />
              {errors.studentPhone ? (
                <p className="text-sm text-destructive">{errors.studentPhone}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="preferredSchedule" className="font-semibold">
                Preferred schedule
              </Label>
              <Input
                id="preferredSchedule"
                value={preferredSchedule}
                placeholder="e.g. Sun, Tue, Thu after 6 PM"
                aria-invalid={Boolean(errors.preferredSchedule)}
                onChange={(event) => setPreferredSchedule(event.target.value)}
                className="h-11 rounded-[10px] px-3.5 text-[15px]"
              />
              {errors.preferredSchedule ? (
                <p className="text-sm text-destructive">{errors.preferredSchedule}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="studentNote" className="font-semibold">
                Learning note
              </Label>
              <Textarea
                id="studentNote"
                value={studentNote}
                rows={4}
                placeholder="What would you like help with?"
                aria-invalid={Boolean(errors.studentNote)}
                onChange={(event) => setStudentNote(event.target.value)}
                className="rounded-[10px] px-3.5 py-2.5 text-[15px]"
              />
              {errors.studentNote ? (
                <p className="text-sm text-destructive">{errors.studentNote}</p>
              ) : null}
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-11 rounded-[10px] px-5 text-[15px] font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="h-11 rounded-[10px] px-5 text-[15px] font-semibold hover:bg-primary/90"
              >
                {submitting ? "Submitting..." : "Submit application"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
