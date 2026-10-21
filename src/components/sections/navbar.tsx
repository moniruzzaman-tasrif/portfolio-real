"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import photo from "@/assets/heros-photo.png";
import { cn } from "@/lib/cn";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-border bg-background/85 backdrop-blur-xl shadow-lg shadow-background/20"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-16 sm:h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand / Logo with User Avatar Image */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/35 transition-all duration-300 group-hover:scale-105 group-hover:ring-accent shadow-[0_0_16px_rgba(196,123,85,0.3)]">
            <Image
              src={photo}
              alt="Moniruzzaman Tasrif"
              fill
              sizes="(max-width: 640px) 40px, 44px"
              className="object-cover object-top"
              priority
            />
            {/* Active status dot */}
            <span
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background"
              title="Available for projects"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent truncate max-w-[140px] min-[390px]:max-w-[190px] sm:max-w-none">
              Moniruzzaman Tasrif
            </span>
            <span className="hidden font-mono text-[0.68rem] text-muted sm:flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/80" />
              Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1.5 lg:flex rounded-full bg-surface/70 px-3 py-1.5 ring-1 ring-border/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  isActive
                    ? "text-accent bg-accent/15 shadow-[0_0_12px_rgba(196,123,85,0.25)] ring-1 ring-accent/35 font-semibold"
                    : "text-muted hover:text-foreground hover:bg-surface/80",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-background transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(196,123,85,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground ring-1 ring-border transition-colors hover:bg-surface-2 hover:text-accent"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            data-lenis-prevent
            className="overflow-y-auto max-h-[calc(100vh-4rem)] border-t border-border bg-background/95 backdrop-blur-2xl lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2 px-4 sm:px-6 py-5">
              {/* Profile card summary in mobile menu */}
              <div className="flex items-center gap-3 rounded-2xl bg-surface/70 p-3 ring-1 ring-border/80 mb-2">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/30">
                  <Image
                    src={photo}
                    alt="Moniruzzaman Tasrif"
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    Moniruzzaman Tasrif
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available for new projects
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-accent/15 text-accent font-semibold ring-1 ring-accent/35"
                          : "text-foreground hover:bg-surface hover:text-accent",
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="flex items-center gap-1 text-xs font-mono text-accent">
                          <Sparkles size={12} />
                          Active
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-3">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-background transition-all hover:bg-accent/90"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
