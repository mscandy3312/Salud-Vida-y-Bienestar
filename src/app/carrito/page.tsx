"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { formatMXN, multiplyCents, toCents } from "@/lib/money";
import { cartInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

export default function CartPage() {
  const { items, count, subtotal, updateQuantity, removeItem, clearCart, isHydrated } =
    useCart();
  const TrashIcon = uiIcons.trash;
  const CartIcon = uiIcons.shoppingCart;
  const ArrowIcon = uiIcons.arrowRight;
  const MessageIcon = uiIcons.message;

  const subtotalCents = toCents(subtotal);
  const whatsappMessage = cartInquiryMessage(
    items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    })),
  );

  return (
    <section className="bg-warm-white pb-24 pt-32 sm:pt-36">
      <div className="container-editorial">
        <div className="flex items-baseline justify-between gap-4 border-b border-forest/10 pb-6">
          <div>
            <span className="eyebrow text-forest/55">Tu selección</span>
            <h1 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">
              Carrito
            </h1>
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-soft-black/45">
            {count} {count === 1 ? "pieza" : "piezas"}
          </span>
        </div>

        {!isHydrated ? (
          <p className="py-20 text-center text-sm text-soft-black/45">
            Cargando tu selección…
          </p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-forest/15 text-forest/60">
              <CartIcon size={26} aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-serif text-2xl text-forest">
              Tu carrito está vacío
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-soft-black/55">
              Explora la colección y añade tus favoritos para continuar con tu
              pedido.
            </p>
            <ButtonLink href="/tienda" className="mt-8" variant="primary">
              Explorar productos
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
            <div>
              <ul className="space-y-6">
                {items.map((item) => (
                  <li
                    key={item.product.slug}
                    className="grid grid-cols-[6rem_1fr] gap-5 border-b border-soft-black/8 pb-6 last:border-none"
                  >
                    <Link
                      href={`/tienda/${item.product.slug}`}
                      className="block overflow-hidden rounded-xl"
                      aria-label={`Ver ${item.product.name}`}
                    >
                      <ProductVisual
                        product={item.product}
                        className="aspect-auto h-32 w-24 rounded-xl"
                      />
                    </Link>
                    <div className="flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-soft-black/42">
                            {item.product.category}
                          </p>
                          <Link
                            href={`/tienda/${item.product.slug}`}
                            className="mt-1 block font-serif text-lg text-forest hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-xs text-soft-black/45">
                            {item.product.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.slug)}
                          className="rounded-full p-1.5 text-soft-black/40 transition-colors hover:bg-beige hover:text-forest"
                          aria-label={`Quitar ${item.product.name} del carrito`}
                        >
                          <TrashIcon size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(quantity) =>
                            updateQuantity(item.product.slug, quantity)
                          }
                          label={`Cantidad de ${item.product.name}`}
                        />
                        <span className="text-sm font-medium text-soft-black">
                          {formatMXN(
                            multiplyCents(
                              toCents(item.product.price),
                              item.quantity,
                            ),
                          )}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[0.625rem] uppercase tracking-[0.18em] text-soft-black/40 underline decoration-soft-black/20 underline-offset-4 transition-colors hover:text-forest"
                >
                  Vaciar carrito
                </button>
                <Link
                  href="/tienda"
                  className="text-[0.625rem] uppercase tracking-[0.18em] text-forest/60 underline decoration-forest/20 underline-offset-4 transition-colors hover:text-forest"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-forest/12 bg-cream/50 p-6 sm:p-7">
              <h2 className="font-serif text-2xl text-forest">Resumen</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-soft-black/55">Subtotal</dt>
                  <dd className="font-medium text-soft-black">
                    {formatMXN(subtotalCents)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-soft-black/55">Envío</dt>
                  <dd className="text-soft-black/55">
                    {siteConfig.commerce.isShippingPlaceholder
                      ? "Por confirmar"
                      : formatMXN(siteConfig.commerce.shippingFlatCents)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-forest/12 pt-3">
                  <dt className="font-serif text-lg text-forest">Total estimado</dt>
                  <dd className="font-serif text-lg text-forest">
                    {formatMXN(subtotalCents)}
                  </dd>
                </div>
              </dl>

              <ButtonLink
                href="/checkout"
                variant="primary"
                size="lg"
                className="mt-6 w-full"
              >
                Continuar al checkout
                <ArrowIcon size={14} aria-hidden="true" />
              </ButtonLink>

              <ButtonLink
                href={whatsappUrl(whatsappMessage)}
                external
                variant="outline"
                size="md"
                className="mt-3 w-full"
              >
                <MessageIcon size={14} aria-hidden="true" />
                Pedir por WhatsApp
              </ButtonLink>

              <p className="mt-4 text-[0.625rem] leading-5 text-soft-black/45">
                Se abrirá WhatsApp con tu selección. No se procesa ningún pago en
                este paso.
              </p>

              <p className="mt-4 text-[0.625rem] leading-5 text-soft-black/45">
                {siteConfig.demo.priceNotice}
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
