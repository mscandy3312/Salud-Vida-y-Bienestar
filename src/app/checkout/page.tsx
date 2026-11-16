"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { Button, ButtonLink } from "@/components/ui/Button";
import { uiIcons } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/config";
import { formatMXN, multiplyCents, toCents } from "@/lib/money";
import { downloadOrderPdf } from "@/lib/order-pdf";
import { checkoutSchema, collectFieldErrors } from "@/lib/validation";
import { whatsappUrl } from "@/lib/whatsapp";

type FormState = {
  name: string;
  phone: string;
  email: string;
  deliveryMethod: "pickup" | "delivery";
  address: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  deliveryMethod: "pickup",
  address: "",
  notes: "",
};

export default function CheckoutPage() {
  const { items, subtotal, isHydrated, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const subtotalCents = toCents(subtotal);
  const ArrowIcon = uiIcons.arrowRight;
  const CheckIcon = uiIcons.checkCircle;

  const message = useMemo(() => {
    const lines = items.map(
      (item) =>
        `• ${item.quantity} × ${item.product.name} — ${formatMXN(
          multiplyCents(toCents(item.product.price), item.quantity),
        )}`,
    );
    return [
      `Solicitud de pedido — ${siteConfig.name}`,
      "",
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      form.email ? `Correo: ${form.email}` : null,
      `Entrega: ${form.deliveryMethod === "delivery" ? "Envío a domicilio" : "Recoger en tienda"}`,
      form.deliveryMethod === "delivery" ? `Dirección: ${form.address}` : null,
      form.notes ? `Notas: ${form.notes}` : null,
      "",
      "Productos:",
      ...lines,
      "",
      `Subtotal: ${formatMXN(subtotalCents)}`,
      "Envío: por confirmar",
      "",
      "Estado: SOLICITUD (el pago aún no está confirmado).",
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
  }, [items, form, subtotalCents]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      setErrors(collectFieldErrors(result.error));
      return;
    }
    setErrors({});
    setSubmitError("");
    try {
      downloadOrderPdf({
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email ?? "",
        deliveryMethod: result.data.deliveryMethod,
        address: result.data.address ?? "",
        notes: result.data.notes ?? "",
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        subtotal,
      });
    } catch (error) {
      console.error("No se pudo generar el PDF del pedido.", error);
      setSubmitError(
        "No pudimos generar el PDF. Inténtalo de nuevo antes de continuar.",
      );
      return;
    }
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-warm-white pb-24 pt-32 sm:pt-36">
        <div className="container-editorial max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary-green/30 bg-primary-green/10 text-primary-green">
            <CheckIcon size={28} aria-hidden="true" />
          </div>
          <h1 className="mt-6 font-serif text-3xl text-forest sm:text-4xl">
            Tu pedido está listo
          </h1>
          <p className="mt-4 text-sm leading-7 text-soft-black/60">
            Descargamos el PDF con los artículos, cantidades y precios, y abrimos
            WhatsApp. Confirma el envío desde WhatsApp y adjunta el PDF descargado
            para compartirlo. El pago todavía no está confirmado.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl(message)}
              external
              variant="primary"
              size="md"
            >
              Abrir WhatsApp
            </ButtonLink>
            <ButtonLink href="/tienda" variant="primary" size="md">
              Seguir comprando
            </ButtonLink>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                clearCart();
                setSubmitted(false);
                setForm(initialState);
              }}
            >
              Nuevo pedido
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-warm-white pb-24 pt-32 sm:pt-36">
      <div className="container-editorial">
        <div className="border-b border-forest/10 pb-6">
          <span className="eyebrow text-forest/55">Pedido</span>
          <h1 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">
            Checkout
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-soft-black/55">
            Completa tus datos para preparar la solicitud de pedido por WhatsApp.
            No se cobra en este sitio.
          </p>
        </div>

        {!isHydrated ? (
          <p className="py-20 text-center text-sm text-soft-black/45">
            Cargando tu selección…
          </p>
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="font-serif text-2xl text-forest">
              No hay productos en tu carrito
            </h2>
            <ButtonLink href="/tienda" className="mt-6" variant="primary">
              Ir a la tienda
              <ArrowIcon size={14} aria-hidden="true" />
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Field
                label="Nombre completo"
                name="name"
                value={form.name}
                onChange={(value) => update("name", value)}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Teléfono (WhatsApp)"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(value) => update("phone", value)}
                error={errors.phone}
                autoComplete="tel"
              />
              <Field
                label="Correo electrónico (opcional)"
                name="email"
                type="email"
                value={form.email}
                onChange={(value) => update("email", value)}
                error={errors.email}
                autoComplete="email"
              />

              <fieldset>
                <legend className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/55">
                  Modalidad de entrega
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      { id: "pickup", label: "Recoger en tienda" },
                      { id: "delivery", label: "Envío a domicilio" },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.id}
                      className={`cursor-pointer rounded-2xl border p-4 text-sm transition-colors ${
                        form.deliveryMethod === option.id
                          ? "border-forest/45 bg-beige/50 text-forest"
                          : "border-forest/12 bg-warm-white text-soft-black/70 hover:border-forest/25"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={option.id}
                          checked={form.deliveryMethod === option.id}
                          onChange={() => update("deliveryMethod", option.id)}
                          className="h-3.5 w-3.5 accent-forest"
                        />
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.deliveryMethod ? (
                  <p className="mt-2 text-xs text-[#8a2b2b]">{errors.deliveryMethod}</p>
                ) : null}
              </fieldset>

              {form.deliveryMethod === "delivery" ? (
                <Field
                  label="Dirección de envío"
                  name="address"
                  value={form.address}
                  onChange={(value) => update("address", value)}
                  error={errors.address}
                  autoComplete="street-address"
                />
              ) : null}

              <div>
                <label
                  htmlFor="notes"
                  className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/55"
                >
                  Notas (opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-forest/15 bg-warm-white px-4 py-3 text-sm text-soft-black outline-none transition-colors focus:border-forest/45"
                />
                {errors.notes ? (
                  <p className="mt-2 text-xs text-[#8a2b2b]">{errors.notes}</p>
                ) : null}
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Descargar PDF y abrir WhatsApp
                <ArrowIcon size={14} aria-hidden="true" />
              </Button>
              {submitError ? (
                <p role="alert" className="text-sm text-[#8a2b2b]">
                  {submitError}
                </p>
              ) : null}
              <p className="text-[0.625rem] leading-5 text-soft-black/45">
                Se descargará el PDF y se abrirá WhatsApp con el detalle del
                pedido. Confirma el envío y adjunta el PDF. No se cobra en este
                sitio.
              </p>
            </form>

            <aside className="h-fit rounded-3xl border border-forest/12 bg-cream/50 p-6 sm:p-7">
              <h2 className="font-serif text-2xl text-forest">Tu pedido</h2>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li
                    key={item.product.slug}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-soft-black/65">
                      {item.quantity} × {item.product.name}
                    </span>
                    <span className="font-medium text-soft-black">
                      {formatMXN(
                        multiplyCents(toCents(item.product.price), item.quantity),
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-3 border-t border-forest/12 pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-soft-black/55">Subtotal</span>
                  <span className="font-medium text-soft-black">
                    {formatMXN(subtotalCents)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-soft-black/55">Envío</span>
                  <span className="text-soft-black/55">Por confirmar</span>
                </div>
              </div>
              <Link
                href="/carrito"
                className="mt-6 inline-block text-[0.625rem] uppercase tracking-[0.18em] text-forest/60 underline decoration-forest/20 underline-offset-4 hover:text-forest"
              >
                Volver al carrito
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/55"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-forest/15 bg-warm-white px-4 py-3 text-sm text-soft-black outline-none transition-colors focus:border-forest/45"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-[#8a2b2b]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
