"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpenCheck, GraduationCap } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/auth/form-field"
import { signUp } from "@/lib/auth-client"
import { validateEmail, validateName, validatePassword } from "@/lib/validation"
import { cn } from "@/lib/utils"

const roles = [
  {
    value: "student",
    title: "Student",
    description: "Find tutors and apply",
    Icon: GraduationCap,
  },
  {
    value: "tutor",
    title: "Tutor",
    description: "Post tuitions and teach",
    Icon: BookOpenCheck,
  },
]

type Errors = {
  name?: string
  email?: string
  password?: string
  role?: string
}

export const SignUpForm = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors: Errors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      role: role ? "" : "Choose whether you are a student or a tutor",
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

    setLoading(true)
    const { error } = await signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      role: role as "student" | "tutor",
    })
    setLoading(false)

    if (error) {
      toast.error(error.message ?? "Could not create your account")
      return
    }

    toast.success("Account created. Welcome to MentorLagbe!")
    router.push("/")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-3xl font-extrabold tracking-[-0.03em]">
          Create your account
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Join as a student or a tutor. It only takes a minute.
        </p>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold">I am a</legend>
        <div className="grid grid-cols-2 gap-3">
          {roles.map(({ value, title, description, Icon }) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                role === value
                  ? "border-2 border-primary bg-accent"
                  : "hover:border-primary/50",
                errors.role && !role ? "border-destructive" : ""
              )}
            >
              <input
                type="radio"
                name="role"
                value={value}
                checked={role === value}
                onChange={() => setRole(value)}
                className="sr-only"
              />
              <Icon aria-hidden="true" className="size-6 text-primary" />
              <span className="font-semibold">{title}</span>
              <span className="text-[13px] text-muted-foreground">
                {description}
              </span>
            </label>
          ))}
        </div>
        {errors.role ? (
          <p className="text-sm text-destructive">{errors.role}</p>
        ) : null}
      </fieldset>

      <FormField
        id="name"
        label="Full name"
        value={name}
        placeholder="Your full name"
        autoComplete="name"
        error={errors.name}
        onChange={setName}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email}
        onChange={setEmail}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        value={password}
        placeholder="At least 6 characters"
        autoComplete="new-password"
        error={errors.password}
        onChange={setPassword}
      />

      <Button
        type="submit"
        disabled={loading}
        className="h-12 rounded-[10px] text-[15px] font-semibold hover:bg-primary/90"
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
