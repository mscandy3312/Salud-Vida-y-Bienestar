"use client";

import type { Product } from "@/data/types";
import { useCart } from "@/components/cart/cart-context";
import { uiIcons } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface QuickAddButtonProps {
  product: Product;
  className?: string;
}

export function QuickAddButton({ product, className }: QuickAddButtonProps) {
  const { addItem } = useCart();
  const PlusIcon = uiIcons.plus;

  return (
    <button
      type="button"
      onClick={() => addItem(product.slug, 1)}
      aria-label={`Añadir ${product.name} al carrito`}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/60 bg-warm-white/90 text-forest shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-forest hover:text-warm-white",
        className,
      )}
    >
      <PlusIcon size={16} aria-hidden="true" />
    </button>
  );
}
