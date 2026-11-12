"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/config";
import { useProfessional } from "@/components/pro/professional-context";

export function ProfessionalAutoInvite() {
  const { openProfessional } = useProfessional();

  useEffect(() => {
    if (!siteConfig.conversion.autoInviteEnabled) return;

    const autoKey = `${siteConfig.conversion.sessionKey}:auto`;
    const now = Date.now();

    try {
      if (window.sessionStorage.getItem(autoKey)) return;
      const raw = window.localStorage.getItem(siteConfig.conversion.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { lastShownAt?: number };
        if (
          typeof parsed.lastShownAt === "number" &&
          now - parsed.lastShownAt < siteConfig.conversion.cooldownMs
        ) {
          return;
        }
      }
    } catch {
      // Si el almacenamiento falla, se usa un temporizador normal.
    }

    let timer: number;

    function schedule(delay: number) {
      timer = window.setTimeout(tryShow, delay);
    }

    function tryShow() {
      if (document.body.dataset.overlay === "true") {
        schedule(20_000);
        return;
      }

      try {
        window.sessionStorage.setItem(autoKey, "true");
      } catch {
        // Sin sessionStorage la invitación puede repetirse una vez por visita.
      }

      openProfessional("general");
    }

    schedule(siteConfig.conversion.autoInviteDelayMs);

    return () => window.clearTimeout(timer);
  }, [openProfessional]);

  return null;
}
