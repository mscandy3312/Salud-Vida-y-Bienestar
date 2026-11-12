"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { HeroFallback } from "@/components/home/HeroFallback";

const HeroScene = dynamic(
  () => import("@/components/home/HeroScene").then((module) => module.HeroScene),
  { ssr: false, loading: () => <HeroFallback /> },
);

export function HeroCanvas() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="h-full w-full" role="img" aria-label="Composición visual de una botella de cuidado personal">
        <HeroFallback />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <HeroScene />
    </div>
  );
}
