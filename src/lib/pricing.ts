import {
  DEFAULT_MAINTENANCE_ID,
  DEVELOPMENT_PACKAGES,
  MAINTENANCE_PLANS,
  PAYMENT_SCHEDULE,
  type MaintenancePlan,
  type PricingPackage,
} from "@/data/pricing";
import { DEFAULT_CURRENCY, percentOfCents, sumCents, type Cents } from "@/lib/money";

export function getPackageById(id: string): PricingPackage | undefined {
  return DEVELOPMENT_PACKAGES.find((pkg) => pkg.id === id);
}

export function getMaintenanceById(id: string): MaintenancePlan | undefined {
  return MAINTENANCE_PLANS.find((plan) => plan.id === id);
}

/** Precio de referencia del paquete en centavos (fijo o "desde"). */
export function getBasePriceCents(pkg: PricingPackage): Cents {
  if (pkg.priceCents !== null) return pkg.priceCents;
  if (typeof pkg.fromCents === "number") return pkg.fromCents;
  throw new Error(`El paquete "${pkg.id}" no tiene precio configurado.`);
}

export interface QuoteInput {
  packageId: string;
  maintenanceId?: string | null;
}

export interface QuoteStage {
  id: string;
  label: string;
  percent: number;
  amountCents: Cents;
}

export interface Quote {
  package: PricingPackage;
  maintenance: MaintenancePlan | null;
  /** Importe total del desarrollo en centavos. */
  developmentCents: Cents;
  /** Importe mensual de mantenimiento en centavos (0 si no se elige plan). */
  monthlyCents: Cents;
  /** `true` cuando el precio es "desde" (paquete a medida). */
  isFromPrice: boolean;
  stages: QuoteStage[];
  deliveryLabel: string;
  currency: string;
}

/**
 * Calcula una cotización en centavos enteros.
 * Rechaza entradas no válidas: el precio SIEMPRE proviene de la configuración,
 * nunca del cliente.
 */
export function calculateQuote(input: QuoteInput): Quote {
  const pkg = getPackageById(input.packageId);
  if (!pkg) {
    throw new Error(`Paquete de desarrollo desconocido: "${input.packageId}".`);
  }

  const maintenanceId =
    input.maintenanceId === undefined ? DEFAULT_MAINTENANCE_ID : input.maintenanceId;

  const maintenance = maintenanceId ? getMaintenanceById(maintenanceId) ?? null : null;
  if (maintenanceId && !maintenance) {
    throw new Error(`Plan de mantenimiento desconocido: "${maintenanceId}".`);
  }

  const developmentCents = getBasePriceCents(pkg);

  const stages: QuoteStage[] = PAYMENT_SCHEDULE.map((stage) => ({
    id: stage.id,
    label: stage.label,
    percent: stage.percent,
    amountCents: percentOfCents(developmentCents, stage.percent),
  }));

  const stageTotal = sumCents(...stages.map((stage) => stage.amountCents));
  if (stageTotal !== developmentCents) {
    // Ajuste de redondeo: la última etapa absorbe la diferencia de centavos.
    const last = stages[stages.length - 1];
    stages[stages.length - 1] = {
      ...last,
      amountCents: last.amountCents + (developmentCents - stageTotal),
    };
  }

  return {
    package: pkg,
    maintenance,
    developmentCents,
    monthlyCents: maintenance?.priceCents ?? 0,
    isFromPrice: pkg.priceCents === null,
    stages,
    deliveryLabel: pkg.deliveryLabel,
    currency: DEFAULT_CURRENCY,
  };
}

/** Resumen en texto plano, listo para copiar o enviar por WhatsApp. */
export function buildQuoteMessage(quote: Quote): string {
  const lines: string[] = [];
  const money = (cents: Cents) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: quote.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);

  lines.push("Cotización — Plataforma Salud Vida y Bienestar");
  lines.push("");
  lines.push(
    `Paquete: ${quote.package.name}${quote.isFromPrice ? " (desde)" : ""} — ${money(quote.developmentCents)} ${quote.currency}`,
  );
  lines.push(
    `Mantenimiento: ${quote.maintenance ? `${quote.maintenance.name} — ${money(quote.monthlyCents)} / mes` : "No incluido"}`,
  );
  lines.push("");
  lines.push("Plan de pagos:");
  for (const stage of quote.stages) {
    lines.push(`• ${stage.label}: ${money(stage.amountCents)}`);
  }
  lines.push("");
  lines.push(`Tiempo estimado: ${quote.deliveryLabel}`);
  lines.push("");
  lines.push(
    "Nota: valores de referencia para el desarrollo de la plataforma; no corresponden a precios del catálogo de productos.",
  );

  return lines.join("\n");
}
