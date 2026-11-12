"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { uiIcons } from "@/components/ui/Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  placement?: "center" | "right";
  tone?: "light" | "dark";
  className?: string;
  showClose?: boolean;
  closeLabel?: string;
}

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  placement = "center",
  tone = "light",
  className,
  showClose = true,
  closeLabel = "Cerrar ventana",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.overlay = "true";

    const panel = panelRef.current;
    const timer = window.setTimeout(() => {
      const firstFocusable = panel?.querySelector<HTMLElement>(focusableSelector);
      (firstFocusable ?? panel)?.focus();
    }, 60);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.overlay;
      previousActive?.focus?.();
    };
  }, [open, onClose]);

  const CloseIcon = uiIcons.close;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <div
            className="absolute inset-0 bg-soft-black/55 backdrop-blur-[3px]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : placement === "right"
                  ? { x: 64, opacity: 0 }
                  : { y: 22, scale: 0.985, opacity: 0 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : placement === "right"
                  ? { x: 0, opacity: 1 }
                  : { y: 0, scale: 1, opacity: 1 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : placement === "right"
                  ? { x: 64, opacity: 0 }
                  : { y: 18, scale: 0.99, opacity: 0 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex w-full flex-col outline-none",
              placement === "center"
                ? "m-auto max-h-[calc(100dvh-1.5rem)] max-w-5xl overflow-y-auto rounded-[1.75rem] shadow-lift sm:m-auto"
                : "ml-auto h-[100dvh] max-w-md overflow-y-auto shadow-lift",
              tone === "dark" ? "bg-forest text-warm-white" : "bg-warm-white text-soft-black",
              className,
            )}
          >
            {showClose ? (
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className={cn(
                  "absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                  tone === "dark"
                    ? "border-warm-white/15 bg-warm-white/5 text-warm-white hover:bg-warm-white/12"
                    : "border-soft-black/10 bg-warm-white/80 text-soft-black hover:bg-beige",
                )}
              >
                <CloseIcon size={18} aria-hidden="true" />
              </button>
            ) : null}
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
