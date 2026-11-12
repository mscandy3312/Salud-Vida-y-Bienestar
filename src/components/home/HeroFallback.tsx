import { cn } from "@/lib/utils";

export function HeroFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[22rem] items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute h-44 w-44 rounded-full border border-warm-white/10" />
      <div className="absolute h-64 w-64 rounded-full border border-warm-white/[0.06]" />
      <div className="relative animate-float-slow">
        <div className="mx-auto h-10 w-20 rounded-t-xl bg-gradient-to-b from-[#E4C98F] to-[#B79455] shadow-lg" />
        <div className="relative h-72 w-44 rounded-[2.6rem] bg-gradient-to-b from-warm-white/92 via-[#EFE8D9] to-[#D9CFBC] shadow-[0_35px_80px_-30px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-x-6 top-24 h-24 rounded-xl border border-forest/10 bg-warm-white/70 px-4 py-5 text-center">
            <p className="font-serif text-sm tracking-[0.18em] text-forest">SVB</p>
            <div className="mx-auto mt-3 h-px w-8 bg-gold/70" />
            <p className="mt-3 text-[0.4375rem] uppercase tracking-[0.22em] text-forest/45">
              Ritual botánico
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
