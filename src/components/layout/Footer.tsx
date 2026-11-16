import Link from "next/link";
import { footerGroups } from "@/data/navigation";
import { siteConfig } from "@/lib/config";
import { whatsappUrl } from "@/lib/whatsapp";
import { BrandMark } from "@/components/brand/BrandMark";
import { Botanical } from "@/components/ui/Botanical";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const year = siteConfig.copyrightYear;

  return (
    <footer className="relative overflow-hidden bg-forest text-warm-white">
      <div className="grain absolute inset-0 opacity-25" aria-hidden="true" />
      <Botanical className="absolute -right-12 top-16 h-80 w-80 text-warm-white/[0.06]" />

      <div className="container-editorial relative py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1.75fr]">
          <div>
            <BrandMark tone="light" />
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-warm-white/88 sm:text-[1.7rem]">
              Menos ruido. Más ritual.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-warm-white/48">
              Una demostración de plataforma editorial para bienestar, belleza y
              cuidado personal. Contenido, precios y disponibilidad ilustrativos.
            </p>
            <div className="mt-7 flex items-center gap-2.5">
              {siteConfig.social.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (enlace de demostración)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-white/15 text-warm-white/60 transition-colors hover:border-gold/50 hover:text-gold-light"
                >
                  <SocialIcon platform={social.id} className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-gold/70">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-xs leading-5 text-warm-white/50 transition-colors hover:text-warm-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-warm-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-warm-white/30">
              Contacto
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-warm-white/55">
              <a
                href={whatsappUrl("Hola, me gustaría recibir información.")}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-warm-white/20 underline-offset-4 transition-colors hover:text-warm-white"
              >
                {siteConfig.contact.whatsapp.display}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email.value}`}
                className="underline decoration-warm-white/20 underline-offset-4 transition-colors hover:text-warm-white"
              >
                {siteConfig.contact.email.value}
              </a>
              <span>{siteConfig.contact.address.value}</span>
              <span>{siteConfig.contact.hours.value}</span>
            </div>
            <p className="mt-3 max-w-xl text-[0.625rem] leading-5 text-warm-white/28">
              {siteConfig.demo.notice} Los datos de correo, ubicación y redes
              están pendientes de confirmar.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-warm-white/8 pt-6 text-[0.625rem] text-warm-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Versión demo de prueba.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/legal" className="transition-colors hover:text-warm-white/70">
              Aviso legal
            </Link>
            <Link href="/legal#privacidad" className="transition-colors hover:text-warm-white/70">
              Privacidad
            </Link>
            <Link href="/legal#terminos" className="transition-colors hover:text-warm-white/70">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
