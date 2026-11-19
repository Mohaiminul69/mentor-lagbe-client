import { HeroSection } from "@/components/home/hero-section"
import { FeaturedTuitions } from "@/components/home/featured-tuitions"
import { StatsBand } from "@/components/home/stats-band"
import { HowItWorks } from "@/components/home/how-it-works"
import { TopSubjects } from "@/components/home/top-subjects"

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedTuitions />
      <StatsBand />
      <HowItWorks />
      <TopSubjects />
    </>
  )
}

export default HomePage
