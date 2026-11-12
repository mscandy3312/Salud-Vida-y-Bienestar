import { benefits } from "@/data/benefits";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";

export function TrustStrip() {
  return (
    <section className="border-y border-forest/8 bg-cream/50 py-14 sm:py-16">
      <div className="container-editorial">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow text-forest/50">La experiencia SVB</span>
            <h2 className="mt-3 font-serif text-2xl text-forest sm:text-3xl">
              Una misma intención en cada detalle.
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-6 text-soft-black/42">
            Principios de demostración que orientan la presentación de productos,
            servicios y formación.
          </p>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.05}>
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/12 text-forest/60">
                  <Icon icon={benefit.icon} size={17} />
                </span>
                <div>
                  <h3 className="font-serif text-lg text-forest">{benefit.title}</h3>
                  <p className="mt-1 text-xs leading-6 text-soft-black/45">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
