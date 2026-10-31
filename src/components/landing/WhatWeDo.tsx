import { Code, Palette, TrendingUp } from "lucide-react";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    icon: Code,
    title: "Build",
    description:
      "We transform ideas into functional websites, applications, and digital products designed around real user needs.",
  },
  {
    icon: Palette,
    title: "Create",
    description:
      "We combine creativity and modern design to build engaging digital experiences that communicate your brand effectively.",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description:
      "We help businesses explore new opportunities, improve their digital presence, and build a stronger foundation for growth.",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
            What We Do
          </h2>
          <p className="mt-3 text-xl font-semibold text-gradient sm:text-2xl">
            Turning Ideas Into Digital Reality.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Tech Bros helps individuals, startups, and businesses turn their ideas into
            practical digital experiences through technology, creative thinking, and
            modern development.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 120}>
              <article className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-glow">
                  <feature.icon size={22} aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-2xl uppercase tracking-wide text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
