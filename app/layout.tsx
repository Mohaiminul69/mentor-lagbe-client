import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  title: "MentorLagbe | Smart Tuition & Mentorship Platform",
  description:
    "Find verified tutors and mentorship batches by subject, class level, mode and budget.",
}

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" theme="light" richColors />
      </body>
    </html>
  )
}

export default RootLayout
