"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { socialLinks } from "@/lib/data";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <Link href="#home" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 font-mono text-xs font-bold text-accent ring-1 ring-accent/30">
            MT
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Moniruzzaman Tasrif
          </span>
        </Link>

        <p className="flex items-center gap-1.5 font-mono text-xs text-muted">
          © {year} — Built with
          <Heart size={12} className="text-accent" fill="currentColor" />
          , Next.js & Framer Motion
        </p>

        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={social.name}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-300 hover:text-accent"
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
