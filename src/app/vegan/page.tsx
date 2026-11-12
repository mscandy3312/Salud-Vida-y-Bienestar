import type { Metadata } from "next";
import Image from "next/image";
import { veganProducts } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Botanical } from "@/components/ui/Botanical";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Línea VEGAN",
  description:
    "Selección demostrativa de productos con dirección botánica y estética esencial. Información, precios y certificaciones ilustrativos.",
  path: "/vegan",
  keywords: ["línea vegan", "cosmética vegana", "ritual botánico"],
});

const principles = [
  {
    title: "Dirección botánica",
    description:
      "Paletas naturales, nombres evocativos y una estética que vuelve a lo esencial.",
    icon: "leaf" as const,
  },
  {
    title: "Menos, mejor",
    description:
      "Una selección acotada para imaginar una rutina simple, coherente y sensorial.",
    icon: "droplet" as const,
  },
  {
    title: "Transparencia demo",
    description:
      "No se declaran certificaciones ni formulaciones reales hasta que la marca las confirme.",
    icon: "shield" as const,
  },
];

export default function VeganPage() {
  const ArrowIcon = uiIcons.arrowRight;

  return (
    <>
      <PageHero
        eyebrow="Línea VEGAN"
        title={
          <>
            Rituales que nacen
            <br />
            <span className="italic text-gold-light">de lo esencial.</span>
          </>
        }
        description="Una selección de demostración con dirección botánica: objetos simples, texturas naturales y una manera más serena de habitar el cuidado personal."
        aside={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-warm-white/12">
            <Image
              src="/images/editorial/botanical.jpg"
              alt="Composición botánica en tonos verdes y neutros"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-5 bottom-5">
              <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold-light">
                Selección demostrativa
              </p>
              <p className="mt-2 font-serif text-xl leading-snug text-warm-white">
                La belleza también puede ser simple.
              </p>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="#seleccion-vegan" variant="gold" size="md">
            Ver la selección
            <ArrowIcon size={14} aria-hidden="true" />
          </ButtonLink>
          <a
            href={whatsappUrl(whatsappMessages.vegan)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/45 underline decoration-warm-white/20 underline-offset-4 transition-colors hover:text-warm-white"
          >
            Consultar la línea
          </a>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-warm-white py-20 sm:py-24">
        <Botanical
          variant="branch"
          className="absolute -right-12 top-8 h-72 w-56 text-forest/[0.04]"
        />
        <div className="container-editorial relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <span className="eyebrow text-forest/55">El criterio</span>
              <h2 className="mt-4 font-serif text-3xl leading-[1.05] text-forest sm:text-4xl">
                Una línea con
                <br />
                <span className="italic text-forest/55">dirección botánica.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-soft-black/52">
                Esta selección reúne productos etiquetados como VEGAN dentro del
                catálogo de demostración. El contenido sirve para presentar una
                línea coherente; las certificaciones, ingredientes y condiciones
                reales deberán validarse antes de su publicación.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.06}>
                  <div className="h-full rounded-[1.3rem] border border-forest/10 bg-cream/45 p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/12 text-forest/60">
                      <Icon icon={principle.icon} size={16} />
                    </span>
                    <h3 className="mt-4 font-serif text-lg text-forest">
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-6 text-soft-black/45">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="seleccion-vegan" className="scroll-mt-28 bg-cream/55 py-20 sm:py-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="La selección"
            title={
              <>
                Objetos para un ritual
                <br />
                <span className="italic text-forest/55">más consciente.</span>
              </>
            }
            description={`${veganProducts.length} productos de demostración etiquetados como VEGAN. Los precios son ilustrativos y no representan una oferta comercial final.`}
          />
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {veganProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.04}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[1.4rem] border border-forest/10 bg-warm-white p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-serif text-2xl text-forest">
                ¿Quieres conocer la visión completa?
              </p>
              <p className="mt-1.5 max-w-md text-xs leading-6 text-soft-black/45">
                La versión Profesional podría integrar catálogo, pedidos y
                contenidos gestionables para operar la línea en línea.
              </p>
            </div>
            <ButtonLink href="/contacto#profesional" variant="outline" size="md">
              Conocer la versión Profesional
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
