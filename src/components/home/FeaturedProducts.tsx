import { featuredProducts } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { uiIcons } from "@/components/ui/Icon";

export function FeaturedProducts() {
  const ArrowIcon = uiIcons.arrowRight;

  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="La colección"
          title={
            <>
              Objetos de ritual,
              <br />
              <span className="italic text-forest/55">elegidos con intención.</span>
            </>
          }
          description="Una selección demostrativa de cuidado facial, corporal y accesorios. Texturas, aromas y precios ilustrativos que anticipan el universo de la marca."
          aside={
            <ButtonLink href="/tienda" variant="outline" size="md">
              Ver toda la tienda
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          }
        />

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <Reveal key={product.id} delay={index * 0.07}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-forest/8 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-lg text-xs leading-6 text-soft-black/42">
            Los productos mostrados son ejemplos de catálogo. No representan
            inventario, formulaciones ni disponibilidad real.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.625rem] uppercase tracking-[0.16em] text-forest/50">
            <span>Envío demo</span>
            <span className="h-3 w-px bg-forest/15" />
            <span>Selección vegan</span>
            <span className="h-3 w-px bg-forest/15" />
            <span>Compra asistida</span>
          </div>
        </div>
      </div>
    </section>
  );
}
