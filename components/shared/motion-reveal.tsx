"use client"

import { Children, type ReactNode } from "react"
import { MotionConfig, motion, type Variants } from "motion/react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

type RevealProps = {
  children: ReactNode
  className?: string
}

export const FadeIn = ({ children, className }: RevealProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}

export const StaggerGrid = ({ children, className }: RevealProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={className}
      >
        {Children.map(children, (child) => (
          <motion.div variants={fadeUp} className="h-full">
            {child}
          </motion.div>
        ))}
      </motion.div>
    </MotionConfig>
  )
}
