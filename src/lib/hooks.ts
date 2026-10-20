"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const emptyServerSnapshot = () => false;

/**
 * Hydration-safe "mounted" flag via useSyncExternalStore, avoiding
 * the setState-in-effect pattern flagged by react-hooks lint rules.
 * Server snapshot is always false; client snapshot is always true.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    emptyServerSnapshot,
  );
}

/**
 * Reactive media query that reads on the client only
 * (server snapshot falls back to `false`).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => window.matchMedia(query).matches,
    emptyServerSnapshot,
  );
}
