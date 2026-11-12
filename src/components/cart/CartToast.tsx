"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/components/cart/cart-context";
import { uiIcons } from "@/components/ui/Icon";

export function CartToast() {
  const { lastAddedSlug, openCart, dismissToast } = useCart();
  const reduceMotion = useReducedMotion();
  const product = lastAddedSlug ? getProductBySlug(lastAddedSlug) : null;
  const CloseIcon = uiIcons.close;
  const BagIcon = uiIcons.shoppingCart;

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-4 z-[75] w-[calc(100%-2rem)] max-w-sm sm:left-6"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-warm-white/95 p-3 shadow-card backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-warm-white">
              <BagIcon size={16} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-forest/50">
                Añadido al carrito
              </p>
              <p className="truncate text-sm text-soft-black">{product.name}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                dismissToast();
                openCart();
              }}
              className="shrink-0 rounded-full bg-beige/70 px-3 py-2 text-[0.5625rem] font-medium uppercase tracking-[0.14em] text-forest transition-colors hover:bg-beige"
            >
              Ver
            </button>
            <button
              type="button"
              onClick={dismissToast}
              className="shrink-0 rounded-full p-1.5 text-soft-black/35 transition-colors hover:text-forest"
              aria-label="Cerrar aviso"
            >
              <CloseIcon size={14} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
