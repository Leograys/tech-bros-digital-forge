import { Sparkles } from "lucide-react";
import mascot from "@/assets/techbros-mascot.png";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36">
      <div aria-hidden className="glow-spot pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-neon">
            <Sparkles size={14} aria-hidden />
            YOUR IDEAS. OUR TECHNOLOGY.
          </p>

          <h1 className="mt-6 font-display text-6xl uppercase leading-[0.92] tracking-wide sm:text-7xl lg:text-8xl">
            We Build{" "}
            <span className="text-gradient inline-block -skew-x-6">What&apos;s Next.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            From bold ideas to digital experiences, Tech Bros brings creativity and
            technology together to build solutions that move you forward.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="btn-primary px-7 py-3.5 text-base">
              Let&apos;s Build Together
            </a>
            <a href="#services" className="btn-outline px-7 py-3.5 text-base">
              Explore Our Services
            </a>
          </div>

          <p className="mt-7 text-xs font-semibold tracking-[0.35em] text-muted-foreground/80">
            TECHNOLOGY &bull; CREATIVITY &bull; INNOVATION
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="animate-pulse-glow absolute inset-0 m-auto h-2/3 w-2/3 rounded-full bg-secondary/30 blur-3xl"
          />
          <img
            src={mascot}
            alt="The Tech Bros mascot — a friendly white and blue robot waving hello"
            width={1024}
            height={1024}
            className="mascot-glow animate-float relative w-full"
            fetchPriority="high"
          />
          <div
            aria-hidden
            className="animate-float-slow absolute right-2 top-6 h-3 w-3 rounded-full bg-neon shadow-glow sm:h-4 sm:w-4"
          />
          <div
            aria-hidden
            className="animate-float-slow absolute bottom-10 left-2 h-2 w-2 rounded-full bg-primary shadow-glow"
          />
        </div>
      </div>
    </section>
  );
}
