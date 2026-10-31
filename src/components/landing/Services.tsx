import {
  AppWindow,
  Bot,
  Globe,
  MessagesSquare,
  PenTool,
  Smartphone,
} from "lucide-react";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Modern, responsive websites built to represent brands, communicate value, and deliver excellent user experiences.",
  },
  {
    icon: AppWindow,
    title: "Web Application Development",
    description:
      "Interactive web applications designed to support business operations, user engagement, and digital services.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Clean, intuitive interfaces and user experiences that make digital products easier and more enjoyable to use.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly Digital Solutions",
    description:
      "Digital experiences optimized for smartphones, tablets, and desktop devices.",
  },
  {
    icon: Bot,
    title: "AI-Powered Solutions",
    description:
      "Explore practical ways to use AI tools and automation to improve digital workflows and product experiences.",
  },
  {
    icon: MessagesSquare,
    title: "Technical Support and Consultation",
    description:
      "Practical technical guidance to help individuals and businesses understand challenges and identify suitable solutions.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_400px_at_50%_0%,rgba(8,123,255,0.09),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
            Our Services
          </h2>
          <p className="mt-3 text-xl font-semibold text-gradient sm:text-2xl">
            Everything You Need to Go Digital.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From the first concept to the final product, we provide technology services
            designed to help ideas become reality.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 120}>
              <article className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-neon transition-colors group-hover:bg-primary/20">
                  <service.icon size={20} aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
