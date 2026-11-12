import Image from "next/image";
import Link from "next/link";
import { courses } from "@/data/courses";
import { siteConfig } from "@/lib/config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { Botanical } from "@/components/ui/Botanical";

export function AcademySection() {
  const ArrowIcon = uiIcons.arrowUpRight;
  const featured = courses.filter((course) => course.isFeatured).slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-cream/60 py-20 sm:py-28">
      <Botanical
        variant="branch"
        className="absolute -left-12 bottom-10 h-80 w-64 text-forest/[0.05]"
      />
      <div className="container-editorial relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-forest/10">
              <Image
                src="/images/editorial/academy.jpg"
                alt="Ambiente editorial de formación y academia"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold-light">
                  Academia SVB
                </p>
                <p className="mt-2 max-w-xs font-serif text-2xl leading-snug text-warm-white">
                  El talento se cultiva con técnica, práctica y mirada.
                </p>
              </div>
            </div>
            <div className="absolute -right-4 top-6 hidden max-w-[11rem] rounded-2xl border border-forest/10 bg-warm-white/95 p-4 shadow-card backdrop-blur-sm sm:block">
              <p className="text-[0.5rem] uppercase tracking-[0.18em] text-forest/40">
                Perfil del instructor
              </p>
              <p className="mt-2 font-serif text-sm leading-snug text-forest">
                {siteConfig.academy.instructor.name}
              </p>
              <p className="mt-1 text-[0.5625rem] leading-4 text-soft-black/42">
                Información pendiente de confirmar.
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Academia"
              title={
                <>
                  Aprende el oficio.
                  <br />
                  <span className="italic text-forest/55">Construye tu visión.</span>
                </>
              }
              description="Programas de demostración en peluquería, barbería, maquillaje y disciplinas creativas. Una base editorial para presentar formación sin prometer certificaciones que aún no existen."
            />

            <div className="mt-9 divide-y divide-forest/10 border-y border-forest/10">
              {featured.map((course, index) => (
                <Reveal key={course.id} delay={index * 0.06}>
                  <Link
                    href="/academia"
                    className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 py-5 transition-colors hover:text-primary-green"
                  >
                    <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-forest/30">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <Icon icon={course.icon} size={16} className="text-gold" />
                        <h3 className="font-serif text-xl text-forest">{course.name}</h3>
                      </div>
                      <p className="mt-1 max-w-md text-xs leading-5 text-soft-black/45">
                        {course.summary}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest/45 transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-warm-white">
                      <ArrowIcon size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/academia" size="lg">
                Conocer los programas
                <ArrowIcon size={15} aria-hidden="true" />
              </ButtonLink>
              <p className="max-w-[16rem] text-[0.625rem] leading-5 text-soft-black/38">
                Modalidades, duración y requisitos se confirman con la academia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
