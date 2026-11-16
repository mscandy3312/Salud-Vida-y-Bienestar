"use client";

import { useState } from "react";
import { DevelopmentQuoteModal } from "@/components/modals/DevelopmentQuoteModal";
import { QuoteCalculator } from "@/components/pricing/QuoteCalculator";
import { Button } from "@/components/ui/Button";

export function PresentationExperience() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <div>
        <Button variant="primary" size="lg" onClick={() => setQuoteOpen(true)}>
          Abrir cotizador
        </Button>
      </div>

      <QuoteCalculator className="mt-10" showCards />

      <DevelopmentQuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  );
}
