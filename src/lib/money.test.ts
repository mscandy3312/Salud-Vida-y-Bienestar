import { describe, expect, it } from "vitest";
import {
  assertCents,
  formatMXN,
  multiplyCents,
  percentOfCents,
  sumCents,
  toCents,
} from "@/lib/money";

describe("money", () => {
  it("convierte unidades a centavos enteros sin errores de flotante", () => {
    expect(toCents(110)).toBe(11000);
    expect(toCents(110.5)).toBe(11050);
    expect(toCents(0.1)).toBe(10);
    expect(toCents(29.99)).toBe(2999);
  });

  it("suma centavos", () => {
    expect(sumCents(11000, 8850, 5900)).toBe(25750);
  });

  it("multiplica centavos por cantidad entera", () => {
    expect(multiplyCents(70000, 3)).toBe(210000);
  });

  it("calcula porcentajes de importes", () => {
    expect(percentOfCents(2950000, 50)).toBe(1475000);
    expect(percentOfCents(2950000, 30)).toBe(885000);
    expect(percentOfCents(2950000, 20)).toBe(590000);
  });

  it("rechaza valores no enteros de centavos", () => {
    expect(() => assertCents(10.5)).toThrow();
    expect(() => multiplyCents(100, 1.5)).toThrow();
  });

  it("formatea moneda MXN", () => {
    expect(formatMXN(1100000)).toContain("11,000");
  });
});
