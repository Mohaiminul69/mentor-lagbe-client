"use client"

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImageUp } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createTuition, updateTuition } from "@/lib/actions/tuitions"
import { uploadImage } from "@/lib/actions/upload"
import { classLevels, modes, subjects } from "@/lib/constants"
import type { Tuition } from "@/lib/types/tuition"
import { cn } from "@/lib/utils"

type Fields = {
  title: string
  subject: string
  classLevel: string
  mode: string
  location: string
  monthlyFee: string
  daysPerWeek: string
  description: string
}

type Errors = Partial<Record<keyof Fields | "bannerImage", string>>

type TuitionFormProps = {
  tuition?: Tuition
  disabled?: boolean
  onSaved?: () => void
}

const inputClass = "h-11 rounded-[10px] px-3.5 text-[15px]"
const selectClass =
  "h-11 w-full rounded-[10px] border bg-transparent px-3 text-[15px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive disabled:opacity-50"

const emptyFields: Fields = {
  title: "",
  subject: "",
  classLevel: "",
  mode: "",
  location: "",
  monthlyFee: "",
  daysPerWeek: "",
  description: "",
}

const toFields = (tuition?: Tuition): Fields =>
  tuition
    ? {
        title: tuition.title,
        subject: tuition.subject,
        classLevel: tuition.classLevel,
        mode: tuition.mode,
        location: tuition.location,
        monthlyFee: String(tuition.monthlyFee),
        daysPerWeek: String(tuition.daysPerWeek),
        description: tuition.description,
      }
    : emptyFields

