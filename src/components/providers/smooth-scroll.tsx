"use client";

import { ReactLenis } from "lenis/react";

/**
 * Lenis smooth scrolling wired to the whole document (root).
 * `anchors: true` makes in-page `#section` links scroll through Lenis
 * (with an offset for the fixed navbar).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -80 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
