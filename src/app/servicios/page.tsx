import type { Metadata } from "next";
import Image from "next/image";
import {
  getServicesByCategory,
  serviceCategories,
  services,
} from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { SiteNotice } from "@/components/layout/SiteNotice";
import { serviceInquiryMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Servicios",
  description:
    "Servicios demostrativos de belleza, barbería y micropigmentación. Precios, duraciones y disponibilidad ilustrativos; valoración previa requerida.",
  path: "/servicios",
  keywords: ["servicios de belleza", "barbería", "micropigmentación"],
});

export default function ServicesPage() {
  const ArrowIcon = uiIcons.arrowUpRight;

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title={
          <>
            Técnica precisa.
            <br />
            <span className="italic text-gold-light">Experiencia serena.</span>
          </>
        }
        description="Belleza, barbería y micropigmentación presentadas con una mirada editorial. Cada servicio parte de una valoración previa y se adapta a la persona."
        aside={
          <div className="rounded-[1.5rem] border border-warm-white/10 bg-warm-white/[0.04] p-6 backdrop-blur-sm">
            <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
              Tres territorios
            </p>
            <ul className="mt-4 space-y-3">
              {serviceCategories.map((category) => (
                <li key={category.slug}>
                  <a
                    href={`#${category.slug}`}
                    className="flex items-center justify-between gap-4 border-b border-warm-white/8 pb-3 text-sm text-warm-white/65 transition-colors hover:text-warm-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon icon={category.icon} size={15} className="text-gold/75" />
                      {category.name}
                    </span>
                    <ArrowIcon size={13} className="text-warm-white/25" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.625rem] leading-5 text-warm-white/30">
              {services.length} servicios ilustrativos. Precios y duraciones por
              confirmar.
            </p>
          </div>
        }
      >
        <div className="mt-8">
          <ButtonLink href="/contacto#whatsapp" variant="gold" size="md">
            Solicitar información
            <ArrowIcon size={14} aria-hidden="true" />
          </ButtonLink>
        </div>
      </PageHero>

      <SiteNotice />

      <div className="bg-warm-white">
        {serviceCategories.map((category, categoryIndex) => {
          const categoryServices = getServicesByCategory(category.slug);

          return (
            <section
              key={category.slug}
              id={category.slug}
              className="scroll-mt-24 border-b border-forest/8 py-16 last:border-none sm:py-20"
            >
              <div className="container-editorial">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                  <Reveal>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-forest/10 lg:sticky lg:top-28 lg:aspect-[4/5]">
                      <Image
                        src={category.image}
                        alt={category.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 35vw"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-5 bottom-5">
                        <div className="flex items-center gap-2 text-gold-light">
                          <Icon icon={category.icon} size={15} />
                          <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-warm-white/45">
                            0{categoryIndex + 1} · Servicio
                          </span>
                        </div>
                        <h2 className="mt-2 font-serif text-3xl text-warm-white">
                          {category.name}
                        </h2>
                        <p className="mt-1.5 text-xs leading-5 text-warm-white/55">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <div>
                    <Reveal>
                      <p className="max-w-2xl text-sm leading-7 text-soft-black/52">
                        {category.longDescription}
                      </p>
                    </Reveal>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {categoryServices.map((service, index) => (
                        <Reveal key={service.id} delay={index * 0.04}>
                          <article className="group flex h-full flex-col rounded-[1.2rem] border border-forest/10 bg-cream/35 p-5 transition-colors hover:border-forest/20 hover:bg-cream/60">
                            <div className="flex items-start justify-between gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/12 text-forest/60">
                                <Icon icon={service.icon} size={16} />
                              </span>
                              {service.isFeatured ? (
                                <span className="rounded-full bg-gold/20 px-2 py-1 text-[0.4375rem] uppercase tracking-[0.12em] text-forest/60">
                                  Destacado
                                </span>
                              ) : null}
                            </div>
                            <h3 className="mt-4 font-serif text-xl text-forest">
                              {service.name}
                            </h3>
                            <p className="mt-1.5 flex-1 text-xs leading-5 text-soft-black/45">
                              {service.description}
                            </p>
                            <div className="mt-4 flex items-end justify-between gap-3 border-t border-forest/8 pt-3">
                              <div>
                                <p className="text-[0.6875rem] font-medium text-forest/70">
                                  {service.priceLabel}
                                </p>
                                <p className="mt-0.5 text-[0.5rem] uppercase tracking-[0.12em] text-soft-black/30">
                                  {service.durationLabel}
                                </p>
                              </div>
                              <a
                                href={whatsappUrl(serviceInquiryMessage(service))}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-forest/15 text-forest/45 transition-colors hover:border-forest hover:bg-forest hover:text-warm-white"
                                aria-label={`Consultar ${service.name} por WhatsApp`}
                              >
                                <Icon icon="message" size={14} />
                              </a>
                            </div>
                          </article>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-cream/60 py-16 sm:py-20">
        <div className="container-editorial">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] border border-forest/10 bg-warm-white p-6 sm:flex-row sm:items-center sm:p-9">
            <div>
              <span className="eyebrow text-forest/50">Antes de reservar</span>
              <h2 className="mt-3 max-w-xl font-serif text-2xl leading-snug text-forest sm:text-3xl">
                Cada servicio requiere una valoración previa.
              </h2>
              <p className="mt-2 max-w-lg text-xs leading-6 text-soft-black/45">
                La disponibilidad, contraindicaciones, duración y precio final se
                confirman directamente con el estudio. Esta página es una
                demostración y no agenda citas reales.
              </p>
            </div>
            <ButtonLink href="/contacto" variant="primary" size="md">
              Ir a contacto
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
