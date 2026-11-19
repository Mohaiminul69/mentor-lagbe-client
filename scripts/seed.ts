import { MongoClient } from "mongodb"
import { auth } from "../lib/auth"

type SeedUser = {
  name: string
  email: string
  password: string
  role: "student" | "tutor" | "admin"
  plan: "free" | "pro"
  image: string
  phone: string
  bio: string
}

type SeedTuition = {
  title: string
  subject: string
  classLevel: string
  mode: "Online" | "Offline"
  location: string
  monthlyFee: number
  daysPerWeek: number
  bannerImage: string
  description: string
  tutorEmail: string
}

const banner = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&fm=jpg`

const seedUsers: SeedUser[] = [
  {
    name: "MentorLagbe Admin",
    email: "admin@mentorlagbe.com",
    password: "Admin@123",
    role: "admin",
    plan: "free",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    phone: "+880 1711-000001",
    bio: "Platform administrator keeping MentorLagbe listings safe and verified.",
  },
  {
    name: "Rahim Ahmed",
    email: "tutor@mentorlagbe.com",
    password: "Tutor@123",
    role: "tutor",
    plan: "free",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+880 1712-345601",
    bio: "Math teacher with 6 years of experience preparing SSC students for A+ results.",
  },
  {
    name: "Nusrat Jahan",
    email: "nusrat.jahan@mentorlagbe.com",
    password: "Mentor@123",
    role: "tutor",
    plan: "free",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+880 1712-345602",
    bio: "Physics graduate from Dhaka University. I make mechanics and electricity simple.",
  },
  {
    name: "Tanvir Hasan",
    email: "tanvir.hasan@mentorlagbe.com",
    password: "Mentor@123",
    role: "tutor",
    plan: "free",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    phone: "+880 1712-345603",
    bio: "Software engineer teaching Python and JavaScript through real mini projects.",
  },
  {
    name: "Farhana Islam",
    email: "farhana.islam@mentorlagbe.com",
    password: "Mentor@123",
    role: "tutor",
    plan: "free",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    phone: "+880 1712-345604",
    bio: "IELTS trainer (band 8.5) and spoken English coach for students and professionals.",
  },
  {
    name: "Sabbir Rahman",
    email: "sabbir.rahman@mentorlagbe.com",
    password: "Mentor@123",
    role: "tutor",
    plan: "free",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    phone: "+880 1712-345605",
    bio: "Pharmacy graduate teaching HSC Chemistry and medical admission Biology.",
  },
  {
    name: "Ayesha Siddiqua",
    email: "ayesha.siddiqua@mentorlagbe.com",
    password: "Mentor@123",
    role: "tutor",
    plan: "pro",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    phone: "+880 1712-345606",
    bio: "Chartered accountancy student and lecturer covering Accounting, English and Calculus.",
  },
  {
    name: "Sadia Karim",
    email: "student@mentorlagbe.com",
    password: "Student@123",
    role: "student",
    plan: "free",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    phone: "+880 1813-220011",
    bio: "HSC science student looking for Physics and Math support.",
  },
  {
    name: "Arif Hossain",
    email: "arif.hossain@mentorlagbe.com",
    password: "Mentor@123",
    role: "student",
    plan: "free",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    phone: "+880 1813-220012",
    bio: "University student preparing for IELTS and learning to code.",
  },
]

const seedTuitions: SeedTuition[] = [
  {
    title: "SSC General Math Complete Batch",
    subject: "Math",
    classLevel: "SSC",
    mode: "Offline",
    location: "Dhanmondi, Dhaka",
    monthlyFee: 35,
    daysPerWeek: 3,
    bannerImage: banner("photo-1635070041078-e363dbe005cb"),
    description:
      "A full SSC General Math course covering algebra, geometry, trigonometry and statistics. Every class ends with board-style practice questions and weekly model tests to track progress.",
    tutorEmail: "tutor@mentorlagbe.com",
  },
  {
    title: "HSC Physics 1st & 2nd Paper",
    subject: "Physics",
    classLevel: "HSC",
    mode: "Online",
    location: "Online (Google Meet)",
    monthlyFee: 45,
    daysPerWeek: 3,
    bannerImage: banner("photo-1636466497217-26a8cbeaf0aa"),
    description:
      "Concept-first HSC Physics classes covering vectors, dynamics, waves, electricity and modern physics. Includes creative question practice, math problem drills and recorded revision sessions.",
    tutorEmail: "nusrat.jahan@mentorlagbe.com",
  },
  {
    title: "Engineering Admission Physics Crash Course",
    subject: "Physics",
    classLevel: "Admission",
    mode: "Offline",
    location: "Farmgate, Dhaka",
    monthlyFee: 60,
    daysPerWeek: 5,
    bannerImage: banner("photo-1581091226825-a6a2a5aee158"),
    description:
      "An intensive admission batch for BUET, CUET and KUET aspirants. Fast problem-solving techniques, previous year question analysis and timed mock exams every Friday.",
    tutorEmail: "nusrat.jahan@mentorlagbe.com",
  },
  {
    title: "Python Programming from Zero",
    subject: "Programming",
    classLevel: "University",
    mode: "Online",
    location: "Online (Zoom)",
    monthlyFee: 50,
    daysPerWeek: 2,
    bannerImage: banner("photo-1517694712202-14dd9538aa97"),
    description:
      "Learn Python step by step: variables, loops, functions, files and object-oriented programming. Each week you build a small project, finishing with a portfolio-ready final app.",
    tutorEmail: "tanvir.hasan@mentorlagbe.com",
  },
  {
    title: "Coding for Kids: Scratch & Python Basics",
    subject: "Programming",
    classLevel: "Class 6-8",
    mode: "Online",
    location: "Online (Google Meet)",
    monthlyFee: 30,
    daysPerWeek: 2,
    bannerImage: banner("photo-1555066931-4365d14bab8c"),
    description:
      "A fun introduction to programming for young learners. Students create games and animations in Scratch, then move on to simple Python programs to build logical thinking.",
    tutorEmail: "tanvir.hasan@mentorlagbe.com",
  },
  {
    title: "IELTS Band 7+ Speaking & Writing",
    subject: "IELTS",
    classLevel: "Professional",
    mode: "Online",
    location: "Online (Zoom)",
    monthlyFee: 55,
    daysPerWeek: 3,
    bannerImage: banner("photo-1434030216411-0b793f4b4173"),
    description:
      "Focused IELTS preparation for Writing Task 1 & 2 and Speaking. Get detailed feedback on every essay, one-to-one speaking mock tests and proven band-score strategies.",
    tutorEmail: "farhana.islam@mentorlagbe.com",
  },
  {
    title: "Spoken English & Grammar for Class 6-8",
    subject: "English",
    classLevel: "Class 6-8",
    mode: "Offline",
    location: "Uttara, Dhaka",
    monthlyFee: 25,
    daysPerWeek: 3,
    bannerImage: banner("photo-1546410531-bb4caa6b424d"),
    description:
      "Build confidence in speaking English while mastering grammar, vocabulary and composition. Small group sessions with role plays, presentations and school exam preparation.",
    tutorEmail: "farhana.islam@mentorlagbe.com",
  },
  {
    title: "HSC Chemistry Full Syllabus",
    subject: "Chemistry",
    classLevel: "HSC",
    mode: "Offline",
    location: "Mirpur, Dhaka",
    monthlyFee: 40,
    daysPerWeek: 3,
    bannerImage: banner("photo-1532094349884-543bc11b234d"),
    description:
      "Complete HSC Chemistry coverage including organic chemistry, chemical equilibrium and quantitative chemistry. Reaction maps, lab-based explanations and regular chapter tests.",
    tutorEmail: "sabbir.rahman@mentorlagbe.com",
  },
  {
    title: "Medical Admission Biology Batch",
    subject: "Biology",
    classLevel: "Admission",
    mode: "Online",
    location: "Online (Zoom)",
    monthlyFee: 65,
    daysPerWeek: 4,
    bannerImage: banner("photo-1530026405186-ed1f139313f8"),
    description:
      "Targeted Biology preparation for the medical admission test. Chapter-wise MCQ practice, human physiology deep dives and full-length mock tests with detailed solutions.",
    tutorEmail: "sabbir.rahman@mentorlagbe.com",
  },
  {
    title: "HSC Accounting Made Easy",
    subject: "Accounting",
    classLevel: "HSC",
    mode: "Offline",
    location: "Mohammadpur, Dhaka",
    monthlyFee: 35,
    daysPerWeek: 2,
    bannerImage: banner("photo-1554224155-6726b3ff858f"),
    description:
      "Understand journals, ledgers, trial balance and financial statements with clear step-by-step methods. Ideal for business studies students aiming for a strong HSC result.",
    tutorEmail: "ayesha.siddiqua@mentorlagbe.com",
  },
  {
    title: "Primary English Reading & Writing",
    subject: "English",
    classLevel: "Class 1-5",
    mode: "Offline",
    location: "Bashundhara, Dhaka",
    monthlyFee: 20,
    daysPerWeek: 4,
    bannerImage: banner("photo-1503676260728-1c00da094a0b"),
    description:
      "Friendly home tuition for young learners to improve reading, handwriting, spelling and short compositions. Lessons use stories, games and worksheets to keep children engaged.",
    tutorEmail: "ayesha.siddiqua@mentorlagbe.com",
  },
  {
    title: "University Calculus I & II",
    subject: "Math",
    classLevel: "University",
    mode: "Online",
    location: "Online (Google Meet)",
    monthlyFee: 70,
    daysPerWeek: 2,
    bannerImage: banner("photo-1453733190371-0a9bedd82893"),
    description:
      "One-to-one style mentorship for first-year university Calculus: limits, derivatives, integrals and series. Includes assignment guidance and exam-focused problem sets.",
    tutorEmail: "ayesha.siddiqua@mentorlagbe.com",
  },
]

const daysAgo = (days: number) => new Date(Date.now() - days * 86400000)

const seed = async () => {
  const client = new MongoClient(process.env.MONGODB_URI as string)
  await client.connect()
  const db = client.db(process.env.DB_NAME)
  const users = db.collection("users")
  const tuitions = db.collection("tuitions")
  const payments = db.collection("payments")

  for (const user of seedUsers) {
    const existing = await users.findOne({ email: user.email })

    if (!existing) {
      await auth.api.signUpEmail({
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
          image: user.image,
          role: user.role === "admin" ? "student" : user.role,
        },
      })
    }

    await users.updateOne(
      { email: user.email },
      {
        $set: {
          name: user.name,
          image: user.image,
          role: user.role,
          plan: user.plan,
          phone: user.phone,
          bio: user.bio,
        },
      }
    )
    console.log(`${existing ? "Updated" : "Created"} ${user.role}: ${user.email}`)
  }

  const tutors = seedUsers.filter((user) => user.role === "tutor")
  const tutorEmails = tutors.map((tutor) => tutor.email)

  await tuitions.deleteMany({ tutorEmail: { $in: tutorEmails } })
  await tuitions.insertMany(
    seedTuitions.map((tuition, index) => ({
      ...tuition,
      tutorName: tutors.find((tutor) => tutor.email === tuition.tutorEmail)?.name,
      approvalStatus: "approved",
      isActive: true,
      createdAt: daysAgo(index * 2 + 1),
    }))
  )
  console.log(`Inserted ${seedTuitions.length} approved tuitions`)

  const proTutor = seedUsers.find((user) => user.plan === "pro")

  if (proTutor) {
    await payments.deleteMany({ stripeSessionId: { $regex: "^cs_seed_" } })
    await payments.insertOne({
      userEmail: proTutor.email,
      userName: proTutor.name,
      userRole: proTutor.role,
      planName: "Tutor Pro",
      amount: 15,
      currency: "usd",
      transactionId: "pi_seed_tutor_pro_001",
      stripeSessionId: "cs_seed_tutor_pro_001",
      paymentStatus: "paid",
      paidAt: daysAgo(20),
    })
    console.log(`Inserted Pro payment for ${proTutor.email}`)
  }

  await client.close()
}

seed()
  .then(() => {
    console.log("Seeding complete")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Seeding failed", error)
    process.exit(1)
  })
