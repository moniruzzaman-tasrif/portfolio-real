import type { StaticImageData } from "next/image";
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
import fitlogImg from "@/assets/fitlog.png";
import bazarImg from "@/assets/bazar.png";
import devstackImg from "@/assets/divstack.png";

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
  image?: StaticImageData;
};

/** Featured projects */
export const projects: Project[] = [
  {
    title: "FitLog",
    tagline: "Fitness Tracking Application",
    description:
      "A fitness tracking application for recording workouts, exploring exercises, and monitoring fitness progress.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "DaisyUI"],
    liveUrl: "https://fitlog-theta-lyart.vercel.app/",
    repoUrl: "https://github.com/moniruzzaman-tasrif/fitlog",
    gradient: "from-[#C47B55]/40 via-[#1D3028] to-[#101C18]",
    icon: Terminal,
    image: fitlogImg,
  },
  {
    title: "BazarDor",
    tagline: "E-Commerce Platform",
    description:
      "An e-commerce platform designed to provide a convenient online shopping experience with product discovery and category browsing.",
    tech: ["Next.js", "React", "TypeScript", "MongoDB", "Better Auth", "Tailwind CSS"],
    liveUrl: "https://bazar-one-jade.vercel.app/",
    repoUrl: "https://github.com/moniruzzaman-tasrif/BazarDor",
    gradient: "from-[#2f5c48]/60 via-[#1D3028] to-[#101C18]",
    icon: Blocks,
    image: bazarImg,
  },
  {
    title: "Dev Stack",
    tagline: "Developer Resource Platform",
    description:
      "A developer-focused platform for presenting programming technologies, development tools, and technical resources.",
    tech: ["Vite", "React", "TypeScript", "Tailwind CSS", "DaisyUI"],
    liveUrl: "https://dev-stack-lac.vercel.app/",
    repoUrl: "https://github.com/moniruzzaman-tasrif/dev-stack",
    gradient: "from-[#8a5a3c]/40 via-[#1D3028] to-[#101C18]",
    icon: Layers,
    image: devstackImg,
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
