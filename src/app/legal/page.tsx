import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { SiteNotice } from "@/components/layout/SiteNotice";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Aviso legal",
  description:
    "Aviso legal, privacidad, términos y alcance de la demostración de Salud Vida y Bienestar. Contenido ilustrativo pendiente de revisión profesional.",
  path: "/legal",
});

const sections = [
  {
    id: "terminos",
    eyebrow: "01",
    title: "Términos de la demostración",
    paragraphs: [
      "Este sitio es una experiencia demostrativa creada para presentar una dirección visual, una estructura de contenidos y una posible experiencia digital para una marca de belleza, bienestar y formación.",
      "Nada de lo publicado constituye una oferta comercial vinculante. Los productos, servicios, programas, precios, duraciones y disponibilidades son ilustrativos y pueden cambiar sin previo aviso.",
      "El carrito permite preparar una solicitud de pedido y compartirla por WhatsApp. Este sitio no procesa pagos; el negocio confirma disponibilidad, envío y forma de pago por WhatsApp.",
    ],
  },
  {
    id: "privacidad",
    eyebrow: "02",
    title: "Privacidad y datos",
    paragraphs: [
      "Esta versión demo de prueba no incluye backend ni sistema de cuentas. El formulario y los pedidos abren WhatsApp con un mensaje preparado para que la persona lo revise y decida si lo envía.",
      "El carrito utiliza el almacenamiento local del navegador para recordar la selección. Esa información permanece en el dispositivo y puede borrarse vaciando el carrito o los datos del navegador.",
      "Antes de publicar una versión real, la marca deberá definir aviso de privacidad, base legal, retención, derechos de las personas y medidas de seguridad conforme a la legislación aplicable.",
    ],
  },
  {
    id: "datos",
    eyebrow: "03",
    title: "Datos ilustrativos",
    paragraphs: [
      "Los nombres de productos, precios, tamaños, notas, descripciones de servicios, programas académicos, testimonios y perfiles de instructor son marcadores de posición. No representan inventario, formulaciones, certificaciones, resultados ni reseñas verificadas.",
      "WhatsApp está disponible para consultas y solicitudes de pedido. Los datos de correo, ubicación, horarios y redes sociales todavía deben confirmarse.",
      "La marca deberá validar toda afirmación cosmética, técnica o académica, así como cualquier requisito legal o sanitario, antes de publicar el sitio.",
    ],
  },
  {
    id: "propiedad",
    eyebrow: "04",
    title: "Imágenes y propiedad intelectual",
    paragraphs: [
      "Las fotografías editoriales utilizadas en esta demostración provienen de bancos de imágenes y se emplean como referencias visuales temporales. Deberán sustituirse o licenciarse adecuadamente antes de un lanzamiento comercial.",
      "Las composiciones de producto y servicio son ilustraciones generadas para la demo. No representan envases, fórmulas ni resultados reales.",
      "Los nombres, marcas y referencias de terceros pertenecen a sus titulares. Esta demo no implica afiliación, patrocinio ni endorsement.",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Transparencia
            <br />
            <span className="italic text-gold-light">desde el primer clic.</span>
          </>
        }
        description="Información clara sobre el alcance de esta demostración, el uso de datos ilustrativos y los pasos necesarios antes de convertirla en un sitio comercial."
      />

      <SiteNotice />

      <section className="bg-warm-white py-16 sm:py-24">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-forest/40">
                En esta página
              </p>
              <nav className="mt-4 space-y-2.5" aria-label="Secciones legales">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-xs text-soft-black/45 transition-colors hover:text-forest"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="mt-8 rounded-2xl border border-forest/10 bg-cream/50 p-4">
                <p className="text-[0.5625rem] uppercase tracking-[0.16em] text-forest/40">
                  Nota importante
                </p>
                <p className="mt-2 text-[0.625rem] leading-5 text-soft-black/40">
                  Este texto es una base de demostración. Debe ser revisado por
                  asesoría legal antes de publicarse.
                </p>
              </div>
            </aside>

            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold">
                    {section.eyebrow}
                  </span>
                  <h2 className="mt-2 font-serif text-2xl text-forest sm:text-3xl">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 border-t border-forest/10 pt-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="max-w-2xl text-xs leading-6 text-soft-black/50 sm:text-sm sm:leading-7"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="rounded-[1.4rem] border border-forest/10 bg-cream/50 p-6">
                <h2 className="font-serif text-2xl text-forest">Contacto legal</h2>
                <p className="mt-3 max-w-xl text-xs leading-6 text-soft-black/45">
                  Para consultas sobre esta demostración, escribe a{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email.value}`}
                    className="text-forest underline decoration-forest/20 underline-offset-4"
                  >
                    {siteConfig.contact.email.value}
                  </a>
                  . El buzón también es un marcador de posición que la marca deberá
                  configurar.
                </p>
                <p className="mt-4 text-[0.625rem] leading-5 text-soft-black/32">
                  Última actualización de esta demo: {siteConfig.copyrightYear}.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
