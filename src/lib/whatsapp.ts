import { siteConfig } from "@/lib/config";
import type { Course, Product, Service } from "@/data/types";
import { multiplyCents, toCents } from "@/lib/money";

function getPhoneNumber() {
  return siteConfig.contact.whatsapp.number.replace(/\D/g, "");
}

export function whatsappUrl(message: string) {
  const phone = getPhoneNumber();
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

export const whatsappMessages = {
  general: `Hola, me gustaría conocer más sobre ${siteConfig.name}.`,
  professional: `Hola, me interesa conocer la versión Profesional de la plataforma de ${siteConfig.name}.`,
  appointment: `Hola, me gustaría solicitar información para agendar una cita.`,
  academy: `Hola, me interesa recibir información sobre los programas de la academia.`,
  vegan: `Hola, me gustaría conocer más sobre la línea VEGAN.`,
  complementos: `Hola, me gustaría conocer más sobre la línea de complementos alimenticios de ${siteConfig.name}.`,
} as const;

export function productInquiryMessage(product: Product) {
  return `Hola, me interesa el producto "${product.name}" de ${siteConfig.name}. Me gustaría recibir más información. (Consulta desde la demo: ${product.slug})`;
}

export function serviceInquiryMessage(service: Service) {
  return `Hola, me interesa el servicio "${service.name}" de ${siteConfig.name}. Me gustaría recibir información y conocer la disponibilidad. (Consulta desde la demo: ${service.slug})`;
}

export function courseInquiryMessage(course: Course) {
  return `Hola, me interesa el programa "${course.name}" de la academia de ${siteConfig.name}. Me gustaría conocer modalidad, fechas y requisitos. (Consulta desde la demo: ${course.slug})`;
}

export function cartInquiryMessage(
  items: Array<{ name: string; quantity: number; price: number }>,
) {
  const articles = items.map((item) => {
    const unitPriceCents = toCents(item.price);
    return {
      producto: item.name,
      cantidad: item.quantity,
      precio_unitario_centavos: unitPriceCents,
      importe_centavos: multiplyCents(unitPriceCents, item.quantity),
    };
  });
  const order = {
    tipo: "solicitud_pedido",
    negocio: siteConfig.name,
    moneda: "MXN",
    unidad_importes: "centavos",
    articulos: articles,
    subtotal_centavos: articles.reduce(
      (subtotal, article) => subtotal + article.importe_centavos,
      0,
    ),
    envio: "por_confirmar",
  };

  return `Hola, quiero hacer este pedido. Te comparto los artículos en JSON (importes en centavos):\n\n${JSON.stringify(order, null, 2)}`;
}
