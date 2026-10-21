"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects, type Project } from "@/lib/data";

/**
 * Decorative preview panel — renders the project screenshot from assets
 * with a dark vignette and browser chrome, or falls back to a stylized UI mock.
 */
function ProjectPreview({ project }: { project: Project }) {
  const { gradient, icon: Icon, image, title } = project;

  return (
    <div
      className={`relative flex h-48 sm:h-52 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={`${title} preview screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay to smoothly transition into the card content */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-black/35 pointer-events-none" />

          {/* Browser chrome header bar */}
          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 backdrop-blur-md ring-1 ring-border/60">
            <span className="h-2 w-2 rounded-full bg-foreground/25" />
            <span className="h-2 w-2 rounded-full bg-foreground/25" />
            <span className="h-2 w-2 rounded-full bg-foreground/25" />
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32"
    >
      <SectionHeading
        id="projects-heading"
        title="Projects"
      />

      <RevealGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <RevealItem key={project.title} className="h-full">
            <TiltCard className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                <ProjectPreview project={project} />

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

                  <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/live inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-3.5 py-2.5 text-xs font-semibold text-background transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_25px_-6px_rgba(196,123,85,0.75)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                      />
                    </a>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/repo inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-background px-3.5 py-2.5 text-xs font-semibold text-foreground ring-1 ring-border transition-all duration-300 hover:bg-surface hover:text-accent hover:ring-accent/50 hover:shadow-[0_0_20px_-6px_rgba(196,123,85,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <GithubIcon
                        size={14}
                        className="shrink-0 transition-transform duration-300 group-hover/repo:scale-110"
                      />
                      <span>Code</span>
                    </a>
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
