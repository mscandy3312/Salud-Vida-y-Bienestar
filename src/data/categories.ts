import type { IconName } from "@/data/types";

export interface CategoryItem {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: IconName;
  href: string;
  featured?: boolean;
}

export const categories: CategoryItem[] = [
  {
    slug: "belleza",
    name: "Belleza",
    description: "Color, textura y objetos para componer tu propio ritual.",
    image: "/images/editorial/makeup.jpg",
    imageAlt: "Composición editorial de maquillaje y brochas",
    icon: "sparkles",
    href: "/tienda",
    featured: true,
  },
  {
    slug: "cuidado-facial",
    name: "Cuidado facial",
    description: "Pausas diarias para una piel que se siente cuidada.",
    image: "/images/editorial/skincare.jpg",
    imageAlt: "Ritual editorial de cuidado facial",
    icon: "droplet",
    href: "/tienda",
    featured: true,
  },
  {
    slug: "cuidado-corporal",
    name: "Cuidado corporal",
    description: "Texturas envolventes para rituales de cuerpo completo.",
    image: "/images/editorial/spa.jpg",
    imageAlt: "Ambiente sereno de spa y bienestar",
    icon: "leaf",
    href: "/tienda",
  },
  {
    slug: "cabello",
    name: "Cabello",
    description: "Rutinas para acompañar el movimiento natural del cabello.",
    image: "/images/editorial/hair.jpg",
    imageAlt: "Detalle editorial de cabello y salón",
    icon: "wind",
    href: "/tienda",
  },
  {
    slug: "vegan",
    name: "VEGAN",
    description: "Una selección de demostración con dirección botánica.",
    image: "/images/editorial/botanical.jpg",
    imageAlt: "Composición botánica en tonos verdes y neutros",
    icon: "sprout",
    href: "/vegan",
    featured: true,
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    description: "Herramientas y detalles que completan la experiencia.",
    image: "/images/editorial/cosmetics.jpg",
    imageAlt: "Detalle editorial de accesorios y cosméticos",
    icon: "gem",
    href: "/tienda",
  },
];
