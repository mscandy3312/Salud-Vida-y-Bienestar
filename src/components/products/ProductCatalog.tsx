"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/data/types";
import { productCategories } from "@/data/types";
import { ProductCard } from "@/components/products/ProductCard";
import { uiIcons } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const sortLabels: Record<SortOption, string> = {
  featured: "Selección editorial",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  name: "Nombre A–Z",
};

export function ProductCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const [veganOnly, setVeganOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const SearchIcon = uiIcons.search;
  const SlidersIcon = uiIcons.sliders;
  const CloseIcon = uiIcons.close;
  const ChevronIcon = uiIcons.chevronDown;

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = products.filter((product) => {
      if (category !== "Todos" && product.category !== category) return false;
      if (veganOnly && !product.isVegan) return false;
      if (
        normalized &&
        !`${product.name} ${product.category} ${product.tagline} ${product.notes.join(" ")}`
          .toLowerCase()
          .includes(normalized)
      ) {
        return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name, "es");
      return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
    });
  }, [category, products, query, sort, veganOnly]);

  const hasFilters = category !== "Todos" || query.length > 0 || veganOnly;

  function resetFilters() {
    setCategory("Todos");
    setQuery("");
    setVeganOnly(false);
    setSort("featured");
  }

  return (
    <section className="bg-warm-white py-14 sm:py-20">
      <div className="container-editorial">
        <div className="rounded-[1.4rem] border border-forest/10 bg-cream/40 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <SearchIcon
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-forest/35"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar producto, categoría o nota..."
                aria-label="Buscar productos"
                className="h-11 w-full rounded-full border border-forest/12 bg-warm-white pl-10 pr-10 text-xs text-soft-black outline-none transition-colors placeholder:text-soft-black/30 focus:border-forest/40"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-soft-black/40 hover:text-forest"
                >
                  <CloseIcon size={13} aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setVeganOnly((value) => !value)}
                aria-pressed={veganOnly}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[0.625rem] font-medium uppercase tracking-[0.14em] transition-colors",
                  veganOnly
                    ? "border-forest bg-forest text-warm-white"
                    : "border-forest/15 text-forest/60 hover:border-forest/35",
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                Solo vegan
              </button>
              <label className="relative">
                <span className="sr-only">Ordenar productos</span>
                <SlidersIcon
                  size={14}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/35"
                  aria-hidden="true"
                />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="h-9 appearance-none rounded-full border border-forest/15 bg-warm-white pl-9 pr-8 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-forest/65 outline-none focus:border-forest/40"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                    <option key={option} value={option}>
                      {sortLabels[option]}
                    </option>
                  ))}
                </select>
                <ChevronIcon
                  size={12}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-forest/35"
                  aria-hidden="true"
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-forest/8 pt-4">
            <button
              type="button"
              onClick={() => setCategory("Todos")}
              aria-pressed={category === "Todos"}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] transition-colors",
                category === "Todos"
                  ? "bg-forest text-warm-white"
                  : "text-forest/50 hover:bg-warm-white hover:text-forest",
              )}
            >
              Todos
            </button>
            {productCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] transition-colors",
                  category === item
                    ? "bg-forest text-warm-white"
                    : "text-forest/50 hover:bg-warm-white hover:text-forest",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs text-soft-black/42" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"} de
            demostración
          </p>
          {hasFilters ? (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Limpiar filtros
            </Button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-14 rounded-[1.4rem] border border-dashed border-forest/20 px-6 py-20 text-center">
            <p className="font-serif text-2xl text-forest">Sin resultados</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-soft-black/45">
              Prueba con otra categoría, desactiva el filtro vegan o busca un
              término más amplio.
            </p>
            <Button className="mt-6" variant="outline" onClick={resetFilters}>
              Ver todo el catálogo
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
