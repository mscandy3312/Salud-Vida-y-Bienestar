import type { Testimonial } from "@/data/types";

/**
 * Testimonios de demostración. No son reseñas reales ni resultados verificados.
 * Deben sustituirse por testimonios autorizados antes de publicar.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t01",
    quote:
      "La experiencia se sintió cuidada de principio a fin. Un espacio para bajar el ritmo y salir con una sensación de bienestar.",
    author: "Cliente de demostración 01",
    context: "Testimonio ilustrativo · Belleza",
    initials: "C1",
    isDemo: true,
  },
  {
    id: "t02",
    quote:
      "Me gustó la atención al detalle y la claridad para explicar cada paso. El resultado se sintió muy personal.",
    author: "Cliente de demostración 02",
    context: "Testimonio ilustrativo · Barbería",
    initials: "C2",
    isDemo: true,
  },
  {
    id: "t03",
    quote:
      "La combinación de estética, trato cercano y profesionalismo es exactamente lo que buscaba para mi rutina.",
    author: "Cliente de demostración 03",
    context: "Testimonio ilustrativo · Cuidado personal",
    initials: "C3",
    isDemo: true,
  },
];
