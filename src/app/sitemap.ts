import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-01-01T00:00:00.000Z");

  const staticRoutes = [
    "",
    "/tienda",
    "/vegan",
    "/servicios",
    "/academia",
    "/contacto",
    "/legal",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/tienda" ? 0.9 : 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/tienda/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
