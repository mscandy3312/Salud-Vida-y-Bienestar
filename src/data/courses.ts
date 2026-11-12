import type { Course } from "@/data/types";

/**
 * Programas de demostración de la academia.
 * No se declaran certificaciones, duración definitiva ni reconocimiento oficial.
 */
export const courses: Course[] = [
  {
    id: "c01",
    slug: "peluqueria",
    name: "Peluquería",
    discipline: "Formación técnica",
    summary:
      "Un recorrido por fundamentos de corte, forma y acabado para desarrollar criterio profesional.",
    description:
      "Programa demostrativo enfocado en la construcción de bases técnicas de peluquería. El temario definitivo, la duración y los requisitos se confirmarán con la academia.",
    topics: ["Consulta y diagnóstico", "Técnicas de corte", "Acabados y styling"],
    modalityLabel: "Modalidad por confirmar",
    durationLabel: "Duración por confirmar",
    levelLabel: "Nivel por confirmar",
    image: "/images/editorial/salon.jpg",
    imageAlt: "Ambiente editorial de formación en peluquería",
    icon: "scissors",
    isFeatured: true,
  },
  {
    id: "c02",
    slug: "barberia",
    name: "Barbería",
    discipline: "Formación técnica",
    summary:
      "Precisión en corte, perfilado y ritual de barba desde una mirada contemporánea.",
    description:
      "Programa demostrativo de barbería con énfasis en técnica, presentación y experiencia de servicio. La información académica final será publicada por la marca.",
    topics: ["Estructura del corte", "Perfilado de barba", "Ritual y atención"],
    modalityLabel: "Modalidad por confirmar",
    durationLabel: "Duración por confirmar",
    levelLabel: "Nivel por confirmar",
    image: "/images/editorial/barber-interior.jpg",
    imageAlt: "Interior editorial de barbería",
    icon: "scissors",
    isFeatured: true,
  },
  {
    id: "c03",
    slug: "maquillaje",
    name: "Maquillaje",
    discipline: "Formación creativa",
    summary:
      "Color, textura y luz para construir maquillajes con intención y técnica.",
    description:
      "Programa demostrativo para explorar maquillaje social y editorial. Los contenidos, materiales y condiciones serán definidos por la academia.",
    topics: ["Preparación de piel", "Teoría del color", "Maquillaje editorial"],
    modalityLabel: "Modalidad por confirmar",
    durationLabel: "Duración por confirmar",
    levelLabel: "Nivel por confirmar",
    image: "/images/editorial/makeup.jpg",
    imageAlt: "Detalle editorial de maquillaje profesional",
    icon: "brush",
    isFeatured: true,
  },
  {
    id: "c04",
    slug: "micropigmentacion",
    name: "Micropigmentación",
    discipline: "Formación especializada",
    summary:
      "Fundamentos de diseño y protocolo para quienes buscan especializarse.",
    description:
      "Programa demostrativo de micropigmentación. La formación real debe incluir protocolos, higiene, consentimiento y prácticas supervisadas que la academia confirmará.",
    topics: ["Diseño y proporción", "Protocolos de trabajo", "Seguimiento"],
    modalityLabel: "Modalidad por confirmar",
    durationLabel: "Duración por confirmar",
    levelLabel: "Nivel por confirmar",
    image: "/images/editorial/micro.jpg",
    imageAlt: "Detalle editorial de un servicio de micropigmentación",
    icon: "eye",
  },
  {
    id: "c05",
    slug: "colorimetria",
    name: "Colorimetría",
    discipline: "Formación técnica",
    summary:
      "El color como lenguaje: bases, matices y armonía para resultados precisos.",
    description:
      "Programa demostrativo de colorimetría con enfoque en observación, mezcla y criterio de color. Temario y condiciones finales por confirmar.",
    topics: ["Teoría del color", "Diagnóstico de tono", "Formulación de color"],
    modalityLabel: "Modalidad por confirmar",
    durationLabel: "Duración por confirmar",
    levelLabel: "Nivel por confirmar",
    image: "/images/editorial/palette.jpg",
    imageAlt: "Paleta editorial de tonos y color",
    icon: "palette",
  },
  {
    id: "c06",
    slug: "guitarra",
    name: "Guitarra",
    discipline: "Formación creativa",
    summary:
      "Un espacio para iniciar o retomar la práctica musical con acompañamiento.",
    description:
      "Programa demostrativo de guitarra dentro de la oferta creativa de la academia. Niveles, repertorio y modalidad se confirmarán al momento de la inscripción.",
    topics: ["Fundamentos del instrumento", "Ritmo y acordes", "Práctica guiada"],
    modalityLabel: "Modalidad por confirmar",
    durationLabel: "Duración por confirmar",
    levelLabel: "Nivel por confirmar",
    image: "/images/editorial/guitar.jpg",
    imageAlt: "Detalle editorial de guitarra",
    icon: "guitar",
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}
