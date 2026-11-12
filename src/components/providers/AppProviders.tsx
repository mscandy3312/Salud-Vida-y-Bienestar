"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart/cart-context";
import { ProfessionalProvider } from "@/components/pro/professional-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ProfessionalProvider>{children}</ProfessionalProvider>
    </CartProvider>
  );
}
