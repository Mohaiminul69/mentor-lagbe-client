import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { navLinks } from "@/lib/nav-links"
import {
  FacebookIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/layout/social-icons"

const accountLinks = [
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Update Profile", href: "/dashboard/profile" },
]

const socialLinks = [
  { label: "MentorLagbe on X", href: "https://x.com", Icon: XIcon },
  {
    label: "MentorLagbe on Facebook",
    href: "https://facebook.com",
    Icon: FacebookIcon,
  },
  {
    label: "MentorLagbe on LinkedIn",
    href: "https://linkedin.com",
    Icon: LinkedinIcon,
  },
  {
    label: "MentorLagbe on YouTube",
    href: "https://youtube.com",
    Icon: YoutubeIcon,
  },
]

const contactInfo = [
  { label: "hello@mentorlagbe.com", Icon: Mail },
  { label: "+880 1712-345678", Icon: Phone },
  { label: "Dhaka, Bangladesh", Icon: MapPin },
]

const columnTitle =
  "text-sm font-bold tracking-[0.06em] text-band-muted uppercase"

export const Footer = () => {
  return (
    <footer className="bg-band text-band-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pt-[72px] pb-8">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="flex max-w-[340px] flex-[1_1_280px] flex-col gap-4">
            <Logo accentClassName="text-indigo-300" />
            <p className="text-[15px] text-band-muted">
              The smart way to find verified tutors and mentorship batches,
              online or in person.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-[10px] border border-white/15 transition-colors hover:bg-white/10"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-3 text-[15px]">
              <span className={columnTitle}>Platform</span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-indigo-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 text-[15px]">
              <span className={columnTitle}>Account</span>
              {accountLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-indigo-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 text-[15px]">
              <span className={columnTitle}>Contact</span>
              {contactInfo.map(({ label, Icon }) => (
                <span key={label} className="flex items-center gap-2.5">
                  <Icon aria-hidden="true" className="size-4 text-band-muted" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/12 pt-6 text-sm text-band-muted">
          <span>© 2026 MentorLagbe. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
