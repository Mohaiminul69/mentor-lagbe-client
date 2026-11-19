"use server"

import { requireUser } from "@/lib/core/server"

const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
const maxSize = 5 * 1024 * 1024

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; message: string }

export const uploadImage = async (formData: FormData): Promise<UploadResult> => {
  await requireUser()

  const file = formData.get("image")

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Please choose an image" }
  }
  if (!allowedTypes.includes(file.type)) {
    return { ok: false, message: "Only JPG, PNG or WebP images are allowed" }
  }
  if (file.size > maxSize) {
    return { ok: false, message: "Image must be 5 MB or smaller" }
  }
  if (!process.env.IMGBB_API_KEY) {
    return { ok: false, message: "Image upload is not configured yet" }
  }

  const body = new FormData()
  body.append("image", file)

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      { method: "POST", body }
    )
    const data = await res.json()

    if (!res.ok || !data?.data?.display_url) {
      return { ok: false, message: data?.error?.message ?? "Image upload failed" }
    }

    return { ok: true, url: data.data.display_url }
  } catch {
    return { ok: false, message: "Could not reach the image service" }
  }
}
