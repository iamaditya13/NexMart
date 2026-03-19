import { storefrontBrands } from '../data/content.js';

export function PartnerMarquee() {
  const movingBrands = [...storefrontBrands, ...storefrontBrands];

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4" aria-label="Partner brands">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white py-5">
        <div className="flex min-w-max items-center gap-4 px-4 grayscale animate-[nexmart-marquee_24s_linear_infinite]">
          {movingBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="inline-flex min-w-32 items-center justify-center rounded-full border border-zinc-200 bg-[var(--secondary-bg)] px-5 py-2 text-sm font-bold tracking-wide text-zinc-600"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
