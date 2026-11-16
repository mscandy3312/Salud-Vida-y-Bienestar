import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { SiteNotice } from "@/components/layout/SiteNotice";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { siteConfig } from "@/lib/config";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Contacta a Salud Vida y Bienestar para consultar productos, servicios y programas.",
  path: "/contacto",
});

const faqs = [
  {
    question: "¿Los productos y precios son reales?",
    answer:
      "No. Todo el catálogo, los precios y las descripciones son ilustrativos. La demo sirve para presentar la experiencia digital; la marca deberá sustituir esta información antes de publicar.",
  },
  {
    question: "¿Puedo comprar o pagar en este sitio?",
    answer:
      "No se cobra en este sitio. Puedes enviar una solicitud con los artículos por WhatsApp y confirmar ahí el total, envío y forma de pago.",
  },
  {
    question: "¿Los servicios se pueden agendar?",
    answer:
      "La agenda todavía no está activa. La disponibilidad, duración, precio final y protocolos de cada servicio se confirman directamente con el estudio.",
  },
  {
    question: "¿La academia ofrece certificaciones?",
    answer:
      "Esta demo no declara certificaciones oficiales. Los programas, requisitos, modalidades y cualquier reconocimiento deben ser definidos y validados por la academia.",
  },
  {
    question: "¿Qué pasa con mis datos?",
    answer:
      "Esta experiencia no tiene backend ni base de datos. El formulario abre WhatsApp con un mensaje preparado y no guarda información en el sitio.",
  },
];

export default function ContactPage() {
  const ArrowIcon = uiIcons.arrowUpRight;
  const MessageIcon = uiIcons.message;
  const MailIcon = uiIcons.mail;
  const PinIcon = uiIcons.mapPin;
  const ClockIcon = uiIcons.checkCircle;
  const ChevronIcon = uiIcons.chevronDown;

  const contactCards = [
    {
      label: "WhatsApp",
      value: siteConfig.contact.whatsapp.display,
      note: "Pedidos y consultas",
      href: whatsappUrl(whatsappMessages.general),
      icon: MessageIcon,
    },
    {
      label: "Correo",
      value: siteConfig.contact.email.value,
      note: "Buzón ilustrativo",
      href: `mailto:${siteConfig.contact.email.value}`,
      icon: MailIcon,
    },
    {
      label: "Ubicación",
      value: siteConfig.contact.address.value,
      note: "Dirección por confirmar",
      icon: PinIcon,
    },
    {
      label: "Horario",
      value: siteConfig.contact.hours.value,
      note: "Horario por confirmar",
      icon: ClockIcon,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title={
          <>
            Hablemos de tu
            <br />
            <span className="italic text-gold-light">próximo ritual.</span>
          </>
        }
        description="Escríbenos por WhatsApp para consultar productos, servicios o programas de la academia."
        aside={
          <div className="rounded-[1.5rem] border border-warm-white/10 bg-warm-white/[0.04] p-6 backdrop-blur-sm">
            <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
              WhatsApp
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug text-warm-white/85">
              Una conversación puede ser el primer paso.
            </p>
            <div className="mt-5 space-y-3 border-t border-warm-white/10 pt-4 text-xs text-warm-white/50">
              <p className="flex items-center gap-2.5">
                <MessageIcon size={14} className="text-gold/75" aria-hidden="true" />
                {siteConfig.contact.whatsapp.display}
              </p>
              <p className="flex items-center gap-2.5">
                <MailIcon size={14} className="text-gold/75" aria-hidden="true" />
                {siteConfig.contact.email.value}
              </p>
              <p className="flex items-center gap-2.5">
                <PinIcon size={14} className="text-gold/75" aria-hidden="true" />
                {siteConfig.contact.address.value}
              </p>
            </div>
            <p className="mt-4 text-[0.625rem] leading-5 text-warm-white/28">
              Los datos de correo, ubicación y horario están pendientes de
              confirmar.
            </p>
          </div>
        }
      />

      <SiteNotice />

      <section id="whatsapp" className="scroll-mt-24 bg-cream/55 py-16 sm:py-24">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="eyebrow text-forest/55">Canales</span>
              <h2 className="mt-4 font-serif text-3xl leading-[1.05] text-forest sm:text-4xl">
                Elige el canal que
                <br />
                <span className="italic text-forest/55">te resulte más cercano.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-soft-black/52">
                Puedes escribirnos por WhatsApp. El correo, la ubicación y los
                horarios se confirmarán más adelante.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {contactCards.map((card) => {
                  const CardIcon = card.icon;
                  const content = (
                    <>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/12 text-forest/55">
                        <CardIcon size={15} aria-hidden="true" />
                      </span>
                      <p className="mt-4 text-[0.5rem] uppercase tracking-[0.18em] text-forest/40">
                        {card.label}
                      </p>
                      <p className="mt-1 text-sm text-forest/80">{card.value}</p>
                      <p className="mt-1 text-[0.5625rem] leading-4 text-soft-black/32">
                        {card.note}
                      </p>
                    </>
                  );

                  return card.href ? (
                    <a
                      key={card.label}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="rounded-[1.2rem] border border-forest/10 bg-warm-white p-5 transition-colors hover:border-forest/25"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={card.label}
                      className="rounded-[1.2rem] border border-forest/10 bg-warm-white p-5"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <ButtonLink
                  href={whatsappUrl(whatsappMessages.general)}
                  external
                  variant="outline"
                  size="md"
                >
                  Escribir por WhatsApp
                  <ArrowIcon size={14} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>

            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="preguntas" className="scroll-mt-24 bg-warm-white py-16 sm:py-24">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <span className="eyebrow text-forest/50">Preguntas frecuentes</span>
              <h2 className="mt-4 font-serif text-3xl leading-[1.05] text-forest sm:text-4xl">
                Lo que conviene
                <br />
                <span className="italic text-forest/55">saber antes de empezar.</span>
              </h2>
              <p className="mt-5 max-w-xs text-xs leading-6 text-soft-black/42">
                Respuestas claras sobre el alcance de esta demostración y lo que
                falta para convertirla en una operación real.
              </p>
            </div>

            <div className="divide-y divide-forest/10 border-y border-forest/10">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group py-4" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-sm font-medium text-forest/75">
                    <span className="font-serif text-lg text-forest">{faq.question}</span>
                    <ChevronIcon
                      size={15}
                      className="mt-1 shrink-0 text-forest/35 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 max-w-2xl pr-6 text-xs leading-6 text-soft-black/48">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

