"use client";

import { DEVELOPMENT_PACKAGES } from "@/data/pricing";
import { formatMXN } from "@/lib/money";
import { buttonStyles } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface PricingCardsProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function PricingCards({ selectedId, onSelect, className }: PricingCardsProps) {
  const CheckIcon = uiIcons.checkCircle;

  return (
    <div className={cn("grid gap-5 lg:grid-cols-3", className)}>
      {DEVELOPMENT_PACKAGES.map((pkg) => {
        const isSelected = selectedId === pkg.id;
        const price =
          pkg.priceCents !== null
            ? formatMXN(pkg.priceCents)
            : `Desde ${formatMXN(pkg.fromCents ?? 0)}`;

        return (
          <article
            key={pkg.id}
            className={cn(
              "flex flex-col rounded-3xl border p-6 transition-colors sm:p-7",
              pkg.isRecommended
                ? "border-gold/50 bg-forest text-warm-white shadow-lift"
                : "border-forest/12 bg-warm-white text-soft-black",
              isSelected && !pkg.isRecommended && "border-forest/40 bg-beige/40",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                className={cn(
                  "font-serif text-2xl",
                  pkg.isRecommended ? "text-warm-white" : "text-forest",
                )}
              >
                {pkg.name}
              </h3>
              {pkg.isRecommended ? (
                <span className="rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[0.5625rem] uppercase tracking-[0.16em] text-gold-light">
                  Recomendado
                </span>
              ) : null}
            </div>

            <p
              className={cn(
                "mt-5 font-serif text-3xl",
                pkg.isRecommended ? "text-gold-light" : "text-forest",
              )}
            >
              {price}
              <span
                className={cn(
                  "ml-1.5 text-xs font-sans uppercase tracking-[0.14em]",
                  pkg.isRecommended ? "text-warm-white/45" : "text-soft-black/45",
                )}
              >
                MXN
              </span>
            </p>

            <p
              className={cn(
                "mt-3 text-xs leading-6",
                pkg.isRecommended ? "text-warm-white/62" : "text-soft-black/55",
              )}
            >
              {pkg.summary}
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {pkg.features.map((feature) => (
                <li
                  key={feature}
                  className={cn(
                    "flex items-start gap-2.5 text-xs leading-5",
                    pkg.isRecommended ? "text-warm-white/70" : "text-soft-black/65",
                  )}
                >
                  <CheckIcon
                    size={15}
                    className={cn(
                      "mt-0.5 shrink-0",
                      pkg.isRecommended ? "text-gold/80" : "text-primary-green",
                    )}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <p
              className={cn(
                "mt-6 text-[0.625rem] leading-5",
                pkg.isRecommended ? "text-warm-white/40" : "text-soft-black/40",
              )}
            >
              {pkg.deliveryLabel}
            </p>

            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(pkg.id)}
                aria-pressed={isSelected}
                className={cn(
                  "mt-5",
                  buttonStyles({
                    variant: pkg.isRecommended ? "gold" : "outline",
                    size: "md",
                    className: "w-full",
                  }),
                )}
              >
                {isSelected ? "Paquete seleccionado" : "Elegir paquete"}
              </button>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
