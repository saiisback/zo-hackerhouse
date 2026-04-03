"use client";

import { useRef, type FC, type ReactNode } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  children: ReactNode;
  className?: string;
  /** Scroll progress from parent — if provided, uses this instead of its own scroll tracking */
  progress?: MotionValue<number>;
  /** Range within the progress to map the reveal [start, end]. Defaults to [0, 0.5] */
  progressRange?: [number, number];
}

/**
 * Inline word-reveal that fades words from dim to bright as you scroll.
 * Accepts mixed children (strings + styled spans). Each text node's words
 * are individually animated.
 */
export const WordReveal: FC<WordRevealProps> = ({
  children,
  className,
  progress: externalProgress,
  progressRange = [0, 0.5],
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress: internalProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const progress = externalProgress ?? internalProgress;

  // Flatten children into word tokens, preserving styling spans
  const tokens = flattenToTokens(children);
  const totalWords = tokens.length;

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {tokens.map((token, i) => {
        const wordStart =
          progressRange[0] +
          (i / totalWords) * (progressRange[1] - progressRange[0]);
        const wordEnd =
          progressRange[0] +
          ((i + 1) / totalWords) * (progressRange[1] - progressRange[0]);
        return (
          <RevealWord
            key={i}
            progress={progress}
            range={[wordStart, wordEnd]}
            className={token.className}
          >
            {token.text}
          </RevealWord>
        );
      })}
    </p>
  );
};

interface Token {
  text: string;
  className?: string;
}

function flattenToTokens(children: ReactNode): Token[] {
  const tokens: Token[] = [];

  const processNode = (node: ReactNode, inheritedClassName?: string) => {
    if (typeof node === "string") {
      const words = node.split(/(\s+)/);
      for (const w of words) {
        if (w.trim()) {
          tokens.push({ text: w, className: inheritedClassName });
        } else if (w && tokens.length > 0) {
          // Attach whitespace to previous token
          tokens[tokens.length - 1].text += w;
        }
      }
    } else if (Array.isArray(node)) {
      node.forEach((child) => processNode(child, inheritedClassName));
    } else if (
      node &&
      typeof node === "object" &&
      "props" in node
    ) {
      const el = node as React.ReactElement<{
        className?: string;
        children?: ReactNode;
      }>;
      const childClassName = el.props.className
        ? inheritedClassName
          ? `${inheritedClassName} ${el.props.className}`
          : el.props.className
        : inheritedClassName;
      processNode(el.props.children, childClassName);
    }
  };

  processNode(children);
  return tokens;
}

interface RevealWordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

const RevealWord: FC<RevealWordProps> = ({
  children,
  progress,
  range,
  className,
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("mr-[0.25em]", className)}>
      {children}
    </motion.span>
  );
};
