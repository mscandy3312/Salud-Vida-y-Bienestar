import Link from "next/link";
import { complementoProducts } from "@/data/products";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { formatPrice } from "@/lib/utils";

export function ComplementosFeature() {
  const ArrowIcon = uiIcons.arrowRight;
  const highlight = complementoProducts.filter((product) => product.isFeatured).slice(0, 4);
  const showcase = highlight.length ? highlight : complementoProducts.slice(0, 4);
  const list = complementoProducts.slice(0, 3);

  return (
    <section className="bg-cream/50 py-20 sm:py-28">
      <div className="container-editorial">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow text-forest/55">Complementos</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-lg font-serif text-4xl leading-[1.02] text-forest sm:text-5xl">
                Bienestar que
                <br />
                <span className="italic text-forest/55">se toma a diario.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-sm leading-7 text-soft-black/55">
                Descubre una línea demostrativa de complementos alimenticios:
                energía, protección antioxidante, colágeno, digestión y control
                de peso. Ingredientes y beneficios ilustrativos, listos para
                validarse con la marca.
              </p>
            </Reveal>

            <div className="mt-8 space-y-2.5">
              {list.map((product, index) => (
                <Reveal key={product.id} delay={0.18 + index * 0.06}>
                  <Link
                    href={`/tienda/${product.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-forest/10 bg-warm-white p-2.5 transition-colors hover:border-forest/25"
                  >
                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl">
                      <ProductVisual
                        product={product}
                        view={1}
                        className="aspect-auto h-full w-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.5rem] uppercase tracking-[0.18em] text-forest/40">
                        {product.category}
                      </p>
                      <p className="mt-1 font-serif text-base text-forest">
                        {product.name}
                      </p>
                    </div>
                    <span className="text-xs tabular-nums text-soft-black/60">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowIcon
                      size={14}
                      className="text-forest/25 transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.36}>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/complementos" variant="primary" size="lg">
                  Ver la línea de complementos
                  <ArrowIcon size={15} aria-hidden="true" />
                </ButtonLink>
                <p className="max-w-[16rem] text-[0.625rem] leading-5 text-soft-black/40">
                  No sustituyen una alimentación equilibrada ni un tratamiento
                  médico.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {showcase.map((product) => (
                <Link
                  key={product.id}
                  href={`/tienda/${product.slug}`}
                  className="group relative overflow-hidden rounded-[1.4rem] border border-forest/10 bg-warm-white"
                >
                  <ProductVisual
                    product={product}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-xl border border-forest/10 bg-warm-white/85 px-3 py-2 backdrop-blur-sm">
                    <span className="truncate font-serif text-sm text-forest">
                      {product.name}
                    </span>
                    <Icon icon="leaf" size={13} className="shrink-0 text-gold" />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
