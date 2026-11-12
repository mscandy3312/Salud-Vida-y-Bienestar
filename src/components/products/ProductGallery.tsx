"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { cn } from "@/lib/utils";

const views = [
  { value: 0 as const, label: "Frontal" },
  { value: 1 as const, label: "Detalle" },
  { value: 2 as const, label: "Ambiente" },
];

export function ProductGallery({ product }: { product: Product }) {
  const [view, setView] = useState<0 | 1 | 2>(0);

  return (
    <div>
      <div className="overflow-hidden rounded-[1.5rem] border border-forest/10 bg-cream">
        <ProductVisual
          product={product}
          view={view}
          className="transition-opacity duration-300"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex gap-1.5" role="group" aria-label="Vistas del producto">
          {views.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setView(item.value)}
              aria-pressed={view === item.value}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.12em] transition-colors",
                view === item.value
                  ? "border-forest bg-forest text-warm-white"
                  : "border-forest/12 text-forest/45 hover:border-forest/30",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-[0.5625rem] uppercase tracking-[0.14em] text-soft-black/28">
          Visual de demostración
        </p>
      </div>
    </div>
  );
}
