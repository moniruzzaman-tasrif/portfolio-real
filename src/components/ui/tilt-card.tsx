"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
};

/**
 * 3D perspective tilt card. The card leans toward the cursor and a
 * Copper (#C47B55) radial glow tracks the pointer along the border.
 */
export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 20, mass: 0.4 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Pointer position mapped to percentage coordinates for the glow.
  const glareX = useTransform(rotateY, [-maxTilt, maxTilt], ["15%", "85%"]);
  const glareY = useTransform(rotateX, [-maxTilt, maxTilt], ["15%", "85%"]);

  const copperGlow = useMotionTemplate`radial-gradient(340px circle at ${glareX} ${glareY}, rgba(196, 123, 85, 0.55), transparent 45%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const px = (event.clientX - left) / width - 0.5;
    const py = (event.clientY - top) / height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(-py * maxTilt * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        reducedMotion
          ? undefined
          : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 1000,
            }
      }
      className={cn(
        "group relative rounded-2xl will-change-transform",
        className,
      )}
    >
      {/* Copper glowing border that follows the cursor */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: copperGlow }}
      />
      <div
        className={cn(
          "relative h-full rounded-2xl bg-surface ring-1 ring-border transition-shadow duration-500",
          "group-hover:shadow-[0_0_45px_-12px_rgba(196,123,85,0.45)]",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
