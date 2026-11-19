import { SectionHeading } from "@/components/shared/section-heading"
import { FadeIn } from "@/components/shared/motion-reveal"
import { PricingCards } from "@/components/shared/pricing-cards"

export const PricingSection = () => {
  return (
    <section id="pricing" className="scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-6 py-24">
        <FadeIn className="mb-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Start free, upgrade when you're ready"
            subtitle="Pay once with Stripe to unlock Pro. No hidden fees."
            className="items-center text-center"
          />
        </FadeIn>
        <FadeIn>
          <PricingCards />
        </FadeIn>
      </div>
    </section>
  )
}
