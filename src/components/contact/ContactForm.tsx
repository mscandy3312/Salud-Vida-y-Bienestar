"use client";

import { useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/config";
import { whatsappUrl } from "@/lib/whatsapp";

const interests = [
  "Productos",
  "Servicios de belleza",
  "Barbería",
  "Micropigmentación",
  "Academia",
  "Otro",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState(interests[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "opened">("idle");
  const [lastUrl, setLastUrl] = useState("");
  const ArrowIcon = uiIcons.arrowUpRight;
  const CheckIcon = uiIcons.checkCircle;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = [
      `Hola, soy ${name.trim() || "una persona interesada"}.`,
      `Me interesa: ${interest}.`,
      message.trim() ? `Mensaje: ${message.trim()}` : "",
      "Consulta enviada desde la versión demo de prueba de Salud Vida y Bienestar.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = whatsappUrl(text);
    setLastUrl(url);
    setStatus("opened");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-forest/10 bg-warm-white p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="eyebrow text-forest/50">Versión demo de prueba</span>
          <h2 className="mt-3 font-serif text-2xl text-forest sm:text-3xl">
            Cuéntanos qué buscas.
          </h2>
        </div>
        <span className="hidden rounded-full border border-forest/12 px-2.5 py-1 text-[0.4375rem] uppercase tracking-[0.12em] text-forest/40 sm:inline-block">
          Sin envío a servidor
        </span>
      </div>

      <p className="mt-3 text-xs leading-6 text-soft-black/45">
        Este formulario no guarda datos. Al enviarlo, abrirá WhatsApp con tu
        mensaje preparado para que puedas revisarlo antes de enviarlo.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className="label-base">
            Nombre
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            className="input-base"
            autoComplete="name"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-interest" className="label-base">
            Me interesa
          </label>
          <select
            id="contact-interest"
            name="interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className="input-base appearance-none"
          >
            {interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="label-base">
            Mensaje <span className="text-soft-black/30">(opcional)</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            maxLength={600}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Cuéntanos un poco más..."
            className="input-base resize-none"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full">
        Continuar en WhatsApp
        <ArrowIcon size={15} aria-hidden="true" />
      </Button>

      {status === "opened" ? (
        <div className="mt-4 rounded-xl border border-forest/10 bg-cream/55 p-4">
          <div className="flex items-start gap-2.5">
            <CheckIcon size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs text-forest/70">
                Si WhatsApp no se abrió automáticamente, usa este enlace:
              </p>
              <ButtonLink
                href={lastUrl}
                external
                variant="ghost"
                size="sm"
                className="mt-1 px-0 text-forest"
              >
                Abrir conversación de WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-[0.625rem] leading-5 text-soft-black/32">
        {siteConfig.contact.whatsapp.label}. No compartas datos sensibles en esta
        demostración.
      </p>
    </form>
  );
}
