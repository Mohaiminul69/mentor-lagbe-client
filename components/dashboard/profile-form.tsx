"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Camera } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RoleBadge } from "@/components/shared/role-badge"
import { UserAvatar } from "@/components/shared/user-avatar"
import { authClient } from "@/lib/auth-client"
import { uploadImage } from "@/lib/actions/upload"

export type ProfileUser = {
  name: string
  email: string
  image?: string | null
  role: string
  phone: string
  bio: string
}

type Errors = {
  name?: string
  phone?: string
  bio?: string
}

const phonePattern = /^\+?[0-9\s-]{7,20}$/
const bioLimit = 300
const inputClass = "h-11 rounded-[10px] px-3.5 text-[15px]"

export const ProfileForm = ({ user }: { user: ProfileUser }) => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone)
  const [bio, setBio] = useState(user.bio)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState(user.image ?? "")
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle")

  const busy = status !== "idle"

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0]
    if (!selected) return

    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
      toast.error("Only JPG, PNG or WebP images are allowed")
      return
    }
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5 MB or smaller")
      return
    }

    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview)
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const validate = () => {
    const nextErrors: Errors = {
      name: name.trim().length >= 2 ? "" : "Name must be at least 2 characters",
      phone:
        !phone.trim() || phonePattern.test(phone.trim())
          ? ""
          : "Enter a valid phone number",
      bio: bio.length <= bioLimit ? "" : `Bio must be ${bioLimit} characters or less`,
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

    let image = user.image ?? undefined

    if (file) {
      setStatus("uploading")
      const formData = new FormData()
      formData.append("image", file)
      const upload = await uploadImage(formData)

      if (!upload.ok) {
        setStatus("idle")
        toast.error(upload.message)
        return
      }
      image = upload.url
    }

    setStatus("saving")
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image,
      phone: phone.trim(),
      bio: bio.trim(),
    })
    setStatus("idle")

    if (error) {
      toast.error(error.message ?? "Could not update your profile")
      return
    }

    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    toast.success("Profile updated successfully")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-5 rounded-[18px] border bg-card p-6 shadow-card sm:flex-row sm:items-center">
        <div className="relative">
          <UserAvatar
            name={name || user.name}
            image={preview || null}
            className="size-24 text-2xl"
          />
          <span className="absolute -right-1 -bottom-1 flex size-9 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground">
            <Camera aria-hidden="true" className="size-4" />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-heading text-xl font-bold">{user.name}</p>
            <RoleBadge role={user.role} />
          </div>
          <p className="text-sm text-muted-foreground">
            JPG, PNG or WebP, up to 5 MB. Uploaded securely to ImgBB.
          </p>
          <label className="self-start">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              disabled={busy}
              className="peer sr-only"
            />
            <span className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[10px] border px-4 text-sm font-semibold transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:bg-muted">
              <Camera aria-hidden="true" className="size-4" />
              {file ? "Choose another photo" : "Change photo"}
            </span>
          </label>
        </div>
      </div>

      <fieldset
        disabled={busy}
        className="grid gap-5 rounded-[18px] border bg-card p-6 shadow-card sm:p-8 md:grid-cols-2"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-semibold">
            Full name
          </Label>
          <Input
            id="name"
            value={name}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
          {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="font-semibold">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            placeholder="+880 1XXX-XXXXXX"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
          {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-semibold">
            Email
          </Label>
          <Input
            id="email"
            value={user.email}
            readOnly
            disabled
            className={`${inputClass} bg-muted`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="role" className="font-semibold">
            Role
          </Label>
          <Input
            id="role"
            value={user.role}
            readOnly
            disabled
            className={`${inputClass} bg-muted capitalize`}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio" className="font-semibold">
              Bio
            </Label>
            <span
              className={
                bio.length > bioLimit ? "text-xs text-destructive" : "text-xs text-muted-foreground"
              }
            >
              {bio.length}/{bioLimit}
            </span>
          </div>
          <Textarea
            id="bio"
            rows={4}
            value={bio}
            placeholder="Tell students or tutors a little about yourself"
            aria-invalid={Boolean(errors.bio)}
            onChange={(event) => setBio(event.target.value)}
            className="rounded-[10px] px-3.5 py-2.5 text-[15px]"
          />
          {errors.bio ? <p className="text-sm text-destructive">{errors.bio}</p> : null}
        </div>

        <div className="flex justify-end md:col-span-2">
          <Button
            type="submit"
            disabled={busy}
            className="h-12 rounded-[10px] px-6 text-[15px] font-semibold hover:bg-primary/90"
          >
            {status === "uploading"
              ? "Uploading photo..."
              : status === "saving"
                ? "Saving..."
                : "Save changes"}
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
