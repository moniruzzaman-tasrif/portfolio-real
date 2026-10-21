"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  /** Stagger children instead of animating the wrapper as a whole. */
  staggerChildren?: number;
};

/**
 * Spring-animated fade-up that fires once when scrolled into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: Omit<RevealProps, "staggerChildren">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px", amount: 0.1 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 18 },
  },
};

/**
 * Container/child variant pair for staggered spring reveals.
 * Wrap children in `RevealItem`.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20px 0px", amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
