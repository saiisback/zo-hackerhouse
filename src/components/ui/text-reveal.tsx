"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

/** A styled segment: text with an optional className applied to each word */
export interface StyledSegment {
  text: string
  className?: string
}

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  /** Plain string (used when segments is not provided) */
  children?: string
  /** Optional styled segments — if provided, takes precedence over children */
  segments?: StyledSegment[]
  /** Class applied to the text wrapper */
  textClassName?: string
  /** Optional content rendered above the text in the sticky container */
  header?: ReactNode
}

export const TextReveal: FC<TextRevealProps> = ({ children, segments, className, textClassName, header }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  })

  // Build word list with optional per-word styling
  const styledWords: { word: string; className?: string }[] = []

  if (segments) {
    for (const seg of segments) {
      const words = seg.text.split(" ").filter(Boolean)
      for (const w of words) {
        styledWords.push({ word: w, className: seg.className })
      }
    }
  } else if (children) {
    const words = children.split(" ")
    for (const w of words) {
      styledWords.push({ word: w })
    }
  }

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex flex-col h-[50%] max-w-4xl justify-center bg-transparent px-4 py-20"
        }
      >
        {header}
        <span
          className={cn(
            "flex flex-wrap p-5 text-2xl font-bold md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl",
            textClassName,
          )}
        >
          {styledWords.map((sw, i) => {
            const start = i / styledWords.length
            const end = start + 1 / styledWords.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} className={sw.className}>
                {sw.word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  className?: string
}

const Word: FC<WordProps> = ({ children, progress, range, className }) => {
  const color = useTransform(
    progress,
    range,
    ["rgb(100, 100, 100)", "rgb(255, 255, 255)"]
  )
  return (
    <motion.span
      style={{ color }}
      className={cn("xl:lg-3 mx-1 lg:mx-1.5", className)}
    >
      {children}
    </motion.span>
  )
}
