"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects } from "@/lib/data";

/**
 * Decorative preview panel — a stylized UI mock rendered with
 * pure Tailwind, tinted per-project.
 */
function ProjectPreview({ gradient, icon: Icon }: { gradient: string; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div
      className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
    >
      {/* Programming syntax background backdrop */}
      <div className="absolute inset-0 overflow-hidden select-none p-3 font-mono text-[0.62rem] leading-tight text-foreground/15 opacity-60">
        <div className="flex flex-col gap-1">
          <span>01  // production-grade module</span>
          <span>02  const app = new Service();</span>
          <span>03  await app.mount(&#123; mode: &quot;edge&quot; &#125;);</span>
          <span>04  return 200;</span>
        </div>
        {/* Subtle decorative code brackets */}
        <span className="absolute bottom-2 right-3 text-lg font-bold text-accent/25">&lt;/&gt;</span>
        <span className="absolute top-3 right-6 text-sm font-semibold text-[#34d399]/20">&#123; &#125;</span>
      </div>
      <Icon
        size={44}
        className="relative text-foreground/80 drop-shadow-[0_4px_20px_rgba(196,123,85,0.45)]"
      />
      {/* Fake browser chrome bars */}
      <div className="absolute top-4 left-4 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-foreground/25" />
        <span className="h-2 w-2 rounded-full bg-foreground/25" />
        <span className="h-2 w-2 rounded-full bg-foreground/25" />
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <SectionHeading
        id="projects-heading"
        eyebrow="Featured Projects"
        title=""
        description="Three builds that show the range — SaaS dashboards, commerce, and real-time collaboration."
      />

      <RevealGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <RevealItem key={project.title} className="h-full">
            <TiltCard className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                <ProjectPreview
                  gradient={project.gradient}
                  icon={project.icon}
                />

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="font-mono text-[0.68rem] tracking-[0.2em] text-accent uppercase">
                      {project.tagline}
                    </p>
                    <h3 className="mt-1.5 text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-background px-3 py-1 font-mono text-[0.68rem] text-muted ring-1 ring-border"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-2 pt-4">
                    <Link
                      href={project.liveUrl}
                      className="group/live inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-background transition-all duration-300 hover:shadow-[0_0_25px_-6px_rgba(196,123,85,0.75)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Live Demo
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      href={project.repoUrl}
                      aria-label={`${project.title} on GitHub`}
                      className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-background text-muted ring-1 ring-border transition-all duration-300 hover:text-accent hover:ring-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <GithubIcon size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
