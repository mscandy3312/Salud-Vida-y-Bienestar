import { z } from "zod";

/**
 * Esquemas de validación compartidos.
 *
 * Se usan en el cliente para dar retroalimentación inmediata y en el servidor
 * como única fuente de verdad. El servidor SIEMPRE vuelve a validar y recalcula
 * importes; nunca confía en el precio, la cantidad ni el estado enviados por el
 * navegador.
 */

export const phoneSchema = z
  .string()
  .trim()
  .min(10, "Ingresa un teléfono de al menos 10 dígitos.")
  .max(20, "El teléfono es demasiado largo.")
  .regex(/^[0-9+()\-\s]+$/, "El teléfono contiene caracteres no válidos.");

export const emailSchema = z
  .string()
  .trim()
  .email("Ingresa un correo electrónico válido.");

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .or(z.literal(""));

export const checkoutSchema = z
  .object({
    name: z.string().trim().min(2, "Escribe tu nombre.").max(80),
    phone: phoneSchema,
    email: emailSchema.optional().or(z.literal("")),
    deliveryMethod: z.enum(["pickup", "delivery"], {
      errorMap: () => ({ message: "Selecciona una modalidad de entrega." }),
    }),
    address: optionalText(200, "La dirección es demasiado larga."),
    notes: optionalText(500, "Las notas son demasiado largas."),
  })
  .superRefine((value, ctx) => {
    if (value.deliveryMethod === "delivery" && (!value.address || value.address.trim().length < 8)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
        message: "Indica una dirección para el envío.",
      });
    }
  });

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const appointmentSchema = z.object({
  serviceSlug: z.string().trim().min(1, "Selecciona un servicio."),
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80),
  phone: phoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  preferredDate: optionalText(40, "La fecha es demasiado larga."),
  preferredTime: optionalText(40, "El horario es demasiado largo."),
  notes: optionalText(500, "Las notas son demasiado largas."),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const enrollmentSchema = z.object({
  courseSlug: z.string().trim().min(1, "Selecciona un programa."),
  fullName: z.string().trim().min(2, "Escribe tu nombre completo.").max(120),
  email: emailSchema,
  phone: phoneSchema,
  message: optionalText(500, "El mensaje es demasiado largo."),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

export const quoteSchema = z.object({
  packageId: z.string().trim().min(1, "Selecciona un paquete."),
  maintenanceId: z.string().trim().min(1).nullable().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Devuelve el primer mensaje de error por campo, o `{}` si es válido. */
export function collectFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
