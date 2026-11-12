import type { ReactNode } from "react";
import { Botanical } from "@/components/ui/Botanical";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-forest pb-16 pt-32 text-warm-white sm:pb-20 sm:pt-36",
        className,
      )}
    >
      <div className="grain absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(199,166,106,0.12),transparent_45%),radial-gradient(ellipse_at_85%_80%,rgba(77,169,44,0.08),transparent_40%)]"
        aria-hidden="true"
      />
      <Botanical
        variant="arc"
        className="absolute -right-24 top-6 h-[28rem] w-[28rem] text-warm-white/[0.06]"
      />
      <div className="container-editorial relative">
        <div
          className={cn(
            "grid gap-10",
            aside && "lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-16",
          )}
        >
          <div>
            <Reveal>
              <span className="eyebrow text-gold">{eyebrow}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.98] tracking-[-0.03em] text-warm-white">
                {title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-sm leading-7 text-warm-white/55 sm:text-[0.9375rem] sm:leading-8">
                {description}
              </p>
            </Reveal>
            {children ? <Reveal delay={0.22}>{children}</Reveal> : null}
          </div>
          {aside ? <div className="hidden lg:block">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
