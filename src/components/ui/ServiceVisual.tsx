import type { Service, ServiceCategorySlug } from "@/data/types";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const tones: Record<
  ServiceCategorySlug,
  { background: string; foreground: string; muted: string; accent: string }
> = {
  belleza: {
    background: "linear-gradient(145deg, #F3E6DB 0%, #EADDD2 58%, #E3D3C6 100%)",
    foreground: "#5C3B2C",
    muted: "rgba(92,59,44,0.55)",
    accent: "#B6785E",
  },
  barberia: {
    background: "linear-gradient(145deg, #183828 0%, #245D3B 62%, #153B2A 100%)",
    foreground: "#FAFAF6",
    muted: "rgba(250,250,246,0.55)",
    accent: "#C7A66A",
  },
  micropigmentacion: {
    background: "linear-gradient(145deg, #EFE5D6 0%, #E7D8C2 55%, #DCCAB2 100%)",
    foreground: "#2A4A37",
    muted: "rgba(42,74,55,0.55)",
    accent: "#8B6B3E",
  },
};

interface ServiceVisualProps {
  service: Service;
  className?: string;
}

export function ServiceVisual({ service, className }: ServiceVisualProps) {
  const tone = tones[service.category];

  return (
    <div
      role="img"
      aria-label={`Composición editorial del servicio ${service.name}`}
      className={cn("relative w-full overflow-hidden rounded-[1.25rem]", className)}
      style={{ background: tone.background, color: tone.foreground }}
    >
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="318"
          cy="62"
          r="94"
          fill="none"
          stroke={tone.accent}
          strokeOpacity="0.35"
        />
        <circle
          cx="318"
          cy="62"
          r="66"
          fill="none"
          stroke={tone.accent}
          strokeOpacity="0.2"
        />
        <path
          d="M30 264C104 234 148 186 172 118"
          fill="none"
          stroke={tone.foreground}
          strokeOpacity="0.18"
        />
        <path
          d="M368 222C338 204 318 178 306 146"
          fill="none"
          stroke={tone.foreground}
          strokeOpacity="0.14"
        />
        <path
          d="M64 62C80 90 84 116 80 142"
          fill="none"
          stroke={tone.foreground}
          strokeOpacity="0.12"
        />
        <rect
          x="16"
          y="16"
          width="368"
          height="268"
          rx="8"
          fill="none"
          stroke={tone.foreground}
          strokeOpacity="0.1"
        />
      </svg>

      <div className="relative flex h-full min-h-[13rem] items-center justify-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full border backdrop-blur-sm"
          style={{
            borderColor: tone.muted,
            background: "rgba(250,250,246,0.08)",
          }}
        >
          <Icon icon={service.icon} size={40} strokeWidth={1.1} />
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        <span
          className="text-[0.5625rem] font-medium uppercase tracking-[0.22em]"
          style={{ color: tone.muted }}
        >
          Servicio · {service.category}
        </span>
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: tone.accent }}
        />
      </div>
    </div>
  );
}
