import { professionalModal } from "@/data/professional";
import { siteConfig } from "@/lib/config";
import { ProfessionalCta } from "@/components/pro/ProfessionalCta";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { Botanical } from "@/components/ui/Botanical";

export function ProfessionalBand() {
  const ArrowIcon = uiIcons.arrowUpRight;

  return (
    <section className="relative overflow-hidden bg-[#0C241A] py-20 text-warm-white sm:py-24">
      <div className="grain absolute inset-0 opacity-30" aria-hidden="true" />
      <Botanical
        variant="arc"
        className="absolute -right-24 -top-16 h-[28rem] w-[28rem] text-gold/[0.07]"
      />
      <div className="container-editorial relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[0.5625rem] uppercase tracking-[0.2em] text-gold-light">
                  Demo comercial
                </span>
                <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-warm-white/30">
                  {siteConfig.professional.name}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-lg font-serif text-4xl leading-[1.02] sm:text-5xl">
                Tu negocio merece una experiencia profesional.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md text-sm leading-7 text-warm-white/55">
                {professionalModal.description}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ProfessionalCta
                  label={professionalModal.primaryCta}
                  featureKey="general"
                  variant="gold"
                  size="lg"
                />
                <p className="max-w-[15rem] text-[0.625rem] leading-5 text-warm-white/30">
                  Sin pagos ni funciones reales en esta demostración.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[1.5rem] border border-warm-white/10 bg-warm-white/[0.035] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                  Lo que podría incluir
                </p>
                <ArrowIcon size={15} className="text-warm-white/25" aria-hidden="true" />
              </div>
              <ul className="mt-5 grid gap-x-5 gap-y-3.5 sm:grid-cols-2">
                {professionalModal.benefits.map((benefit) => (
                  <li
                    key={benefit.label}
                    className="flex items-center gap-2.5 text-xs leading-5 text-warm-white/60"
                  >
                    <Icon icon={benefit.icon} size={15} className="text-gold/75" />
                    {benefit.label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-warm-white/8 pt-4">
                <p className="text-[0.625rem] leading-5 text-warm-white/28">
                  Representación conceptual. Las funciones, integraciones y
                  condiciones de la versión Profesional se definirían en una
                  propuesta comercial.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
