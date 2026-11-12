const items = [
  "Belleza consciente",
  "Rituales botánicos",
  "Cuidado personal",
  "Formación profesional",
  "Barbería contemporánea",
  "Micropigmentación",
  "Bienestar cotidiano",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-forest/8 bg-cream">
      <div className="flex w-max animate-marquee items-center gap-10 py-3.5">
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-10"
            aria-hidden={index >= items.length}
          >
            <span className="whitespace-nowrap text-[0.625rem] font-medium uppercase tracking-[0.24em] text-forest/50">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
