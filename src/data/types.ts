export const productCategories = [
  "Belleza",
  "Cuidado facial",
  "Cuidado corporal",
  "Cabello",
  "VEGAN",
  "Accesorios",
  "Complementos",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export type ProductShape =
  | "dropper"
  | "bottle"
  | "jar"
  | "tube"
  | "flask"
  | "compact"
  | "tool"
  | "sachet"
  | "tub"
  | "capsules"
  | "pouch";

export type IconName =
  | "sparkles"
  | "leaf"
  | "droplet"
  | "flower"
  | "scissors"
  | "brush"
  | "eye"
  | "palette"
  | "graduation"
  | "guitar"
  | "heart"
  | "shield"
  | "calendar"
  | "user"
  | "compass"
  | "package"
  | "card"
  | "boxes"
  | "chart"
  | "check"
  | "clock"
  | "message"
  | "wand"
  | "gem"
  | "wind"
  | "sun"
  | "feather"
  | "book"
  | "users"
  | "lock"
  | "crown"
  | "layers"
  | "sprout"
  | "truck"
  | "tag"
  | "shopping-bag";

export interface ProductPalette {
  base: string;
  deep: string;
  accent: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  price: number;
  size: string;
  notes: string[];
  shape: ProductShape;
  palette: ProductPalette;
  isFeatured?: boolean;
  isNew?: boolean;
  isVegan?: boolean;
  badge?: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
}

export type ServiceCategorySlug = "belleza" | "barberia" | "micropigmentacion";

export interface ServiceCategory {
  slug: ServiceCategorySlug;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  icon: IconName;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategorySlug;
  description: string;
  priceLabel: string;
  durationLabel: string;
  icon: IconName;
  isFeatured?: boolean;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  discipline: string;
  summary: string;
  description: string;
  topics: string[];
  modalityLabel: string;
  durationLabel: string;
  levelLabel: string;
  image: string;
  imageAlt: string;
  icon: IconName;
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  initials: string;
  isDemo: true;
}

export interface Benefit {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProfessionalFeature {
  key: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}
