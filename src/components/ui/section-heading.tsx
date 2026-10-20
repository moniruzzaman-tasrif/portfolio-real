import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Shared section header: Copper eyebrow label + headline + description.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        centered && "items-center text-center",
        className,
      )}
    >
      <p className="font-mono text-xs font-medium tracking-[0.3em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
