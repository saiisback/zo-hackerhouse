"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { HyperText } from "@/components/ui/hyper-text";
import { MissionHouses } from "@/components/mission-houses";

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
          <video
            autoPlay
            className="w-full h-full object-cover opacity-60"
            loop
            muted
            playsInline
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-full"></div>
        </div>
        <BlurFade inView delay={0.2} direction="up">
        <div className="relative z-10 text-center px-6 max-w-5xl pt-32">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex -space-x-3">
              <Image
                className="w-8 h-8 rounded-full border border-black object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMimYLvea0PIV8kuhU4AhaqOopeKL5tFK7L62tDhtEjpqPHrHw-NHQ7aCnEPFalRf_nlBCmNPC4wyc-l118EBqUg6YHkxo_KT8siQv6LbbIyTsVBtARfvge9DplA8wn8FDO4DEQQO-C_7srfNdanblbFkVu4yWwhb-mVqIzH8NsOfOHA9vS8vScpb7-MkF55iqsg-afe1J3TYpNdeArAKlTX36ZMVx85hz5SaR2HWcq9Cig42ADH5LAad0wP5y0LpeISpUmIfKV4Y"
                alt="User avatar"
                width={32}
                height={32}
                unoptimized
              />
              <Image
                className="w-8 h-8 rounded-full border border-black object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdTrZU91vmSVxCXaqGjBrcX05KgjGfiNn7klGxpjW0NHYuAX4Qc0UnjZ1szaBEQl10OesvestnRUY-ycfR78NMvQmYu1mId8WYM93Py5RNBEurGPSAV1yElMo7SdetDkZp_yJHIgDGPKnN4x08r-RYOjaUGyD7Xqeha4Ra1JEZa30H0oYLvpoDwVhrGjOy9cIYRrb4e3XT4d3-ZhIYh8Rx7PtMXyUFSBzAnlfUl1jb59E1pu2LGaS5d-U3wY_xHkYkNh41xSi5lmg"
                alt="User avatar"
                width={32}
                height={32}
                unoptimized
              />
              <Image
                className="w-8 h-8 rounded-full border border-black object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5zE6rqwWiy0JsQLwnLWOaaBxUJvRXT4-et6E0qGiCMMqVvZzLnCicgjC0eUhg_Dv1-X9lV3MlJDW-q-rL74XUgRBPksfTO8nwPIDmle0-Qq29Rb88CcVHke_XxumFVba9d_ghhz-9RGABR-MaEv48w6VbfYs_SiarfcwXvURQm6pK6TtQ5oy9pdDLWytHNIMJ9agdiZ-iJFIcV_qC9Q4ITcFM6v1ygjGt7nFcl4xapC4SWmSWVkJ8awAI6-y8Y7Dv-iFpVx9FllQ"
                alt="User avatar"
                width={32}
                height={32}
                unoptimized
              />
            </div>
            <span className="bg-white text-black text-xs font-bold tracking-widest uppercase px-3 py-1">
              7,000+ people already waitlist
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-6 leading-[0.9]">
            The{" "}
            <span className="font-[family-name:var(--font-headline)] italic font-normal">
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

      {/* Hacker House Section */}
      <section className="section-padding px-8 md:px-28 relative lume-section">
        <div className="max-w-7xl mx-auto">
          <BlurFade inView delay={0.1} direction="up">
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-center md:text-left">
            <HyperText
              as="span"
              className="font-light tracking-tight"
              startOnView
              duration={1000}
            >
              {"India's first permanent "}
            </HyperText>
            <HyperText
              as="span"
              className="font-[family-name:var(--font-headline)] italic font-normal tracking-tight"
              startOnView
              duration={1000}
              delay={400}
            >
              hacker house.
            </HyperText>
          </h2>
          </BlurFade>
          <BlurFade inView delay={0.2} direction="up">
          <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-24">
            Founders live together in Bangalore. Monthly cohorts. Build alongside serious peers.
            Plug into curated programming, mentors, and investors. The house doesn&apos;t reset
            when a cohort ends — it compounds.
          </p>
          </BlurFade>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {/* Founder Dinners */}
            <BlurFade inView delay={0.1} direction="up">
            <div className="flex flex-col group cursor-pointer">
              <div className="aspect-square bg-[#141414] rounded-2xl flex items-center justify-center mb-8 overflow-hidden relative border border-white/5">
                <Image
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                  src="/dinner.png"
                  alt="Founder Dinners"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">
                Founder Dinners
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm">
                Monthly. Curated guests. Chef-prepared. No agenda. The conversations that change
                trajectories.
              </p>
            </div>
            </BlurFade>
            {/* Demo Days */}
            <BlurFade inView delay={0.25} direction="up">
            <div className="flex flex-col group cursor-pointer md:mt-12">
              <div className="aspect-square bg-[#141414] rounded-2xl flex items-center justify-center mb-8 overflow-hidden relative border border-white/5">
                <Image
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                  src="/demoday.png"
                  alt="Demo Days"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Demo Days</h3>
              <p className="text-neutral-500 leading-relaxed text-sm">
                Ship something. Show it. Peers, mentors, investors in the room. Every month.
              </p>
            </div>
            </BlurFade>
            {/* Mentor Sessions */}
            <BlurFade inView delay={0.4} direction="up">
            <div className="flex flex-col group cursor-pointer md:mt-24">
              <div className="aspect-square bg-[#141414] rounded-2xl flex items-center justify-center mb-8 overflow-hidden relative border border-white/5">
                <Image
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                  src="/mentor.png"
                  alt="Mentor Sessions"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="eager"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">
                Mentor Sessions
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm">
                Weekly access to founders who&apos;ve built it, operators who&apos;ve scaled it,
                investors who&apos;ve funded it.
              </p>
            </div>
            </BlurFade>
          </div>
          <BlurFade inView delay={0.2} direction="up">
          <div className="mt-32 border-t border-white/5 pt-12 text-center md:text-right">
            <p className="text-neutral-500 font-[family-name:var(--font-headline)] italic text-2xl">
              &ldquo;The house doesn&apos;t reset — it compounds.&rdquo;
            </p>
          </div>
          </BlurFade>
        </div>
      </section>

      {/* Mission + Houses Section */}
      <section className="relative bg-surface-container-lowest">
        {/* Mobile: stacked layout */}
        <div className="md:hidden section-padding px-8">
          <BlurFade inView delay={0.1} direction="up">
          <div className="w-64 h-64 mx-auto mb-12 rounded-full overflow-hidden border border-white/10 bg-white flex items-center justify-center">
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
          <div className="word-reveal text-3xl font-medium leading-[1.3] text-left mb-12">
            <p>
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
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
                alt="Whitefield House"
                fill
                sizes="85vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Property 01</span>
                <h3 className="text-3xl font-bold tracking-tight mt-2 mb-3">Whitefield</h3>
                <p className="text-white/60 text-base font-light leading-relaxed">
                  3-storey villa. Pool. Studio. 20 beds.{" "}
                  <span className="text-white font-[family-name:var(--font-headline)] italic">The compound.</span>
                </p>
              </div>
            </div>
            <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
                alt="Koramangala House"
                fill
                sizes="85vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Property 02</span>
                <h3 className="text-3xl font-bold tracking-tight mt-2 mb-3">Koramangala</h3>
                <p className="text-white/60 text-base font-light leading-relaxed">
                  13th-floor penthouse. City views. 14 beds.{" "}
                  <span className="text-white font-[family-name:var(--font-headline)] italic">The stage.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: mission left sticky + houses scroll right */}
        <div className="hidden md:block">
          <MissionHouses />
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding px-8 md:px-28">
        <div className="max-w-7xl mx-auto">
          <BlurFade inView delay={0.1} direction="up">
          <div className="mb-20">
            <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
              Track Record
            </span>
            <h2 className="text-4xl md:text-6xl font-light mt-4 tracking-tight">
              <HyperText
                as="span"
                className="font-light tracking-tight"
                startOnView
                duration={800}
              >
                {"We've done this before."}
              </HyperText>
              <br />
              <span className="font-[family-name:var(--font-headline)] italic font-normal">
                Dubai. Singapore. San Francisco.
              </span>
              <br />
              <HyperText
                as="span"
                className="font-light tracking-tight"
                startOnView
                duration={800}
                delay={600}
              >
                {"Now it's India's turn."}
              </HyperText>
            </h2>
            <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-3xl mt-6">
              Zo has run pop-up hacker houses and founder activations across three continents. The
              Civilisation is what happens when you make it permanent.
            </p>
          </div>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                city: "Dubai",
                tagline: "Pop-up Hacker House",
                description: "Three-week builder sprint in the desert. High-signal founders, zero distractions.",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
                flag: "🇦🇪",
              },
              {
                city: "Singapore",
                tagline: "Founder Activation",
                description: "TOKEN2049 side event. 200+ founders. The room that launched three companies.",
                image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
                flag: "🇸🇬",
              },
              {
                city: "San Francisco",
                tagline: "Builder Residency",
                description: "Two weeks in SOMA. Demo day with top-tier VCs. Six deals closed on-site.",
                image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
                flag: "🇺🇸",
              },
            ].map((card, i) => (
              <BlurFade key={card.city} inView delay={0.15 * (i + 1)} direction="up">
              <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-white/20 transition-all duration-500">
                <Image
                  src={card.image}
                  alt={card.city}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{card.city}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
              </BlurFade>
            ))}
          </div>
         
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[716px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
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
              className="font-[family-name:var(--font-headline)] italic font-normal tracking-tight"
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
          <p className="text-neutral-400 text-lg font-light mb-10">
            Join the waitlist. Be part of what&apos;s next.
          </p>
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
