import type { Service, ServiceCategory } from "@/data/types";

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "belleza",
    name: "Belleza",
    shortName: "Belleza",
    description: "Cortes, color y maquillaje con una mirada editorial.",
    longDescription:
      "Rituales de belleza diseñados a partir de una consulta cercana. La disponibilidad, duración y valor final de cada servicio se confirman directamente con el estudio.",
    image: "/images/editorial/salon.jpg",
    imageAlt: "Ambiente editorial de salón de belleza",
    icon: "sparkles",
  },
  {
    slug: "barberia",
    name: "Barbería",
    shortName: "Barbería",
    description: "Precisión clásica y detailing contemporáneo.",
    longDescription:
      "Un espacio dedicado al corte, el estilizado y el ritual de barba. Cada servicio parte de una consulta para adaptar el resultado al estilo y rutina de cada persona.",
    image: "/images/editorial/barber.jpg",
    imageAlt: "Detalle editorial de barbería",
    icon: "scissors",
  },
  {
    slug: "micropigmentacion",
    name: "Micropigmentación",
    shortName: "Micropigmentación",
    description: "Técnicas de maquillaje semipermanente con enfoque profesional.",
    longDescription:
      "Servicios de micropigmentación que requieren valoración previa, criterio profesional y seguimiento. La información definitiva, contraindicaciones y protocolos se proporcionarán en consulta.",
    image: "/images/editorial/micro.jpg",
    imageAlt: "Detalle editorial de un servicio de belleza",
    icon: "eye",
  },
];

export const services: Service[] = [
  {
    id: "s01",
    slug: "corte-dama",
    name: "Corte dama",
    category: "belleza",
    description:
      "Corte personalizado con consulta previa para encontrar la forma que mejor acompañe tu estilo.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "scissors",
    isFeatured: true,
  },
  {
    id: "s02",
    slug: "corte-caballero",
    name: "Corte caballero",
    category: "belleza",
    description:
      "Un corte limpio y adaptable, trabajado desde la estructura del rostro y la rutina diaria.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "scissors",
  },
  {
    id: "s03",
    slug: "corte-infantil",
    name: "Corte infantil",
    category: "belleza",
    description:
      "Una experiencia tranquila y cuidada para los primeros rituales de belleza.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "heart",
  },
  {
    id: "s04",
    slug: "tintes",
    name: "Tintes",
    category: "belleza",
    description:
      "Color personalizado con valoración previa del tono, la base y el resultado deseado.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "palette",
    isFeatured: true,
  },
  {
    id: "s05",
    slug: "mechas",
    name: "Mechas",
    category: "belleza",
    description:
      "Dimensiones de color trabajadas con precisión para un resultado luminoso y natural.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "sun",
  },
  {
    id: "s06",
    slug: "rayos",
    name: "Rayos",
    category: "belleza",
    description:
      "Contraste y movimiento a través de una técnica de color consultada contigo.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "wand",
  },
  {
    id: "s07",
    slug: "bases",
    name: "Bases",
    category: "belleza",
    description:
      "Aplicación de color de raíz a puntas con un acabado uniforme y cuidado.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "brush",
  },
  {
    id: "s08",
    slug: "alaciados",
    name: "Alaciados",
    category: "belleza",
    description:
      "Un acabado pulido y sereno para ocasiones que piden una línea impecable.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "wind",
  },
  {
    id: "s09",
    slug: "ondulados",
    name: "Ondulados",
    category: "belleza",
    description:
      "Movimiento suave y textura natural para acompañar tu estilo sin esfuerzo.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "feather",
  },
  {
    id: "s10",
    slug: "peinados",
    name: "Peinados",
    category: "belleza",
    description:
      "Peinados de invitada o de evento, diseñados contigo y adaptados a la ocasión.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "crown",
    isFeatured: true,
  },
  {
    id: "s11",
    slug: "maquillaje",
    name: "Maquillaje",
    category: "belleza",
    description:
      "Maquillaje social o editorial con una estética cuidada y productos seleccionados.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "brush",
    isFeatured: true,
  },
  {
    id: "s12",
    slug: "corte-barberia",
    name: "Corte de barbería",
    category: "barberia",
    description:
      "Corte con máquina y tijera, definición de contornos y acabado a navaja.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "scissors",
    isFeatured: true,
  },
  {
    id: "s13",
    slug: "estilizado-barba",
    name: "Estilizado de barba",
    category: "barberia",
    description:
      "Diseño y perfilado de barba para lograr una forma equilibrada y personal.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "feather",
  },
  {
    id: "s14",
    slug: "ritual-barberia",
    name: "Ritual de barbería",
    category: "barberia",
    description:
      "Una experiencia completa de corte, barba y acabado con atención al detalle.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "crown",
    isFeatured: true,
  },
  {
    id: "s15",
    slug: "microblading",
    name: "Microblading",
    category: "micropigmentacion",
    description:
      "Técnica de maquillaje semipermanente pelo a pelo, sujeta a valoración profesional previa.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "eye",
    isFeatured: true,
  },
  {
    id: "s16",
    slug: "microshading",
    name: "Microshading",
    category: "micropigmentacion",
    description:
      "Efecto de sombreado para cejas, siempre precedido por una consulta y valoración.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "brush",
  },
  {
    id: "s17",
    slug: "delineado-parpados",
    name: "Delineado de párpados",
    category: "micropigmentacion",
    description:
      "Diseño de delineado con criterio profesional y seguimiento posterior.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "eye",
  },
  {
    id: "s18",
    slug: "micropigmentacion-labios",
    name: "Micropigmentación de labios",
    category: "micropigmentacion",
    description:
      "Servicio de micropigmentación labial que requiere valoración, consentimiento y seguimiento.",
    priceLabel: "Precio a consultar",
    durationLabel: "Duración por confirmar",
    icon: "heart",
  },
];

export function getServicesByCategory(category: Service["category"]) {
  return services.filter((service) => service.category === category);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
