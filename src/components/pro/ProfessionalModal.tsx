"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { professionalModal, getProfessionalFeature } from "@/data/professional";
import { useProfessional } from "@/components/pro/professional-context";
import { Modal } from "@/components/ui/Modal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { whatsappUrl } from "@/lib/whatsapp";

export function ProfessionalModal() {
  const { open, featureKey, closeProfessional } = useProfessional();
  const reduceMotion = useReducedMotion();
  const feature = getProfessionalFeature(featureKey);
  const CheckIcon = uiIcons.checkCircle;
  const ArrowIcon = uiIcons.arrowUpRight;

  const message = `Hola, me interesa conocer la ${siteConfig.professional.name} para mi negocio.`;
  const benefits = [
    "Catálogo y contenidos gestionables",
    "Carrito y pedidos preparados para operar",
    "Panel visual y flujos de conversión",
    "Base escalable para pagos y logística",
  ];

  return (
    <Modal
      open={open}
      onClose={closeProfessional}
      labelledBy="professional-modal-title"
      placement="center"
      tone="dark"
      className="max-w-5xl border border-warm-white/10 bg-forest"
    >
      <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative px-6 pb-9 pt-10 sm:px-10 sm:pb-11 sm:pt-12 lg:px-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-gold-light">
              Demo comercial
            </span>
            <span className="text-[0.5625rem] uppercase tracking-[0.16em] text-warm-white/35">
              {siteConfig.professional.name}
            </span>
          </div>

          <p className="mt-7 text-[0.625rem] uppercase tracking-[0.24em] text-gold/75">
            Una mirada más amplia
          </p>
          <h2
            id="professional-modal-title"
            className="mt-4 max-w-lg font-serif text-[2rem] leading-[1.1] text-warm-white sm:text-[2.5rem]"
          >
            {professionalModal.title}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-warm-white/62">
            {professionalModal.description}
          </p>

          <div className="mt-6 rounded-2xl border border-warm-white/10 bg-warm-white/[0.045] p-4">
            <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-gold/70">
              Has explorado
            </p>
            <p className="mt-1.5 font-serif text-lg text-warm-white">
              {feature.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-warm-white/50">
              {feature.description}
            </p>
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-xs leading-5 text-warm-white/66"
              >
                <CheckIcon
                  size={15}
                  className="mt-0.5 shrink-0 text-gold/80"
                  aria-hidden="true"
                />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={whatsappUrl(message)}
              external
              variant="gold"
              size="lg"
            >
              {professionalModal.primaryCta}
              <ArrowIcon size={15} aria-hidden="true" />
            </ButtonLink>
            <Button
              variant="outline-light"
              size="lg"
              onClick={closeProfessional}
            >
              Seguir explorando
            </Button>
          </div>
          <p className="mt-5 text-[0.625rem] leading-5 text-warm-white/32">
            {professionalModal.note} No se envía ningún dato ni se inicia una
            contratación desde esta demo.
          </p>
        </div>

        <div className="relative hidden overflow-hidden border-l border-warm-white/10 bg-[#0C241A] p-8 lg:flex lg:flex-col lg:justify-center">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-warm-white/35">
              Vista conceptual
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-warm-white/12 bg-forest/80 shadow-2xl">
              <div className="flex items-center justify-between border-b border-warm-white/10 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-warm-white/20" />
                  <span className="h-1.5 w-1.5 rounded-full bg-warm-white/20" />
                </div>
                <span className="text-[0.5rem] uppercase tracking-[0.16em] text-warm-white/30">
                  Panel SVB
                </span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2.5">
                  {["Catálogo", "Pedidos", "Contenido", "Clientes"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className="rounded-xl border border-warm-white/8 bg-warm-white/[0.04] p-3"
                      >
                        <p className="text-[0.5rem] uppercase tracking-[0.14em] text-warm-white/35">
                          {label}
                        </p>
                        <div className="mt-3 flex h-8 items-end gap-1">
                          {[38, 62, 48, 80, 55].map((height, barIndex) => (
                            <motion.span
                              key={barIndex}
                              initial={reduceMotion ? false : { height: 0 }}
                              animate={{ height: `${Math.max(12, height - index * 4)}%` }}
                              transition={
                                reduceMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: 0.7,
                                      delay: 0.15 + barIndex * 0.06,
                                      ease: [0.22, 1, 0.36, 1],
                                    }
                              }
                              className="w-full rounded-sm bg-gold/35 last:bg-gold/70"
                            />
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-2.5 rounded-xl border border-warm-white/8 bg-warm-white/[0.04] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.5rem] uppercase tracking-[0.14em] text-warm-white/35">
                      Flujo de compra
                    </p>
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.4375rem] uppercase tracking-[0.12em] text-gold/80">
                      Demo
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {["Selección", "Carrito", "Pago", "Entrega"].map(
                      (step, index) => (
                        <div key={step} className="flex flex-1 items-center gap-1.5">
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              index < 2 ? "bg-gold" : "bg-warm-white/18"
                            }`}
                          />
                          <span className="text-[0.4375rem] uppercase tracking-[0.1em] text-warm-white/35">
                            {step}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-[0.5625rem] leading-4 text-warm-white/28">
              Representación ilustrativa. No refleja datos reales ni
              funcionalidad de producción.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
