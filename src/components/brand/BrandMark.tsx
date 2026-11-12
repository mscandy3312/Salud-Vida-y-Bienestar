import { cn } from "@/lib/utils";

interface BrandMarkProps {
  tone?: "dark" | "light";
  className?: string;
}

export function BrandMark({ tone = "dark", className }: BrandMarkProps) {
  const dark = tone === "dark";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border",
          dark ? "border-forest/25 text-forest" : "border-warm-white/30 text-gold-light",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5">
          <path
            d="M16 27V12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M16 17c0-4 3-7 7-7 0 4-3 7-7 7Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M16 21c0-3-2.5-5.5-5.5-5.5 0 3 2.5 5.5 5.5 5.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M16 12c0-3 2-5 4.5-5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.32rem] tracking-[-0.02em]",
            dark ? "text-forest" : "text-warm-white",
          )}
        >
          Salud Vida
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5rem] font-medium uppercase tracking-[0.34em]",
            dark ? "text-forest/55" : "text-warm-white/55",
          )}
        >
          & Bienestar
        </span>
      </span>
    </span>
  );
}
