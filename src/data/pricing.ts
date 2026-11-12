/**
 * Parámetros comerciales de desarrollo y mantenimiento.
 *
 * IMPORTANTE: estos NO son precios del catálogo de productos del negocio.
 * Son valores comerciales iniciales, editables, para cotizar la plataforma.
 * Toda la lógica de cálculo vive en `src/lib/pricing.ts`; los componentes
 * nunca duplican ni inventan importes.
 */

export interface PricingPackage {
  id: string;
  name: string;
  /** Precio fijo en centavos. `null` cuando el paquete es "desde". */
  priceCents: number | null;
  /** Precio base en centavos cuando el paquete es "desde". */
  fromCents?: number;
  summary: string;
  features: string[];
  deliveryLabel: string;
  isRecommended?: boolean;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  priceCents: number;
  summary: string;
  features: string[];
}

export interface PaymentStage {
  id: string;
  label: string;
  percent: number;
}

export const DEVELOPMENT_PACKAGES: PricingPackage[] = [
  {
    id: "esencial",
    name: "Esencial",
    priceCents: 11_000_00,
    summary:
      "Presencia digital profesional para presentar la marca, el catálogo y los canales de contacto.",
    features: [
      "Sitio institucional y catálogo de productos y servicios",
      "Línea VEGAN y páginas informativas",
      "Contacto y consultas por WhatsApp",
      "Diseño editorial responsive",
      "SEO básico y datos estructurados",
    ],
    deliveryLabel: "Tiempo estimado por confirmar",
  },
  {
    id: "profesional",
    name: "Profesional",
    priceCents: 29_500_00,
    summary:
      "Tienda completa con carrito, pedidos, inventario y administración centralizada.",
    features: [
      "Todo lo del paquete Esencial",
      "Carrito de compras persistente",
      "Pedidos y control de inventario",
      "Panel administrativo protegido",
      "Solicitudes de citas e inscripciones",
      "Preparación de pagos digitales",
      "Reportes y seguimiento",
    ],
    deliveryLabel: "4 a 6 semanas tras el anticipo y la recepción de materiales",
    isRecommended: true,
  },
  {
    id: "avanzado",
    name: "Avanzado",
    priceCents: null,
    fromCents: 39_500_00,
    summary:
      "Plataforma a medida con integraciones, automatizaciones y funciones avanzadas.",
    features: [
      "Todo lo del paquete Profesional",
      "Integraciones a medida (ERP, CRM, pasarelas)",
      "Automatizaciones y flujos personalizados",
      "Experiencias 3D y animaciones avanzadas",
      "Optimización de rendimiento y escalabilidad",
    ],
    deliveryLabel: "Alcance y tiempos definidos tras el análisis",
  },
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: "basico",
    name: "Básico",
    priceCents: 799_00,
    summary: "Soporte y actualizaciones esenciales.",
    features: [
      "Actualizaciones de seguridad",
      "Respaldos periódicos",
      "Soporte por WhatsApp",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    priceCents: 1_499_00,
    summary: "Mantenimiento con mejoras y monitoreo continuo.",
    features: [
      "Todo lo del plan Básico",
      "Mejoras menores y ajustes de contenido",
      "Monitoreo de disponibilidad",
      "Informe mensual",
    ],
  },
  {
    id: "crecimiento",
    name: "Crecimiento",
    priceCents: 2_499_00,
    summary: "Acompañamiento comercial y evolución continua.",
    features: [
      "Todo lo del plan Profesional",
      "Optimización de conversión",
      "Nuevas funciones y secciones",
      "Prioridad de soporte",
    ],
  },
];

/**
 * Plan de pagos de la Plataforma Profesional ($29,500 MXN).
 * Los importes se calculan sobre el total del paquete seleccionado.
 */
export const PAYMENT_SCHEDULE: PaymentStage[] = [
  { id: "anticipo", label: "Anticipo (50 %)", percent: 50 },
  { id: "segundo", label: "Segundo pago (30 %)", percent: 30 },
  { id: "final", label: "Pago final (20 %)", percent: 20 },
];

export const DEFAULT_MAINTENANCE_ID = "profesional";

export const PRICING_NOTICE =
  "Valores comerciales de referencia para cotizar el desarrollo de la plataforma. No son precios del catálogo de productos del negocio.";
