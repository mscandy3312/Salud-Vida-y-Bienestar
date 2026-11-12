"use client";

import { useCart } from "@/components/cart/cart-context";
import { cartInquiryMessage, whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const { items, isHydrated } = useCart();
  const hasSelection = isHydrated && items.length > 0;

  const message = hasSelection
    ? cartInquiryMessage(
        items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
      )
    : whatsappMessages.general;

  const label = hasSelection
    ? "Enviar tu selección por WhatsApp"
    : "Escríbenos por WhatsApp";

  return (
    <div className="group fixed bottom-5 right-4 z-[60] sm:bottom-6 sm:right-6">
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[#1F5E45] text-warm-white shadow-[0_10px_30px_-10px_rgba(21,59,42,0.65)] transition-all duration-300 hover:scale-105 hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-14 sm:w-14"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.21-8.23 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
      </a>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-forest px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-warm-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {hasSelection ? "Pedido" : "WhatsApp"}
      </span>
    </div>
  );
}
