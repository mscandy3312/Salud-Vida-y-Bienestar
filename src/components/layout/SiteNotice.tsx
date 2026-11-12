import { siteConfig } from "@/lib/config";
import { uiIcons } from "@/components/ui/Icon";

export function SiteNotice() {
  const InfoIcon = uiIcons.checkCircle;

  return (
    <div className="border-b border-forest/8 bg-cream/55">
      <div className="container-editorial flex items-start gap-2.5 py-3.5">
        <InfoIcon size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
        <p className="text-[0.625rem] leading-5 text-soft-black/42">
          <span className="font-medium uppercase tracking-[0.14em] text-forest/55">
            {siteConfig.demo.label}:
          </span>{" "}
          {siteConfig.demo.notice}
        </p>
      </div>
    </div>
  );
}
