import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { Botanical } from "@/components/ui/Botanical";

export default function NotFound() {
  const ArrowIcon = uiIcons.arrowRight;

  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-forest pb-20 pt-32 text-warm-white">
      <div className="grain absolute inset-0 opacity-35" aria-hidden="true" />
      <Botanical
        variant="arc"
        className="absolute -right-28 top-10 h-[32rem] w-[32rem] text-warm-white/[0.06]"
      />
      <div className="container-editorial relative">
        <span className="eyebrow text-gold">Error 404</span>
        <p className="mt-6 font-serif text-[clamp(5rem,16vw,11rem)] leading-none text-warm-white/12">
          404
        </p>
        <h1 className="mt-2 max-w-xl font-serif text-4xl leading-[1.02] sm:text-5xl">
          Esta página no forma parte
          <br />
          <span className="italic text-gold-light">del ritual.</span>
        </h1>
        <p className="mt-5 max-w-md text-sm leading-7 text-warm-white/50">
          Puede que el enlace haya cambiado o que la página todavía no exista en
          esta demostración. Vuelve al inicio o explora la colección.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="gold" size="lg">
            Volver al inicio
            <ArrowIcon size={15} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/tienda" variant="outline-light" size="lg">
            Explorar la tienda
          </ButtonLink>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/30">
          <Link href="/servicios" className="transition-colors hover:text-warm-white/70">
            Servicios
          </Link>
          <Link href="/academia" className="transition-colors hover:text-warm-white/70">
            Academia
          </Link>
          <Link href="/contacto" className="transition-colors hover:text-warm-white/70">
            Contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
