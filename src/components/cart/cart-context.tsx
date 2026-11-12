"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/lib/config";
import { getProductBySlug } from "@/data/products";
import type { Product } from "@/data/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartLine {
  slug: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isHydrated: boolean;
  isOpen: boolean;
  lastAddedSlug: string | null;
  addItem: (slug: string, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function sanitizeLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((line) => {
      if (
        typeof line !== "object" ||
        line === null ||
        !("slug" in line) ||
        !("quantity" in line)
      ) {
        return null;
      }

      const slug = String(line.slug);
      const quantity = Number(line.quantity);

      if (!getProductBySlug(slug) || !Number.isFinite(quantity)) return null;

      return { slug, quantity: Math.min(Math.max(Math.round(quantity), 1), 99) };
    })
    .filter((line): line is CartLine => line !== null);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedSlug, setLastAddedSlug] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadTimer = window.setTimeout(() => {
      if (cancelled) return;

      try {
        const raw = window.localStorage.getItem(siteConfig.conversion.cartStorageKey);
        setLines(raw ? sanitizeLines(JSON.parse(raw) as unknown) : []);
      } catch {
        setLines([]);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        siteConfig.conversion.cartStorageKey,
        JSON.stringify(lines),
      );
    } catch {
      // La demo sigue funcionando aunque el almacenamiento no esté disponible.
    }
  }, [isHydrated, lines]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setLastAddedSlug(null);
  }, []);

  const addItem = useCallback((slug: string, quantity = 1) => {
    if (!getProductBySlug(slug)) return;

    setLines((previous) => {
      const existing = previous.find((line) => line.slug === slug);
      if (existing) {
        return previous.map((line) =>
          line.slug === slug
            ? { ...line, quantity: Math.min(line.quantity + quantity, 99) }
            : line,
        );
      }
      return [...previous, { slug, quantity: Math.min(Math.max(quantity, 1), 99) }];
    });

    setLastAddedSlug(slug);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setLastAddedSlug(null), 4200);
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((previous) => previous.filter((line) => line.slug !== slug));
      return;
    }

    setLines((previous) =>
      previous.map((line) =>
        line.slug === slug
          ? { ...line, quantity: Math.min(Math.round(quantity), 99) }
          : line,
      ),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((previous) => previous.filter((line) => line.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const items = useMemo<CartItem[]>(
    () =>
      lines.flatMap((line) => {
        const product = getProductBySlug(line.slug);
        return product ? [{ product, quantity: line.quantity }] : [];
      }),
    [lines],
  );

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      isHydrated,
      isOpen,
      lastAddedSlug,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      dismissToast,
    }),
    [
      items,
      count,
      subtotal,
      isHydrated,
      isOpen,
      lastAddedSlug,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      dismissToast,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider");
  }
  return context;
}
