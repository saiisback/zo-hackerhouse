"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Imagine", "Build", "Ship"];
const DURATION = 2700;
const EASE = [0.4, 0, 0.2, 1];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Word cycling: every 900ms, stop at last word
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev >= WORDS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Progress counter via rAF
  useEffect(() => {
    const start = performance.now();
    let raf: number;
    let done = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(p);

      if (p >= 100 && !done) {
        done = true;
        setTimeout(() => onCompleteRef.current(), 400);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex"
      style={{ backgroundColor: "#0a0a0a" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Top-left label */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-xs md:text-sm uppercase tracking-[0.3em] font-[family-name:var(--font-headline)] italic"
          style={{ color: "#888888" }}
        >
          Civilisation
        </span>
      </motion.div>

      {/* Center rotating words */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-headline)] italic tabular-nums"
            style={{ color: "rgba(245, 245, 245, 0.8)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-6xl md:text-8xl lg:text-9xl font-[family-name:var(--font-headline)] tabular-nums"
          style={{ color: "#f5f5f5" }}
        >
          {Math.round(progress).toString().padStart(3, "0")}
        </span>
      </motion.div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[3px] w-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
          <motion.div
            className="h-full origin-left"
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #aaaaaa 100%)",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.25)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
