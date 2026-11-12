"use client";

import { cn } from "@/lib/utils";
import { uiIcons } from "@/components/ui/Icon";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
  compact?: boolean;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Cantidad",
  className,
  compact = false,
}: QuantityStepperProps) {
  const MinusIcon = uiIcons.minus;
  const PlusIcon = uiIcons.plus;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-soft-black/14 bg-warm-white",
        compact ? "h-8" : "h-11",
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Reducir ${label.toLowerCase()}`}
        className={cn(
          "flex items-center justify-center rounded-full text-soft-black/70 transition-colors hover:text-forest disabled:opacity-30",
          compact ? "h-8 w-8" : "h-11 w-11",
        )}
      >
        <MinusIcon size={compact ? 13 : 15} aria-hidden="true" />
      </button>
      <span
        className={cn(
          "min-w-6 text-center font-sans font-medium tabular-nums text-soft-black",
          compact ? "text-xs" : "text-sm",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Aumentar ${label.toLowerCase()}`}
        className={cn(
          "flex items-center justify-center rounded-full text-soft-black/70 transition-colors hover:text-forest disabled:opacity-30",
          compact ? "h-8 w-8" : "h-11 w-11",
        )}
      >
        <PlusIcon size={compact ? 13 : 15} aria-hidden="true" />
      </button>
    </div>
  );
}
