import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Moniruzzaman Tasrif's background, full-stack philosophy, and engineering approach with Next.js, TypeScript, Node.js, and MongoDB.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-16">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px] -z-10"
      />

      {/* Breadcrumb Navigation Header */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-2 text-xs font-mono text-muted ring-1 ring-border transition-all hover:bg-surface hover:text-accent hover:ring-accent/40"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to Home</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-mono text-[0.7rem] text-accent ring-1 ring-accent/25">
            <Sparkles size={12} />
            Route: /about
          </span>
        </div>
      </div>

      {/* Main Section */}
      <About />

      {/* Next Page Navigation CTA */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12 border-t border-border pt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-surface/50 p-6 sm:p-8 ring-1 ring-border">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-mono text-xs text-accent">Next Section</span>
            <h3 className="text-xl font-semibold text-foreground">
              Explore Featured Projects
            </h3>
            <p className="text-sm text-muted">
              See production-ready web applications built with TypeScript and Next.js.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(196,123,85,0.4)] shrink-0"
          >
            <span>View Projects</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
