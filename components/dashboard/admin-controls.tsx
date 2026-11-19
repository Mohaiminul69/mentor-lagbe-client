"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Copy, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { changeUserRole, setTuitionApproval } from "@/lib/actions/admin"

type RoleSelectProps = {
  userId: string
  userName: string
  role: string
  disabled?: boolean
}

export const RoleSelect = ({ userId, userName, role, disabled }: RoleSelectProps) => {
  const router = useRouter()
  const [value, setValue] = useState(role)
  const [saving, setSaving] = useState(false)

  const handleChange = async (next: string) => {
    const previous = value
    setValue(next)
    setSaving(true)
    const result = await changeUserRole(userId, next)
    setSaving(false)

    if (!result.ok) {
      setValue(previous)
      toast.error(result.message)
      return
    }

    toast.success(`${userName}: ${result.message.toLowerCase()}`)
    router.refresh()
  }

  return (
    <label>
      <span className="sr-only">Role for {userName}</span>
      <select
        value={value}
        disabled={disabled || saving}
        onChange={(event) => handleChange(event.target.value)}
        className="h-9 rounded-[10px] border bg-card px-2.5 text-sm font-medium capitalize outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
      >
        <option value="student">Student</option>
        <option value="tutor">Tutor</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  )
}

type ApprovalActionsProps = {
  tuitionId: string
  status: string
}

export const ApprovalActions = ({ tuitionId, status }: ApprovalActionsProps) => {
  const router = useRouter()
  const [saving, setSaving] = useState<"approved" | "rejected" | null>(null)

  const handleUpdate = async (next: "approved" | "rejected") => {
    setSaving(next)
    const result = await setTuitionApproval(tuitionId, next)
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
      {status !== "approved" ? (
        <Button
          onClick={() => handleUpdate("approved")}
          disabled={saving !== null}
          className="h-9 rounded-[10px] px-3 font-semibold hover:bg-primary/90"
        >
          <Check aria-hidden="true" />
          {saving === "approved" ? "Approving..." : "Approve"}
        </Button>
      ) : null}
      {status !== "rejected" ? (
        <Button
          variant="outline"
          onClick={() => handleUpdate("rejected")}
          disabled={saving !== null}
          className="h-9 rounded-[10px] border-destructive/40 px-3 font-semibold text-destructive hover:bg-destructive-soft hover:text-destructive"
        >
          <X aria-hidden="true" />
          {saving === "rejected" ? "Rejecting..." : "Reject"}
        </Button>
      ) : null}
    </div>
  )
}

export const CopyButton = ({ value }: { value: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success("Transaction ID copied")
    } catch {
      toast.error("Could not copy")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      aria-label="Copy transaction ID"
      className="size-8 rounded-lg"
    >
      <Copy aria-hidden="true" className="size-4" />
    </Button>
  )
}
