import type { Metadata } from "next";
import { complementoProducts } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Complementos alimenticios",
  description:
    "Línea demostrativa de complementos alimenticios: energía, protección antioxidante, colágeno, digestión y control de peso. Ingredientes, beneficios y precios ilustrativos.",
  path: "/complementos",
  keywords: [
    "complementos alimenticios",
    "multivitamínico",
    "colágeno",
    "proteína",
    "bienestar",
  ],
});

const pillars = [
  {
    title: "Energía",
    description:
      "Fórmulas con vitaminas del complejo B, taurina y botánicos para acompañar tus días más activos.",
    icon: "sparkles" as const,
  },
  {
    title: "Protección",
    description:
      "Multivitamínicos y antioxidantes con minerales y extractos naturales para el bienestar diario.",
    icon: "shield" as const,
  },
  {
    title: "Bienestar",
    description:
      "Colágeno, fibras y proteínas pensadas para piel, articulaciones, digestión y recuperación.",
    icon: "heart" as const,
  },
];

export default function ComplementosPage() {
  const ArrowIcon = uiIcons.arrowRight;
  const featured = complementoProducts.find((product) => product.isFeatured) ??
    complementoProducts[0];

  return (
    <>
      <PageHero
        eyebrow="Complementos alimenticios"
        title={
          <>
            Energía, protección
            <br />
            <span className="italic text-gold-light">y bienestar diario.</span>
          </>
        }
        description="Una línea de demostración de complementos alimenticios para acompañar tu rutina: energía, defensas, colágeno, digestión y control de peso. Ingredientes, beneficios y precios son ilustrativos."
        aside={
          <div className="relative overflow-hidden rounded-[1.5rem] border border-warm-white/12">
            <ProductVisual product={featured} />
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-5 bottom-5">
              <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold-light">
                Línea de bienestar
              </p>
              <p className="mt-2 font-serif text-xl leading-snug text-warm-white">
                Pequeños hábitos que sostienen tu equilibrio.
              </p>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="#catalogo-complementos" variant="gold" size="md">
            Ver los complementos
            <ArrowIcon size={14} aria-hidden="true" />
          </ButtonLink>
          <a
            href={whatsappUrl(whatsappMessages.complementos)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/45 underline decoration-warm-white/20 underline-offset-4 transition-colors hover:text-warm-white"
          >
            Consultar la línea
          </a>
        </div>
      </PageHero>

      <section className="bg-warm-white py-20 sm:py-24">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="El enfoque"
            title={
              <>
                Tres pilares para
                <br />
                <span className="italic text-forest/55">tu bienestar diario.</span>
              </>
            }
            description="Organizamos la línea de complementos en tres intenciones claras. Toda la información es demostrativa y deberá validarse con la marca antes de su publicación."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.06}>
                <div className="h-full rounded-[1.3rem] border border-forest/10 bg-cream/45 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/12 text-forest/60">
                    <Icon icon={pillar.icon} size={17} />
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-forest">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-6 text-soft-black/45">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="catalogo-complementos"
        className="scroll-mt-28 bg-cream/55 py-20 sm:py-28"
      >
        <div className="container-editorial">
          <SectionHeading
            eyebrow="La selección"
            title={
              <>
                Complementos para
                <br />
                <span className="italic text-forest/55">acompañar tu rutina.</span>
              </>
            }
            description={`${complementoProducts.length} productos de demostración. Los precios son ilustrativos y no representan una oferta comercial final.`}
          />
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {complementoProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.04}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex items-start gap-3 rounded-[1.4rem] border border-forest/10 bg-warm-white p-6 sm:p-8">
            <Icon icon="shield" size={18} className="mt-0.5 shrink-0 text-gold" />
            <p className="max-w-3xl text-xs leading-6 text-soft-black/50">
              Los complementos alimenticios no sustituyen una alimentación
              equilibrada ni un tratamiento médico. Esta selección es
              demostrativa: las dosis, ingredientes, declaraciones y registros
              sanitarios deberán validarse antes de cualquier uso comercial.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[1.4rem] border border-forest/10 bg-forest p-6 text-warm-white sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-serif text-2xl text-warm-white">
                ¿Quieres ver todo el catálogo?
              </p>
              <p className="mt-1.5 max-w-md text-xs leading-6 text-warm-white/55">
                Explora también belleza, cuidado personal, accesorios y la línea
                VEGAN en la tienda de demostración.
              </p>
            </div>
            <ButtonLink href="/tienda" variant="gold" size="md">
              Ir a la tienda
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
