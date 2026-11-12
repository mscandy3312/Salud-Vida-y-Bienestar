import Image from "next/image";
import Link from "next/link";
import { veganProducts } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Botanical } from "@/components/ui/Botanical";
import { Reveal } from "@/components/animations/Reveal";
import { formatPrice } from "@/lib/utils";

export function VeganFeature() {
  const ArrowIcon = uiIcons.arrowRight;

  return (
    <section className="relative overflow-hidden bg-forest py-20 text-warm-white sm:py-28">
      <div className="grain absolute inset-0 opacity-30" aria-hidden="true" />
      <Botanical
        variant="arc"
        className="absolute -left-28 bottom-0 h-[30rem] w-[30rem] text-warm-white/[0.06]"
      />
      <div className="container-editorial relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-warm-white/10">
              <Image
                src="/images/editorial/botanical.jpg"
                alt="Composición botánica en tonos verdes y neutros"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-warm-white/20 bg-forest/50 px-3.5 py-1.5 backdrop-blur-md">
                <Icon icon="leaf" size={13} className="text-gold-light" />
                <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-warm-white/70">
                  Línea VEGAN
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-warm-white/12 bg-forest/55 p-4 backdrop-blur-md">
                <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-gold/70">
                  Dirección botánica
                </p>
                <p className="mt-1.5 font-serif text-lg leading-snug text-warm-white/90">
                  Una selección de demostración con una estética esencial.
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow text-gold">Rituales esenciales</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-lg font-serif text-4xl leading-[1.02] text-warm-white sm:text-5xl">
                Menos ingredientes.
                <br />
                <span className="italic text-gold-light">Más intención.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-sm leading-7 text-warm-white/55">
                Explora una selección vegana de demostración: objetos simples,
                paletas naturales y una dirección visual que vuelve a lo
                esencial. La formulación y certificaciones reales deberán ser
                confirmadas por la marca.
              </p>
            </Reveal>

            <div className="mt-8 space-y-2.5">
              {veganProducts.slice(0, 3).map((product, index) => (
                <Reveal key={product.id} delay={0.18 + index * 0.06}>
                  <Link
                    href={`/tienda/${product.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-warm-white/8 bg-warm-white/[0.035] p-2.5 transition-colors hover:border-warm-white/16 hover:bg-warm-white/[0.06]"
                  >
                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl">
                      <ProductVisual
                        product={product}
                        view={1}
                        className="aspect-auto h-full w-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.5rem] uppercase tracking-[0.18em] text-warm-white/32">
                        {product.category}
                      </p>
                      <p className="mt-1 font-serif text-base text-warm-white/90">
                        {product.name}
                      </p>
                    </div>
                    <span className="text-xs tabular-nums text-warm-white/55">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowIcon
                      size={14}
                      className="text-warm-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.36}>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/vegan" variant="gold" size="lg">
                  Descubrir la línea VEGAN
                  <ArrowIcon size={15} aria-hidden="true" />
                </ButtonLink>
                <p className="max-w-[15rem] text-[0.625rem] leading-5 text-warm-white/30">
                  Selección ilustrativa. No se declaran certificaciones reales.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
