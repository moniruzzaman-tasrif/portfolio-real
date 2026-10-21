"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  /** How strongly the button is pulled toward the cursor (0–1). */
  strength?: number;
};

/**
 * Magnetic cursor-pull wrapper. The child element eases toward the
 * pointer while hovered and springs back to rest on leave.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const enabled = isFinePointer && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((event.clientX - (left + width / 2)) * strength);
    y.set((event.clientY - (top + height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={enabled ? { x: springX, y: springY } : undefined}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
