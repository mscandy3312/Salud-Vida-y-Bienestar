"use client";

import { Modal } from "@/components/ui/Modal";
import { QuoteCalculator } from "@/components/pricing/QuoteCalculator";

interface DevelopmentQuoteModalProps {
  open: boolean;
  onClose: () => void;
  initialPackageId?: string;
}

export function DevelopmentQuoteModal({
  open,
  onClose,
  initialPackageId,
}: DevelopmentQuoteModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="development-quote-title"
      placement="center"
      tone="light"
      className="max-w-4xl bg-warm-white"
    >
      <div className="px-6 pb-10 pt-11 sm:px-10 sm:pb-12 sm:pt-12">
        <p className="text-[0.625rem] uppercase tracking-[0.24em] text-forest/45">
          Cotizador
        </p>
        <h2
          id="development-quote-title"
          className="mt-3 font-serif text-3xl text-forest sm:text-4xl"
        >
          Cotiza tu plataforma
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-soft-black/60">
          Selecciona un paquete y un plan de mantenimiento. Los importes se
          calculan con los parámetros comerciales configurados; no son precios
          del catálogo de productos.
        </p>

        <div className="mt-8">
          <QuoteCalculator
            initialPackageId={initialPackageId}
            showCards
          />
        </div>
      </div>
    </Modal>
  );
}
