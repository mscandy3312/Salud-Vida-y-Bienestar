import type { Metadata } from "next";
import Image from "next/image";
import { courses } from "@/data/courses";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { SiteNotice } from "@/components/layout/SiteNotice";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, uiIcons } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { courseInquiryMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Academia",
  description:
    "Programas demostrativos de formación en peluquería, barbería, maquillaje, micropigmentación, colorimetría y guitarra. Modalidades y requisitos por confirmar.",
  path: "/academia",
  keywords: ["academia de belleza", "curso de barbería", "formación profesional"],
});

export default function AcademyPage() {
  const ArrowIcon = uiIcons.arrowUpRight;
  const CheckIcon = uiIcons.checkCircle;

  return (
    <>
      <PageHero
        eyebrow="Academia"
        title={
          <>
            Aprende el oficio.
            <br />
            <span className="italic text-gold-light">Construye tu visión.</span>
          </>
        }
        description="Una academia de demostración para presentar programas de formación técnica y creativa. Contenidos, duración, modalidades y requisitos ilustrativos."
        aside={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-warm-white/12">
            <Image
              src="/images/editorial/academy.jpg"
              alt="Ambiente editorial de formación y academia"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-5 bottom-5">
              <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold-light">
                Formación con visión
              </p>
              <p className="mt-2 font-serif text-xl leading-snug text-warm-white">
                {siteConfig.academy.instructor.name}
              </p>
              <p className="mt-1 text-[0.625rem] text-warm-white/45">
                {siteConfig.academy.instructor.role}
              </p>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="#programas" variant="gold" size="md">
            Ver programas
            <ArrowIcon size={14} aria-hidden="true" />
          </ButtonLink>
          <a
            href={whatsappUrl(whatsappMessagesForAcademy())}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.625rem] uppercase tracking-[0.16em] text-warm-white/45 underline decoration-warm-white/20 underline-offset-4 transition-colors hover:text-warm-white"
          >
            Solicitar información
          </a>
        </div>
      </PageHero>

      <SiteNotice />

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div>
              <span className="eyebrow text-forest/55">La mirada académica</span>
              <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-[1.05] text-forest sm:text-4xl">
                Técnica, práctica y criterio
                <br />
                <span className="italic text-forest/55">para hacer las cosas bien.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-soft-black/52">
                Los programas de esta página son demostrativos. Su objetivo es
                mostrar cómo se presentaría la academia: claridad en los temas,
                expectativas realistas y un camino de aprendizaje bien contado.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Fundamentos técnicos",
                  "Práctica guiada",
                  "Criterio profesional",
                  "Mirada de servicio",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-forest/10 bg-cream/40 px-4 py-3 text-xs text-forest/65"
                  >
                    <CheckIcon size={14} className="text-gold" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-forest/10 bg-cream/50 p-6">
              <div className="flex items-center justify-between gap-4 border-b border-forest/10 pb-4">
                <div>
                  <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-forest/40">
                    Perfil del instructor
                  </p>
                  <p className="mt-1 font-serif text-xl text-forest">
                    {siteConfig.academy.instructor.name}
                  </p>
                </div>
                <span className="rounded-full border border-forest/12 px-2.5 py-1 text-[0.4375rem] uppercase tracking-[0.12em] text-forest/40">
                  Por confirmar
                </span>
              </div>
              <p className="mt-4 text-xs leading-6 text-soft-black/48">
                {siteConfig.academy.instructor.bio}
              </p>
              <div className="mt-5 border-t border-forest/10 pt-4">
                <p className="text-[0.625rem] leading-5 text-soft-black/35">
                  Este bloque debe sustituirse con la trayectoria, especialidades
                  y formación verificables de la persona que imparte los programas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programas" className="scroll-mt-24 bg-cream/55 py-16 sm:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow text-forest/50">Programas</span>
              <h2 className="mt-3 font-serif text-3xl text-forest sm:text-4xl">
                Seis caminos de formación.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-6 text-soft-black/42">
              Modalidad, duración, nivel y requisitos están por confirmar. No se
              declaran certificaciones oficiales.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {courses.map((course, index) => (
              <Reveal key={course.id} delay={index * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-forest/10 bg-warm-white">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-warm-white/20 bg-forest/45 px-3 py-1.5 backdrop-blur-sm">
                      <Icon icon={course.icon} size={13} className="text-gold-light" />
                      <span className="text-[0.5rem] uppercase tracking-[0.16em] text-warm-white/65">
                        {course.discipline}
                      </span>
                    </div>
                    <div className="absolute right-4 top-4 rounded-full bg-warm-white/90 px-2.5 py-1 text-[0.4375rem] uppercase tracking-[0.12em] text-forest/60">
                      Demo
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl text-forest">
                        {course.name}
                      </h3>
                      <span className="shrink-0 pt-1 text-[0.5rem] uppercase tracking-[0.12em] text-soft-black/30">
                        {course.levelLabel}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-soft-black/48">
                      {course.summary}
                    </p>

                    <div className="mt-4">
                      <p className="text-[0.5rem] uppercase tracking-[0.16em] text-forest/40">
                        Temas ilustrativos
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {course.topics.map((topic) => (
                          <li
                            key={topic}
                            className="rounded-full border border-forest/10 bg-cream/50 px-2.5 py-1 text-[0.5625rem] text-forest/55"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t border-forest/8 pt-4 text-[0.5625rem] uppercase tracking-[0.12em] text-soft-black/35">
                      <span>{course.modalityLabel}</span>
                      <span>{course.durationLabel}</span>
                    </div>

                    <div className="mt-5">
                      <ButtonLink
                        href={whatsappUrl(courseInquiryMessage(course))}
                        external
                        variant="primary"
                        size="md"
                        className="w-full"
                      >
                        Consultar programa
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-xs leading-6 text-soft-black/38">
            La academia deberá definir el contenido curricular, los requisitos de
            admisión, las condiciones de pago y cualquier certificación antes de
            abrir inscripciones reales.
          </p>
        </div>
      </section>

    </>
  );
}

function whatsappMessagesForAcademy() {
  return "Hola, me interesa recibir información sobre los programas de la academia de Salud Vida y Bienestar.";
}
