"use client";

import type { Product } from "@/data/types";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useCart } from "@/components/cart/cart-context";
import { uiIcons } from "@/components/ui/Icon";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  label = "Añadir al carrito",
  variant = "primary",
  size = "lg",
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const BagIcon = uiIcons.shoppingCart;

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => addItem(product.slug, quantity)}
    >
      <BagIcon size={16} aria-hidden="true" />
      {label}
    </Button>
  );
}
