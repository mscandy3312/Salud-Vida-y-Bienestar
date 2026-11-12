/**
 * Aritmética monetaria.
 *
 * Regla del proyecto: TODO cálculo monetario se hace en CENTAVOS ENTEROS.
 * Nunca se suman ni multiplican números de punto flotante para dinero.
 * La conversión a decimal solo ocurre al formatear para mostrar.
 */

export type Cents = number;

export const DEFAULT_CURRENCY = "MXN";

/** Convierte un importe en unidades (p. ej. 110.50) a centavos enteros. */
export function toCents(value: number): Cents {
  if (!Number.isFinite(value)) {
    throw new TypeError("El importe debe ser un número finito.");
  }
  return Math.round(value * 100);
}

/** Convierte centavos enteros a unidades decimales (solo para mostrar). */
export function fromCents(cents: Cents): number {
  assertCents(cents);
  return cents / 100;
}

export function assertCents(cents: number): void {
  if (!Number.isInteger(cents)) {
    throw new TypeError("Los centavos deben ser un entero.");
  }
}

/** Suma segura de importes en centavos. */
export function sumCents(...values: Cents[]): Cents {
  return values.reduce((total, value) => {
    assertCents(value);
    return total + value;
  }, 0);
}

/** Multiplica centavos por un entero (cantidad) sin errores de punto flotante. */
export function multiplyCents(cents: Cents, quantity: number): Cents {
  assertCents(cents);
  if (!Number.isInteger(quantity)) {
    throw new TypeError("La cantidad debe ser un entero.");
  }
  return cents * quantity;
}

/**
 * Porcentaje de un importe en centavos.
 * `percent` es un número entero o decimal de porcentaje (p. ej. 50 = 50 %).
 */
export function percentOfCents(cents: Cents, percent: number): Cents {
  assertCents(cents);
  return Math.round((cents * percent) / 100);
}

/** Formatea centavos como moneda (por defecto MXN). */
export function formatCurrency(
  cents: Cents,
  currency: string = DEFAULT_CURRENCY,
  options: { withCents?: boolean } = {},
): string {
  assertCents(cents);
  const { withCents = false } = options;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  }).format(cents / 100);
}

export const formatMXN = (cents: Cents, withCents = false) =>
  formatCurrency(cents, DEFAULT_CURRENCY, { withCents });
