"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/auth/form-field"
import { signIn } from "@/lib/auth-client"
import { validateEmail, validatePassword } from "@/lib/validation"

type Errors = {
  email?: string
  password?: string
}

export const SignInForm = ({ redirectTo }: { redirectTo: string }) => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors: Errors = {
      email: validateEmail(email),
      password: validatePassword(password),
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
    const { error } = await signIn.email({ email: email.trim(), password })
    setLoading(false)

    if (error) {
      toast.error(error.message ?? "Invalid email or password")
      return
    }

    toast.success("Signed in successfully")
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-3xl font-extrabold tracking-[-0.03em]">
          Welcome back
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Sign in to manage your tuitions and applications.
        </p>
      </div>

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
        placeholder="Your password"
        autoComplete="current-password"
        error={errors.password}
        onChange={setPassword}
      />

      <Button
        type="submit"
        disabled={loading}
        className="h-12 rounded-[10px] text-[15px] font-semibold hover:bg-primary/90"
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to MentorLagbe?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}