const validate = (fields: Fields, hasImage: boolean): Errors => {
  const fee = Number(fields.monthlyFee)
  const days = Number(fields.daysPerWeek)

  return {
    title: fields.title.trim().length >= 5 ? "" : "Title must be at least 5 characters",
    subject: fields.subject ? "" : "Choose a subject",
    classLevel: fields.classLevel ? "" : "Choose a class level",
    mode: fields.mode ? "" : "Choose online or offline",
    location: fields.location.trim() ? "" : "Location is required",
    monthlyFee:
      fields.monthlyFee && Number.isFinite(fee) && fee >= 1
        ? ""
        : "Enter a monthly fee of at least $1",
    daysPerWeek:
      Number.isInteger(days) && days >= 1 && days <= 7 ? "" : "Enter 1 to 7 days",
    description:
      fields.description.trim().length >= 30
        ? ""
        : "Description must be at least 30 characters",
    bannerImage: hasImage ? "" : "Upload a banner image",
  }
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-destructive">{message}</p> : null

const Field = ({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: ReactNode
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <Label htmlFor={id} className="font-semibold">
      {label}
    </Label>
    {children}
    <FieldError message={error} />
  </div>
)

export const TuitionForm = ({ tuition, disabled = false, onSaved }: TuitionFormProps) => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fields, setFields] = useState<Fields>(toFields(tuition))
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState(tuition?.bannerImage ?? "")
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle")

  const isEdit = Boolean(tuition)
  const busy = status !== "idle"

  const update = (key: keyof Fields, value: string) =>
    setFields((current) => ({ ...current, [key]: value }))

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
    setErrors((current) => ({ ...current, bannerImage: "" }))
  }

  const resetForm = () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview)
    setFields(emptyFields)
    setFile(null)
    setPreview("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(fields, Boolean(file || preview))
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      toast.error("Please fix the highlighted fields")
      return
    }

    let bannerImage = tuition?.bannerImage ?? ""

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
      bannerImage = upload.url
    }

    setStatus("saving")
    const input = {
      title: fields.title.trim(),
      subject: fields.subject,
      classLevel: fields.classLevel,
      mode: fields.mode,
      location: fields.location.trim(),
      monthlyFee: Number(fields.monthlyFee),
      daysPerWeek: Number(fields.daysPerWeek),
      description: fields.description.trim(),
      bannerImage,
    }
    const result = tuition
      ? await updateTuition(tuition._id, input)
      : await createTuition(input)
    setStatus("idle")

    if (!result.ok) {
      toast.error(result.message)
      return
    }

    toast.success(result.message)

    if (isEdit) {
      onSaved?.()
      router.refresh()
      return
    }

    resetForm()
    router.push("/dashboard/tutor/my-tuitions")
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <fieldset disabled={disabled || busy} className="grid gap-5 md:grid-cols-2">
        <Field id="title" label="Title" error={errors.title} className="md:col-span-2">
          <Input
            id="title"
            value={fields.title}
            placeholder="e.g. HSC Physics 1st Paper Batch"
            aria-invalid={Boolean(errors.title)}
            onChange={(event) => update("title", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="subject" label="Subject" error={errors.subject}>
          <select
            id="subject"
            value={fields.subject}
            aria-invalid={Boolean(errors.subject)}
            onChange={(event) => update("subject", event.target.value)}
            className={selectClass}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </Field>

        <Field id="classLevel" label="Class level" error={errors.classLevel}>
          <select
            id="classLevel"
            value={fields.classLevel}
            aria-invalid={Boolean(errors.classLevel)}
            onChange={(event) => update("classLevel", event.target.value)}
            className={selectClass}
          >
            <option value="">Select a class level</option>
            {classLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </Field>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-semibold">Mode</legend>
          <div className="grid grid-cols-2 gap-3">
            {modes.map((mode) => (
              <label
                key={mode}
                className={cn(
                  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] border text-[15px] font-medium transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                  fields.mode === mode
                    ? "border-primary bg-accent text-accent-foreground"
                    : "hover:border-primary/50",
                  errors.mode && !fields.mode ? "border-destructive" : ""
                )}
              >
                <input
                  type="radio"
                  name="mode"
                  value={mode}
                  checked={fields.mode === mode}
                  onChange={() => update("mode", mode)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2 rounded-full",
                    mode === "Online" ? "bg-success" : "bg-warning"
                  )}
                />
                {mode}
              </label>
            ))}
          </div>
          <FieldError message={errors.mode} />
        </fieldset>

        <Field id="location" label="Location" error={errors.location}>
          <Input
            id="location"
            value={fields.location}
            placeholder="e.g. Dhanmondi, Dhaka or Online (Zoom)"
            aria-invalid={Boolean(errors.location)}
            onChange={(event) => update("location", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="monthlyFee" label="Monthly fee ($)" error={errors.monthlyFee}>
          <Input
            id="monthlyFee"
            type="number"
            min={1}
            value={fields.monthlyFee}
            placeholder="e.g. 40"
            aria-invalid={Boolean(errors.monthlyFee)}
            onChange={(event) => update("monthlyFee", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="daysPerWeek" label="Days per week" error={errors.daysPerWeek}>
          <Input
            id="daysPerWeek"
            type="number"
            min={1}
            max={7}
            value={fields.daysPerWeek}
            placeholder="1 to 7"
            aria-invalid={Boolean(errors.daysPerWeek)}
            onChange={(event) => update("daysPerWeek", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field
          id="description"
          label="Description"
          error={errors.description}
          className="md:col-span-2"
        >
          <Textarea
            id="description"
            rows={5}
            value={fields.description}
            placeholder="What will students learn, how are classes run, and who is this batch for?"
            aria-invalid={Boolean(errors.description)}
            onChange={(event) => update("description", event.target.value)}
            className="rounded-[10px] px-3.5 py-2.5 text-[15px]"
          />
        </Field>

        <div className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm font-semibold">Banner image</span>
          <label
            className={cn(
              "relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-[14px] border-2 border-dashed bg-muted p-6 text-center transition-colors hover:border-primary/60 has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
              errors.bannerImage ? "border-destructive" : ""
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              className="sr-only"
            />
            {preview ? (
              <Image
                src={preview}
                alt="Banner preview"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <>
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <ImageUp aria-hidden="true" className="size-6" />
                </span>
                <span className="font-semibold">Click to upload a banner</span>
                <span className="text-sm text-muted-foreground">
                  JPG, PNG or WebP, up to 5 MB
                </span>
              </>
            )}
            {preview ? (
              <span className="relative mt-auto self-end rounded-full bg-card px-3 py-1 text-sm font-semibold shadow-card">
                Change image
              </span>
            ) : null}
          </label>
          <FieldError message={errors.bannerImage} />
        </div>
      </fieldset>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={disabled || busy}
          className="h-12 rounded-[10px] px-6 text-[15px] font-semibold hover:bg-primary/90"
        >
          {status === "uploading"
            ? "Uploading image..."
            : status === "saving"
              ? isEdit
                ? "Saving..."
                : "Posting..."
              : isEdit
                ? "Save changes"
                : "Post tuition"}
        </Button>
      </div>
    </form>
  )
}
