import Link from "next/link";
import type { Product } from "@/data/types";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { QuickAddButton } from "@/components/products/QuickAddButton";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={cn("group flex flex-col", className)}>
      <div className="relative overflow-hidden rounded-[1.35rem] border border-forest/8 bg-cream">
        <Link
          href={`/tienda/${product.slug}`}
          className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          aria-label={`Ver ${product.name}`}
        >
          <ProductVisual
            product={product}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.isVegan ? (
              <span className="rounded-full bg-forest/90 px-2.5 py-1 text-[0.5rem] font-medium uppercase tracking-[0.14em] text-warm-white backdrop-blur-sm">
                Vegan
              </span>
            ) : null}
            {product.isNew ? (
              <span className="rounded-full bg-gold/95 px-2.5 py-1 text-[0.5rem] font-medium uppercase tracking-[0.14em] text-soft-black">
                Nuevo
              </span>
            ) : null}
          </div>
          {product.badge ? (
            <span className="rounded-full border border-forest/10 bg-warm-white/85 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.12em] text-forest/65 backdrop-blur-sm">
              {product.badge}
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-3 right-3">
          <QuickAddButton product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-0.5 pt-4">
        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-soft-black/42">
          {product.category}
        </p>
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <Link
            href={`/tienda/${product.slug}`}
            className="font-serif text-lg leading-snug text-forest transition-colors hover:text-primary-green"
          >
            {product.name}
          </Link>
          <span className="shrink-0 pt-0.5 text-sm font-medium tabular-nums text-soft-black/80">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-1 text-xs leading-5 text-soft-black/48">
          {product.tagline}
        </p>
      </div>
    </article>
  );
}
