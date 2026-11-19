import { HeroSection } from "@/components/home/hero-section"
import { FeaturedTuitions } from "@/components/home/featured-tuitions"
import { HowItWorks } from "@/components/home/how-it-works"

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedTuitions />
      <HowItWorks />
    </>
  )
}

export default HomePage
