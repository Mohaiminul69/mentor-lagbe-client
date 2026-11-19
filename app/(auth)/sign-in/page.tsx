import { Suspense } from "react"
import type { Metadata } from "next"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In | MentorLagbe",
}

const safeRedirect = (value: string | string[] | undefined) => {
  const path = Array.isArray(value) ? value[0] : value
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/"
}

const SignInLoader = async ({
  searchParams,
}: {
  searchParams: PageProps<"/sign-in">["searchParams"]
}) => {
  const params = await searchParams
  return <SignInForm redirectTo={safeRedirect(params.redirect)} />
}

const SignInPage = ({ searchParams }: PageProps<"/sign-in">) => {
  return (
    <Suspense fallback={<SignInForm redirectTo="/" />}>
      <SignInLoader searchParams={searchParams} />
    </Suspense>
  )
}

export default SignInPage
