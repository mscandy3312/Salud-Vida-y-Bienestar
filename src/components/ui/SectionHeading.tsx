import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  level?: 1 | 2 | 3;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  aside?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  level = 2,
  className,
  titleClassName,
  descriptionClassName,
  aside,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const HeadingTag = (level === 1 ? "h1" : level === 2 ? "h2" : "h3") as ElementType;

  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        align === "center" && "items-center text-center",
        aside && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Reveal>
            <span
              className={cn(
                "eyebrow",
                dark ? "text-gold" : "text-forest/60",
              )}
            >
              {eyebrow}
            </span>
          </Reveal>
        ) : null}
        <Reveal delay={0.08}>
          <HeadingTag
            className={cn(
              "mt-5 text-4xl leading-[0.98] sm:text-5xl lg:text-6xl",
              dark ? "text-warm-white" : "text-forest",
              titleClassName,
            )}
          >
            {title}
          </HeadingTag>
        </Reveal>
        {description ? (
          <Reveal delay={0.16}>
            <p
              className={cn(
                "mt-6 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8",
                dark ? "text-warm-white/62" : "text-soft-black/62",
                align === "center" && "mx-auto",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
      {aside ? <Reveal delay={0.2}>{aside}</Reveal> : null}
    </div>
  );
}
