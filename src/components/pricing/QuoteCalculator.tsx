"use client";

import { useMemo, useState } from "react";
import { DEFAULT_MAINTENANCE_ID, MAINTENANCE_PLANS, PRICING_NOTICE } from "@/data/pricing";
import { buildQuoteMessage, calculateQuote } from "@/lib/pricing";
import { formatMXN } from "@/lib/money";
import { whatsappUrl } from "@/lib/whatsapp";
import { PricingCards } from "@/components/pricing/PricingCards";
import { Button, ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface QuoteCalculatorProps {
  initialPackageId?: string;
  initialMaintenanceId?: string | null;
  className?: string;
  showCards?: boolean;
}

export function QuoteCalculator({
  initialPackageId = "profesional",
  initialMaintenanceId = DEFAULT_MAINTENANCE_ID,
  className,
  showCards = true,
}: QuoteCalculatorProps) {
  const [packageId, setPackageId] = useState(initialPackageId);
  const [maintenanceId, setMaintenanceId] = useState<string | null>(
    initialMaintenanceId,
  );
  const [copied, setCopied] = useState(false);

  const quote = useMemo(
    () => calculateQuote({ packageId, maintenanceId }),
    [packageId, maintenanceId],
  );

  const summary = useMemo(() => buildQuoteMessage(quote), [quote]);
  const CheckIcon = uiIcons.checkCircle;
  const CopyIcon = uiIcons.copy;
  const ArrowIcon = uiIcons.arrowUpRight;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("grid gap-8", className)}>
      {showCards ? (
        <div>
          <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-forest/45">
            Paso 1 · Paquete de desarrollo
          </p>
          <PricingCards
            className="mt-4"
            selectedId={packageId}
            onSelect={setPackageId}
          />
        </div>
      ) : null}

      <div>
        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-forest/45">
          {showCards ? "Paso 2 · " : ""}Mantenimiento mensual
        </p>
        <fieldset className="mt-4 grid gap-3 sm:grid-cols-3">
          <legend className="sr-only">Selecciona un plan de mantenimiento</legend>
          {MAINTENANCE_PLANS.map((plan) => {
            const checked = maintenanceId === plan.id;
            return (
              <label
                key={plan.id}
                className={cn(
                  "cursor-pointer rounded-2xl border p-4 transition-colors",
                  checked
                    ? "border-forest/45 bg-beige/50"
                    : "border-forest/12 bg-warm-white hover:border-forest/25",
                )}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="maintenance"
                    value={plan.id}
                    checked={checked}
                    onChange={() => setMaintenanceId(plan.id)}
                    className="h-3.5 w-3.5 accent-forest"
                  />
                  <span className="font-serif text-lg text-forest">{plan.name}</span>
                </span>
                <span className="mt-2 block font-serif text-xl text-forest">
                  {formatMXN(plan.priceCents)}
                  <span className="ml-1 text-[0.625rem] font-sans uppercase tracking-[0.14em] text-soft-black/45">
                    / mes
                  </span>
                </span>
                <span className="mt-2 block text-[0.6875rem] leading-5 text-soft-black/55">
                  {plan.summary}
                </span>
              </label>
            );
          })}
          <label
            className={cn(
              "cursor-pointer rounded-2xl border p-4 transition-colors sm:col-span-3",
              maintenanceId === null
                ? "border-forest/45 bg-beige/50"
                : "border-forest/12 bg-warm-white hover:border-forest/25",
            )}
          >
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="maintenance"
                value="none"
                checked={maintenanceId === null}
                onChange={() => setMaintenanceId(null)}
                className="h-3.5 w-3.5 accent-forest"
              />
              <span className="text-xs text-soft-black/70">
                Sin mantenimiento mensual
              </span>
            </span>
          </label>
        </fieldset>
      </div>

      <div className="rounded-3xl border border-forest/12 bg-forest p-6 text-warm-white sm:p-8">
        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
          Resumen de tu cotización
        </p>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/45">
              Desarrollo
            </p>
            <p className="mt-1 font-serif text-3xl text-warm-white">
              {quote.isFromPrice ? "Desde " : ""}
              {formatMXN(quote.developmentCents)}
            </p>
            <p className="mt-1 text-[0.6875rem] text-warm-white/50">
              Paquete {quote.package.name}
            </p>
          </div>
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/45">
              Mantenimiento
            </p>
            <p className="mt-1 font-serif text-3xl text-warm-white">
              {quote.maintenance ? formatMXN(quote.monthlyCents) : "—"}
            </p>
            <p className="mt-1 text-[0.6875rem] text-warm-white/50">
              {quote.maintenance ? `${quote.maintenance.name} / mes` : "No incluido"}
            </p>
          </div>
        </div>

        <div className="mt-7 border-t border-warm-white/12 pt-5">
          <p className="text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/45">
            Plan de pagos
          </p>
          <ul className="mt-3 space-y-2">
            {quote.stages.map((stage) => (
              <li
                key={stage.id}
                className="flex items-center justify-between gap-4 border-b border-warm-white/8 pb-2 text-sm"
              >
                <span className="text-warm-white/70">{stage.label}</span>
                <span className="font-medium text-warm-white">
                  {formatMXN(stage.amountCents)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-start gap-2.5 text-[0.6875rem] leading-5 text-warm-white/55">
          <CheckIcon size={15} className="mt-0.5 shrink-0 text-gold/80" aria-hidden="true" />
          Tiempo estimado: {quote.deliveryLabel}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="gold" size="md" onClick={handleCopy}>
            <CopyIcon size={15} aria-hidden="true" />
            {copied ? "Resumen copiado" : "Copiar resumen"}
          </Button>
          <ButtonLink
            href={whatsappUrl(summary)}
            external
            variant="outline-light"
            size="md"
          >
            Enviar por WhatsApp
            <ArrowIcon size={15} aria-hidden="true" />
          </ButtonLink>
        </div>

        <p
          className="mt-5 text-[0.625rem] leading-5 text-warm-white/35"
          aria-live="polite"
        >
          {copied ? "Resumen copiado al portapapeles. " : ""}
          {PRICING_NOTICE}
        </p>
      </div>
    </div>
  );
}
