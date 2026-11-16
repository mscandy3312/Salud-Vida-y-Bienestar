"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { Modal } from "@/components/ui/Modal";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { cartInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const TrashIcon = uiIcons.trash;
  const CartIcon = uiIcons.shoppingCart;

  const message = cartInquiryMessage(
    items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    })),
  );

  return (
    <Modal
      open={isOpen}
      onClose={closeCart}
      labelledBy="cart-title"
      placement="right"
      tone="light"
      className="bg-warm-white"
    >
      <div className="flex min-h-full flex-col">
        <header className="border-b border-soft-black/10 px-6 pb-6 pt-7 pr-16 sm:px-8 sm:pr-20">
          <span className="eyebrow text-forest/55">Tu selección</span>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <h2 id="cart-title" className="font-serif text-3xl text-forest">
              Carrito
            </h2>
            <span className="text-xs uppercase tracking-[0.18em] text-soft-black/45">
              {count} {count === 1 ? "pieza" : "piezas"}
            </span>
          </div>
          <p className="mt-3 text-xs leading-5 text-soft-black/50">
            Versión demo de prueba. Los precios son ilustrativos; no se cobra en
            este sitio.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-forest/15 text-forest/60">
              <CartIcon size={26} aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-forest">
              Tu carrito está vacío
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-soft-black/55">
              Explora la colección y añade tus favoritos para probar la
              experiencia de compra.
            </p>
            <ButtonLink
              href="/tienda"
              onClick={closeCart}
              className="mt-8"
              variant="primary"
            >
              Explorar productos
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 px-6 py-6 sm:px-8">
              <ul className="space-y-5">
                {items.map((item) => (
                  <li
                    key={item.product.slug}
                    className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-soft-black/8 pb-5 last:border-none last:pb-0"
                  >
                    <Link
                      href={`/tienda/${item.product.slug}`}
                      onClick={closeCart}
                      className="block overflow-hidden rounded-xl"
                      aria-label={`Ver ${item.product.name}`}
                    >
                      <ProductVisual
                        product={item.product}
                        className="aspect-auto h-[5.5rem] w-[4.5rem] rounded-xl"
                      />
                    </Link>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-soft-black/42">
                            {item.product.category}
                          </p>
                          <Link
                            href={`/tienda/${item.product.slug}`}
                            onClick={closeCart}
                            className="mt-1 block font-serif text-base leading-5 text-forest hover:underline"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.slug)}
                          className="rounded-full p-1.5 text-soft-black/40 transition-colors hover:bg-beige hover:text-forest"
                          aria-label={`Quitar ${item.product.name} del carrito`}
                        >
                          <TrashIcon size={15} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(quantity) =>
                            updateQuantity(item.product.slug, quantity)
                          }
                          compact
                          label="Cantidad"
                        />
                        <span className="text-sm font-medium text-soft-black">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={clearCart}
                className="mt-6 text-[0.625rem] uppercase tracking-[0.18em] text-soft-black/40 underline decoration-soft-black/20 underline-offset-4 transition-colors hover:text-forest"
              >
                Vaciar carrito
              </button>
            </div>

            <footer className="border-t border-soft-black/10 bg-cream/60 px-6 py-6 sm:px-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.625rem] uppercase tracking-[0.18em] text-soft-black/45">
                    Subtotal ilustrativo
                  </p>
                  <p className="mt-1 font-serif text-3xl text-forest">
                    {formatPrice(subtotal)}
                  </p>
                </div>
                <span className="rounded-full border border-forest/15 px-3 py-1 text-[0.5625rem] uppercase tracking-[0.16em] text-forest/60">
                  MXN · prueba
                </span>
              </div>
              <p className="mt-3 text-[0.6875rem] leading-5 text-soft-black/45">
                {siteConfig.demo.priceNotice}
              </p>
              <div className="mt-5 grid gap-3">
                <ButtonLink
                  href="/checkout"
                  onClick={closeCart}
                  variant="primary"
                  size="lg"
                >
                  Continuar con el pedido
                </ButtonLink>
                <ButtonLink
                  href={whatsappUrl(message)}
                  external
                  variant="outline"
                  size="md"
                >
                  Consultar esta selección por WhatsApp
                </ButtonLink>
              </div>
              <p className="mt-4 text-center text-[0.625rem] leading-4 text-soft-black/35">
                El pedido se prepara para enviarse por WhatsApp. No se cobra en
                este sitio.
              </p>
            </footer>
          </>
        )}
      </div>
    </Modal>
  );
}
