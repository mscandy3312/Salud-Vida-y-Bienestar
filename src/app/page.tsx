import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandManifesto } from "@/components/home/BrandManifesto";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ComplementosFeature } from "@/components/home/ComplementosFeature";
import { VeganFeature } from "@/components/home/VeganFeature";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AcademySection } from "@/components/home/AcademySection";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Belleza, bienestar y formación",
  description:
    "Belleza, bienestar, productos de cuidado personal, servicios estéticos, barbería, micropigmentación y formación profesional. Versión demo de prueba.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <BrandManifesto />
      <CategoryGrid />
      <ComplementosFeature />
      <VeganFeature />
      <ServicesSection />
      <AcademySection />
      <Testimonials />
      <TrustStrip />
      <FinalCta />
    </>
  );
}
