import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Blocks,
  Braces,
  Brackets,
  Code,
  Database,
  GitBranch,
  Hexagon,
  Layers,
  Mail,
  Monitor,
  Palette,
  Server,
  ShieldCheck,
  Terminal,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export type Tech = {
  name: string;
  icon: LucideIcon | typeof GithubIcon;
};

/** Tech stack shown in the infinite marquee. */
export const techStack: Tech[] = [
  { name: "HTML", icon: Code },
  { name: "CSS", icon: Palette },
  { name: "JavaScript", icon: Braces },
  { name: "TypeScript", icon: Brackets },
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Layers },
  { name: "Node.js", icon: Hexagon },
  { name: "Express.js", icon: Terminal },
  { name: "MongoDB", icon: Database },
  { name: "Better Auth", icon: ShieldCheck },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GithubIcon },
];

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
};

/** Skill cards grouped by domain. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Monitor,
    description:
      "Interfaces built with semantic markup, modern CSS and type-safe component architecture.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Backend & DB",
    icon: Server,
    description:
      "REST APIs, data modeling and server logic engineered for reliability under real-world load.",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Mongoose"],
  },
  {
    title: "Tools & Auth",
    icon: Wrench,
    description:
      "The workflow and security layer — version control, sessions, and polished motion design.",
    skills: ["Git", "GitHub", "Better Auth", "Framer Motion", "Tailwind CSS"],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  liveUrl: string;
  repoUrl: string;
  gradient: string;
  icon: LucideIcon;
};

/** Featured projects (placeholders — swap titles, copy and links). */
export const projects: Project[] = [
  {
    title: "Project Alpha",
    tagline: "SaaS Analytics Platform",
    description:
      "A multi-tenant analytics dashboard with real-time charts, role-based access powered by Better Auth, and a fully typed Next.js App Router codebase.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Better Auth"],
    liveUrl: "#",
    repoUrl: "#",
    gradient: "from-[#C47B55]/40 via-[#1D3028] to-[#101C18]",
    icon: Layers,
  },
  {
    title: "Project Beta",
    tagline: "E-Commerce Experience",
    description:
      "A headless storefront with cart state, server-side rendering for SEO, and buttery 60fps interactions built with Framer Motion and Tailwind CSS.",
    tech: ["React", "Next.js", "Express.js", "Framer Motion"],
    liveUrl: "#",
    repoUrl: "#",
    gradient: "from-[#2f5c48]/60 via-[#1D3028] to-[#101C18]",
    icon: Blocks,
  },
  {
    title: "Project Gamma",
    tagline: "Collaboration Suite",
    description:
      "A real-time team workspace with shared documents, optimistic UI updates, and a MongoDB aggregation layer feeding live activity feeds.",
    tech: ["Node.js", "MongoDB", "TypeScript", "WebSockets"],
    liveUrl: "#",
    repoUrl: "#",
    gradient: "from-[#8a5a3c]/40 via-[#1D3028] to-[#101C18]",
    icon: Database,
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/moniruzzaman-tasrif",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/moniruzzaman-tasrif/",
    icon: LinkedinIcon,
  },
  {
    name: "Email",
    href: "mailto:moniruzzamantasrif1@gmail.com",
    icon: Mail,
  },
] as const;
