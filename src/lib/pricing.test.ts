import { describe, expect, it } from "vitest";
import { buildQuoteMessage, calculateQuote, getBasePriceCents } from "@/lib/pricing";
import { DEVELOPMENT_PACKAGES } from "@/data/pricing";
import { sumCents } from "@/lib/money";

describe("pricing", () => {
  it("calcula el plan de pagos de la Plataforma Profesional", () => {
    const quote = calculateQuote({ packageId: "profesional" });

    expect(quote.developmentCents).toBe(2950000);
    expect(quote.stages.map((s) => s.amountCents)).toEqual([1475000, 885000, 590000]);
    expect(quote.isFromPrice).toBe(false);
    expect(quote.monthlyCents).toBe(149900);
  });

  it("las etapas siempre suman el total del desarrollo", () => {
    for (const pkg of DEVELOPMENT_PACKAGES) {
      const quote = calculateQuote({ packageId: pkg.id });
      expect(sumCents(...quote.stages.map((s) => s.amountCents))).toBe(
        quote.developmentCents,
      );
    }
  });

  it("permite cotizar sin mantenimiento", () => {
    const quote = calculateQuote({ packageId: "esencial", maintenanceId: null });
    expect(quote.maintenance).toBeNull();
    expect(quote.monthlyCents).toBe(0);
    expect(quote.developmentCents).toBe(1100000);
  });

  it("marca el paquete a medida como 'desde'", () => {
    const quote = calculateQuote({ packageId: "avanzado" });
    expect(quote.isFromPrice).toBe(true);
    expect(quote.developmentCents).toBe(3950000);
  });

  it("rechaza paquetes o planes desconocidos", () => {
    expect(() => calculateQuote({ packageId: "inexistente" })).toThrow();
    expect(() => calculateQuote({ packageId: "esencial", maintenanceId: "x" })).toThrow();
  });

  it("expone el precio base en centavos", () => {
    const esencial = DEVELOPMENT_PACKAGES.find((p) => p.id === "esencial")!;
    expect(getBasePriceCents(esencial)).toBe(1100000);
  });

  it("genera un resumen legible", () => {
    const message = buildQuoteMessage(calculateQuote({ packageId: "profesional" }));
    expect(message).toContain("Profesional");
    expect(message).toContain("14,750");
  });
});
