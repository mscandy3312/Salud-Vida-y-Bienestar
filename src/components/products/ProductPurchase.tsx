"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { useCart } from "@/components/cart/cart-context";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { Button, ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { productInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const BagIcon = uiIcons.shoppingCart;

  return (
    <div>
      <div className="flex items-end gap-3">
        <p className="font-serif text-3xl text-forest">{formatPrice(product.price)}</p>
        <span className="pb-1 text-[0.5625rem] uppercase tracking-[0.16em] text-soft-black/35">
          MXN · demo
        </span>
      </div>
      <p className="mt-2 text-[0.6875rem] leading-5 text-soft-black/42">
        {siteConfig.demo.priceNotice}
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <QuantityStepper value={quantity} onChange={setQuantity} label="Cantidad" />
        <Button
          size="lg"
          className="flex-1"
          onClick={() => addItem(product.slug, quantity)}
        >
          <BagIcon size={16} aria-hidden="true" />
          Añadir al carrito
        </Button>
      </div>

      <div className="mt-3">
        <ButtonLink
          href={whatsappUrl(productInquiryMessage(product))}
          external
          variant="outline"
          size="lg"
          className="w-full"
        >
          Consultar por WhatsApp
        </ButtonLink>
      </div>

      <p className="mt-4 text-[0.625rem] leading-5 text-soft-black/35">
        Compra de demostración. No se procesan pagos ni se generan pedidos reales.
      </p>
    </div>
  );
}
