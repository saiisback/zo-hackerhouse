"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { HyperText } from "@/components/ui/hyper-text";
import { TextReveal } from "@/components/ui/text-reveal";
import { MissionHouses } from "@/components/mission-houses";
import { AsciiEffect } from "@/components/ascii-effect";
import { AsciiImageOverlay } from "@/components/ascii-image-overlay";
import { GoldenAsciiBackground } from "@/components/golden-ascii-background";
import { PretextParagraph } from "@/components/ui/pretext-paragraph";
import { TrackRecordScroll } from "@/components/track-record-scroll";
import { ProgramAccordion } from "@/components/program-accordion";
import { Village } from "@/components/village";

export default function Home() {
  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 md:px-28 py-6 bg-transparent flex justify-between items-center max-w-full">
        <span className="text-xl font-black tracking-tighter text-white font-serif italic">
          Civilisation
        </span>
        <nav className="hidden md:flex items-center gap-6">
          <a
            className="text-neutral-400 font-medium hover:text-white transition-colors duration-300 text-[13px] tracking-wide uppercase"
            href="#"
          >
            Home
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            className="text-neutral-400 font-medium hover:text-white transition-colors duration-300 text-[13px] tracking-wide uppercase"
            href="#"
          >
            How It Works
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            className="text-neutral-400 font-medium hover:text-white transition-colors duration-300 text-[13px] tracking-wide uppercase"
            href="#"
          >
            Philosophy
          </a>
          <span className="text-neutral-700">&bull;</span>
          <a
            className="text-neutral-400 font-medium hover:text-white transition-colors duration-300 text-[13px] tracking-wide uppercase"
            href="#"
          >
            Use Cases
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.svg"
            alt="Hero background"
            fill
            className="object-cover opacity-50"
            sizes="100vw"
          />
        </div>
        <BlurFade inView delay={0.2} direction="up">
        <div className="relative z-10 text-center px-6 max-w-5xl pt-32">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex -space-x-3">
              <Image
                className="w-8 h-8 rounded-full border border-black object-cover"
                src="/pfp1.webp"
                alt="User avatar"
                width={32}
                height={32}
              />
              <Image
                className="w-8 h-8 rounded-full border border-black object-cover"
                src="/pfp2.webp"
                alt="User avatar"
                width={32}
                height={32}
              />
              <Image
                className="w-8 h-8 rounded-full border border-black object-cover"
                src="/pfp3.webp"
                alt="User avatar"
                width={32}
                height={32}
              />
            </div>
            <span className="bg-white text-black text-xs font-bold tracking-widest uppercase px-3 py-1">
              You&apos;re the 4,857th visitor
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-6 leading-[0.9] text-center hero-text-shadow">
            The{" "}
            <span className="font-[family-name:var(--font-headline)] italic font-normal shiny-gold">
              Civilisation
            </span>{" "}
            Is Recruiting
          </h1>
          <form className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1.5 flex items-center max-w-md mx-auto w-full group focus-within:ring-2 ring-white/40 transition-all">
            <input
              className="bg-transparent border-none focus:ring-0 text-white placeholder-white/50 px-6 w-full text-sm"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="bg-white text-black font-bold text-[11px] tracking-widest uppercase rounded-full px-8 py-3 hover:scale-[1.03] active:scale-95 transition-all duration-300"
              type="submit"
            >
              waitlist
            </button>
          </form>
        </div>
        </BlurFade>
      </section>

      {/* Hacker House Section - sticky scroll with accordion */}
      <ProgramAccordion />

      <section className="section-padding px-8 md:px-28">
        <div className="max-w-7xl mx-auto">
          <BlurFade inView delay={0.2} direction="up">
          <div className="border-t border-white/5 pt-12 text-center md:text-right">
            <p className="shiny-gold font-[family-name:var(--font-headline)] italic text-2xl opacity-60">
              &ldquo;The house doesn&apos;t reset — it compounds.&rdquo;
            </p>
          </div>
          </BlurFade>
        </div>
      </section>

      {/* The Village Section */}
      <Village />

      {/* Mission Text Reveal Section */}
      <section className="relative bg-surface-container-lowest">
        <TextReveal
          segments={[
            { text: "India's permanent" },
            { text: "founder house", className: "font-[family-name:var(--font-headline)] italic shiny-gold" },
            { text: "— where" },
            { text: "builders", className: "font-[family-name:var(--font-headline)] italic shiny-gold" },
            { text: "live, collaborate, and compound. Two properties. 450+ events. 2,700+ founders. 12+ programs." },
          ]}
          textClassName="text-3xl md:text-5xl font-medium leading-[1.3]"
          header={
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-10 flex items-center justify-center">
              <Image
                src="/globe.webp"
                className="w-full h-full object-contain"
                alt="Globe"
                width={384}
                height={384}
              />
            </div>
          }
        />
      </section>

      {/* Houses Section */}
      <section className="relative bg-surface-container-lowest">
        {/* Mobile: stacked layout */}
        <div className="md:hidden section-padding px-8">
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
              <Image
                src="/zo-blr.webp"
                alt="Whitefield House"
                fill
                sizes="85vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Property 01</span>
                <h3 className="text-3xl font-bold tracking-tight mt-2 mb-3">Whitefield</h3>
                <p className="text-white/60 text-base font-light leading-relaxed">
                  3-storey villa. Pool. Studio. 20 beds.{" "}
                  <span className="shiny-gold font-[family-name:var(--font-headline)] italic">The compound.</span>
                </p>
              </div>
            </div>
            <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
              <Image
                src="/zo-krm.webp"
                alt="Koramangala House"
                fill
                sizes="85vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Property 02</span>
                <h3 className="text-3xl font-bold tracking-tight mt-2 mb-3">Koramangala</h3>
                <p className="text-white/60 text-base font-light leading-relaxed">
                  13th-floor penthouse. City views. 14 beds.{" "}
                  <span className="shiny-gold font-[family-name:var(--font-headline)] italic">The stage.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: houses scroll horizontally */}
        <div className="hidden md:block">
          <MissionHouses />
        </div>
      </section>

      {/* Track Record - Scroll Section */}
      <TrackRecordScroll />

      {/* CTA Section */}
      <section className="relative min-h-[716px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.svg"
            alt="Background"
            fill
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <BlurFade inView delay={0.1} direction="up">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
            <HyperText
              as="span"
              className="font-medium tracking-tight"
              startOnView
              duration={800}
            >
              {"The "}
            </HyperText>
            <HyperText
              as="span"
              className="font-[family-name:var(--font-headline)] italic font-normal tracking-tight shiny-gold"
              startOnView
              duration={800}
              delay={300}
            >
              Civilisation
            </HyperText>
            <HyperText
              as="span"
              className="font-medium tracking-tight"
              startOnView
              duration={800}
              delay={500}
            >
              {" Is Waiting"}
            </HyperText>
          </h2>
          <PretextParagraph
            className="text-neutral-400 text-lg font-light mb-10"
            font="300 18px Inter, sans-serif"
            lineHeight={28}
          >
            {"Join the waitlist. Be part of what\u2019s next."}
          </PretextParagraph>
          </BlurFade>
          <BlurFade inView delay={0.25} direction="up">
          <form className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1.5 flex items-center max-w-md mx-auto w-full group focus-within:ring-2 ring-white/40 transition-all">
            <input
              className="bg-transparent border-none focus:ring-0 text-white placeholder-white/50 px-6 w-full text-sm"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="bg-white text-black font-bold text-[11px] tracking-widest uppercase rounded-full px-8 py-3 hover:scale-[1.03] active:scale-95 transition-all duration-300"
              type="submit"
            >
              waitlist
            </button>
          </form>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full border-t border-white/5 pt-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="text-lg font-black text-white italic font-serif">Civilisation</span>
            </div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">
              &copy; 2025 The Civilisation. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <a
              className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-opacity duration-300"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-opacity duration-300"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-opacity duration-300"
              href="#"
            >
              Archive
            </a>
            <a
              className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-opacity duration-300"
              href="#"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
