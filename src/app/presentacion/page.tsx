import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { PresentationExperience } from "@/components/pricing/PresentationExperience";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Presentación comercial — Plataforma Profesional",
    description:
      "Presentación y cotizador de la plataforma Profesional: paquetes de desarrollo, planes de mantenimiento y plan de pagos.",
    path: "/presentacion",
    keywords: ["cotización", "plataforma profesional", "desarrollo web"],
  }),
  // Página comercial privada: se mantiene fuera de los buscadores y del menú público.
  robots: { index: false, follow: false },
};

export default function PresentationPage() {
  return (
    <>
      <PageHero
        eyebrow="Presentación comercial"
        title={
          <>
            La plataforma
            <br />
            <span className="italic text-gold-light">que tu negocio merece.</span>
          </>
        }
        description="Presenta los paquetes, el mantenimiento mensual y el plan de pagos de la plataforma Profesional. Los importes son parámetros comerciales de referencia y no corresponden a los precios del catálogo de productos."
      />

      <section className="bg-warm-white py-20 sm:py-24">
        <div className="container-editorial">
          <PresentationExperience />
        </div>
      </section>
    </>
  );
}
