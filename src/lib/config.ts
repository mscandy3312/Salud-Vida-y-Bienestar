const whatsappNumberDigits = "5215533548607";

function formatWhatsappDisplay(digits: string): string {
  if (digits.length === 13) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 9)} ${digits.slice(9, 13)}`;
  }
  return `+${digits}`;
}

/**
 * Configuración central de la marca.
 *
 * Todo lo que el negocio debe sustituir antes de publicar está marcado con
 * `isPlaceholder: true`. La demo no debe presentar estos valores como datos
 * comerciales reales.
 */
export const siteConfig = {
  name: "Salud Vida y Bienestar",
  shortName: "SVB",
  legalName: "Salud Vida y Bienestar",
  tagline: "Tu belleza, tu bienestar, tu mejor versión.",
  description:
    "Belleza, bienestar, productos de cuidado personal, servicios estéticos, barbería, micropigmentación y formación profesional.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saludvidabienestar.com",
  locale: "es_MX",
  copyrightYear: 2026,
  demo: {
    enabled: true,
    label: "Versión demo de prueba",
    notice:
      "Estás usando una versión de prueba. Los precios y la disponibilidad son ilustrativos; puedes enviar pedidos por WhatsApp, pero no se cobra en este sitio.",
    priceNotice:
      "Versión demo de prueba: confirma precios, disponibilidad y envío por WhatsApp.",
  },
  contact: {
    whatsapp: {
      number: whatsappNumberDigits,
      display: formatWhatsappDisplay(whatsappNumberDigits),
      isPlaceholder: false,
      label: "Escríbenos por WhatsApp",
    },
    email: {
      value: "hola@saludvidabienestar.com",
      isPlaceholder: true,
    },
    address: {
      value: "Ubicación por confirmar",
      isPlaceholder: true,
    },
    hours: {
      value: "Horario por confirmar",
      isPlaceholder: true,
    },
  },
  social: [
    {
      id: "instagram" as const,
      label: "Instagram",
      href: "https://instagram.com/",
      isPlaceholder: true,
    },
    {
      id: "facebook" as const,
      label: "Facebook",
      href: "https://facebook.com/",
      isPlaceholder: true,
    },
    {
      id: "tiktok" as const,
      label: "TikTok",
      href: "https://tiktok.com/",
      isPlaceholder: true,
    },
  ],
  professional: {
    name: "Versión Profesional",
    shortName: "Pro",
    description:
      "Una visión ampliada de la plataforma para operar tienda, pedidos, pagos, inventario y agenda desde un solo lugar.",
  },
  conversion: {
    autoInviteEnabled: true,
    autoInviteDelayMs: 42_000,
    autoInviteCooldownDays: 7,
    cooldownMs: 7 * 24 * 60 * 60 * 1000,
    storageKey: "svb:professional-invite:v1",
    sessionKey: "svb:session:v1",
    cartStorageKey: "svb:cart:v1",
  },
  commerce: {
    currency: "MXN",
    shippingFlatCents: 0,
    freeShippingThresholdCents: null as number | null,
    whatsappCheckoutEnabled: true,
    mercadoPagoEnabled: false,
    isShippingPlaceholder: true,
  },
  quote: {
    presentationPath: "/presentacion",
    isPublic: false,
    storageKey: "svb:quote:v1",
  },
  academy: {
    instructor: {
      name: "Perfil del instructor por confirmar",
      role: "Dirección académica",
      bio: "Este espacio está reservado para presentar la trayectoria real del instructor o instructora de la academia. La biografía, especialidades y formación se publicarán cuando la marca confirme la información.",
      isPlaceholder: true,
    },
  },
  brand: {
    promise: "Rituales de belleza y bienestar diseñados para acompañarte.",
    pillars: [
      {
        title: "Belleza",
        description:
          "Productos y rituales para cuidarte todos los días con una estética serena y natural.",
      },
      {
        title: "Bienestar",
        description:
          "Experiencias de cuidado que combinan precisión, calidez y atención al detalle.",
      },
      {
        title: "Formación",
        description:
          "Programas para quienes quieren desarrollar su talento y crecer en la industria.",
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const isWhatsAppConfigured = !siteConfig.contact.whatsapp.isPlaceholder;
