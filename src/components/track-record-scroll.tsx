"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cities = [
  {
    city: "Dubai",
    tagline: "Pop-up Hacker House",
    description:
      "Three-week builder sprint in the desert. High-signal founders, zero distractions.",
    image: "/dubai.webp",
    flag: "\u{1F1E6}\u{1F1EA}",
  },
  {
    city: "Singapore",
    tagline: "Founder Activation",
    description:
      "TOKEN2049 side event. 200+ founders. The room that launched three companies.",
    image: "/singapore.webp",
    flag: "\u{1F1F8}\u{1F1EC}",
  },
  {
    city: "San Francisco",
    tagline: "Builder Residency",
    description:
      "Two weeks in SOMA. Demo day with top-tier VCs. Six deals closed on-site.",
    image: "/sf.webp",
    flag: "\u{1F1FA}\u{1F1F8}",
  },
];

export function TrackRecordScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      const index = Math.min(
        cities.length - 1,
        Math.floor(progress * cities.length)
      );
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${(cities.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        {/* Background images */}
        {cities.map((c, i) => (
          <div
            key={c.city}
            className={`absolute inset-0 transition-all duration-1000 ${
              i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={c.image}
              alt={c.city}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70 z-[1]" />

        {/* Text content */}
        <div className="relative z-[2] h-full flex flex-col justify-center px-8 md:px-28">
          <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase mb-4">
            Track Record
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
            We&apos;ve done this before.
            <br />
            <span className="font-[family-name:var(--font-headline)] italic font-normal shiny-gold">
              Dubai. Singapore. San Francisco.
            </span>
            <br />
            Now it&apos;s India&apos;s turn.
          </h2>

          {/* City names */}
          <div className="flex flex-col gap-4 mt-4">
            {cities.map((c, i) => (
              <div
                key={c.city}
                className={`transition-all duration-500 ${
                  i === activeIndex ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <h3
                    className={`text-2xl md:text-4xl font-bold tracking-tight transition-all duration-500 ${
                      i === activeIndex ? "text-white" : "text-neutral-600"
                    }`}
                  >
                    {c.city}
                  </h3>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    i === activeIndex
                      ? "max-h-24 opacity-100 mt-2"
                      : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
                    {c.tagline}
                  </span>
                  <p className="text-neutral-300 text-sm font-light mt-1 max-w-sm">
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
