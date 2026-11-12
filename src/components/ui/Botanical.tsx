import { cn } from "@/lib/utils";

interface BotanicalProps {
  variant?: "sprig" | "arc" | "branch";
  className?: string;
}

export function Botanical({ variant = "sprig", className }: BotanicalProps) {
  if (variant === "arc") {
    return (
      <svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        className={cn("pointer-events-none", className)}
      >
        <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <path d="M40 320C110 250 150 170 170 60" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M360 60C300 140 260 220 230 350" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      </svg>
    );
  }

  if (variant === "branch") {
    return (
      <svg
        viewBox="0 0 320 420"
        fill="none"
        aria-hidden="true"
        className={cn("pointer-events-none", className)}
      >
        <path
          d="M172 400C168 330 158 260 165 200C172 140 190 96 220 54"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
        <path d="M166 312C128 292 102 262 94 226C130 238 154 264 166 312Z" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
        <path d="M169 250C203 228 226 198 232 164C198 178 177 206 169 250Z" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
        <path d="M177 184C149 166 130 138 126 110C156 122 174 148 177 184Z" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <path d="M208 104C232 84 248 58 252 34C224 46 208 72 208 104Z" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M100 268C100 208 100 150 100 96C100 66 104 38 112 12"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path d="M100 214C74 200 56 180 50 154C76 164 92 184 100 214Z" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
      <path d="M100 170C126 156 144 136 150 110C124 120 108 140 100 170Z" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
      <path d="M100 124C78 112 64 94 60 72C82 82 94 100 100 124Z" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <path d="M106 64C124 52 136 34 140 16C120 24 108 40 106 64Z" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}
