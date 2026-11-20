# MentorLagbe — Smart Tuition & Mentorship Platform

MentorLagbe connects students with verified tutors for online and in-person tuition. Tutors post subject-wise batches or 1-on-1 mentorship, students search, filter and apply, and admins moderate every listing, manage users and track Stripe revenue.

**Purpose:** students and parents struggle to find trusted tutors by subject, class level, mode and monthly budget, and skilled tutors lack a structured place to showcase their batches and manage enrollments. MentorLagbe solves both in one role-based platform.

## Live Links

| | URL |
|---|---|
| Live site | https://mentor-lagbe-client.vercel.app |
| Server API | https://mentor-lagbe-server-two.vercel.app |
| Client repository | https://github.com/Mohaiminul69/mentor-lagbe-client |
| Server repository | https://github.com/Mohaiminul69/mentor-lagbe-server |

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@mentorlagbe.com | Admin@123 |
| Tutor | tutor@mentorlagbe.com | Tutor@123 |
| Student | student@mentorlagbe.com | Student@123 |

## Key Features

- **Role-based accounts** — sign up as a Student or Tutor with BetterAuth (email and password, MongoDB adapter). Every new user starts on the Free plan.
- **JWT-protected API** — the Next.js server signs a JWT for each protected request, and the Express server checks it with `verifyToken`, `verifyStudent`, `verifyTutor` and `verifyAdmin` middlewares.
- **Browse Tuitions with server-side search and filters** — search by title or subject and filter by subject, class level and mode. Filters live in the URL, so results survive a reload and can be shared.
- **Tuition details and role-restricted applications** — only students can apply (phone, preferred schedule, learning note). Tutors and admins see a notice, guests are asked to sign in, and duplicate applications are blocked.
- **Student dashboard** — stats for applied, accepted and pending applications and the current plan, plus a My Applications table with cancel for pending requests.
- **Tutor dashboard** — post tuitions with a banner uploaded to ImgBB, edit, delete and open/close posts, and accept or reject applicants. Free tutors can post up to 2 tuitions; Pro tutors get unlimited posts.
- **Admin dashboard** — platform stats including total Stripe revenue, user role management, tuition approval (approve or reject) and a full transaction history.
- **Stripe Pro upgrade** — Student Pro ($10) and Tutor Pro ($15) through Stripe Checkout. The payment is verified on the server, saved to the `payments` collection, and the user's plan is switched to `pro`.
- **Update Profile** — every role can update name, phone, bio and profile photo (uploaded to ImgBB).
- **Polished UI** — responsive layouts, collapsible dashboard sidebar, dark and light themes, scroll animations, skeleton loaders, toast notifications, and custom 404 and error pages.

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Auth:** BetterAuth with the MongoDB adapter, JWT for API requests
- **Backend:** Node.js, Express, MongoDB (see the server repository)
- **Payments and media:** Stripe Checkout, ImgBB image upload

## NPM Packages Used

| Package | Used for |
|---|---|
| next, react, react-dom | App framework |
| better-auth, @better-auth/mongo-adapter, mongodb | Authentication and user storage |
| jsonwebtoken | Signing JWTs for protected API requests |
| shadcn, @base-ui/react, class-variance-authority, cn, tw-animate-css | UI components and styling helpers |
| tailwindcss, @tailwindcss/turbopack | Styling |
| lucide-react | Icons |
| motion | Animations |
| next-themes | Dark and light mode |
| sonner | Toast notifications |
| server-only | Keeping server code out of the browser bundle |
| tsx (dev) | Running the seed script |
| typescript, eslint, eslint-config-next, babel-plugin-react-compiler (dev) | Tooling |

## Running Locally

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=
MONGODB_URI=
DB_NAME=
JWT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
IMGBB_API_KEY=
```

`JWT_SECRET` must match the value used by the server.

To fill the database with demo users, 12 approved tuitions and a sample payment:

```bash
npm run seed
```
