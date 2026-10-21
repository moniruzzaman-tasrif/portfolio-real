import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Full loop duration in seconds. */
  duration?: number;
  /** Pause the loop while the user hovers. */
  pauseOnHover?: boolean;
};

/**
 * Infinite horizontal loop. The track is rendered twice and translated
 * to -50%, so the seam is invisible. Edge fades keep it feeling soft.
 */
export function Marquee({
  children,
  className,
  duration = 45,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center gap-4 pr-4 motion-reduce:animate-none",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
