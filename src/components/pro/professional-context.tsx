"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/lib/config";

interface ProfessionalState {
  open: boolean;
  featureKey: string;
}

interface ProfessionalContextValue extends ProfessionalState {
  openProfessional: (featureKey?: string) => void;
  closeProfessional: () => void;
}

const ProfessionalContext = createContext<ProfessionalContextValue | null>(null);

function recordInvitation() {
  try {
    window.localStorage.setItem(
      siteConfig.conversion.storageKey,
      JSON.stringify({ lastShownAt: Date.now() }),
    );
    window.sessionStorage.setItem(
      `${siteConfig.conversion.sessionKey}:manual`,
      "true",
    );
  } catch {
    // La experiencia no depende del almacenamiento.
  }
}

export function ProfessionalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProfessionalState>({
    open: false,
    featureKey: "general",
  });

  const openProfessional = useCallback((featureKey = "general") => {
    setState({ open: true, featureKey });
    recordInvitation();
  }, []);

  const closeProfessional = useCallback(() => {
    setState((previous) => ({ ...previous, open: false }));
  }, []);

  const value = useMemo<ProfessionalContextValue>(
    () => ({
      ...state,
      openProfessional,
      closeProfessional,
    }),
    [state, openProfessional, closeProfessional],
  );

  return (
    <ProfessionalContext.Provider value={value}>
      {children}
    </ProfessionalContext.Provider>
  );
}

export function useProfessional() {
  const context = useContext(ProfessionalContext);
  if (!context) {
    throw new Error("useProfessional debe utilizarse dentro de ProfessionalProvider");
  }
  return context;
}
