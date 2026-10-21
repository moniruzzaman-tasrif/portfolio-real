"use client";

import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups, techStack } from "@/lib/data";

function TechBadge({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <span className="group flex items-center gap-2.5 rounded-full bg-surface px-5 py-3 text-sm font-medium ring-1 ring-border transition-all duration-300 hover:bg-surface-2 hover:text-accent hover:ring-accent/40">
      <Icon size={17} className="shrink-0 text-accent" />
      {name}
    </span>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-24 border-y border-border bg-surface/40 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="skills-heading"
          title="Skills"
          align="center"
        />
      </div>

      {/* Infinite tech marquee (two rows, opposite directions) */}
      <div className="flex flex-col gap-4">
        <Reveal>
          <Marquee duration={50}>
            {techStack.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </Marquee>
        </Reveal>
        <Reveal delay={0.15}>
          <Marquee duration={65}>
            {[...techStack].reverse().map((tech) => (
              <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </Marquee>
        </Reveal>
      </div>

      {/* Grouped skill cards */}
      <div className="mx-auto mt-12 sm:mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <RevealItem
              key={group.title}
              className="group flex flex-col gap-5 rounded-2xl bg-background p-5 sm:p-7 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:ring-accent/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25 transition-all duration-300 group-hover:bg-accent group-hover:text-background">
                  <group.icon size={19} />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {group.description}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-surface px-3 py-1.5 font-mono text-[0.7rem] tracking-wide text-muted ring-1 ring-border transition-colors duration-300 group-hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
