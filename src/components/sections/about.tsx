"use client";

import { Code2, Database, Rocket, ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const highlights = [
  {
    icon: Code2,
    title: "Type-Safe by Default",
    text: "TypeScript across the stack, from database models to UI props.",
  },
  {
    icon: Rocket,
    title: "Performance Obsessed",
    text: "Core Web Vitals treated as product requirements, not afterthoughts.",
  },
  {
    icon: Database,
    title: "Data-Driven Backends",
    text: "Express and MongoDB schemas designed around real query patterns.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Foundations",
    text: "Session and auth flows built with Better Auth best practices.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32"
    >
      <SectionHeading
        id="about-heading"
        eyebrow="About Me"
        title="Engineering Scalable Web Products with Purpose."
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal delay={0.1} className="flex flex-col gap-5 sm:gap-6">
          <p className="text-sm sm:text-base leading-relaxed text-muted lg:text-lg">
            I&apos;m a full-stack developer who treats every application as a
            product with real users, real latency budgets, and real business
            goals. My work centers on engineering{" "}
            <span className="font-medium text-foreground">
              user-centric, high-performance web applications
            </span>{" "}
            that hold up under production load — not just demos that look good
            in a screenshot.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-muted lg:text-lg">
            On the frontend I build with{" "}
            <span className="font-medium text-foreground">
              Next.js, TypeScript, and React
            </span>
            , pairing the App Router&apos;s server-first architecture with
            carefully tuned interaction design. On the backend I reach for{" "}
            <span className="font-medium text-foreground">
              Node.js, Express, and MongoDB
            </span>
            , with <span className="font-medium text-foreground">Better Auth</span>{" "}
            handling sessions and access control. The result is software that
            stays fast, understandable, and maintainable as it grows.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-muted lg:text-lg">
            I care deeply about the details other people feel but rarely
            notice — the 60fps animation, the keyboard-navigable form, the
            query that returns in milliseconds. That discipline is what turns
            a codebase into a product people trust.
          </p>

          <RevealGroup className="mt-2 sm:mt-4 grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            {highlights.map((item) => (
              <RevealItem
                key={item.title}
                className="group rounded-2xl bg-surface p-4 sm:p-5 ring-1 ring-border transition-all duration-300 hover:ring-accent/40"
              >
                <item.icon
                  size={19}
                  className="mb-2.5 text-accent transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted">{item.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        {/* Code-window visual — only sticky on desktop (lg:), clean wrap on mobile */}
        <Reveal delay={0.15}>
          <div className="lg:sticky lg:top-28 overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
            <div className="flex items-center gap-2 border-b border-border px-4 sm:px-5 py-3.5 sm:py-4">
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2.5 font-mono text-[0.72rem] sm:text-xs text-muted">
                engineering-mindset.ts
              </span>
            </div>
            <pre className="overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-[0.8rem] leading-relaxed whitespace-pre-wrap sm:whitespace-pre break-words">
              <code>
                <span className="text-[#8fa8f7]">const</span>{" "}
                <span className="text-accent">engineer</span> = &#123;{"\n"}
                {"  "}<span className="text-[#8fa8f7]">approach</span>:{" "}
                <span className="text-[#a5d6a7]">&quot;user-centric&quot;</span>,{"\n"}
                {"  "}<span className="text-[#8fa8f7]">stack</span>: [&#10;
                {"    "}<span className="text-[#a5d6a7]">&quot;Next.js&quot;</span>,&#10;
                {"    "}<span className="text-[#a5d6a7]">&quot;TypeScript&quot;</span>,&#10;
                {"    "}<span className="text-[#a5d6a7]">&quot;Node.js&quot;</span>,&#10;
                {"  "}],{"\n"}
                {"  "}<span className="text-[#8fa8f7]">priority</span>:{" "}
                <span className="text-[#a5d6a7]">&quot;performance&quot;</span>,{"\n"}
                {"  "}<span className="text-[#8fa8f7]">shipped</span>:{" "}
                <span className="text-[#f0a868]">true</span>,{"\n"}
                &#125;;{"\n\n"}
                <span className="text-muted">
                  // built for real-world impact
                </span>
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
