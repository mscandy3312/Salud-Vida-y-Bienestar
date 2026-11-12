import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";

export function Testimonials() {
  const QuoteIcon = uiIcons.quote;

  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Voces de demostración"
          title={
            <>
              La experiencia,
              <br />
              <span className="italic text-forest/55">contada desde dentro.</span>
            </>
          }
          description="Estos testimonios son ilustrativos y no representan reseñas reales. Sirven para mostrar cómo se presentaría la voz de los clientes una vez autorizada."
          align="center"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.07}>
              <figure className="flex h-full flex-col rounded-[1.4rem] border border-forest/10 bg-cream/45 p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <QuoteIcon size={24} className="text-gold/60" aria-hidden="true" />
                  <span className="rounded-full border border-forest/10 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.14em] text-forest/40">
                    Demo
                  </span>
                </div>
                <blockquote className="mt-6 flex-1 font-serif text-lg leading-[1.55] text-forest/85">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-forest/10 pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/8 font-serif text-xs text-forest/70">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-xs text-forest/70">{testimonial.author}</p>
                    <p className="mt-0.5 text-[0.5625rem] uppercase tracking-[0.12em] text-soft-black/35">
                      {testimonial.context}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.625rem] leading-5 text-soft-black/35">
          Los testimonios deben sustituirse por reseñas verificadas y autorizadas
          antes de publicar el sitio.
        </p>
      </div>
    </section>
  );
}
