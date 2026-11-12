import { siteConfig } from "@/lib/config";
import type { Course, Product, Service } from "@/data/types";

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
  const lines = items
    .map(
      (item) =>
        `• ${item.quantity} × ${item.name} — $${item.price.toLocaleString("es-MX")} MXN`,
    )
    .join("\n");
  return `Hola, me interesa cotizar los siguientes productos de ${siteConfig.name}:\n\n${lines}\n\nEsta lista proviene del carrito demostrativo del sitio.`;
}
