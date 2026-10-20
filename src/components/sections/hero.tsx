"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brackets, Hexagon, Layers, Mail, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/cn";
import photo from "@/assets/heros-photo.png";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 16 },
  },
};

const floatingBadges = [
  { label: "Next.js", icon: Layers, position: "-left-2 top-[12%]", delay: 0 },
  {
    label: "TypeScript",
    icon: Brackets,
    position: "-right-3 top-[40%]",
    delay: 1.1,
  },
  {
    label: "Node.js",
    icon: Hexagon,
    position: "left-[4%] bottom-[10%]",
    delay: 2.2,
  },
] as const;

/**
 * Ambient blurred glow orbs sitting behind the hero content.
 */
function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="animate-drift absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] dark:bg-accent/15" />
      <div className="animate-drift-slow absolute top-40 -left-40 h-96 w-96 rounded-full bg-[#2f5c48] blur-[110px] opacity-70 dark:opacity-50" />
      <div
        className="animate-drift-slow absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[130px]"
        style={{ animationDelay: "-8s" }}
      />
      {/* Subtle Static Programming Code Watermark & Circuit Lines */}
      <div className="absolute inset-0 overflow-hidden font-mono text-xs select-none">
        {/* Subtle static code watermark 1 - Left column */}
        <div className="absolute top-14 left-8 hidden lg:flex flex-col gap-3 text-muted/10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <span className="text-accent/20 font-medium">01  import &#123; NextApp &#125; from &quot;next/server&quot;;</span>
          <span>02  interface RuntimeConfig &#123;</span>
          <span>03    latency: &quot;&lt;15ms&quot;;</span>
          <span>04    typeSafe: true;</span>
          <span className="text-[#34d399]/20 font-semibold">05    turbo: &quot;enabled&quot;;</span>
          <span>06  &#125;</span>
          <span className="text-accent/20">07  export const stack = [&quot;TypeScript&quot;, &quot;React 19&quot;];</span>
          <span>08  await initProductionCluster();</span>
        </div>

        {/* Subtle static code watermark 2 - Right column background */}
        <div className="absolute top-36 right-10 hidden xl:flex flex-col gap-3 text-muted/10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <span className="text-[#34d399]/20">24  const db = await mongo.connect();</span>
          <span>25  const cache = new RedisCache(&#123; ttl: 3600 &#125;);</span>
          <span className="text-accent/20 font-medium">26  return Response.json(&#123; status: 200, ok: true &#125;);</span>
          <span>27  // optimal Core Web Vitals & 60fps</span>
          <span>28  dispatch(&#123; type: &quot;SHIP_TO_PROD&quot; &#125;);</span>
        </div>

        {/* Subtle static glowing syntax circuit lines */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/12 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#34d399]/10 to-transparent" />
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent hidden md:block" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-[#34d399]/8 to-transparent hidden md:block" />

        {/* Subtle static decorative tags */}
        <div className="absolute top-24 left-[18%] hidden lg:flex items-center gap-1.5 rounded-md border border-accent/15 bg-surface/20 px-2.5 py-1 text-[0.65rem] text-accent/35 backdrop-blur-[2px]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
          &lt;FullStackRuntime /&gt;
        </div>
        <div className="absolute bottom-24 left-[28%] hidden lg:flex items-center gap-2 rounded-md border border-[#34d399]/15 bg-surface/20 px-2.5 py-1 text-[0.65rem] text-[#34d399]/35 backdrop-blur-[2px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]/40" />
          &#123; status: 200, latency: &quot;12ms&quot; &#125;
        </div>
      </div>
    </div>
  );
}

/**
 * Circular portrait with an animated Copper orbit ring, soft glow,
 * floating tech badges, and an availability pill.
 */
function HeroPortrait() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[27rem] lg:max-w-[30rem]">
      {/* Soft copper glow behind the portrait */}
      <div
        aria-hidden="true"
        className="animate-pulse-soft absolute inset-8 rounded-full bg-accent/20 blur-3xl"
      />

      {/* Slowly rotating dashed orbit ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_36s_linear_infinite] motion-reduce:animate-none"
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.4"
          strokeWidth="0.35"
          strokeDasharray="1.2 5.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Thin solid ring accent */}
      <div
        aria-hidden="true"
        className="absolute inset-[3.5%] rounded-full ring-1 ring-accent/25"
      />

      {/* Portrait */}
      <div className="absolute inset-[7%] overflow-hidden rounded-full shadow-[0_0_70px_-18px_rgba(196,123,85,0.55)] ring-1 ring-accent/40">
        <Image
          src={photo}
          alt="Portrait of Moniruzzaman Tasrif"
          fill
          priority
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
          placeholder="blur"
        />
      </div>

      {/* Floating tech badges */}
      {floatingBadges.map((badge) => (
        <motion.span
          key={badge.label}
          animate={{ y: [0, -9, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: badge.delay,
          }}
          className={cn(
            "absolute z-10 flex items-center gap-2 rounded-full bg-surface/90 px-3.5 py-2 font-mono text-[0.7rem] tracking-wide text-foreground shadow-lg ring-1 ring-border backdrop-blur-md",
            "hover:text-accent hover:ring-accent/40 transition-colors duration-300",
            badge.position,
          )}
        >
          <badge.icon size={14} className="text-accent" />
          {badge.label}
        </motion.span>
      ))}

      {/* Availability pill */}
      <span className="absolute -bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-surface/90 px-4 py-2 font-mono text-[0.68rem] tracking-wide whitespace-nowrap text-muted shadow-lg ring-1 ring-border backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        Open to new opportunities
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-24"
    >
      <AmbientGlow />

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 font-mono text-[0.7rem] font-medium tracking-[0.25em] text-accent uppercase ring-1 ring-accent/25">
                <Sparkles size={13} className="animate-pulse-soft" />
                Full-Stack Web Developer
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Hi, I&apos;m{" "}
              <span className="font-medium text-foreground">
                Moniruzzaman Tasrif
              </span>
              . I architect fast, modern, and user-focused web applications with
              Next.js, TypeScript, and Node.js.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton>
                <Link
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_35px_-6px_rgba(196,123,85,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Explore Projects
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-foreground ring-1 ring-border transition-all duration-300 hover:text-accent hover:ring-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Mail size={16} />
                  Get in Touch
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.dl
              variants={itemVariants}
              className="flex flex-wrap gap-x-12 gap-y-6 pt-6"
            >
              {[
                { value: "12+", label: "Projects Shipped" },
                { value: "100%", label: "Client Focus" },
                { value: "3+", label: "Years Building" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-semibold text-accent sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="text-xs tracking-wide text-muted uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Portrait column — first on mobile, right on desktop */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.35 }}
            className="order-first lg:order-last"
          >
            <HeroPortrait />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-7 items-start justify-center rounded-full border border-border p-2"
        >
          <span className="h-2 w-1 rounded-full bg-accent" />
        </motion.span>
      </motion.a>
    </section>
  );
}
