import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Shared section header: headline with optional eyebrow label and description.
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
        "mb-10 flex flex-col gap-3 md:mb-14",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs font-medium tracking-[0.3em] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="max-w-3xl text-2xl min-[400px]:text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl text-accent"
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
