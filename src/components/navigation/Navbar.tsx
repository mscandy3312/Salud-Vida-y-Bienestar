"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mainNav } from "@/data/navigation";
import { useCart } from "@/components/cart/cart-context";
import { BrandMark } from "@/components/brand/BrandMark";
import { uiIcons } from "@/components/ui/Icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { count, isHydrated, openCart } = useCart();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  const SearchIcon = uiIcons.search;
  const CartIcon = uiIcons.shoppingCart;
  const MenuIcon = uiIcons.menu;
  const CloseIcon = uiIcons.close;
  const ArrowIcon = uiIcons.arrowUpRight;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.overlay = "true";
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.overlay;
    };
  }, [menuOpen]);

  const iconClass = cn(
    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
    transparent
      ? "text-warm-white/80 hover:bg-warm-white/10 hover:text-warm-white"
      : "text-forest/70 hover:bg-forest/6 hover:text-forest",
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          transparent
            ? "bg-transparent py-2"
            : "border-b border-forest/8 bg-warm-white/92 py-0 shadow-[0_8px_30px_-24px_rgba(21,59,42,0.35)] backdrop-blur-xl",
        )}
      >
        <div className="container-editorial">
          <div className="flex h-[4.5rem] items-center justify-between gap-4">
            <Link
              href="/"
              className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              aria-label="Salud Vida y Bienestar, inicio"
            >
              <BrandMark tone={transparent ? "light" : "dark"} />
            </Link>

            <nav
              aria-label="Navegación principal"
              className="hidden items-center gap-0.5 lg:flex"
            >
              {mainNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href.split("#")[0]);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.75rem] font-medium tracking-[0.01em] transition-colors",
                      transparent
                        ? active
                          ? "text-warm-white"
                          : "text-warm-white/62 hover:text-warm-white"
                        : active
                          ? "text-forest"
                          : "text-soft-black/55 hover:text-forest",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {active ? (
                      <span
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-px",
                          transparent ? "bg-gold/80" : "bg-forest/40",
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1">
              <Link
                href="/tienda"
                className={cn(iconClass, "hidden sm:flex")}
                aria-label="Buscar productos en la tienda"
              >
                <SearchIcon size={17} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={openCart}
                className={cn(iconClass, "relative")}
                aria-label={`Abrir carrito${isHydrated && count > 0 ? `, ${count} artículos` : ""}`}
              >
                <CartIcon size={18} aria-hidden="true" />
                {isHydrated && count > 0 ? (
                  <span className="absolute right-0.5 top-0.5 flex h-[1.05rem] min-w-[1.05rem] items-center justify-center rounded-full bg-gold px-1 text-[0.5625rem] font-semibold leading-none text-forest">
                    {count > 9 ? "9+" : count}
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className={cn(iconClass, "lg:hidden")}
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <MenuIcon size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[80] flex flex-col bg-forest text-warm-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="grain absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="container-editorial relative flex h-[4.5rem] shrink-0 items-center justify-between">
              <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Inicio">
                <BrandMark tone="light" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-warm-white/75 transition-colors hover:bg-warm-white/10 hover:text-warm-white"
                aria-label="Cerrar menú"
              >
                <CloseIcon size={21} aria-hidden="true" />
              </button>
            </div>

            <div className="container-editorial relative flex flex-1 flex-col justify-between overflow-y-auto pb-10 pt-8">
              <nav aria-label="Navegación móvil">
                <ul className="space-y-1">
                  {mainNav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.4,
                        delay: reduceMotion ? 0 : 0.06 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between border-b border-warm-white/10 py-4 font-serif text-[1.75rem] leading-tight text-warm-white/90 transition-colors hover:text-gold-light"
                      >
                        {item.label}
                        <ArrowIcon
                          size={18}
                          className="text-warm-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 space-y-5">
                <div className="flex flex-col gap-1 text-xs leading-6 text-warm-white/45">
                  <a
                    href={whatsappUrl("Hola, me gustaría más información.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit underline decoration-warm-white/20 underline-offset-4 hover:text-warm-white"
                  >
                    Escríbenos por WhatsApp
                  </a>
                  <span>{siteConfig.contact.address.value}</span>
                  <span>{siteConfig.demo.label}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
