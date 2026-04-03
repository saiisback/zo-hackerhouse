"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";

export function MissionHouses() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Houses start off-screen right and scroll left until the last card is fully visible
  const x = useTransform(scrollYProgress, [0, 1], ["100vw", "-65vw"]);
  // Mission content fades/slides left as houses come in
  const missionX = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const missionOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Mission content - full width centered, slides away */}
        <motion.div
          style={{ x: missionX, opacity: missionOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-8"
        >
          <BlurFade inView delay={0.1} direction="up">
            <div className="w-64 h-64 md:w-96 md:h-96 mx-auto mb-20 rounded-full overflow-hidden border border-white/10 bg-white flex items-center justify-center">
              <Image
                src="/zo-logo.jpg"
                className="w-3/4 h-3/4 object-contain"
                alt="Zo House logo"
                width={384}
                height={384}
              />
            </div>
          </BlurFade>
          <BlurFade inView delay={0.25} direction="up">
            <div className="word-reveal text-3xl md:text-5xl font-medium leading-[1.3] text-left max-w-4xl">
              <p className="mb-8">
                <span className="opacity-100 text-white">India&apos;s permanent </span>
                <span className="opacity-100 text-white font-[family-name:var(--font-headline)] italic">
                  founder house
                </span>{" "}
                <span className="opacity-100 text-white">— where </span>
                <span className="opacity-100 text-white font-[family-name:var(--font-headline)] italic">
                  builders
                </span>{" "}
                <span className="opacity-40">
                  live, collaborate, and compound. Two properties. 450+ events. 2,700+ founders. 12+
                  programs.
                </span>
              </p>
            </div>
          </BlurFade>
        </motion.div>

        {/* Houses - scroll in from right */}
        <motion.div
          style={{ x }}
          className="absolute inset-0 flex items-center gap-6 pl-8 md:pl-16"
        >
          <div className="relative w-[60vw] h-[70vh] rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
              alt="Whitefield House"
              fill
              sizes="60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Property 01</span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 mb-3">Whitefield</h3>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                3-storey villa. Pool. Studio. 20 beds.{" "}
                <span className="text-white font-[family-name:var(--font-headline)] italic">The compound.</span>
              </p>
            </div>
          </div>
          <div className="relative w-[60vw] h-[70vh] rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
              alt="Koramangala House"
              fill
              sizes="60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Property 02</span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 mb-3">Koramangala</h3>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                13th-floor penthouse. City views. 14 beds.{" "}
                <span className="text-white font-[family-name:var(--font-headline)] italic">The stage.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
