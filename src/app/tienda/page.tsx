import type { Metadata } from "next";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Tienda",
  description:
    "Catálogo demostrativo de belleza y cuidado personal: cuidado facial, corporal, cabello, selección VEGAN y accesorios. Precios ilustrativos.",
  path: "/tienda",
  keywords: ["tienda de belleza", "cosmética natural", "cuidado facial"],
});

export default function ShopPage() {
  const ArrowIcon = uiIcons.arrowUpRight;

  return (
    <>
      <PageHero
        eyebrow="Tienda"
        title={
          <>
            El catálogo de rituales,
            <br />
            <span className="italic text-gold-light">objetos y texturas.</span>
          </>
        }
        description="Explora una selección demostrativa de productos de belleza y cuidado personal. Filtra por universo, busca una nota olfativa o descubre la línea VEGAN."
        aside={
          <div className="rounded-[1.5rem] border border-warm-white/10 bg-warm-white/[0.04] p-6 backdrop-blur-sm">
            <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
              Catálogo demo
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-serif text-3xl text-warm-white">28</p>
                <p className="mt-1 text-[0.5625rem] uppercase tracking-[0.14em] text-warm-white/35">
                  Productos
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-warm-white">
                  {products.filter((product) => product.isVegan).length}
                </p>
                <p className="mt-1 text-[0.5625rem] uppercase tracking-[0.14em] text-warm-white/35">
                  Vegan demo
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-warm-white/10 pt-4">
              <p className="text-[0.625rem] leading-5 text-warm-white/35">
                Los precios y la disponibilidad son ilustrativos. No representan
                una oferta comercial final.
              </p>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="/vegan" variant="gold" size="md">
            Ver línea VEGAN
            <ArrowIcon size={14} aria-hidden="true" />
          </ButtonLink>
          <a
            href={whatsappUrl(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/45 underline decoration-warm-white/20 underline-offset-4 transition-colors hover:text-warm-white"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </PageHero>

      <ProductCatalog products={products} />
    </>
  );
}
