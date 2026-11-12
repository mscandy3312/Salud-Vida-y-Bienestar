import Link from "next/link";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { Botanical } from "@/components/ui/Botanical";
import { ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/config";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { courses } from "@/data/courses";

export function Hero() {
  const ArrowIcon = uiIcons.arrowRight;
  const ChevronIcon = uiIcons.chevronDown;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-forest text-warm-white">
      <div className="grain absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(199,166,106,0.13),transparent_48%),radial-gradient(ellipse_at_80%_75%,rgba(77,169,44,0.09),transparent_42%)]"
        aria-hidden="true"
      />
      <Botanical
        variant="arc"
        className="absolute -right-24 top-16 h-[34rem] w-[34rem] text-warm-white/[0.07] sm:h-[42rem] sm:w-[42rem]"
      />
      <Botanical
        variant="branch"
        className="absolute -left-16 bottom-0 h-72 w-56 rotate-6 text-warm-white/[0.05]"
      />

      <div className="container-editorial relative flex min-h-[100svh] flex-col justify-center pb-16 pt-32 sm:pb-20 lg:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-warm-white/15 bg-warm-white/[0.04] px-3.5 py-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-gold-light">
                <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                Belleza · Bienestar · Formación
              </span>
              <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-warm-white/32">
                {siteConfig.demo.label}
              </span>
            </div>

            <h1 className="mt-7 max-w-2xl font-serif text-[clamp(2.9rem,7.2vw,5.8rem)] leading-[0.94] tracking-[-0.035em] text-warm-white">
              Tu belleza,
              <br />
              tu bienestar,
              <br />
              <span className="italic text-gold-light">tu mejor versión.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-warm-white/58 sm:text-[0.9375rem] sm:leading-8">
              Rituales de belleza, cuidado personal y formación profesional en
              una experiencia editorial pensada para acompañarte.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/tienda" variant="gold" size="lg">
                Explorar la colección
                <ArrowIcon size={15} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/servicios" variant="outline-light" size="lg">
                Descubrir servicios
              </ButtonLink>
            </div>

            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-warm-white/10 pt-6 text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/35">
              <span>{products.length} productos demo</span>
              <span className="hidden h-3 w-px bg-warm-white/15 sm:block" />
              <span>{services.length} servicios</span>
              <span className="hidden h-3 w-px bg-warm-white/15 sm:block" />
              <span>{courses.length} programas</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto h-[24rem] w-full max-w-[30rem] sm:h-[30rem] lg:h-[34rem]">
              <div
                className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-warm-white/10 sm:h-[24rem] sm:w-[24rem]"
                aria-hidden="true"
              />
              <div
                className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-warm-white/[0.05] sm:h-[29rem] sm:w-[29rem]"
                aria-hidden="true"
              />
              <HeroCanvas />
            </div>

            <div className="absolute left-0 top-8 hidden rounded-2xl border border-warm-white/12 bg-forest/40 px-4 py-3 backdrop-blur-md sm:block">
              <p className="text-[0.5rem] uppercase tracking-[0.2em] text-gold/70">
                Colección editorial
              </p>
              <p className="mt-1 font-serif text-sm text-warm-white/85">
                Ritual botánico
              </p>
            </div>

            <div className="absolute bottom-10 right-0 hidden rounded-2xl border border-warm-white/12 bg-forest/40 px-4 py-3 backdrop-blur-md sm:block">
              <p className="text-[0.5rem] uppercase tracking-[0.2em] text-gold/70">
                Línea VEGAN
              </p>
              <p className="mt-1 font-serif text-sm text-warm-white/85">
                Selección demo
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-warm-white/8 pt-5 lg:mt-16">
          <Link
            href="#manifiesto"
            className="group inline-flex items-center gap-3 text-[0.5625rem] uppercase tracking-[0.2em] text-warm-white/35 transition-colors hover:text-warm-white/70"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-warm-white/15 transition-transform group-hover:translate-y-0.5">
              <ChevronIcon size={13} aria-hidden="true" />
            </span>
            Descubrir el universo SVB
          </Link>
          <p className="hidden text-[0.5625rem] uppercase tracking-[0.16em] text-warm-white/25 sm:block">
            Experiencia demostrativa
          </p>
        </div>
      </div>
    </section>
  );
}
