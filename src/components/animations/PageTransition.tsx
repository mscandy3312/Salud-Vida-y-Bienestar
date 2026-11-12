"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("will-change-auto")}
    >
      {children}
    </motion.div>
  );
}
