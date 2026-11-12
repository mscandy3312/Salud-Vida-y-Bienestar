import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataInput): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [
      "belleza",
      "bienestar",
      "cuidado personal",
      "barbería",
      "micropigmentación",
      "academia de belleza",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
