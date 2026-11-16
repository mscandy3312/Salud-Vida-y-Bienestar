import { ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { Botanical } from "@/components/ui/Botanical";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function FinalCta() {
  const ArrowIcon = uiIcons.arrowUpRight;

  return (
    <section className="relative overflow-hidden bg-warm-white py-20 sm:py-28">
      <Botanical
        variant="arc"
        className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 text-forest/[0.04]"
      />
      <div className="container-editorial relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center text-forest/55">Empieza aquí</span>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-[3.6rem]">
              Tu próximo ritual
              <br />
              <span className="italic text-forest/55">empieza con una conversación.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-soft-black/50">
              Explora la tienda, conoce los servicios o descubre los programas de
              la academia. Esta demo está lista para adaptarse a la operación real
              de la marca.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/tienda" size="lg">
                Explorar la tienda
                <ArrowIcon size={15} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl(whatsappMessages.general)}
                external
                variant="outline"
                size="lg"
              >
                Hablar por WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-5 text-[0.625rem] uppercase tracking-[0.16em] text-soft-black/30">
              Consultas y pedidos por WhatsApp
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
