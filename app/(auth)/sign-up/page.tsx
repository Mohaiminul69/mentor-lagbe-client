import type { Metadata } from "next"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up | MentorLagbe",
}

const SignUpPage = () => {
  return <SignUpForm />
}

export default SignUpPage
