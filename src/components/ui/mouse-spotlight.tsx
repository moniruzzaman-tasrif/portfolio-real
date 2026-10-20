"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useMediaQuery } from "@/lib/hooks";

const SPOTLIGHT_RADIUS = 520;

/**
 * Viewport-wide radial spotlight that trails the cursor on a spring,
 * rendered above the page background but beneath all content.
 */
export function MouseSpotlight() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  const mouseX = useMotionValue(-SPOTLIGHT_RADIUS * 2);
  const mouseY = useMotionValue(-SPOTLIGHT_RADIUS * 2);

  const springConfig = { stiffness: 80, damping: 22, mass: 0.6 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`radial-gradient(${SPOTLIGHT_RADIUS}px circle at ${spotlightX}px ${spotlightY}px, var(--accent-soft), transparent 65%)`;

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ background }}
    />
  );
}
