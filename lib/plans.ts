export type PlanAudience = "student" | "tutor"

export const plans = {
  student: {
    free: {
      name: "Student Free",
      tagline: "Everything you need to find a tutor.",
      features: [
        "Browse all approved tuitions",
        "Apply to any tuition",
        "Track application status",
      ],
    },
    pro: {
      name: "Student Pro",
      price: 10,
      tagline: "Get seen first by top tutors.",
      features: [
        "Everything in Free",
        "Priority booking on applications",
        "Pro badge on your profile",
      ],
    },
  },
  tutor: {
    free: {
      name: "Tutor Free",
      tagline: "Try teaching on MentorLagbe.",
      features: [
        "Up to 2 tuition posts",
        "Manage student applicants",
        "Public tutor profile",
      ],
    },
    pro: {
      name: "Tutor Pro",
      price: 15,
      tagline: "Grow without limits.",
      features: [
        "Unlimited tuition posts",
        "Verified tutor badge",
        "Everything in Free",
      ],
    },
  },
}
