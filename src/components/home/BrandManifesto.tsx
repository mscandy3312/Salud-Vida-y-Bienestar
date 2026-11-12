import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/animations/Reveal";
import { Botanical } from "@/components/ui/Botanical";

const images = [
  {
    src: "/images/editorial/skincare-detail.jpg",
    alt: "Detalle editorial de texturas de cuidado personal",
    className: "col-span-2 aspect-[16/10]",
  },
  {
    src: "/images/editorial/ritual.jpg",
    alt: "Ambiente sereno de ritual y bienestar",
    className: "aspect-[4/5]",
  },
  {
    src: "/images/editorial/botanical.jpg",
    alt: "Composición botánica en tonos naturales",
    className: "aspect-[4/5]",
  },
];

export function BrandManifesto() {
  return (
    <section id="manifiesto" className="relative overflow-hidden bg-warm-white py-20 sm:py-28">
      <Botanical
        variant="branch"
        className="absolute -right-10 top-10 h-80 w-64 text-forest/[0.05]"
      />
      <div className="container-editorial relative">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow text-forest/60">El manifiesto</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-[3.4rem]">
                El lujo de cuidarte
                <br />
                <span className="italic text-forest/55">sin prisa.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-sm leading-7 text-soft-black/58 sm:text-[0.9375rem] sm:leading-8">
                {siteConfig.brand.promise} Creemos en la belleza que se siente
                propia, en los rituales que caben en un día real y en la
                formación que transforma el talento en oficio.
              </p>
            </Reveal>

            <div className="mt-9 space-y-5">
              {siteConfig.brand.pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={0.2 + index * 0.06}>
                  <div className="flex gap-4 border-t border-forest/10 pt-4">
                    <span className="pt-1 text-[0.5625rem] uppercase tracking-[0.18em] text-gold">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-forest">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 max-w-sm text-xs leading-6 text-soft-black/50">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <Reveal
                key={image.src}
                delay={index * 0.08}
                className={image.className}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.3rem] bg-cream">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.28}>
              <div className="flex h-full flex-col justify-between rounded-[1.3rem] border border-forest/12 bg-cream p-5">
                <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-forest/40">
                  Filosofía SVB
                </span>
                <div>
                  <p className="font-serif text-xl leading-snug text-forest">
                    “La belleza también es una forma de habitar el día.”
                  </p>
                  <div className="mt-4 h-px w-10 bg-gold/70" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
