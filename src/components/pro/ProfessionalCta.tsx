"use client";

import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useProfessional } from "@/components/pro/professional-context";
import { cn } from "@/lib/utils";

interface ProfessionalCtaProps {
  label?: string;
  featureKey?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function ProfessionalCta({
  label = "Ver versión profesional",
  featureKey = "general",
  variant = "outline",
  size = "md",
  className,
}: ProfessionalCtaProps) {
  const { openProfessional } = useProfessional();

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={() => openProfessional(featureKey)}
    >
      {label}
    </Button>
  );
}
