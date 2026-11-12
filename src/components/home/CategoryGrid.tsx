import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { Icon, uiIcons } from "@/components/ui/Icon";

export function CategoryGrid() {
  const ArrowIcon = uiIcons.arrowUpRight;

  return (
    <section className="bg-cream/60 py-20 sm:py-28">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Explora por universo"
          title={
            <>
              Un mapa de belleza
              <br />
              <span className="italic text-forest/55">y bienestar cotidiano.</span>
            </>
          }
          description="Seis territorios para encontrar lo que tu ritual necesita hoy: desde el cuidado facial hasta una selección con dirección botánica."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal
              key={category.slug}
              delay={index * 0.05}
              className={index === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <Link
                href={category.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-forest"
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-82 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-95"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B1F16]/85 via-[#0B1F16]/18 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-gold-light">
                        <Icon icon={category.icon} size={15} />
                        <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-warm-white/50">
                          {String(index + 1).padStart(2, "0")} · Universo
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-2xl text-warm-white sm:text-[1.7rem]">
                        {category.name}
                      </h3>
                      <p className="mt-1.5 max-w-[17rem] text-xs leading-5 text-warm-white/55">
                        {category.description}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-warm-white/25 text-warm-white/70 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-forest">
                      <ArrowIcon size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
