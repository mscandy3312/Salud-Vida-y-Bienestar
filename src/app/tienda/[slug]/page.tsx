import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchase } from "@/components/products/ProductPurchase";
import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { formatNumber } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return buildMetadata({
      title: "Producto no encontrado",
      description: "El producto solicitado no existe en esta demostración.",
      path: `/tienda/${slug}`,
    });
  }

  return buildMetadata({
    title: product.name,
    description: `${product.tagline} ${product.description}`,
    path: `/tienda/${product.slug}`,
    keywords: [product.category, product.name],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const ArrowIcon = uiIcons.arrowRight;
  const CheckIcon = uiIcons.checkCircle;
  const ChevronIcon = uiIcons.chevronDown;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: "Salud Vida y Bienestar" },
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: product.price,
      availability: "https://schema.org/InStock",
      description: "Precio ilustrativo de demostración",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-warm-white pb-16 pt-28 sm:pt-32">
        <div className="container-editorial">
          <nav
            aria-label="Ruta de navegación"
            className="flex flex-wrap items-center gap-2 text-[0.5625rem] uppercase tracking-[0.16em] text-soft-black/35"
          >
            <Link href="/" className="transition-colors hover:text-forest">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/tienda" className="transition-colors hover:text-forest">
              Tienda
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-forest/60">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductGallery product={product} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow text-forest/55">{product.category}</span>
                {product.isVegan ? (
                  <span className="rounded-full bg-forest px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.14em] text-warm-white">
                    Vegan demo
                  </span>
                ) : null}
                {product.isNew ? (
                  <span className="rounded-full bg-gold/90 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.14em] text-soft-black">
                    Nuevo
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 font-serif text-4xl leading-[1.02] text-forest sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 font-serif text-lg italic leading-snug text-forest/55">
                {product.tagline}
              </p>

              <p className="mt-6 max-w-lg text-sm leading-7 text-soft-black/55">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="inline-flex items-center gap-1.5 rounded-full border border-forest/10 bg-cream/60 px-3 py-1.5 text-[0.625rem] text-forest/60"
                  >
                    <Icon icon="leaf" size={12} className="text-gold" />
                    {note}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-y border-forest/10 py-3 text-xs text-soft-black/45">
                <span>{product.size}</span>
                <span className="text-[0.5625rem] uppercase tracking-[0.14em]">
                  Ref. {product.id.toUpperCase()} · demo
                </span>
              </div>

              <div className="mt-7">
                <ProductPurchase product={product} />
              </div>

              <div className="mt-8 divide-y divide-forest/10 border-y border-forest/10">
                <details className="group py-4" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.14em] text-forest/65">
                    Cómo usarlo
                    <ChevronIcon
                      size={14}
                      className="transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 max-w-md text-xs leading-6 text-soft-black/45">
                    {product.usage ??
                      "Esta ficha es una demostración. La marca deberá indicar el modo de uso, la frecuencia y las precauciones reales de cada producto antes de publicarlo."}
                  </p>
                </details>
                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.14em] text-forest/65">
                    Envíos y devoluciones
                    <ChevronIcon
                      size={14}
                      className="transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 max-w-md text-xs leading-6 text-soft-black/45">
                    No existe logística activa en esta demo. Los costos, tiempos,
                    cobertura y políticas de devolución deberán definirse antes de
                    operar.
                  </p>
                </details>
                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.14em] text-forest/65">
                    Información de demostración
                    <ChevronIcon
                      size={14}
                      className="transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 max-w-md text-xs leading-6 text-soft-black/45">
                    Nombre, precio, tamaño, notas y descripción son ilustrativos.
                    No se declaran certificaciones, propiedades terapéuticas ni
                    resultados.
                  </p>
                </details>
              </div>

              {product.benefits?.length || product.ingredients?.length ? (
                <div className="mt-8 grid gap-6 border-t border-forest/10 pt-6 sm:grid-cols-2">
                  {product.benefits?.length ? (
                    <div>
                      <h2 className="text-[0.5625rem] uppercase tracking-[0.18em] text-forest/45">
                        Beneficios
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {product.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2 text-xs leading-6 text-soft-black/55"
                          >
                            <Icon
                              icon="check"
                              size={13}
                              className="mt-1 shrink-0 text-gold"
                            />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {product.ingredients?.length ? (
                    <div>
                      <h2 className="text-[0.5625rem] uppercase tracking-[0.18em] text-forest/45">
                        Ingredientes
                      </h2>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {product.ingredients.map((ingredient) => (
                          <li
                            key={ingredient}
                            className="rounded-full border border-forest/10 bg-cream/60 px-2.5 py-1 text-[0.625rem] text-forest/55"
                          >
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-cream/60 p-4 text-[0.625rem] leading-5 text-soft-black/40">
                <CheckIcon size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {product.badge
                    ? `Etiqueta de demostración: ${product.badge}. `
                    : "Producto de demostración. "}
                  {formatNumber(product.price)} MXN es un precio ilustrativo, no una
                  oferta final.
                  {product.category === "Complementos"
                    ? " Los complementos alimenticios no sustituyen una alimentación equilibrada ni un tratamiento médico."
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-forest/8 bg-cream/50 py-16 sm:py-20">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow text-forest/50">También puede interesarte</span>
              <h2 className="mt-3 font-serif text-3xl text-forest sm:text-4xl">
                Completa tu ritual.
              </h2>
            </div>
            <ButtonLink href="/tienda" variant="outline" size="md">
              Ver todo el catálogo
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
