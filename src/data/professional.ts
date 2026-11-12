import type { IconName, ProfessionalFeature } from "@/data/types";

export const professionalModal = {
  eyebrow: "Versión Profesional",
  title: "Tu negocio merece una experiencia profesional.",
  description:
    "Imagina tener tu propia tienda en línea, administrar tus productos, recibir pagos y gestionar tus pedidos desde un solo lugar.",
  benefits: [
    { label: "Tienda en línea", icon: "shopping-bag" },
    { label: "Carrito de compras", icon: "layers" },
    { label: "Pagos digitales", icon: "card" },
    { label: "Administración de pedidos", icon: "package" },
    { label: "Inventario", icon: "boxes" },
    { label: "Reportes comerciales", icon: "chart" },
  ] satisfies Array<{ label: string; icon: IconName }>,
  primaryCta: "Quiero conocer la versión Profesional",
  secondaryCta: "Continuar explorando",
  note:
    "Esta es una demostración comercial. No se ha activado ninguna compra, pago ni función real.",
};

export const professionalFeatures: ProfessionalFeature[] = [
  {
    key: "checkout",
    title: "Finalizar compra",
    description:
      "En la versión Profesional podrías cerrar el pedido con pagos digitales seguros, confirmación automática y seguimiento de cada etapa.",
    icon: "card",
  },
  {
    key: "account",
    title: "Cuenta de cliente",
    description:
      "Tus clientes podrían consultar sus pedidos, direcciones y preferencias desde un perfil privado y seguro.",
    icon: "user",
  },
  {
    key: "orders",
    title: "Gestión de pedidos",
    description:
      "Recibirías cada pedido en un panel centralizado, con estados, notas, historial y notificaciones para tu equipo.",
    icon: "package",
  },
  {
    key: "payments",
    title: "Pagos digitales",
    description:
      "Integración con una pasarela de pagos, validación en servidor y confirmaciones automáticas sin exponer datos sensibles.",
    icon: "shield",
  },
  {
    key: "inventory",
    title: "Inventario",
    description:
      "Podrías controlar existencias, variantes y alertas de reposición desde un solo lugar.",
    icon: "boxes",
  },
  {
    key: "reports",
    title: "Reportes comerciales",
    description:
      "Tendrías visibilidad de ventas, productos más consultados y comportamiento de compra para tomar mejores decisiones.",
    icon: "chart",
  },
  {
    key: "agenda",
    title: "Agenda de citas",
    description:
      "La versión Profesional puede integrar disponibilidad, reservas y recordatorios para servicios de belleza y barbería.",
    icon: "calendar",
  },
  {
    key: "academy",
    title: "Inscripciones en línea",
    description:
      "Podrías gestionar inscripciones, cupos, pagos y comunicación con alumnos desde la misma plataforma.",
    icon: "graduation",
  },
  {
    key: "crm",
    title: "Relación con clientes",
    description:
      "Una base organizada de contactos y preferencias para dar seguimiento cercano y personalizado.",
    icon: "users",
  },
  {
    key: "wishlist",
    title: "Lista de deseos",
    description:
      "Tus clientes podrían guardar productos favoritos y retomar su selección cuando quieran.",
    icon: "heart",
  },
];

export const defaultProfessionalFeature: ProfessionalFeature = {
  key: "general",
  title: "Una experiencia lista para crecer",
  description:
    "Esta función forma parte de la visión completa de la plataforma. La versión Profesional puede convertirla en una herramienta real para tu negocio.",
  icon: "crown",
};

export function getProfessionalFeature(key: string) {
  return (
    professionalFeatures.find((feature) => feature.key === key) ??
    defaultProfessionalFeature
  );
}
