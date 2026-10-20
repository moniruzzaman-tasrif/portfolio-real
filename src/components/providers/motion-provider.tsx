"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global Framer Motion settings — respects the user's OS-level
 * "reduce motion" preference across every animation in the app.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
