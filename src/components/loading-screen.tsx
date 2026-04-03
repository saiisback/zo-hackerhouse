"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Imagine", "Build", "Ship"];
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const finished = useRef(false);

  // Word cycling based on progress thresholds
  useEffect(() => {
    if (progress > 66) setWordIndex(2);
    else if (progress > 33) setWordIndex(1);
  }, [progress]);

  // Track image loading progress
  useEffect(() => {
    const update = () => {
      const images = Array.from(document.images);
      if (images.length === 0) {
        setProgress(100);
        return;
      }
      const loaded = images.filter((img) => img.complete).length;
      const p = Math.round((loaded / images.length) * 100);
      setProgress(p);

      if (p >= 100 && !finished.current) {
        finished.current = true;
        setTimeout(() => onCompleteRef.current(), 400);
      }
    };

    update();

    const interval = setInterval(update, 100);

    const images = Array.from(document.images);
    const handlers: Array<() => void> = [];
    for (const img of images) {
      const handler = () => update();
      img.addEventListener("load", handler);
      img.addEventListener("error", handler);
      handlers.push(handler);
    }

    return () => {
      clearInterval(interval);
      images.forEach((img, i) => {
        img.removeEventListener("load", handlers[i]);
        img.removeEventListener("error", handlers[i]);
      });
    };
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
