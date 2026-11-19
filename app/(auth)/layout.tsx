import { CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/theme/theme-toggle"

const highlights = [
  "Verified tutors across Math, Physics, Programming, IELTS and more",
  "Online and in-person batches that fit your monthly budget",
  "Apply in minutes and track every application in one place",
]

const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <aside className="hidden flex-col justify-between bg-band p-12 text-band-foreground lg:flex">
        <Logo accentClassName="text-indigo-300" />
        <div className="flex max-w-md flex-col gap-6">
          <h2 className="font-heading text-[40px] leading-tight font-bold tracking-[-0.025em]">
            Learn from the right mentor, at the right pace.
          </h2>
          <ul className="flex flex-col gap-4 text-[15px] text-band-muted">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-indigo-300"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-band-muted">
          © 2026 MentorLagbe. All rights reserved.
        </p>
      </aside>

      <main className="relative flex flex-col items-center justify-center bg-muted px-6 py-12">
        <ThemeToggle className="absolute top-4 right-4" />
        <Logo className="mb-8 lg:hidden" />
        <div className="w-full max-w-[440px] rounded-[18px] border bg-card p-8 shadow-card">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
