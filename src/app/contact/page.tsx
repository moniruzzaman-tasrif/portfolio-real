import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description:
    "Reach out to Moniruzzaman Tasrif for full-stack engineering roles, freelance opportunities, or technical inquiries.",
};

export default function ContactPage() {
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
            Route: /contact
          </span>
        </div>
      </div>

      {/* Main Section */}
      <Contact />
    </div>
  );
}
