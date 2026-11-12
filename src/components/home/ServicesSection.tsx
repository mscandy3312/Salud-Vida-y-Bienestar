import Image from "next/image";
import Link from "next/link";
import { serviceCategories, services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";

export function ServicesSection() {
  const ArrowIcon = uiIcons.arrowUpRight;
  const featured = services.filter((service) => service.isFeatured).slice(0, 6);

  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Servicios"
          title={
            <>
              Técnica precisa.
              <br />
              <span className="italic text-forest/55">Experiencia serena.</span>
            </>
          }
          description="Belleza, barbería y micropigmentación en un mismo universo. Una demostración de cómo se presentan los servicios, sus tiempos y la atención al detalle."
          aside={
            <ButtonLink href="/servicios" variant="outline" size="md">
              Ver todos los servicios
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {serviceCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.07}>
              <Link
                href={`/servicios#${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-forest"
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B1F16]/85 via-[#0B1F16]/15 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-gold-light">
                    <Icon icon={category.icon} size={15} />
                    <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-warm-white/45">
                      0{index + 1} · Servicio
                    </span>
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl text-warm-white">
                        {category.name}
                      </h3>
                      <p className="mt-1.5 max-w-[17rem] text-xs leading-5 text-warm-white/55">
                        {category.description}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-warm-white/25 text-warm-white/70 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-forest">
                      <ArrowIcon size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.4rem] border border-forest/10">
          {featured.map((service, index) => (
            <Link
              key={service.id}
              href={`/servicios#${service.category}`}
              className="group grid grid-cols-[2.5rem_1fr] items-center gap-4 border-b border-forest/8 px-5 py-5 transition-colors last:border-none hover:bg-cream/60 sm:grid-cols-[3rem_1.2fr_1fr_auto] sm:gap-6 sm:px-7"
            >
              <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-forest/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-3">
                <Icon icon={service.icon} size={18} className="hidden text-gold sm:block" />
                <div>
                  <p className="font-serif text-lg text-forest">{service.name}</p>
                  <p className="mt-0.5 text-xs leading-5 text-soft-black/45 sm:hidden">
                    {service.priceLabel}
                  </p>
                </div>
              </div>
              <p className="hidden max-w-md text-xs leading-5 text-soft-black/45 sm:block">
                {service.description}
              </p>
              <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end">
                <div className="text-right">
                  <p className="text-xs font-medium text-forest/75">{service.priceLabel}</p>
                  <p className="mt-0.5 text-[0.5625rem] uppercase tracking-[0.12em] text-soft-black/32">
                    {service.durationLabel}
                  </p>
                </div>
                <ArrowIcon
                  size={15}
                  className="text-forest/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-xs leading-6 text-soft-black/38">
          Los servicios requieren valoración previa. Precios y duraciones son
          marcadores de posición que la marca deberá confirmar.
        </p>
      </div>
    </section>
  );
}
