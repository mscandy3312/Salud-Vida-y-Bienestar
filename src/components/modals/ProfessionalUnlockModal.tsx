"use client";

import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { professionalModal } from "@/data/professional";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/data/types";

const BENEFITS: Array<{ label: string; icon: IconName }> = [
  { label: "Tienda en línea", icon: "shopping-bag" },
  { label: "Carrito de compras", icon: "layers" },
  { label: "Pagos digitales", icon: "card" },
  { label: "Administración", icon: "shield" },
  { label: "Pedidos", icon: "package" },
  { label: "Inventario", icon: "boxes" },
  { label: "Reportes", icon: "chart" },
];

interface UseProfessionalUnlockOptions {
  enabled?: boolean;
  autoOpenAfterMs?: number;
  storageKey?: string;
  cooldownMs?: number;
}

/**
 * Controla la invitación comercial: temporizador de navegación, control de
 * frecuencia por `sessionStorage` y estado del modal. Es una invitación, no un
 * bloqueo: el usuario siempre puede cerrarla y seguir navegando.
 */
export function useProfessionalUnlock(options: UseProfessionalUnlockOptions = {}) {
  const {
    enabled = siteConfig.conversion.autoInviteEnabled,
    autoOpenAfterMs = siteConfig.conversion.autoInviteDelayMs,
    storageKey = siteConfig.conversion.sessionKey,
    cooldownMs = siteConfig.conversion.cooldownMs,
  } = options;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let recentlyDismissed = false;
    try {
      const raw = window.sessionStorage.getItem(storageKey);
      if (raw) {
        const timestamp = Number(raw);
        if (Number.isFinite(timestamp) && Date.now() - timestamp < cooldownMs) {
          recentlyDismissed = true;
        }
      }
    } catch {
      // Sin almacenamiento disponible: se comporta como primera visita.
    }

    if (recentlyDismissed) return;

    const timer = window.setTimeout(() => setOpen(true), autoOpenAfterMs);
    return () => window.clearTimeout(timer);
  }, [enabled, autoOpenAfterMs, storageKey, cooldownMs]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Ignorar: el control de frecuencia es una mejora, no un requisito.
    }
  }, [storageKey]);

  const openNow = useCallback(() => setOpen(true), []);

  return { open, openNow, close };
}

interface ProfessionalUnlockModalProps {
  open: boolean;
  onClose: () => void;
  onPrimary?: () => void;
}

export function ProfessionalUnlockModal({
  open,
  onClose,
  onPrimary,
}: ProfessionalUnlockModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="professional-unlock-title"
      placement="center"
      tone="dark"
      className="max-w-2xl border border-warm-white/10 bg-forest"
    >
      <div className="px-6 pb-9 pt-11 sm:px-10 sm:pb-10 sm:pt-12">
        <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-gold-light">
          {siteConfig.professional.name}
        </span>

        <h2
          id="professional-unlock-title"
          className="mt-6 max-w-lg font-serif text-[1.75rem] leading-[1.15] text-warm-white sm:text-[2.25rem]"
        >
          {professionalModal.title}
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-warm-white/62">
          {professionalModal.description}
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit.label}
              className="flex items-center gap-3 rounded-xl border border-warm-white/8 bg-warm-white/[0.04] px-3.5 py-3 text-xs text-warm-white/72"
            >
              <Icon icon={benefit.icon} size={16} className="text-gold/80" />
              {benefit.label}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="gold" size="lg" onClick={onPrimary ?? onClose}>
            Conocer la plataforma Profesional
          </Button>
          <Button variant="outline-light" size="lg" onClick={onClose}>
            Continuar explorando
          </Button>
        </div>

        <p className="mt-5 text-[0.625rem] leading-5 text-warm-white/32">
          {professionalModal.note} Es una invitación; puedes cerrarla y seguir
          navegando sin restricciones.
        </p>
      </div>
    </Modal>
  );
}
