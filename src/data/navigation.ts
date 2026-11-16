import type { NavItem } from "@/data/types";

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/tienda" },
  { label: "Complementos", href: "/complementos" },
  { label: "Vegan", href: "/vegan" },
  { label: "Servicios", href: "/servicios" },
  { label: "Academia", href: "/academia" },
  { label: "Contacto", href: "/contacto" },
];

export const footerGroups: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Explorar",
    items: [
      { label: "Inicio", href: "/" },
      { label: "Tienda", href: "/tienda" },
      { label: "Complementos", href: "/complementos" },
      { label: "Línea VEGAN", href: "/vegan" },
      { label: "Servicios", href: "/servicios" },
      { label: "Academia", href: "/academia" },
    ],
  },
  {
    title: "Atención",
    items: [
      { label: "Contacto", href: "/contacto" },
      { label: "Consultar por WhatsApp", href: "/contacto#whatsapp" },
      { label: "Preguntas frecuentes", href: "/contacto#preguntas" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Términos de la versión demo", href: "/legal#terminos" },
      { label: "Privacidad", href: "/legal#privacidad" },
      { label: "Datos ilustrativos", href: "/legal#datos" },
    ],
  },
];
