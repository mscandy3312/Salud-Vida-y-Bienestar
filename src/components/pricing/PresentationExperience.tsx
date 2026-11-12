"use client";

import { useState } from "react";
import {
  ProfessionalUnlockModal,
  useProfessionalUnlock,
} from "@/components/modals/ProfessionalUnlockModal";
import { DevelopmentQuoteModal } from "@/components/modals/DevelopmentQuoteModal";
import { QuoteCalculator } from "@/components/pricing/QuoteCalculator";
import { Button } from "@/components/ui/Button";

export function PresentationExperience() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const unlock = useProfessionalUnlock({ autoOpenAfterMs: 9_000 });

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button variant="primary" size="lg" onClick={() => setQuoteOpen(true)}>
          Abrir cotizador
        </Button>
        <Button variant="outline" size="lg" onClick={unlock.openNow}>
          Ver la invitación Profesional
        </Button>
      </div>

      <QuoteCalculator className="mt-10" showCards />

      <ProfessionalUnlockModal
        open={unlock.open}
        onClose={unlock.close}
        onPrimary={() => {
          unlock.close();
          setQuoteOpen(true);
        }}
      />
      <DevelopmentQuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  );
}
