"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import photo from "@/assets/heros-photo.png";
import { socialLinks } from "@/lib/data";

const year = new Date().getFullYear();

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:flex-row">
        {/* Brand with User Image */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/35 transition-transform duration-300 group-hover:scale-105 group-hover:ring-accent">
            <Image
              src={photo}
              alt="Moniruzzaman Tasrif"
              fill
              sizes="36px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
              Moniruzzaman Tasrif
            </span>
            <span className="font-mono text-[0.65rem] text-muted">
              Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Quick Route Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted transition-colors hover:text-accent font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
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
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-300 hover:bg-surface hover:text-accent"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
