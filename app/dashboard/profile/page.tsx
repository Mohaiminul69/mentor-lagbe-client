import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { requireUser } from "@/lib/core/server"

const ProfilePage = async () => {
  const session = await requireUser("/dashboard/profile")

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <DashboardPageHeader
        title="Update Profile"
        description="Keep your name, photo, phone and bio up to date."
      />
      <ProfileForm
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          role: session.user.role ?? "student",
          phone: session.user.phone ?? "",
          bio: session.user.bio ?? "",
        }}
      />
    </div>
  )
}

export default ProfilePage
