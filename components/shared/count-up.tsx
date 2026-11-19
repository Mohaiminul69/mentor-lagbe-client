"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

export const CountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return

    if (reduceMotion) {
      node.textContent = value.toLocaleString()
      return
    }

    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString()
      },
    })

    return () => controls.stop()
  }, [inView, reduceMotion, value])

  return <span ref={ref}>0</span>
}
