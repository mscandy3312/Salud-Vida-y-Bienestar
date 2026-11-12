import { cn } from "@/lib/utils";

type SocialPlatform = "instagram" | "facebook" | "tiktok";

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

export function SocialIcon({ platform, className }: SocialIconProps) {
  if (platform === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("h-5 w-5", className)}
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("h-5 w-5", className)}
      >
        <path d="M15 8h2V5h-2c-2.2 0-4 1.8-4 4v2H9v3h2v6h3v-6h2.5l.5-3H14V9c0-.6.4-1 1-1Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
    >
      <path d="M14.5 4v10.2a3.3 3.3 0 1 1-2.6-3.2" />
      <path d="M14.5 6.2c.9 1.6 2.3 2.6 4.5 2.8" />
      <path d="M4 17.5c2 1.2 4.3 1.7 6.7 1.3" opacity="0.45" />
    </svg>
  );
}
