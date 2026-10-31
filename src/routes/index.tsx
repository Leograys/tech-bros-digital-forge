import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { WhatWeDo } from "@/components/landing/WhatWeDo";
import { Services } from "@/components/landing/Services";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

const META_TITLE = "Tech Bros | Building What's Next";
const META_DESCRIPTION =
  "Tech Bros turns bold ideas into digital reality — websites, web applications, UI/UX design, AI-powered solutions and technical consulting, built with creativity and modern technology.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESCRIPTION },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
